import React,{ Component } from 'react'
import { connect } from 'react-redux'
import windowSize from 'react-window-size'
import axios from 'axios'
import { Link } from 'react-router'
import { loadParent,MenuSave,MenuDelele,loadMenu,loadMenuEdit,loadMenuTree } from '../actions/menuAction'

import MenuTop from '../components/menu/menutop'
import FormMenu from '../components/menu/form'

/* layout */
import RightAction from '../components/layout/rightAction'


import { Layout, Menu, Table,Icon,Modal,Tooltip,Badge,message,Checkbox,Row, Col,Drawer,Spin,Popconfirm } from 'antd';

const { Header, Content } = Layout;







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
          <li className="me001ln">Create User</li>
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
      typedata:null,
      showhide:'Hide'
    }
  }


  componentDidMount(){
    this.props.dispatch(loadParent())
    this.props.dispatch(loadMenu('0'))
    this.props.dispatch(loadMenuTree())
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

  saveData = (values) => {

    this.props.dispatch(MenuSave(values)).then(() => {
    
      if (!this.props.menuSave.isRejected) {

         message.success('บันทึกข้อมูลเสร็จเรียบร้อย');
         this.props.dispatch(loadMenu('0'))
         this.props.dispatch(loadParent())
         this.props.dispatch(loadMenuTree())
         this.onClose()
         
      }else{
       
        Modal.error({
          title: 'ขออภัยค่ะ',
            content: this.props.menuSave.data,
          });
      }
  })

  }
  
  fileChangedHandler = (event) => {
    const file = event.target.files[0]
  }

  

fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
}


uploadHandler = () => {
  const formData = new FormData()
  formData.append('image', this.state.selectedFile, this.state.selectedFile.name)
  axios.post('http://localhost:3000/upload', formData).then(res=>console.log(res))
}

onSelect = () => {
  console.log('Trigger Select');
};

onExpand = () => {
  console.log('Trigger Expand');
};

addData = (id,typedata,type) => {
  this.setState({titleform: type, id:id,typedata:typedata})
  this.showDrawer()
  this.props.dispatch(loadMenuEdit(id))
}

confirm = (id) => {
  
let obj = {
  Id:id
}
console.log(obj)
  this.props.dispatch(MenuDelele(obj)).then(() => {
    
    if (!this.props.menuDel.isRejected) {

       message.success('ลบข้อมูลเสร็จเรียบร้อย');
       this.props.dispatch(loadMenu('0'))
       this.props.dispatch(loadParent())
       this.props.dispatch(loadMenuTree())
       this.onClose()
       
    }else{
     
      Modal.error({
        title: 'ขออภัยค่ะ',
          content: this.props.menuDel.data,
        });
    }
})

}

ShowHideMenu = (type) => {
  this.setState({showhide:type})
}


    render() {

      const columns = [{
        title: 'ชื่อเมนูไทย',
        dataIndex: 'Name',
        key: 'Name',
        width: '32%',
      },{
        title: 'ชื่อเมนูอังกฤษ',
        dataIndex: 'NameEn',
        key: 'NameEn',
        width: '32%',
      },{
        title: 'ลิ้ง',
        dataIndex: 'Link',
        key: 'Link',
        width: '12%',
      },{
        title: 'JournalType',
        dataIndex: 'JournalType',
        key: 'JournalType',
        width: '12%',
      }, {
        title: 'Action',
        width: '12%',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={()=>this.addData(record.key,'New','เพิ่มข้อมูล')}><Tooltip placement="left" title="เพิ่มเมนู"><Icon type="plus-circle" theme="outlined" style={{fontSize:24, color:'#04b82a'}}  /></Tooltip></a>
            <a href="javascript:;" onClick={()=>this.addData(record.key,'Edit','แก้ไขข้อมูล')}><Tooltip placement="top" title="แก้ไข"><Icon type="edit" theme="outlined" style={{fontSize:24, color:'#a37105'}} /></Tooltip></a>
            
            <Popconfirm placement="topLeft" title="คุณต้องการลบข้อมูล ใช่หรือไม่" onConfirm={()=>this.confirm(record.key)} okText="Yes" cancelText="No">
            <a href="javascript:;"><Tooltip placement="right" title="ลบ"><Icon type="delete" theme="outlined" style={{fontSize:24, color:'#605f5f'}} /></Tooltip></a>
           </Popconfirm>
          </span>
        )
      }];
      
      
      
      // rowSelection objects indicates the need for row selection
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        },
      };

     const { menuParent,menuList,menuTree } = this.props

     const { data,isRejected,isLoading } = menuParent
     const { dataMenu,isRejectedMenu,isLoadingMenu } = menuList
     const { dataMenuTree,isRejectedMenuTree,isLoadingMenuTree } = menuTree

     const { menustep,menuseleted,menudata,Count,titleform,visible,id,typedata,showhide } = this.state
     
  
    

     // กำหนดรูปแบบการทำงาน Action ฝั่งขวามือ
      const rightMenu = {
        data:[
            {name:'file-add',text:'เพิ่ม',cssName:''},
            {name:'save',text:'บันทึก',cssName:'ac'},
            {name:'printer',text:'พิมพ์',cssName:''},
            {name:'dislike',text:'ไม่ผ่าน',cssName:''},
            {name:'copy',text:'คัดลอก',cssName:''},
            {name:'delete',text:'ลบ',cssName:''}
          ]
      }

     

        if (isRejected || isRejectedMenu || isRejectedMenuTree) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        
        if (isLoading || isLoadingMenu || isLoadingMenuTree || !data || !dataMenu || !dataMenuTree) {
            return <div className="example"><Spin size="large" /></div>
        }

        

        return (
            


<Layout>
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
      
    </Header>
    <Content style={{ padding: '0 0px', marginTop: 38, minHeight: this.props.windowHeight-40 }} onClick={()=>this.closeMenu()} >
    
    {menustep==='12' ? <MenuNotifi /> : ''}
    {menustep==='13' ? <MenuSetting openMenu={this.showDrawer} /> : ''}
    {menustep===menuseleted ? <MenuGen MenuDataList={menudata} Count={Count} /> : ''}
    
    <div className={showhide==='Show' ? 'content_left_ac':'content_left'} style={{minHeight:this.props.windowHeight-40}}>
    <div style={{ background: '#f0f2f5', padding: 0, minHeight: 380 }}>
      <div className="content_left_head">จัดการเมนู</div>
      
      
      <Table size="small"  columns={columns} rowSelection={rowSelection} pagination={{ position: 'none', pageSize:'50' }} dataSource={dataMenuTree.Data} scroll={{ y: this.props.windowHeight-130 }} />

      

      <Drawer
          title={titleform}
          width={550}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <FormMenu btnClose={this.onClose} dataList={data} saveData={this.saveData} id={id} typedata={typedata} />
        </Drawer>

        
      
      </div>
    </div>
    <div className={showhide==='Show' ? 'content_right_ac':'content_right'}>
   
          <RightAction actionData={this.addData} type={rightMenu.data} ShowHideMenu={this.ShowHideMenu} btnLR={showhide}  />

          

    </div>

      
    </Content>
    
  </Layout>

        ) 
    }
}

function mapStateToProps(state) {
  return {
    menuParent : state.menuReducer.menuParent,
    menuList : state.menuReducer.menuList,
    menuSave: state.menuReducer.menuSave,
    menuTree: state.menuReducer.menuTree,
    menuEdit: state.menuReducer.menuEdit,
    menuDel: state.menuReducer.menuDel,
  }
}

export default windowSize(connect(mapStateToProps)(Home))
