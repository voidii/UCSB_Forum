import React, { Component } from 'react';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from 'react-modal';
import ClassList from './Class_list';
import AddClass from './AddClass';
import './class_room.css';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

class ClassRoom extends Component {
    constructor(props){
        super();
        this.state = {
            activeClass: 0,
            uid:props.uid,
            showModal:false
        }
        this.changeClass = (title) => {
          this.setState({
            activeClass: title
          })
        }
      }

    openModal = () => {
      this.setState({ showModal: true });
    }

    closeModal = () => {
      this.setState({ showModal: false });
      console.log(this.state.uid);
    }
    
    render() {
        return (
            <div>
                {this.props.uid !== "" && 
                <Fab color="primary" aria-label="add" onClick = {() => this.openModal()} style = {style}>
                    <AddIcon />
                </Fab>

                }
                <div>
                    <ClassList 
                        uid = {this.props.uid}
                        changeClass = {this.changeClass}
                        activeClass = {this.state.activeClass}/>
                </div>
                <Modal 
                  isOpen={this.state.showModal}   // modal容器是否显示
                  overlayClassName="overlay"   // 指定div overlay的classname。（可覆盖默认样式）
                  className="modal"   // 指定div content的classname。（可覆盖默认样式）
                  onAfterOpen={this.handleAfterOpenFunc}  // 在模态框打开后，执行的函数
                >
                <AddClass/>
                  
                  <button onClick={this.closeModal}>关闭模态框</button>
                </Modal>
            </div>
        );
    }
}

export default ClassRoom;