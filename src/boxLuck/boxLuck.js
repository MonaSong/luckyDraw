import React, { Component } from 'react';
import lottie from 'lottie-web';
import lottieJson from '../json/lottie.json';
import { Button, Modal, Toast, Picker, List } from 'antd-mobile';
import closebOx from './closeBox.png'
import './boxLuck.css';
import Api from '../api/api.js';

let seasons = [];
class BoxLuck extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // 选择用户
            sValue: ['1'],

            // 仓库数据
            list: [],
            
            // 抽奖
            is_show_result: false,
            result: '',
            zero: 1,
            modal_visible: false,

            // 奖励
            prize: '',

            // 重置数据
            isReset: true,

            // 动画
            animate: null,
        }
    }

	componentDidMount() { }

    componentWillMount () {
        this.gennerateUsers();
        this.getStock();
    }

    // 初始化用户
    gennerateUsers () {
        for (let i = 0; i < 10; i++) {
            seasons.push(
                {
                    label: `用户_${i+1}`,
                    value: `${i+1}`,
                }
            );
        }
    }

    // 查询库存
    async getStock() {
        let { prizeList } = await Api.getStock();

        this.setState({ list: prizeList });
    }

    // 切换账号
    changeStock(v) {
        // 销毁动画
        this.state.animate && this.state.animate.destroy();

        this.setState(
            { 
                sValue: v, 
                isReset: false, 
                is_show_result: false,
                animate: null,
            }, 
            async _ => await this.resetStock()
        );
    }

    // json 动画
    loadAnimation() {
        const appAnimation = document.querySelector('#box-luck');
		let params = {
			container: appAnimation,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: lottieJson
        };
        
        let animate = lottie.loadAnimation(params);
        
        this.setState({ animate });
    }

    // 点击抽奖
    luckLote = async () => {
        if (!this.state.zero) {
            return Toast.info('抽奖次数已达到上限!');
        }

        if(this.state.sValue.length < 1) return Toast.info('请选择抽奖用户！');

        let { result, prize } = await Api.getLuckyDraw({ userId: this.state.sValue[0] });

        if (result === 'repeat') return Toast.info('请勿重复领取！');
    
        if (result === 'success') {

            // 禁止重复抽奖
            this.setState({
                is_show_result: true,
                modal_visible: true,
                prize: prize === 'none' ? '谢谢惠顾' : prize,
                zero: 0,
            }, () => {
                this.loadAnimation();
            });

        }
    }

    onCloseModal = () => {
        this.setState({ modal_visible: false, });
    }

    // 重置库存
    async resetStock() {
        let params = { 
            "prizeList": [
                { "prize": "p01", "stock": 10 }, 
                { "prize": "p02", "stock": 100 }, 
                { "prize": "p03", "stock": 1000 }
            ]
        };

        let { result } = await Api.resetDraw({ prizeList : this.state.list ? this.state.list : params });

        this.setState({ isReset: true });

        if (result === 'success') {
            this.setState({ zero: 1 });
            return Toast.info('登录成功');
        }
        return Toast.info('登录失败');
    }

    render() {

        return (
            <div className="bg">
                <div className="minw">
                    <Picker
                        data={seasons}
                        cols={1}
                        value={this.state.sValue}
                        onChange={v => this.changeStock(v) }
                        onOk={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal" style={{ borderRadius: '4px'}}>切换账号</List.Item>
                    </Picker>
                </div>

                <div className='box-bg-color'>
                    {
                        this.state.is_show_result 
                        ? <div id='box-luck'></div> 
                        : <div className='box-close'><img src={closebOx}  /></div>
                    }


                    {
                       this.state.sValue.length > 0 && this.state.isReset
                       ? <div>
                            <div className='box-button'>
                                <Button className='button-color'  onClick={this.luckLote}>点击抽奖</Button>
                            </div>
                            <div className='box-count'>
                                您还有{this.state.zero}次抽奖机会
                            </div>
                        </div>
                        : ''
                    }

                    <Modal
                        visible={this.state.modal_visible}
                        transparent
                        maskClosable={false}
                        title={ `恭喜你获得了【${this.state.prize}】`}
                        footer={[{ text: '我知道了', onPress: () => { this.onCloseModal(); } }  ]}
                    >
                        { this.state.result }
                    </Modal>
                </div>
            </div>
        )
    }
}

export default BoxLuck
