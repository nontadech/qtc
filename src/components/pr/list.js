import React, { Component } from 'react'

import { DatePicker,Button,Select,Table, Form,Input,Icon,Tooltip,Row, Col,TreeSelect } from 'antd';

import locale from 'antd/lib/date-picker/locale/th_TH';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Search = Input.Search;


class PRLIST extends Component {

    state = {
        valueSelect: undefined,
      }

    onChange = (value) => {
        
        this.setState({ valueSelect:value });
      }
        render(){
           
              

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

              const columns = [
                { title: 'เลขที่เอกสาร', width: 140, dataIndex: 'Code', key: 'Code', fixed: 'left',sorter: (a, b) => a.name - b.name},
                { title: 'วันที่สั่งซื้อ', width: 100, align:'center', dataIndex: 'DocumentDateText', key: 'DocumentDateText',sorter: (a, b) => a.age - b.age },
                { title: 'ผู้ขอซื้อ', dataIndex: 'PRName', key: 'PRName', width: 300 },
                { title: 'Cost Center', dataIndex: 'CostName', key: 'CostName', width: 150 },
                { title: 'วันที่รับของ', dataIndex: 'age', key: '3', width: 150 },
                { title: 'ยอดรวม', dataIndex: 'PriceAmount', key: 'PriceAmount',align:'right', width: 150 },
                { title: 'ยอดภาษี', dataIndex: 'price', key: '5', width: 150,align:'right' },
                { title: 'ยอดรวมภาษี', dataIndex: 'price', key: '6', width: 100 ,align:'right'},
                { title: 'ผู้อนุมัติ', dataIndex: 'approve', key: '7', width: 100 },
                { title: 'วันที่อนุมัติ', dataIndex: 'age', key: '8',width: 100 },
                { title: 'รหัสใบขอซื้อ', dataIndex: 'commentd', key: '9',width: 100 },
                { title: 'หมายเหตุ', dataIndex: 'commentd', key: '10',width: 100 },
                { title: 'การอ้างอิง', dataIndex: 'commentd', key: '11',width: 100 },
                { title: 'ความเห็น', dataIndex: 'commentd', key: '12',width: 100 },
                { title: 'สถานะใบสั่งซื้อ', width: 100, dataIndex: 'age1', key: 'age1', width:100 },
                {
                  title: 'สถานะการปิด PO',
                  key: 'operation',
                  width: 120,
                  render: () => '',
                },
              ];
              
              /*
              const data = [];
              for (let i = 10000; i < 10005; i++) {
                data.push({
                  key: i,
                  name: i,
                  age: `12/02/2018`,
                  age1: `ใหม่`,
                  address: `${i}`,
                  sale:'PC001:การประปานครหลวง',
                  costcontrol:'PC001:แผนกจัดซื้อ',
                  price:`10,000`,
                  approve:'วิชัย',
                  commentd:''
                });
              }
              */

              const { dataCost,dataUser,dataItem,data } = this.props
              const { getFieldDecorator } = this.props.form;

          
            return(
                <div>
                    <fieldset>
    <legend>ค้นหาจาก วันที่ต้องการรับของ:</legend>
                    <Row>
                        <Col span={7}>
                        


<fieldset>
    <legend>ค้นหาจาก รายละเอียดทั่วไป:</legend>
    <Row>
      <FormItem
            label="รหัส"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก รหัส"  />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
            label="ผู้ขอซื้อ"
            {...formItemLayout2}
          >
            <Select 
showSearch
style={{ width: '100%' }}
placeholder="กรุณาเลือก ผู้ขอซื้อ"
optionFilterProp="children"
onChange={this.handleChange}
onFocus={this.handleFocus}
filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>

    {dataUser && dataUser.map(e => {
                  return (
                      <Option key={e.Id} value={e.Id}>{e.Name}</Option>
                  )
              })}
</Select>
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
            label="Cost Center"
            {...formItemLayout2}
          >
            <TreeSelect
            showSearch
        style={{ width: '100%' }}
        value={this.state.valueSelect}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={dataCost}
        placeholder="เลือก CostCenter"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
{...formItemLayout2}
label="สถานะเอกสาร"
>
{getFieldDecorator('Status', {
  initialValue:1,
})(
  <Select placeholder="เลือกประเภทเอกสาร" style={{width:'100%'}}>
                      <Option key="A1" value={1}>ไม่ระบุ</Option>
                      <Option key="A2" value={2}>ยกเลิก</Option>
                      <Option key="A3" value={3}>On Hold</Option>
                      <Option key="A3" value={4}>บันทึกแล้ว</Option>
                      <Option key="A3" value={5}>ถูกอ้างอิงแล้ว</Option>
                      <Option key="A3" value={6}>ยังไม่ถูกอ้างอิง</Option>
                      <Option key="A3" value={7}>ปิด</Option>
               
</Select>
)}
</FormItem>
      </Row>
  </fieldset>
                        
     
      
                        </Col>
                        <Col span={1}></Col>
                        <Col span={7}>
                        
<fieldset>
    <legend>ค้นหาจาก สิ่งที่ซื้อ:</legend>
                        <Row>
      <FormItem
            label="วัสดุ"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก วัสดุ"  />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
            label="เครื่องมือ"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก เครื่องมือ"  />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
            label="รายการ"
            {...formItemLayout2}
          >
            <Select 
showSearch
style={{ width: '100%' }}
placeholder="กรุณาเลือก รายการที่ซื้อ"
optionFilterProp="children"
onChange={this.handleChange}
onFocus={this.handleFocus}
filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>

    {dataItem && dataItem.map(e => {
                  return (
                      <Option key={e.Id} value={e.Id}>{e.Name}</Option>
                  )
              })}
</Select>
            
             </FormItem>
      </Row>
      </fieldset>
    
<fieldset>
    <legend>ค้นหาจาก การอนุมัติ:</legend>
                        <Row>
      <FormItem
            label="ผู้อนุมัติ"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก ผู้อนุมัติ"  />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
{...formItemLayout2}
label="ระดับการอนุมัติ"
>
{getFieldDecorator('Status', {
  initialValue:1,
})(
  <Select placeholder="เลือกประเภทเอกสาร" style={{width:'100%'}}>
                      <Option key="A1" value={1}>ไม่ระบุ</Option>
                      <Option key="A2" value={2}>ยกเลิก</Option>
                      <Option key="A3" value={3}>On Hold</Option>
                      <Option key="A3" value={4}>บันทึกแล้ว</Option>
                      <Option key="A3" value={5}>ถูกอ้างอิงแล้ว</Option>
                      <Option key="A3" value={6}>ยังไม่ถูกอ้างอิง</Option>
                      <Option key="A3" value={7}>ปิด</Option>
               
</Select>
)}
</FormItem>
      </Row>
      </fieldset>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={7}>
                       
<fieldset>
    <legend>ค้นหาจาก วันที่เอกสาร:</legend>
                        <Row>
      <FormItem
            label="ตั้งแต่"
            {...formItemLayout2}
          >
            <DatePicker locale={locale} />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
            label="ถึง"
            {...formItemLayout2}
          >
            <DatePicker locale={locale} />
            
             </FormItem>
      </Row>
      
      </fieldset>
     

<fieldset>
    <legend>ค้นหาจาก วันที่ต้องการรับของ:</legend>
                         <Row>
      <FormItem
            label="ตั้งแต่"
            {...formItemLayout2}
          >
            <DatePicker locale={locale} />
            
             </FormItem>
      </Row>
      <Row>
      <FormItem
            label="ถึง"
            {...formItemLayout2}
          >
            <DatePicker locale={locale} />
            
             </FormItem>
      </Row>
      </fieldset>
                        </Col>
                    </Row>








</fieldset>
                    
<Row>
<Col span={24}>


<Table columns={columns} bordered onChange={this.onChange}   dataSource={data} pagination={{ position: 'none', pageSize:'50' }} scroll={{ x: 2050, y: 400 }} />
</Col>
</Row>

                </div>
            )
        }
}

const FormPR = Form.create()(PRLIST);
export default FormPR