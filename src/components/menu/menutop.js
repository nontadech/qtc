import React, { Component } from 'react'

//import { Link } from 'react-router'

import { Menu } from 'antd';


// onClick={()=>this.goPage('2')}

class MenuTop extends Component {

   
    render(){
        const { goPage,dataMenu } = this.props
        const { Data } = dataMenu
        
       return (
           <div>
                <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        style={{ lineHeight: '43px' }}
      >
      
          {Data && Data.map(e=>{
              return (
                <Menu.Item key={e.Id} onClick={()=>goPage(e.Id,e.Children,e.Count)}>{e.Name}</Menu.Item>
              )
          })}
       
      </Menu>
           </div>
       )
    }
}




export default MenuTop