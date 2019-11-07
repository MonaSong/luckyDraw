import React, { Component } from 'react';
import banner from './banner.png';
import './banner.css';

class Banner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sValue: '',
            pickValue: '',
        };
    }

    render() {
        return (
            <div className='bg banner'>
                <img src={banner} className='w100' />
            </div>
        )
    }
}

export default Banner;
