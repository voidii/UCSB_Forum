import React, { Component } from 'react';
import ClassChat from './class_chat';
import firebase from "firebase";

class Class_list extends Component {
  constructor(){
    super();
    this.state = {
      classes:[
      ],
      query:""
    }
  } 

  componentDidMount() {
    this.getClassesData();
  }

  searchClass(){
    var ref = firebase.database().ref("UCSB/Classes");
    ref.orderByChild("title").equalTo(this.state.query).on("child_added", snapshot => {
      console.log(snapshot.val());
      let result = snapshot.val();
      this.setState({
        classes:[result]
      })
    });
  }

  writeClassesData() {
    firebase.database().ref("/UCSB/Classes").set(this.state.classes);
    console.log('DATA SAVED');
  }

  getClassesData () {
    let ref = firebase.database().ref("/UCSB/Classes");
    ref.on("value", snap => {
      const classes = snap.val();
      this.setState(
        {
          classes
        }
      );
    });
  }

  renderList() {
    return this.state.classes.map((indClass) => (
        <ClassChat class = {indClass} 
        uid = {this.props.uid}
        changeClass={this.props.changeClass}
        activeClass = {this.props.activeClass}/>
      ))
  }

  handleOnInputChange = (event) => {
    const query = event.target.value.toUpperCase();
    if(query === "")
    {
      this.getClassesData()
    }
    else{
      this.setState({ query: query}, () => {
        this.searchClass();
      });
    }
  };
  
  render() {  
    return(
      <div>
        <div>
            <b>Search For Class Channel</b>
              <div class="search bar4">
                  <form>
                    <input
                      type = "text"
                      id = "search"
                      className="search bar4"
                      //value={query}
                      onChange={ this.handleOnInputChange }
                      placeholder="input Class Name"
                    />
                  </form>
              </div>
          </div>
        {this.renderList()}
      </div>
    );   
  }
}

export default Class_list;