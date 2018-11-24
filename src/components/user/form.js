import React, { Component } from 'react'

import { Select,Radio, Form,Input,Tooltip,Row, Col } from 'antd';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class SubDocForm extends Component {

  state = {
    dataAll:null
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }
  
    handleBlur() {
    console.log('blur');
  }
  
handleFocus() {
    console.log('focus');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
/*
        let idSave=null
        const { id,typedata} = this.props
        if(id===0 && typedata==='New'){
          idSave = 'New'
      }else if(id!==0 && typedata==='New'){
          idSave = 'New'
      }else{
        idSave = id
      }
*/
        let data = { ...values, Id:'New'}
        this.props.saveData(data)
        
        //this.props.saveData(data)
      }
    });
  }
  

        render(){
            
          const { dataList } = this.props
              

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
    initialValue:'',
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
    initialValue:'',
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
            initialValue:'',
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
      
              {dataList && dataList.map(e => {
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
    initialValue:'',
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
            initialValue:'',
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
  {getFieldDecorator('IsReKey', {
    initialValue:true,
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
    initialValue:'',
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
    initialValue:1,
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
<button onClick={this.handleSubmit}>OK</button>
</Col>
</Row>
</Form>
                </div>
            )
        }
}

const FormSubDoc = Form.create()(SubDocForm);
export default FormSubDoc