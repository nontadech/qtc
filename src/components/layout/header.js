import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadMenu } from '../../actions/menuAction'

import MenuTop from '../menu/menutop'
import FormMenu from '../menu/form'
import { Layout, Menu, Table,Icon,Modal,Button,Tooltip,Badge,message,Checkbox,Row, Col,Drawer,Spin,Tree } from 'antd';

const { Header, Content } = Layout;
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

  

class MenuNotifi extends Component {
    onChange = (e) => {
      console.log('checked = ', e.target.checked);
      this.setState({
        checked: e.target.checked,
      });
    }
  
    goApprove = () => {
      alert('OK')
    }
    state = {
      checked: true,
      disabled: false,
    };
  
    
    render(){
      return (
        <div className="menuqtc_notifi">
        <div className="notifycontainer">
        <div className="notify_all">
         <div className="notify_left">1 new notification</div>
         <div className="notify_right"><Checkbox checked={this.state.checked} onChange={this.onChange}>not don only</Checkbox></div>
         </div>
  
  
         <div className="notify_body">
         <div className="notify_contain">
              <div className="notify_body_l">
              <img src="/images/nophoto.png" className="imglogo1" />
              </div>
              <div className="notify_body_r">
             
              <span className="no_bold">กำลังรอให้คุณอนุมัติเอกสาร (โดย Customer)</span>
              <span><img src="/images/iconapprove.png" className="imgapprove" onClick={()=>this.goApprove()} /> PO No. 2299111</span>
              <span>No comment</span>
              <span><em>23/10/2018 13:30 AM</em></span>
              </div>
            </div>
             
         </div>
  
         <div className="dot_notify"></div>
  
         <div className="notify_body">
         <div className="notify_contain">
              <div className="notify_body_l">
              <img src="/images/nophoto.png" className="imglogo1" />
              </div>
              <div className="notify_body_r">
             
              <span className="no_bold">กำลังรอให้คุณอนุมัติเอกสาร (โดย Customer)</span>
              <span><img src="/images/iconapprove.png" className="imgapprove" onClick={()=>this.goApprove()} /> PO No. 2299111</span>
              <span>No comment</span>
              <span><em>23/10/2018 13:30 AM</em></span>
              </div>
            </div>
            
         </div>
  </div>
       
        </div>
      )
    }
  }
  
  
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
  
  class MenuGen extends Component {
  
    render(){
      const { MenuDataList,Count } = this.props
  
     
      var halfwayPoint = Math.floor(MenuDataList.length/3)
       var halfwayPointC2 = halfwayPoint*3
       var halfwayPointEnd = MenuDataList.length-halfwayPointC2
       var lastcolum = null
       if(halfwayPointEnd===0){lastcolum=halfwayPoint}else{
         
  
        lastcolum=halfwayPointEnd+halfwayPoint
      
      }
  
  
     // var columnA = MenuDataList.slice(0, halfwayPoint)
     // var columnB = MenuDataList.slice(halfwayPoint,halfwayPoint)
     // var columnC = MenuDataList.slice(halfwayPoint,lastcolum)
  
      var columnA = MenuDataList.slice(0, halfwayPoint)
      var columnB = MenuDataList.slice(halfwayPoint,2*halfwayPoint)
      var columnC = MenuDataList.slice(2*halfwayPoint,MenuDataList.length)
  
      if(Count!==0){
        return (
          <div className="menuqtc">
          <div className="menucontainer">
          <Row>
            
          <Col span={8} >
          {columnA.map((result, i) => {
              return (
               <ul className="me001" key={result.Id}>
               <li className="me001h">{result.Name}</li>
               {
                 result.Children.map(re=>{
                   return (
                    <li className="me001l" key={re.Id}>
                    <Link to={`/${re.Link}`} className="me001r_l">{re.Name}</Link>
                    
                    
                    <Link to={`/new${re.Link}`} className="me001r"><Icon type="plus-circle" style={{ fontSize: '26px', color: '#08c' }} theme="outlined" /></Link>
                    </li>
                   )
                 })
               }
             </ul>
     
              )
            })
          }
        </Col> 
    
        <Col span={8} >
          {columnB.map((result, i) => {
              return (
               <ul className="me001" key={result.Id}>
               <li className="me001h">{result.Name}</li>
               {
                 result.Children.map(re=>{
                  return (
                    <li className="me001l" key={re.Id}>
                    <Link to={`/${re.Link}`} className="me001r_l">{re.Name}</Link>
                    
                    
                    <Link to={`/new${re.Link}`} className="me001r"><Icon type="plus-circle" style={{ fontSize: '26px', color: '#08c' }} theme="outlined" /></Link>
                    </li>
                   )
                 })
               }
             </ul>
     
              )
            })
          }
        </Col> 
    
        <Col span={8} >
          {columnC.map((result, i) => {
              return (
               <ul className="me001" key={result.Id}>
               <li className="me001h">{result.Name}</li>
               {
                 result.Children.map(re=>{
                  return (
                    <li className="me001l" key={re.Id}>
                    <Link to={`/${re.Link}`} className="me001r_l">{re.Name}</Link>
                    
                    
                    <Link to={`/new${re.Link}`} className="me001r"><Icon type="plus-circle" style={{ fontSize: '26px', color: '#08c' }} theme="outlined" /></Link>
                    </li>
                   )
                 })
               }
             </ul>
     
              )
            })
          }
        </Col> 
    
          </Row>
          </div>
          </div>
        )
      }else{
        return (
          <div></div>
        )
      }
     
    }
  }
  
  class Home extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        menustep : 0,
        keymenu: ['0'],
        visible: false,
        selectedFile: null,
        menudata:null,
        menuseleted:null,
        titleform:null,
        Count:0,
        id:0,
        typedata:null
      }
    }
  
  
    componentDidMount(){
      this.props.dispatch(loadMenu('0'))
    }
  
  
    showDrawer = () => {
      this.setState({
        visible: true,
        menustep : 0
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
    
    goPage = (id,Children,Count) => {
      
      if(this.state.menustep===id){
        this.setState({
          menustep:'0'
        })
        
      }else{
       
        this.setState({
          menustep:id,
          menuseleted:id,
          menudata:Children,
          Count:Count
        })
      }
      
    }
  
  
    goPageSetting = (id) => {
      if(this.state.menustep===id){
        this.setState({
          menustep:'0'
        })
  
      }else{
        this.setState({
          menustep:id,
        })
      }
    }
  
    closeMenu = () => {
      this.setState({
        menuseleted:null,
        menustep:'0'
      })
    }
  
    
    
   
  
  
  
  
  
  
  
  
      render() {

       const { menuList } = this.props
       const { dataMenu,isRejectedMenu,isLoadingMenu } = menuList

          if (isRejectedMenu) {
              return <div className="alert alert-danger">Error: {dataMenu}</div>
          }
          
          if (isLoadingMenu || !dataMenu) {
              return <div className="example"><Spin size="large" /></div>
          }
  
          console.log('xx-',dataMenu)
  
          return (
              
  
  
  
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <div className="logouser">
  
  
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={this.state.keymenu}
          style={{ lineHeight: '38px' }}
        >
          <Menu.Item key="11" onClick={()=>this.goPageSetting('11')}>Parinya Prakongjai <img src="/images/5s.png" className="imglogo" /></Menu.Item>
          <Menu.Item key="12" onClick={()=>this.goPageSetting('12')}><Badge count={5}>
         <Icon type="notification" style={{ fontSize: '18px', color: '#fff' }} theme="outlined" />
         </Badge></Menu.Item>
          <Menu.Item key="13" onClick={()=>this.goPageSetting('13')}> <Icon type="setting" style={{ fontSize: '20px', color: '#fff' }} theme="outlined" /></Menu.Item>
          </Menu>
          
        </div>
        
       
  
        <MenuTop goPage={this.goPage} dataMenu={dataMenu} />
        {this.state.menustep==='12' ? <MenuNotifi /> : ''}
      {this.state.menustep==='13' ? <MenuSetting openMenu={this.showDrawer} /> : ''}
      {this.state.menustep===this.state.menuseleted ? <MenuGen MenuDataList={this.state.menudata} Count={this.state.Count} /> : ''}
      
        
      </Header>
      
      
      
       
      
      
      
    
  
          ) 
      }
  }
  
  function mapStateToProps(state) {
    return {
      menuList : state.menuReducer.menuList,
    }
  }


export default connect(mapStateToProps)(Header)