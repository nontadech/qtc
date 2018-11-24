import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd'

const NavItemSubList = props => {
  return props.data.Children.map(children=>{
    return (
      <div key={children.Id}>
        <Link onClick={()=>props.goPage(props.mainData.Id, props.mainData.Id, children.Count, 'active', 'active')}
          className={children.Count?'dropdown-item dropdown-toggle dropright':'dropdown-item'}
          key={children.Id} to={children.Link ? children.Link : ''} >
          {children.Name}
        </Link>
      </div>
    )
  })
}

const NavItemList = props => {
  return props.data.Children.map(children=>{
    return (
      <div key={children.Id} className={props.menu.menusubstep === children.Id ? 'tabs active' : 'tabs'}>
        <Link onClick={()=>
          children.Children.length ?
          props.goPageSub(children.Id):
          props.goPage(props.data.Id, props.data.Id, children.Count, 'active','')
          }
          className={children.Count?'dropdown-item dropdown-toggle dropright':'dropdown-item'}
          key={children.Id} to={children.Children.length?'':children.Link} >
          {children.Name}
        </Link>
        <div className={(props.menu.menusubstep === children.Id)?'menu-sub show':'menu-sub'} aria-labelledby="navbarDropdown">
          <NavItemSubList goPage={props.goPage} data={children} mainData={props.data} />
        </div>
      </div>
    )
  })
}

class MenuTop extends Component {


    render(){
       const { goPage, dataMenu, goPageSub } = this.props;
       const { Data } = dataMenu;
       return (
          <div className="navbar-nav">
          {Data && Data.map(element=>{
            let dataToggle = (this.props.menu.menustep === element.Id) ? "nav-link active" : "nav-link";
              return (
                <div key={element.Id}>
                  <Link className={dataToggle} to={element.Children.length?'':element.Link} id="navbarDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" onClick={() => {goPage(element.Id, element.Children, element.Count, '')}}>
                    {element.Name}
                  </Link>
                  <div className={(this.props.menu.menustep  === element.Id && element.Count > 0 && !this.props.menu.status)?'dropdown-menu show':'dropdown-menu'} aria-labelledby="navbarDropdown">
                    <NavItemList goPage={goPage} goPageSub={goPageSub} data={element} menu={this.props.menu} />
                  </div>
                </div>
              )
          })}
           </div>
       )
    }
}

export default MenuTop
