import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import Tablist from './Comp/Tablist'
import Body from './Comp/body'
import Login from './Comp/login'
import {app, base, googleProvider} from './Comp/fire'





class App extends Component {

  constructor(){
    super();
    this.state = {
        activeTab: 1,
        showModal: false,
        authenicated: false,
        uid:""
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }

  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          authenicated: true
        })
      }
      else{
        this.setState({
          authenicated: false
        })
      }
    })
  }
  componentWillUnmount(){
    //this.removeAuthListener();
  }
  componentDidMount(){
    this.getLoginInfo()
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  // 模态框打开后，执行的函数
  handleAfterOpenFunc = () => {
    console.log('open~')
  }

  // 该函数，下面会有介绍
  handleAfterCloseFunc = () => {
    console.log('close~')
  }

  // 用于测试获取的DOM节点
  openRef = () => {
    console.log(this.overlayRef)
    console.log(this.contentRef)
  }

  // 指定模态框的父级
  getParent = () => {
    return document.querySelector('#App');
  }

  Logout = () => {
    app.auth().signOut().then((user) => {
              this.setState({
                  authenicated: false
              })
          })
  }

  getLoginInfo = (uid) => {
    console.log(uid)
    this.setState({
      uid: uid
    })
  }


  render() {
    
    const tabs = [
      {
        id: 1,
        title: '首页'
      },
      {
        id: 2,
        title: '找室友'
      },
      {
        id: 3,
        title: '找课友'
      },
      {
        id: 4,
        title: '找二手'
      },
      {
        id: 5,
        title: '顺风车'
      }
    ]
    return (
      <div>
        <div className = "header">
          
            <h1>UCSB小贴吧</h1>
            {!this.state.authenicated && <h3 onClick={this.openModal}>Login</h3>}{/* 登陆后直接让login按钮消失嘻嘻*/}
            {this.state.authenicated && <h3 onClick={this.Logout}>Logout</h3>}
            {/*this.state.authenicated && <h3 onClick={this.openModal}>Login</h3>
              未来加入更多功能比如用户自己页面之类的，可以查看自己的帖子
            */}
        </div>
        
        <div className = "navbar">
          <Tablist tabs={tabs}  
          changeTab={this.changeTab}
          activeTab={this.state.activeTab}
          />
          
        </div>
        <div className = "mainbody">
          <Body activeTab = {this.state.activeTab}/>
        </div>

        <Modal 
          isOpen={this.state.showModal}   // modal容器是否显示
          overlayClassName="overlay"   // 指定div overlay的classname。（可覆盖默认样式）
          className="modal"   // 指定div content的classname。（可覆盖默认样式）
          //style={{ overlay: {}, content: {} }}  // div overlay和content的样式，也可以直接在这里指定。
          onAfterOpen={this.handleAfterOpenFunc}  // 在模态框打开后，执行的函数

          // 当请求关闭模态框时，执行的函数！
          // （模态框不一定会关闭，因为是否关闭取决于isOpen特性，如果在当前函数中，改变了isOpen:false，才会关闭）
          //   只有两种情况，才会执行目标函数。
          //   1，当shouldCloseOnOverlayClick为true时，在div overlay上点击，会触发
          //   2，当shouldCloseOnEsc为true时，并且选中了div content
          //        也就是说，如果shouldFocusAfterRender也为true，按esc键就会触发。
          //        或者，shouldFocusAfterRender为false时，手动选中div content，按esc键就会触发。
          //onRequestClose={this.handleAfterCloseFunc}
          //closeTimeoutMS={1000} // 指定，在发出关闭命令后，模态框延迟关闭的时间，默认0
          shouldCloseOnOverlayClick={true}   // 指定在div overlay上点击，是否关闭模态框，默认true
          //shouldFocusAfterRender={false}  //指定模态框出现后，是否被默认选中，默认true
          //shouldCloseOnEsc={true}  // 指定按esc键，是否关闭模态框，默认true（要选中div content，才有效）
          //shouldReturnFocusAfterClose={false} // 指定是否应将焦点恢复到，显示前具有焦点的元素，默认true
//
          //overlayRef={node => this.overlayRef = node}   // 可以获取div overlay的整个DOM节点
          //contentRef={node => this.contentRef = node}   // 可以获取div content的整个DOM节点
          //parentSelector={this.getParent}   // 配合指定的方法，指定"Modal单独生成的DOM"的父级元素，该demo中，指定到了div App中
          //ariaHideApp={false}   //如果没有添加到某个DOM节点中，就会显示警告，为了不显示警告，设置为false，默认true。

          // portalClassName="protal"   // 指定div Portal的classname（因为没有默认样式，所以一般不用指定）。
          // contentLabel="一个demo"   // 显示在div content的自定义属性:aria-label="通告给屏幕的内容"。
        >
          <Login passInfo = {this.getLoginInfo}/>
          <button onClick={this.closeModal}>关闭模态框</button>
        </Modal>

      </div>
    );
  }
}

export default App;