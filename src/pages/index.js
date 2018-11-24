import React,{ Component } from 'react'
import { connect } from 'react-redux'

import windowSize from 'react-window-size'
import axios from 'axios'
import { Link } from 'react-router'
import { loadParent,MenuSave,MenuDelele,loadMenu,loadMenuEdit,loadMenuTree } from '../actions/menuAction'

import MenuTop from '../components/menu/menutop'
import FormMenu from '../components/menu/form'
import HeaderList from '../components/header'

/* layout */
import RightAction from '../components/layout/rightAction'
import FormPO from '../components/purchase/po'
import ListPO from '../components/purchase/list'


import { DatePicker,Button,Layout,Select,Table, Menu, Form,Input,Icon,Modal,Tooltip,Badge,message,Checkbox,Row, Col,Drawer,Spin,Popconfirm } from 'antd';

const { Header, Content } = Layout;

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


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
      showhide:'Hide',
      ac_tab_footer:'tab2'
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


ShowTabFooter = (tab) => {
  this.setState({ac_tab_footer:tab})
}


deleteArray = () => {
  //dataSource3.splice(1)
  //console.log('xxxx')
  alert('ccc')
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
      
      
      
      

     const { menuParent,menuList,menuTree } = this.props

     const { data,isRejected,isLoading } = menuParent
     const { dataMenu,isRejectedMenu,isLoadingMenu } = menuList
     const { dataMenuTree,isRejectedMenuTree,isLoadingMenuTree } = menuTree

     const { titleform,visible,id,typedata,showhide,ac_tab_footer } = this.state
     


    
    
    
    

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
        <HeaderList menu={this.state} dataMenu={dataMenu} />
    </Header>
    <Content style={{ padding: '0 0px', marginTop: 50, minHeight: this.props.windowHeight-55 }} onClick={()=>this.closeMenu()} >
    <div className={showhide==='Show' ? 'content_left_ac':'content_left'} style={{minHeight:this.props.windowHeight-55}}>
    <div style={{ background: '#f0f2f5', padding: 0, minHeight: 380,width:'100%' }}>
      <div className="content_left_head">
          <div className="content_left_head_left">
              <div className="list_head_top">
              <span style={{paddingLeft:10,paddingRight:10}} >
              {ac_tab_footer==='tab1' ? 'ใบสั่งซื้อ':'ใบสั่งซื้อ ( POR#YY""MM""#### )'}
             
              </span>
             
              </div>
          </div>
          
          {1===2 ? 
          (
            
            <div className="content_left_head_right">
            <div className="content_left_head_right_left">
            <div>
              <span className="head_po">ใบสั่งซื้อ</span>
              <span className="code_po">POR#YY""MM""####</span>
              </div>
            </div>
            <div className="content_left_head_right_right">
            <div className="po_read">READY</div>
                
            </div>
             
          </div>
         
          )
           : ''}
          
      </div>


      <div className="contentbody" style={{height: this.props.windowHeight-145}}>

        {ac_tab_footer==='tab2' ? <FormPO deleteArray={this.deleteArray} />:''}
         {ac_tab_footer==='tab1' ? <ListPO />:''}
      </div>
  
      <div className="footerpage">
            <div className="content_left_footer_left">
          <div className={ac_tab_footer==='tab1' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab1')}><Icon type="bars" theme="outlined" style={{fontSize:22}} /> รายการ</div>
          <div className={ac_tab_footer==='tab2' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab2')}><Icon type="file-protect" theme="outlined" style={{fontSize:22}} /> PO</div>
          <div className={ac_tab_footer==='tab3' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab3')}><Icon type="car" theme="outlined" style={{fontSize:22}} /> การจัดส่ง</div>
          <div className={ac_tab_footer==='tab4' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab4')}><Icon type="file-text" theme="outlined" style={{fontSize:22}} /> จัดสรร</div>
          </div>
     </div>
      

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

const HomeComponent = Form.create()(Home);
export default windowSize(connect(mapStateToProps)(HomeComponent))
