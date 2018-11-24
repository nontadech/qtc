import React, { Component } from 'react'

import { DatePicker,Button,Select,Table, Form,Input,Icon,Tooltip,Row, Col } from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

const dataSource3 = [{
  key: '1',
  category: '',
  codename: '',
  desc: '',
  qty: '',
  unit: '',
  unitprice: '',
  discount: '',
  amount: '',
  vat: '0'
  },
  {
    key: '5',
    category: '',
    codename: '',
    desc: '',
    qty: '',
    unit: '',
    unitprice: '',
    discount: '',
    amount: '',
    vat: '0'
  },{
    key: '6',
    category: '',
    codename: '',
    desc: '',
    qty: '',
    unit: '',
    unitprice: '',
    discount: '',
    amount: '',
    vat: '0'
  },
  {
    key: '7',
    category: '',
    codename: '',
    desc: '',
    qty: '',
    unit: '',
    unitprice: '',
    discount: '',
    amount: '',
    vat: '0'
  },{
    key: '8',
    category: '',
    codename: '',
    desc: '',
    qty: '',
    unit: '',
    unitprice: '',
    discount: '',
    amount: '',
    vat: '0'
  }];

class PO extends Component {

  deleteArray = () => {
    dataSource3.splice(1,1)
    //console.log('xxxx')
    //alert('ccc')
  }

  addnewArray = () => {
    dataSource3.push({
      key: dataSource3.length+20,
    category: '',
    codename: '',
    desc: '',
    qty: '',
    unit: '',
    unitprice: '',
    discount: '',
    amount: '',
    vat: '0'
    })
    //console.log('xxxx')
    //alert('ccc')
  }

  state = {
    dataAll:null
  }

        render(){
            
          const { deleteArray } = this.props
              
              const columns3 = [{
                title: 'ประเภท',
                dataIndex: 'category',
                key: 'category',
                render: (text, record) => (
                  <span style={{cursor:'pointer',width:'100%'}}>
                   {record.category}
                  </span>
                )
              }, {
                title: 'รหัส',
                dataIndex: 'codename',
                key: 'codename',
              }, {
                title: 'รายการ',
                dataIndex: 'desc',
                key: 'desc',
              }, {
                title: 'หน่วย',
                dataIndex: 'qty',
                key: 'qty',
              },{
                title: 'ปริมาณ',
                dataIndex: 'unit',
                key: 'unit',
              }, {
                title: 'รับแล้ว',
                dataIndex: 'unitprice',
                key: 'unitprice',
              }, {
                title: 'ราคาต่อหน่วย',
                dataIndex: 'discount',
                key: 'discount',
              }, {
                title: 'ส่วนลด',
                dataIndex: 'amount',
                key: 'amount',
              }, {
                title: 'จำนวนเงิน',
                dataIndex: 'vat',
                key: 'vat'
              }, {
                title: 'ลบ',
                width: '7%',
                render: (text, record) => (
                  <span>
                    <Icon type="delete" theme="outlined" onClick={()=>deleteArray()} style={{fontSize:24, color:'#605f5f',cursor:'pointer'}} />
                  </span>
                )
              }];

              const formItemLayout = null;
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

            return(
                <div>
                   <Form >
                    <Row>
      <Col span={16}>
     




  <Row>
      <Col span={12}>
      <FormItem
            label="วันที่เอกสาร"
            {...formItemLayout2}
          >
            <DatePicker placeholder='ป้อนวันที่' style={{width:140}} />
           
            
          </FormItem>
      </Col>
      <Col span={12}>
      
      </Col>
     
  </Row>

  <Row>
      <Col span={12}>
      <FormItem
            label="วันที่รับของ"
            {...formItemLayout2}
          >
            <DatePicker placeholder='ป้อนวันที่' style={{width:140}} />
          </FormItem>
      </Col>
      <Col span={12}>
      <FormItem
            label="ระยะเครดิต"
            {...formItemLayout2}
          >
         
    <Input placeholder='0' style={{ width:'25%'}}/>
 
<div className="percen7" style={{width:'15%',textAlign:'center'}}>วัน</div>
  
    <DatePicker placeholder='วันครบกำหนด' style={{width:'60%'}} />
  
           
            
            
          </FormItem>
      
      </Col>
      
      
  </Row>
  

         
          <Row>
      <Col span={12}><FormItem
            label="ผู้ขาย"
            {...formItemLayout2}
          >
            <Input placeholder="" style={{width:'90%'}} />
            
            
          </FormItem></Col>
          
      <Col span={12}>
          
      <FormItem
            label="ผู้ติดต่อ"
            {...formItemLayout2}
          >
            <Input placeholder="" />
          </FormItem>
          
          </Col>
          
      
    </Row>

     <Row>
      <Col span={12}><FormItem
            label="Cost Center"
            {...formItemLayout2}
          >
            <Input placeholder="" style={{width:'90%'}} />
            
          </FormItem></Col>
          
      <Col span={12}><FormItem
            label="ผู้สั่งซื้อ"
            {...formItemLayout2}
          >
            <Input placeholder="" style={{width:'100%'}} />
            
          </FormItem></Col>
          
    </Row>
    <Row>
      <Col span={24}><FormItem
            label="สถานที่ส่งของ"
            {...formItemLayout3}
          >
            <Input placeholder="" />
          </FormItem></Col>
         
    </Row>


</Col>
<Col span={1}></Col>
<Col span={7}>
<div style={{paddingLeft:20}}><strong>Retention</strong></div>
<div className="total_grand">

<FormItem
            label="จำนวนเงิน"
            {...formItemLayout2}
          >
    
            
            <Input placeholder=""  disabled style={{width:'70%',textAlign:'right',color:'#000'}} value="0.00" />
            <Input placeholder=""  disabled style={{width:'20%',textAlign:'right',color:'#000'}} value="0" />
            <div className="percen7" style={{width:'10%'}}>%</div>
          </FormItem>
          <FormItem
          {...formItemLayout2}
          label="หมายเหตุ"
        >
         
         <TextArea placeholder="" autosize={{ minRows: 3, maxRows: 6 }} />
         </FormItem>
         
         </div>

</Col>
</Row>
<Row>
<Col span={24}>

<Table dataSource={dataSource3} bordered columns={columns3} pagination={{ position: 'none', pageSize:'50' }} size="small" 
title={() => (
  <div>
    <div className="items_left"><strong>รายการสั้งซื้อ</strong> <Button type="dashed" ><Icon type="plus" theme="outlined" style={{color:'green',fontWeight:200}} />PR</Button> <Button type="dashed" disabled ><Icon type="plus" theme="outlined" />BOQ</Button> <Button type="dashed" style={{backgroundColor:'#05be31',color:'#fff'}} onClick={()=>this.addnewArray()} ><Icon type="plus-circle" theme="outlined" />เพิ่มแถว</Button> <Button type="dashed" style={{backgroundColor:'#0bb8cc',color:'#fff'}} ><Icon type="plus-circle" theme="outlined" />เพิ่มรายการ</Button>
    
  </div>
  <div className="items_right"><Button type="dashed" style={{backgroundColor:'green',color:'#fff'}} ><Icon type="dollar" theme="outlined" />ขอใบเสนอราคา</Button><Button type="dashed" style={{backgroundColor:'#ed4e07',color:'#fff'}} ><Icon type="dollar" theme="outlined" />ราคาล่าสุด</Button> <Button type="dashed" style={{backgroundColor:'#0bb8cc',color:'#fff'}} ><Icon type="dollar" theme="outlined" />ราคาล่าสุด Supplier</Button>
  </div>
  </div>
)}
/>
</Col>
</Row>
<Row>
<Col span={9}>
<div style={{height:12}}></div>
<div className="total_grand">
<FormItem
          {...formItemLayout}
          label="หมายเหตุ"
        >
         
         <TextArea placeholder="" autosize={{ minRows: 5, maxRows: 8 }} />
         </FormItem>
         
         </div>
</Col>
<Col span={15} >
<div style={{height:12}}></div>
<div className="total_grand">
<Row >
  <Col span={12}>
  <FormItem
            label="ยอดเงินรวม"
            {...formItemLayout2}
          >
    
            
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}} value="0.00" />
            <Button type="dashed" disabled style={{backgroundColor:'#f2f3f4',color:'#2f70bb',width:'20%'}} >>></Button>
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}} value="0.00" />
          </FormItem>
  </Col>
  <Col span={12}>
  <FormItem
            label="ประเภทภาษี"
            {...formItemLayout2}
          >
    
            
    <Select defaultValue="1" style={{width:'60%'}} >
      <Option value="1">ไม่รวม</Option>
      <Option value="Credit">รวม</Option>
      <Option value="Credit">ไม่มี</Option>
    </Select>
            
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}} value="7 %" />
          </FormItem>
  </Col>
</Row>
<Row>
  <Col span={12}>
  <FormItem
            label="ส่วนลด"
            {...formItemLayout2}
          >
    
            
            <Input placeholder=""  disabled style={{width:'50%',textAlign:'right',color:'#000'}} value="0.00" />
            
            <Input placeholder=""  disabled style={{width:'50%',textAlign:'right',color:'#000'}} value="0.00" />
          </FormItem>
  </Col>
  <Col span={12}>
  <FormItem
            label="ภาษีมูลค่าเพิ่ม"
            {...formItemLayout2}
          >
    
            
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}}  />
            <Button type="dashed" disabled style={{backgroundColor:'#f2f3f4',color:'#2f70bb',width:'20%'}} >>></Button>
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}}  />
          </FormItem>
  </Col>
</Row>

<Row>
  <Col span={12}>
  <FormItem
            label="ยอดเงินไม่รวมภาษี"
            {...formItemLayout2}
          >
    
            
            <Input placeholder="" style={{width:'100%',textAlign:'right',color:'#000'}}  />
            
            
          </FormItem>
  </Col>
  <Col span={12}>
  
  </Col>
</Row>
<Row>
  <Col span={12}>
  <FormItem
            label="มูลค่าสินค้า/บริการ"
            {...formItemLayout2}
          >
    
            
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}}  />
            <Button type="dashed" disabled style={{backgroundColor:'#f2f3f4',color:'#2f70bb',width:'20%'}} >>></Button>
            <Input placeholder=""  disabled style={{width:'40%',textAlign:'right',color:'#000'}}  />
          </FormItem>
  </Col>
  <Col span={12}>
  <FormItem
            label="ยอดสุทธิ"
            {...formItemLayout2}
          >
    
            
   
            
            <Input placeholder=""  disabled style={{width:'100%',textAlign:'right',color:'#000'}} value="0.00" />
          </FormItem>
  </Col>
</Row>
</div>
</Col>
</Row>
</Form>
                </div>
            )
        }
}

const FormPO = Form.create()(PO);
export default FormPO