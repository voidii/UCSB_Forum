import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import Tablist from './Comp/Tablist'
import Body from './Comp/body'
import {app, googleProvider} from './Comp/fire'
import { Toaster, Intent } from '@blueprintjs/core';

const loginstyle = {
  width:"90%",
  maxWidth: "315px",
  margin: "20px auto",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px"
}



class App extends Component {

  constructor(){
    super();
    this.authWithGoogle = this.authWithGoogle.bind(this)
    this.authWithEmailPassward = this.authWithEmailPassward.bind(this)
    this.state = {
        activeTab: 1,
        showModal: false,
        authenicated: false,
        uid:"",
        redirect: false
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

  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
    console.log(this.state.uid);
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

  authWithGoogle(){
    console.log("google")
    app.auth().signInWithPopup(googleProvider).then((result, error) => {
        if(error){
            this.toaster.show({intent: Intent.DANGER, message:"unable to sign in with google"})
        }
        else{
            this.setState({ redirect: true })
        }
    })
}

authWithEmailPassward(event){
    event.preventDefault()
    console.table([{
        email: this.emailInput.value,
        password: this.passwordInput.value
    }])
    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchSignInMethodsForEmail(email).then((providers) => {
        if(providers.length === 0){
            //create user
            return app.auth().createUserWithEmailAndPassword(email, password)
        }
        else if(providers.indexOf("password") === -1){
            //used google
            this.loginForm.reset()
            this.toaster.show({ intent: Intent.WARNING, message: "Try other log in"})
        }
        else{
            //sign user in
            //this.loginForm.reset()
            //this.setState({redirect: true})
            return app.auth().signInWithEmailAndPassword(email, password)
        }
    })
    .then((data) => {
        if(data.user.uid && data.user.email){
            this.loginForm.reset()
            this.setState({
                redirect: true,
                uid: data.user.uid
            })
        }
    })
    .catch((error) => {
        this.toaster.show({intent: Intent.DANGER, message: error.mesaage})
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
          <Body activeTab = {this.state.activeTab} uid = {this.state.uid}/>
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
          
          {!this.state.redirect && 
            <div style = {loginstyle}>
                <Toaster ref = { (element) => { this.toaster = element } }/>

                <button style = {{width:"100%", backgroundColor: "#6bc4ff", color:"white"}} class = "btn-secondary" onClick = { () => { this.authWithGoogle() }}>
                    Sign In With Google
                </button>

                <hr/>
                <form onSubmit = {(event) => { this.authWithEmailPassward(event) } } ref = { (form) => { this.loginForm = form }}>
                    <div>
                        <h5>Note</h5>
                            If you don't have an account, this form will create your account.
                    </div>
                    <hr/>
                    <label>
                        <b>Email</b>
                        <input style = {{width: "100%"}} className = "input" name = "email" type = "email" ref = {(input) => {this.emailInput = input}} placeholder = "Email"/>
                    </label>
                    <label>
                    <b>Passward</b>
                        <input style = {{width: "100%"}} className = "input" name = "passward" type = "passward" ref = {(input) => {this.passwordInput = input}} placeholder = "Passward"/>
                    </label>
                    <input style = {{width: "100%", backgroundColor: "#6bc4ff", color:"white"}} type = "submit" value = "Log In"/>
                </form>    
            </div>
          }
          {this.state.redirect && 
            <div style = {loginstyle}>
              <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                  You
              </div>
              <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                  have 
              </div>
              <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                   successfully 
              </div>
              <div style = {{fontSize:"xx-large", fontFamily:"cursive", float:"center"}}>
                  logged in! 
              </div>
            </div>
          }
          <button onClick={this.closeModal}>关闭模态框</button>
        </Modal>

      </div>
    );
  }
}

export default App;