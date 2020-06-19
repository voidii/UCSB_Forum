import React, { Component } from 'react';
import './Home.css'
class Home extends Component {
    render() {
        return (
            <div>
            <div className = "content"> 
                <div classname = 'words'>
                    <b>测试用的贴吧</b>
                    <br></br>
                    <br></br>
                    测试产品，想做成百度贴吧那样的样子然后给我们学校的学生用
                    <br></br>
                    <br></br>
                    主要是想方便大家，UCSB万事屋之类的微信号其实局限性很大，也不够自由，时不时还恰烂钱
                    <br></br>
                    <br></br>
                    还是想用这种贴吧的形式大家可以自由发帖，感觉会方便很多很多
                </div>
            </div>

                <div classname="home">
                    <img classname = "image" src={ require('./pic/UCSB.jpg') } style={{width: '40%', float: 'right'}}/>
                </div>
            </div>
        );
    }
}

export default Home;