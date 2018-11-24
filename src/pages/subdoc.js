import React,{ Component } from 'react'
import { connect } from 'react-redux'

import windowSize from 'react-window-size'

import { SubDocSave,loadSubDoc,loadSubDocEdit,loadSubDocType,SubDocDelele } from '../actions/subdocAction'

/* layout */
import RightAction from '../components/layout/rightAction'
import FormPO from '../components/subdoc/form'
import ListPO from '../components/subdoc/list'

import { Select,Radio,Icon,Modal, Form,Input,message,Row, Col,Spin } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;



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
      titleform:'เพิ่มข้อมูล',
      Count:0,
      id:0,
      typedata:'New',
      showhide:'Hide',
      ac_tab_footer:'tab1'
    }
  }


  componentDidMount(){
    this.props.dispatch(loadSubDoc())
    this.props.dispatch(loadSubDocType())
    this.props.dispatch(loadSubDocEdit('0'))
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
/*
  closeMenu = () => {
    this.setState({
      menuseleted:null,
      menustep:'0'
    })
  }
*/
  saveData = (values) => {
    this.props.dispatch(SubDocSave(values)).then(() => {
    
      if (!this.props.subdocSave.isRejected) {
         //message.success('บันทึกข้อมูลเสร็จเรียบร้อย');
         Modal.success({
          title: 'สำเร็จ',
            content: 'บันทึกข้อมูลเสร็จเรียบร้อย',
          });
         this.props.form.resetFields();
         this.ShowTabFooter('tab1')
         this.props.dispatch(loadSubDoc())
      }else{
        Modal.error({
          title: 'ขออภัยค่ะ',
            content: this.props.subdocSave.data,
          });
      }
  })

  }


  handleSubmit = (e,type) => {
    if(type==='file-add'){
      this.setState({titleform: 'เพิ่มข้อมูล', id:0,typedata:'New',ac_tab_footer:'tab2'})
      this.props.form.resetFields();
    }
    //e.preventDefault();
    if(type==='save'){
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if(this.state.typedata==='New'){
            // กรณีเพิ่มใหม่
            this.saveData({...values,Id:'New'})
          }else{
            // กรณีแก้ไข
            this.saveData({...values,Id:`${this.state.id}`})
          }
        }
      });
    }
    
  }
  
  

editData = (id,typedata,type) => {
  this.setState({titleform: type, id:id,typedata:typedata,ac_tab_footer:'tab2'})
  this.props.dispatch(loadSubDocEdit(id))
}

/** ลบข้อมูล */
confirm = (id) => {
  
let obj = {
  Id:id
}
  this.props.dispatch(SubDocDelele(obj)).then(() => {
    
    if (!this.props.subdocDel.isRejected) {

      Modal.success({
        title: 'สำเร็จ',
          content: 'ลบข้อมูลเสร็จเรียบร้อย',
        });
       this.ShowTabFooter('tab1')
       this.props.dispatch(loadSubDoc())
       
    }else{
     
      Modal.error({
        title: 'ขออภัยค่ะ',
          content: this.props.subdocDel.data,
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



    render() {

      
      
      


     const { titleform,visible,id,typedata,showhide,ac_tab_footer } = this.state
     const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const formItemLayout3 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const { getFieldDecorator } = this.props.form;



     // กำหนดรูปแบบการทำงาน Action ฝั่งขวามือ
      const rightMenu = {
        data:[
          {name:'file-add',text:'เพิ่มใหม่',cssName:''},
          {name:'save',text:'บันทึก',cssName:''}
          ]
      }
      const { subdoctypeList,subdocList,subdocEdit } = this.props
      const { data,isRejected,isLoading } = subdoctypeList
      const { dataSubdoc,isRejectedSubdoc,isLoadingSubdoc } = subdocList
      const { dataEdit,isRejectedEdit,isLoadingEdit } = subdocEdit


      
      
         if (isRejected || isRejectedSubdoc || isRejectedEdit) {
             return <div className="alert alert-danger">Error: {data}</div>
         }
         
         if (isLoading || isLoadingSubdoc || isLoadingEdit || !data || !dataSubdoc || !dataEdit) {
             return <div className="example"><Spin size="large" /></div>
         }


         let dataAll = null
        if(typedata==='New'){
            dataAll = {
              AutoRunPattern: "",
              AutoRunType: '',
              Description: "",
              FKMenuId: 11,
              Id: "New",
              IsRekey: true,
              Name: "",
              NameEn: "",
              Status: 1
            }
        }else{
          dataAll = {
            AutoRunPattern: dataEdit.Data.AutoRunPattern.toString(),
              AutoRunType: dataEdit.Data.AutoRunType,
              Description: dataEdit.Data.Description.toString(),
              FKMenuId: dataEdit.Data.FKMenuId,
              Id: "New",
              IsRekey: dataEdit.Data.IsRekey,
              Name: dataEdit.Data.Name.toString(),
              NameEn: dataEdit.Data.NameEn.toString(),
              Status: dataEdit.Data.Status
          }
        }
      
        return (
            

<div>
    <div className={showhide==='Show' ? 'content_left_ac':'content_left'} style={{minHeight:this.props.windowHeight-55}}>
    <div style={{ background: '#f0f2f5', padding: 0, minHeight: 380,width:'100%' }}>
      <div className="content_left_head">
          <div className="content_left_head_left">
              <div className="list_head_top">
              <span style={{paddingLeft:10,paddingRight:10}} >
              {ac_tab_footer==='tab1' ? 'SubDoc':`${titleform} SubDoc`}
             
              </span>
             
              </div>
          </div>
        
          
      </div>


      <div className="contentbody" style={{height: this.props.windowHeight-145}}>

        {ac_tab_footer==='tab2' ? 
        (
          <Form onSubmit={this.handleSubmit}>
          <Row>
<Col span={16}>
<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="ชื่อภาษาไทย"
hasFeedback
>
{getFieldDecorator('Name', {
initialValue:dataAll.Name,
rules: [{
required: true, message: 'กรุณาป้อนชื่อภาษาไทย',
}],
})(
<Input  />
)}
</FormItem>
</Col>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="ชื่อภาษาอังกฤษ"
hasFeedback
>
{getFieldDecorator('NameEn', {
initialValue:dataAll.NameEn,
rules: [{
required: true, message: 'กรุณาป้อนชื่อภาษาอังกฤษ',
}],
})(
<Input  />
)}
</FormItem>
</Col>

</Row>

<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="หมวดเมนู"
hasFeedback
>
{getFieldDecorator('FKMenuId', {
  initialValue:dataAll.FKMenuId,
  rules: [{
    required: true, message: 'กรุณาเลือกหมวดเมนู',
  }],
})(
  <Select 
showSearch
style={{ width: '100%' }}
placeholder="กรุณาเลือกหมวดหมู่เมนู"
optionFilterProp="children"
onChange={this.handleChange}
onFocus={this.handleFocus}
filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>

    {data.Data && data.Data.map(e => {
                  return (
                      <Option key={e.Id} value={e.Id}>{e.Name}</Option>
                  )
              })}
</Select>
)}
</FormItem>

</Col>
<Col span={12}>


</Col>


</Row>

<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="AutoRunPattern"
hasFeedback
>
{getFieldDecorator('AutoRunPattern', {
initialValue:dataAll.AutoRunPattern,
rules: [{
required: true, message: 'กรุณาป้อน AutoRunPattern',
}],
})(
<Input  />
)}
</FormItem>
</Col>
</Row>

<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="AutoRunType"
hasFeedback
>
{getFieldDecorator('AutoRunType', {
  initialValue:dataAll.AutoRunType,
  rules: [{
    required: true, message: 'กรุณาเลือกหมวดหมู่เมนู',
  }],
})(
  <Select placeholder="เลือกประเภทเอกสาร">

    
                      <Option key="A1" value={1}>ตามสมุดรายวัน</Option>
                      <Option key="A2" value={2}>ตามเอกสารทำรายการ</Option>
                      <Option key="A3" value={3}>แยกกัน</Option>
               
</Select>
)}
</FormItem>
</Col>

<Col span={12}>



</Col>


</Row>

<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="IsReKey"

>
{getFieldDecorator('IsRekey', {
initialValue:dataAll.IsRekey,
rules: [{
required: true, message: 'กรุณาป้อนรูปแบบการรันเอกสาร',
}],
})(
<RadioGroup >
<Radio value={true}>ใส่เลขเองได้</Radio>
<Radio value={false}>ให้ระบบออกให้</Radio>
</RadioGroup>
)}
</FormItem>
</Col>

<Col span={12}></Col>

</Row>
<Row>
<Col span={24}>
<FormItem
{...formItemLayout3}
label="รายละเอียด"
hasFeedback
>
{getFieldDecorator('Description', {
initialValue:dataAll.Description,
rules: [{
required: true, message: 'กรุณาป้อนรายละเอียด',
}],
})(
<Input  />
)}
</FormItem>
</Col>

</Row>
<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="สถานะ"

>
{getFieldDecorator('Status', {
initialValue:dataAll.Status,
rules: [{
required: true, message: 'กรุณาป้อนรูปแบบการรันเอกสาร',
}],
})(
<RadioGroup >
<Radio value={1}>ใช้งาน</Radio>
<Radio value={-3}>ไม่ใช้งาน</Radio>
</RadioGroup>
)}
</FormItem>
</Col>
</Row>


</Col>
<Col span={1}></Col>
<Col span={7}>

</Col>
</Row>
</Form>
        )
        :''}
         {ac_tab_footer==='tab1' ? <ListPO data={dataSubdoc.Data} deleteData={this.confirm} editData={this.editData} />:''}
      </div>
  
      <div className="footerpage">
            <div className="content_left_footer_left">
            
          <div className={ac_tab_footer==='tab1' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab1')}><Icon type="bars" theme="outlined" style={{fontSize:22}} /> รายการ</div>
          <div className={ac_tab_footer==='tab2' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab2')}><Icon type="file-protect" theme="outlined" style={{fontSize:22}} /> ฟอร์ม</div>
          </div>
     </div>
      </div>
    </div>
    <div className={showhide==='Show' ? 'content_right_ac':'content_right'}>
          <RightAction actionData={this.handleSubmit} type={rightMenu.data} ShowHideMenu={this.ShowHideMenu} btnLR={showhide}  />
    </div>
    </div>

        ) 
    }
}

function mapStateToProps(state) {
  return {
    subdocSave: state.subdocReducer.subdocSave,
    subdocList: state.subdocReducer.subdocList,
    subdocEdit: state.subdocReducer.subdocEdit,
    subdoctypeList: state.subdocReducer.subdoctypeList,
    subdocDel:state.subdocReducer.subdocDel
  }
}

const HomeComponent = Form.create()(Home);
export default windowSize(connect(mapStateToProps)(HomeComponent))
