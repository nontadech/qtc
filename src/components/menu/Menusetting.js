import React, { Component } from 'react'

class MenuSetting extends Component {

  onChange = () => {
    console.log()
  }
  render(){

    const  { openMenu } = this.props

    return (
      <div className="menuqtc_notifi">
      <div className="menucontainer">
      <ul className="me001">
          <li className="me001ln" onClick={()=> openMenu()}>Create Menu</li>
          <li className="me001ln">Change Password</li>
          <li className="me001ln">Label</li>
          <li className="me001ln">Desboard</li>
          <li className="me001ln">Logout</li>
          </ul>

     </div>
      </div>
    )
  }
}

export default MenuSetting
