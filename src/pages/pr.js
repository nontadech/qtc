import React,{ Component } from 'react'
import { connect } from 'react-redux'

import windowSize from 'react-window-size'

import { PRSave,loadSubDoc,loadPR,loadCostCenter,loadPREdit,loadItem,loadUser,loadUnit } from '../actions/prAction'

/* layout */
import RightAction from '../components/layout/rightAction'
import ListPO from '../components/pr/list'

import { DatePicker,Select,Radio,Icon,Modal, Form,Input,message,Row, Col,Spin,TreeSelect, Button } from 'antd';


import locale from 'antd/lib/date-picker/locale/th_TH';
import debounce from 'lodash/debounce';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class CategoryBox extends Component {
  handleChange =(value)=> {
      this.props.checkType(value,this.props.RowId)
  }
  render(){
    return(
      <Select  style={{width:'100%'}} showArrow={false}  onChange={(e)=>this.handleChange(e)}>
      <Option value={1}>อื่นๆ</Option>
      <Option value={2}>เครื่องมือ</Option>
      <Option value={3}>สินทรัพย์/เครื่องจักร</Option>
      <Option value={4}>วัสดุ</Option>
      <Option value={5}>ค่าแรง</Option>
      <Option value={6}>เช่าเครื่องจักร</Option>
      <Option value={7}>หมายเหตุ</Option>
    </Select>
    )
  }
}

class ListItems extends Component {

  constructor(props) {
    super(props);

  this.lastFetchId = 0;
  this.fetchUser = debounce(this.fetchUser, 300);

    this.state = {
      
      valueCode: [],
      fetching: false,
      dataCode:[]
    }
  }


fetchUser = (value) => {
  //if(value){
    this.lastFetchId += 1;
  const fetchId = this.lastFetchId;
  this.setState({ dataCode: [], fetching: true });
  fetch('http://apiqtc.pasexpert.com/api/pr/GetItem?Find='+value)
    .then(response => response.json())
    .then((body) => {
      if (fetchId !== this.lastFetchId) { // for fetch callback order
        return;
      }
      
      const data = body.Data.map(r => ({
        text: `${r.Code} ${r.Name}`,
        value: `${r.Id}-${r.Name}-${r.FairPrice}-${r.UnitName}-${r.FKDefaultunit}`,
      }));
      this.setState({ dataCode:data, fetching: false });
      
    });
  //}
}

handleChange = (value) => {
  let newdata = {
    label:value.label.split(' ')[0],
    key:value.key
  }
  this.setState({
    valueCode:newdata,
    dataCode: [],
    fetching: false
  });
  this.props.SumToTal(this.props.RowId,value.key)
}


  render(){

    const {valueCode,dataCode,fetching } = this.state
      return(
        <Select
          showSearch
          showArrow={false}
          labelInValue
          value={valueCode}
          placeholder="ค้นหา สินค้า"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          onFocus={this.fetchUser}
          style={{ width: '100%' }}
        >
          {dataCode.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
      )

  }
}


class ListUnit extends Component {

  constructor(props) {
    super(props);

  this.lastFetchId = 0;
  this.fetchUser = debounce(this.fetchUser, 300);

    this.state = {
      
      valueCode: [],
      fetching: false,
      dataCode:[]
    }
  }


fetchUser = (value) => {
  //if(value){
    this.lastFetchId += 1;
  const fetchId = this.lastFetchId;
  this.setState({ dataCode: [], fetching: true });
  fetch('http://apiqtc.pasexpert.com/api/pr/GetUnit?Find='+value)
    .then(response => response.json())
    .then((body) => {
      if (fetchId !== this.lastFetchId) { // for fetch callback order
        return;
      }
      
      const data = body.Data.map(r => ({
        text: `${r.Name}`,
        value: `${r.Id}-${r.Code}`,
      }));
      this.setState({ dataCode:data, fetching: false });
      
    });
  //}
}

handleChange = (value) => {
  let newdata = {
    label:value.label.split(' ')[0],
    key:value.key
  }
  this.setState({
    valueCode:newdata,
    dataCode: [],
    fetching: false
  });
  //this.props.SumToTal(this.props.RowId,value.key)
}


  render(){

    const {valueCode,dataCode,fetching } = this.state
    const {title} = this.props
      return(
        <Select
          showSearch
          showArrow={false}
          labelInValue
          value={valueCode}
          placeholder={title}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          onFocus={this.fetchUser}
          style={{ width: '100%' }}
        >
          {dataCode.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
      )

  }
}


class PR extends Component {

  constructor(props) {
    super(props);

  this.lastFetchId = 0;
  this.fetchUser = debounce(this.fetchUser, 300);

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
      ac_tab_footer:'tab1',
      DocumentDate:null,
      DeliveryDate:null,
      dataCode: [],
      valueCode: [],
      fetching: false,
      value:[],
      valueselect:'',
      CodeCenterCode:null,
      FKCostCenter:null,
      FKUser:null,
      DataItem:[],
      DataItemSelect:[],
      Title:null,
      RowSum:1
    }
  }


onChange = (value,b,vprops) => {
    const { triggerNode } = vprops
    const { props } = triggerNode
    let data = {
      key:props.eventKey,
      label:props.Code
    }
    this.setState({ 
      value,valueCode:data,
      CodeCenterCode:props.Code,
      FKCostCenter:props.eventKey
    });
  }

fetchUser = (value) => {
  if(value){
    this.lastFetchId += 1;
  const fetchId = this.lastFetchId;
  this.setState({ dataCode: [], fetching: true });
  fetch('http://apiqtc.pasexpert.com/api/pr/GetCostCenterBy?Find='+value)
    .then(response => response.json())
    .then((body) => {
      if (fetchId !== this.lastFetchId) { // for fetch callback order
        return;
      }
      
      const data = body.Data.map(r => ({
        text: `${r.Code}`,
        value: `${r.Id}-${r.Name}`,
      }));
      this.setState({ dataCode:data, fetching: false });
      
    });
  }
}

handleChange = (value) => {
  this.setState({
    valueCode:value,
    dataCode: [],
    value:value.key.split('-')[1],
    fetching: false,
    CodeCenterCode:value.label,
    FKCostCenter:value.key.split('-')[0]
  });
}

handleChangeUser = (valus) => {
  this.setState({FKUser:valus})
}

  componentDidMount(){
    this.props.dispatch(loadSubDoc(this.props.routeParams.id))
    this.props.dispatch(loadPR())
    this.props.dispatch(loadCostCenter())
    this.props.dispatch(loadUser())
    this.props.dispatch(loadItem())
    // อ่านค่า Id subdoc จาก URL
   
    
    const Title = new URLSearchParams(this.props.location.search).get('Title')
    this.setState({Title})

    for(let i=1;i<=5;i++){

      this.setState(prevState => ({
        DataItem: [...prevState.DataItem, { 
          RowId:`ROWID${i}`,
          No:i,
          Type:1,
          UnitName:'',
          FKItem:'',
          Description:'',
          FKUnit:'',
          WantQty:'',
          PriceUnit:'',
          PriceAmount:'',
          Memo:''
        }]
      }))
    }
    
  }


onChangeDate =(date, dateString) => {
  this.setState({DocumentDate:dateString})
}
onChangeDateDelivery =(date, dateString) => {
  this.setState({DeliveryDate:dateString})
}

  saveData = (values) => {
   
    this.props.dispatch(PRSave(values)).then(() => {
      if (!this.props.prSave.isRejected) {
         //message.success('บันทึกข้อมูลเสร็จเรียบร้อย');
         Modal.success({
          title: 'สำเร็จ',
            content: 'บันทึกข้อมูลเสร็จเรียบร้อย',
          });
         this.props.form.resetFields();
         this.ShowTabFooter('tab1')
         this.props.dispatch(loadPR())
      }else{
        Modal.error({
          title: 'ขออภัยค่ะ',
            content: this.props.prSave.data,
          });
          this.props.form.resetFields();
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
      
      const total = this.state.DataItemSelect.reduce((prev,next) => prev + next.PriceAmount,0);
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if(this.state.typedata==='New'){
            // กรณีเพิ่มใหม่
            this.saveData({Id:'New',
            FKSubDocType:parseFloat(this.props.routeParams.id),
            DocumentDate:this.state.DocumentDate,
            DeliveryDate:this.state.DeliveryDate,
            CodeCenterCode:this.state.CodeCenterCode,
            FKCostCenter:parseFloat(this.state.FKCostCenter),
            FKUser:parseFloat(this.state.FKUser),
            CreateBy:'Admin',
            CreateById:1,
            Status:1,
            PriceAmount:parseFloat(total),
            PRItem:this.state.DataItemSelect
          })
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
  this.props.dispatch(loadPREdit(id))
}


ShowHideMenu = (type) => {
  this.setState({showhide:type})
}


ShowTabFooter = (tab) => {
  this.setState({ac_tab_footer:tab})
}

getItems =(e,Id)=>{
  e.preventDefault();
  const odds = this[`IdNumber${Id}`].value
}

SumToTal = (RowId,Html) => {
  this[`IdName${RowId}`].value = Html.split('-')[1]
  this[`IdUnit${RowId}`].value = Html.split('-')[3]
  this[`IdTotal${RowId}`].value = 1


  const SumTotal = parseFloat(Html.split('-')[2])*1

  // ตัวแปรเอาไว้คำนวน
  this[`IdPrice${RowId}`].value = SumTotal
  this[`IdSumTotal${RowId}`].value = SumTotal

  // ตัวแปรเอาไว้แสดงผล
  //this[`HtmlPrice${RowId}`].innerHTML = SumTotal.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
  this[`HtmlSumTotal${RowId}`].innerHTML = SumTotal.toLocaleString(navigator.language, { minimumFractionDigits: 0 })

  //FKDefaultunit
  let PRItem = {
    RowId:`ROWID${RowId}`,
    Type:1,
    FKItem:Html.split('-')[0],
    Description:Html.split('-')[1],
    FKUnit:Html.split('-')[4],
    WantQty:1,
    PriceUnit:SumTotal,
    PriceAmount:SumTotal,
    Memo:'',
    ReceivingDate:''
  }

  var RowIdCH = `ROWID${RowId}`
  var arrDataItemBank = this.state.DataItem

  //ค้นหาแถวที่ต้องการแก้ไขข้อมูล   
  // Update หน่วย
  let objIndexBank = arrDataItemBank.findIndex((obj => obj.RowId === RowIdCH));
  if(objIndex!==-1)
  {
      //อับเดทจำนวน และ ราคารวม
      arrDataItemBank[objIndexBank].UnitName = Html.split('-')[3]
      // อับเดท State
      this.setState({DataItem:arrDataItemBank})
  }

  var arrDataItem = this.state.DataItemSelect

  //ค้นหาแถวที่ต้องการแก้ไขข้อมูล   
  let objIndex = arrDataItem.findIndex((obj => obj.RowId === RowIdCH));

  if(objIndex!==-1)
  {
      //อับเดทจำนวน และ ราคารวม
      arrDataItem[objIndex].FKItem = parseFloat(Html.split('-')[0])
      arrDataItem[objIndex].Description = Html.split('-')[1]
      arrDataItem[objIndex].PriceUnit = SumTotal
      arrDataItem[objIndex].FKUnit = parseFloat(Html.split('-')[4])
      arrDataItem[objIndex].WantQty = 1
      arrDataItem[objIndex].PriceAmount = SumTotal

      // อับเดท State
      this.setState({DataItemSelect:arrDataItem})
      // หาค่ายดรวมล่าสุด
      const total = arrDataItem.reduce((prev,next) => prev + next.PriceAmount,0);
      console.log(total);
      this[`HtmlSumTotal`].innerHTML = (total).toLocaleString(navigator.language, { minimumFractionDigits: 0 })

  }else{
      // เพิ่มรายการใหม่
      this.setState(prevState => ({
       DataItemSelect: [...prevState.DataItemSelect, PRItem]
      }))
      
      // หาค่ายดรวมล่าสุด
      var arrDataItemLast = this.state.DataItemSelect
      const total = arrDataItemLast.reduce((prev,next) => prev + next.PriceAmount,0);
      console.log(total+SumTotal);
      this[`HtmlSumTotal`].innerHTML = (total+SumTotal).toLocaleString(navigator.language, { minimumFractionDigits: 0 })
  }  
}

updatePrice =(RowId) => {
  
  const Total = parseFloat(this[`IdTotal${RowId}`].value)
  const Price = parseFloat(this[`IdPrice${RowId}`].value)
  this[`IdSumTotal${RowId}`].value = Total*Price
  this[`HtmlSumTotal${RowId}`].innerHTML = (Total*Price).toLocaleString(navigator.language, { minimumFractionDigits: 0 })
  




/** ลบค่า State เดิมออก  */
  var RowIdCH = `ROWID${RowId}`
  var arrDataItem = this.state.DataItemSelect



//ค้นหาแถวที่ต้องการแก้ไขข้อมูล   
let objIndex = arrDataItem.findIndex((obj => obj.RowId === RowIdCH));

//อับเดทจำนวน และ ราคารวม
arrDataItem[objIndex].WantQty = Total
arrDataItem[objIndex].PriceAmount = Total*Price

// อับเดท State
this.setState({DataItemSelect:arrDataItem})

  /*
  var index = arrDataItem.map(x => {
    return x.RowIdCH;
  }).indexOf(RowIdCH);
  arrDataItem.splice(index, 1);
  
// อับเดท State ใหม่หลังจากลบออก
  this.setState({DataItemSelect:arrDataItem})
  
  */
  
  this.UpdateTotalGrand()
}

UpdateTotalGrand =()=> {
  var arrDataItem = this.state.DataItemSelect
  // คำนวนหาผลรวมทั้งหมดที่สั่งซื้อ
  const total = arrDataItem.reduce((prev,next) => prev + next.PriceAmount,0);
  console.log(total);
  
  this[`HtmlSumTotal`].innerHTML = (total).toLocaleString(navigator.language, { minimumFractionDigits: 0 })
}

checkType =(Type,RowId)=>{
  var RowIdCH = `ROWID${RowId}`
  var arrDataItemTam = this.state.DataItem

  //ค้นหาแถวที่ต้องการแก้ไขข้อมูล   
  let objIndexTam = arrDataItemTam.findIndex((obj => obj.RowId === RowIdCH));

  if(objIndexTam!==-1)
  {
      //อับเดทจำนวน และ ราคารวม
      arrDataItemTam[objIndexTam].Type = Type
      // อับเดท State
      this.setState({DataItem:arrDataItemTam})
  }

  let PRItem = {
    RowId:`ROWID${RowId}`,
    Type:Type,
    FKItem:'',
    Description:'',
    FKUnit:'',
    WantQty:'',
    PriceUnit:'',
    PriceAmount:'',
    Memo:'',
    ReceivingDate:''
  }

  var arrDataItem = this.state.DataItemSelect

  //ค้นหาแถวที่ต้องการแก้ไขข้อมูล   
  let objIndex = arrDataItem.findIndex((obj => obj.RowId === RowIdCH));

  
  if(objIndex!==-1)
  {
      //อับเดทจำนวน และ ราคารวม
      arrDataItem[objIndex].Type = Type
      arrDataItem[objIndex].FKItem = ''
      arrDataItem[objIndex].Description = ''
      arrDataItem[objIndex].PriceUnit = ''
      arrDataItem[objIndex].FKUnit = ''
      arrDataItem[objIndex].WantQty = ''
      arrDataItem[objIndex].PriceAmount = 0

      // เคลียค่าเก่าออก
      this[`IdName${RowId}`].value = ''
      this[`IdUnit${RowId}`].value = ''
      this[`IdTotal${RowId}`].value = ''
      this[`IdPrice${RowId}`].value = 0
      this[`IdSumTotal${RowId}`].value = 0
      //this[`HtmlPrice${RowId}`].innerHTML = ''
      this[`HtmlSumTotal${RowId}`].innerHTML = ''
  

      // อับเดท State
      this.setState({DataItemSelect:arrDataItem})

      // คำนวนหาผลรวมทั้งหมดที่สั่งซื้อ
      const total = arrDataItem.reduce((prev,next) => prev + next.PriceAmount,0);
      this[`HtmlSumTotal`].innerHTML = total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })

  }else{
      // เพิ่มรายการใหม่
      this.setState(prevState => ({
       DataItemSelect: [...prevState.DataItemSelect, PRItem]
      }))
   }

}

addRowItem =(e)=>{

  const total = parseFloat(this[`RowSum`].value)
  const totalItem = this.state.DataItem
  //alert(totalItem.length)
  const k = totalItem.length + total
  if(total>0)
  {
    for(let i=totalItem.length+1;i<=k;i++){

      this.setState(prevState => ({
        DataItem: [...prevState.DataItem, { 
          RowId:`ROWID${i}`,
          No:i,
          Type:1,
          UnitName:'',
          FKItem:'',
          Description:'',
          FKUnit:'',
          WantQty:'',
          PriceUnit:'',
          PriceAmount:'',
          Memo:''
        }]
      }))
    }
  }
  
  
}


delRowItem =(e)=>{

  let totalItem = this.state.DataItem
if(totalItem.length>1){
  totalItem.splice(-1,1)

  this.setState({DataItem:totalItem})
}
 
  
  
}

getValueRow =(e)=>{
  this.setState({RowSum:e.target.value})
}



    render() {

     const { titleform,visible,id,typedata,showhide,ac_tab_footer,fetching, dataCode, valueCode,value,Title } = this.state

     
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
      const { prList,costList,prEdit,userList,itemList,subdocList } = this.props
      const { dataList,isRejectedList,isLoadingList } = prList
      const { dataCost,isRejectedCost,isLoadingCost } = costList
      const { dataEdit,isRejectedEdit,isLoadingEdit } = prEdit
      const { dataUser,isRejectedUser,isLoadingUser } = userList
      const { dataItem,isRejectedItem,isLoadingItem } = itemList
      const { dataSubdoc,isRejectedSubdoc,isLoadingSubdoc } = subdocList


      
      
         if (isRejectedList || isRejectedCost || isRejectedUser || isRejectedItem || isRejectedSubdoc) {
             return <div className="alert alert-danger">Error: {dataList}</div>
         }
         
         if (isLoadingList || !dataList || isLoadingCost || !dataCost || !dataUser || isLoadingUser || isLoadingItem || !dataItem || !dataSubdoc || isLoadingSubdoc) {
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
              {ac_tab_footer==='tab1' ? Title:`${Title} (${dataSubdoc.Data.AutoRunPattern})`}
             
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
label="วันที่เอกสาร"
hasFeedback
>
<DatePicker locale={locale} onChange={this.onChangeDate}   />
</FormItem>
</Col>
</Row>

<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="กำหนดวันรับสินค้า"
hasFeedback
>
<DatePicker locale={locale} onChange={this.onChangeDateDelivery}   />
</FormItem>
</Col>
</Row>

<Row>
<Col span={24}>
<FormItem
{...formItemLayout3}
label="Cost Center"
hasFeedback
>
<Select
        showSearch
        labelInValue
        value={valueCode}
        placeholder="ป้อนรหัส"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        onFocus={this.fetchUser}
        style={{ width: '30%' }}
      >
        {dataCode.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>

      <TreeSelect
            showSearch
        style={{ width: '70%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={dataCost.Data}
        placeholder="เลือก CostCenter"
        treeDefaultExpandAll
        onChange={this.onChange}
      />


</FormItem>
</Col>




</Row>

<Row>
<Col span={24}>
<FormItem
{...formItemLayout3}
label="ผู้ขอซื้อ"
hasFeedback
>
<Select 
showSearch
style={{ width: '100%' }}
placeholder="กรุณาเลือก ผู้ขอซื้อ"
optionFilterProp="children"
onChange={this.handleChangeUser}
onFocus={this.handleFocus}
filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>

    {dataUser.Data && dataUser.Data.map(e => {
                  return (
                      <Option key={e.Id} value={e.Id}>{e.Name}</Option>
                  )
              })}
</Select>


</FormItem>
</Col>




</Row>

<Row>
<Col span={24}>
<FormItem
{...formItemLayout3}
label="ข้อมูลเพิ่มเติม"

>
{getFieldDecorator('Description', {
initialValue:dataAll.Description,
})(
<TextArea placeholder="" autosize={{ minRows: 2, maxRows: 3 }} />
)}
</FormItem>
</Col>

</Row>
<Row>
  <div style={{height:10}}></div>
</Row>
<Row>
<Col span={24}>
<FormItem
{...formItemLayout3}
label="รายการขอซื้อ"

>
<input type="text" ref={input => { this[`RowSum`] = input } } value={this.state.RowSum} onChange={(e)=>this.getValueRow(e)} className="inputItem2" style={{width:70}} /><Button type="dashed" style={{backgroundColor:'#21a258',color:'#ffffff',width:70}} onClick={(e)=>this.addRowItem(e)} >เพิ่มแถว</Button><Button type="dashed" style={{backgroundColor:'#c71e11',color:'#ffffff',width:70}} onClick={(e)=>this.delRowItem(e)} >ลบแถว</Button>
</FormItem>
</Col>

</Row>



</Col>
<Col span={1}></Col>
<Col span={7}>

</Col>
</Row>

<Row>

<table cellPadding="1" cellSpacing="1" className="tablename" id="table01">
<thead>
  <tr><th>No</th><th width="150">ประเภท</th><th width="150">รหัส</th><th width="350">รายการ</th><th width="100">หน่วย</th><th width="70">จำนวน</th><th>สั่งแล้ว</th><th>เบิกแล้ว</th><th width="80">ราคา/หน่อย</th><th width="90">จำนวนเงิน</th><th>หมายเหตุ</th><th>วันที่รับของ</th></tr>
  </thead>
  <tbody>
  {this.state.DataItem.map(r=>{
    return (
      
      <tr key={r.No} ><td>{r.No}</td><td><CategoryBox checkType={this.checkType} RowId={r.No} /></td><td>
        {r.Type===1 ? <input type="text" ref={input => { this[`IdTotalx${r.No}`] = input } } onChange={()=>this.updatePrice(r.No)}  className="inputItem" style={{width:'100%'}} />:<ListItems RowId={r.No} SumToTal={this.SumToTal} />}
        
        
        </td><td>
        <input type="hidden1" ref={input => { this[`IdName${r.No}`] = input } }   className="inputItem" style={{width:'100%'}} />
        </td><td>
        <input type="hidden" ref={input => { this[`IdUnit${r.No}`] = input } }  className="inputItem" />

        <ListUnit title={r.UnitName} />
          </td><td>
          <input type="hidden1" ref={input => { this[`IdTotal${r.No}`] = input } } onChange={()=>this.updatePrice(r.No)}  className="inputItem" style={{width:70}} />
            </td><td></td><td >
            
              </td><td style={{textAlign:'right'}}>
            
          <input type="hidden1" ref={input => { this[`IdPrice${r.No}`] = input } }  className="inputItem" style={{width:'100%',textAlign:'right'}} onChange={()=>this.updatePrice(r.No)} />
            </td><td style={{textAlign:'right'}}>
        <input type="hidden" ref={input => { this[`IdSumTotal${r.No}`] = input } }   className="inputItem" style={{width:100}} />
          <div ref={input => { this[`HtmlSumTotal${r.No}`] = input } }></div>
          </td><td></td><td></td>
          </tr>
     
    )
  })}
   </tbody>
  
</table>

<table cellPadding="1" cellSpacing="1" className="tablename" id="table01">
<thead>
  <tr><th width="80%" style={{textAlign:'right'}}>ยอดรวมสุทธิ</th><th width="20%" style={{textAlign:'right',paddingRight:10}} ref={input => { this[`HtmlSumTotal`] = input } }></th></tr>
  </thead>
  <tbody>
  
   </tbody>
  
</table>
</Row>
</Form>
        )
        :''}
         {ac_tab_footer==='tab1' ? <ListPO data={dataList.Data} dataCost={dataCost.Data} dataUser={dataUser.Data} dataItem={dataItem.Data} deleteData={this.confirm} editData={this.editData} />:''}
      </div>
  
      <div className="footerpage">
            <div className="content_left_footer_left">
            
          <div className={ac_tab_footer==='tab1' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab1')}><Icon type="bars" theme="outlined" style={{fontSize:22}} /> รายการ</div>
          <div className={ac_tab_footer==='tab2' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab2')}><Icon type="file-protect" theme="outlined" style={{fontSize:22}} /> PR</div>
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
    prSave: state.prReducer.prSave,
    prList: state.prReducer.prList,
    prEdit: state.prReducer.prEdit,
    subdocList: state.prReducer.subdocList,
    userList: state.prReducer.userList,
    itemList: state.prReducer.itemList,
    unitList: state.prReducer.unitList,
    costList: state.prReducer.costList,
    prDel:state.prReducer.prDel
  }
}

const HomeComponent = Form.create()(PR);
export default windowSize(connect(mapStateToProps)(HomeComponent))
