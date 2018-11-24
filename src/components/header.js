import React, { Component } from 'react'
import { Link } from 'react-router'
import MenuTop from './menu/menutoplist'
import MenuNotifi from './menu/Menunotifi'
import MenuSetting from './menu/Menusetting'
import { Menu, Badge, Icon } from 'antd'
class Header extends Component {


    constructor(props) {
      super(props);
      this.state = {
        isToggleOn: false,
        menustep : 0,
        keymenu: ['0'],
        visible: false,
        selectedFile: null,
        menudata:null,
        menuseleted:null,
        titleform:null,
        Count:0,
        id:0,
        typedata:null,
        status:null,
        menusubstep:null
      };
    }
    showDropdownTop(e) {
      e.preventDefault();
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }


    goPageSub = (id) => {
      if(this.props.menu.menusubstep===id){
        this.props.menu.menusubstep = 0
      }else{
        this.props.menu.menusubstep = id
      }
      this.setState(this.props.menu)
    }

    goPage = (id, Children, Count, status, status_sub = 'active') => {
      if(this.props.menu.menustep===id && status === this.props.menu.status){
        this.props.menu.menustep = 0
      }else{

        this.props.menu.menustep = id
        this.props.menu.menuseleted = id
        this.props.menu.menudata = Children
        this.props.menu.Count = Count
      }
      if(!status_sub)this.props.menu.menusubstep = 0
      this.props.menu.status = status
      this.setState(this.props.menu)
    }

    goPageSetting = (id) => {
      if(this.props.menu.menustep===id){
        this.props.menu.menustep = 0
      }else{
        this.props.menu.menustep = id
      }
      this.setState(this.props.menu)
    }

    render(){
     
      const { dataMenu } = this.props

      
      const classDropdownMenuTop = 'navbar-collapse collapse' + (this.state.isToggleOn ? ' show' : '')
      return (
        <div id="headerTop">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/" onClick={()=>this.goPage(0,0,0,0)}><img width="60" alt="" src='/images/qtc.png'/> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
            onClick={(e) => {this.showDropdownTop(e)}}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={classDropdownMenuTop} id="navbarNavAltMarkup">
              <MenuTop goPage={this.goPage} goPageSub={this.goPageSub} dataMenu={dataMenu} menu={this.props.menu} />
              <div className="menu-setting">
                <Menu
                  mode="horizontal"
                  defaultSelectedKeys={this.state.keymenu}
                  style={{ lineHeight: '38px' }}
                >
                  <Menu.Item key="11" onClick={()=>this.goPageSetting('11')}>Parinya Prakongjai <img alt="" src="/images/5s.png" className="imglogo" /></Menu.Item>
                  <Menu.Item key="12" onClick={()=>this.goPageSetting('12')}>
                    <Badge count={5}>
                      <Icon type="notification" style={{ fontSize: '18px', color: '#fff' }} theme="outlined" />
                    </Badge>
                  </Menu.Item>
                  <Menu.Item key="13" onClick={()=>this.goPageSetting('13')}> <Icon type="setting" style={{ fontSize: '20px', color: '#fff' }} theme="outlined" /></Menu.Item>
                </Menu>
              </div>
            </div>
          </nav>
          {this.props.menu.menustep==='12' ? <MenuNotifi /> : ''}
          {this.props.menu.menustep==='13' ? <MenuSetting openMenu={this.showDrawer} /> : ''}
        </div>
      )
    }
}


export default Header
