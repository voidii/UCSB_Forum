import React, { Component } from 'react';
import Tab from './Tab'

class Tablist extends Component {
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
          },
          {
            id: 6,
            title: '关于UCSB'
          }
          ]
        return tabs.map((indTab) => (
            <Tab tab = {indTab} 
            changeTab={this.props.changeTab}
            activeTab = {this.props.activeTab}/>

        ));
    }
}

export default Tablist;