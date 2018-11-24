import React,{ Component } from 'react'
import { connect } from 'react-redux'

import windowSize from 'react-window-size'
import axios from 'axios'
import { Link } from 'react-router'
import { loadParent,MenuSave,MenuDelele,loadMenu,loadMenuEdit,loadMenuTree } from '../actions/menuAction'

/* layout */
import RightAction from '../components/layout/rightAction'
import FormPO from '../components/purchase/po'
import ListPO from '../components/purchase/list'


import { Form,Icon,Modal,message,Spin } from 'antd';



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
    this.props.dispatch(loadMenuTree())
      /*
    this.props.dispatch(loadParent())
    this.props.dispatch(loadMenu('0'))
    this.props.dispatch(loadMenuTree())
    */
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
  
  

addData = (id,typedata,type) => {
  this.setState({titleform: type, id:id,typedata:typedata})
  this.showDrawer()
  this.props.dispatch(loadMenuEdit(id))
}

confirm = (id) => {
  
let obj = {
  Id:id
}
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
      const { menuTree } = this.props
      const { dataMenuTree,isRejectedMenuTree,isLoadingMenuTree } = menuTree
      
         if (isRejectedMenuTree) {
             return <div className="alert alert-danger">Error: {dataMenuTree}</div>
         }
         
         if (isLoadingMenuTree || !dataMenuTree) {
             return <div className="example"><Spin size="large" /></div>
         }
     
      
        return (
            

<div>
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
      

    
      </div>
    </div>
    <div className={showhide==='Show' ? 'content_right_ac':'content_right'}>
          <RightAction actionData={this.addData} type={rightMenu.data} ShowHideMenu={this.ShowHideMenu} btnLR={showhide}  />
    </div>
    </div>

        ) 
    }
}

function mapStateToProps(state) {
  return {
    menuTree: state.menuReducer.menuTree,
    menuSave: state.menuReducer.menuSave,
    menuEdit: state.menuReducer.menuEdit,
    menuDel: state.menuReducer.menuDel,
  }
}

const HomeComponent = Form.create()(Home);
export default windowSize(connect(mapStateToProps)(HomeComponent))
