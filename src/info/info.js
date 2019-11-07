import React, { Component } from 'react';
import info from './info.png';
import './info.css'

class Info extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }

	componentDidMount() {}

    render() {
        return (
            <div className='info bg'>
                <img src={info} className='imgs no-pad' />
            </div>
        )
    }
}

export default Info
