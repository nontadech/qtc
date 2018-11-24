import React, { Component } from 'react'

import { DatePicker,Button,Select,Table, Form,Input,Icon,Tooltip,Row, Col } from 'antd';

import locale from 'antd/lib/date-picker/locale/th_TH';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Search = Input.Search;


class POLIST extends Component {

  onChange = () => {

  }
        render(){
            const dataSource3 = [{
                key: '11',
                category: 'CD001',
                codename: 32,
                desc: '12,000',
                qty: '3',
                unit: '1,200',
                unitprice: '1,200',
                discount: '200',
                amount: '1,000',
                vat: '0'
              },
              {
                key: '12',
                category: 'CD001',
                codename: 32,
                desc: '12,000',
                qty: '3',
                unit: '1,200',
                unitprice: '1,200',
                discount: '200',
                amount: '1,000',
                vat: '0'
              },
              {
                key: '23',
                category: 'CD001',
                codename: 32,
                desc: '12,000',
                qty: '3',
                unit: '1,200',
                unitprice: '1,200',
                discount: '200',
                amount: '1,000',
                vat: '0'
              },
              {
                key: '232',
                category: 'CD001',
                codename: 32,
                desc: '12,000',
                qty: '3',
                unit: '1,200',
                unitprice: '1,200',
                discount: '200',
                amount: '1,000',
                vat: '0'
              },
              {
                key: '211',
                category: 'CD001',
                codename: 32,
                desc: '12,000',
                qty: '3',
                unit: '1,200',
                unitprice: '1,200',
                discount: '200',
                amount: '1,000',
                vat: '0'
              },
              {
                key: '2122',
                category: 'CD001',
                codename: 32,
                desc: '12,000',
                qty: '3',
                unit: '1,200',
                unitprice: '1,200',
                discount: '200',
                amount: '1,000',
                vat: '0'
              }];
          
              const columns3 = [{
                title: 'เลขที่เอกสาร',
                dataIndex: 'category',
                key: 'category',
                render: (text, record) => (
                  <span style={{cursor:'pointer',width:'100%'}}>
                   {record.category}
                  </span>
                )
              }, {
                title: 'วันที่สั่งซื้อ',
                dataIndex: 'codename',
                key: 'codename',
              }, {
                title: 'ผู้ขาย',
                dataIndex: 'desc',
                key: 'desc',
              }, {
                title: 'Cost Center',
                dataIndex: 'qty',
                key: 'qty',
              },{
                title: 'วันที่รับของ',
                dataIndex: 'unit',
                key: 'unit',
              }, {
                title: 'ยอดรวม',
                dataIndex: 'unitprice',
                key: 'unitprice',
              }, {
                title: 'ยอดภาษี',
                dataIndex: 'discount',
                key: 'discount',
              }, {
                title: 'ยอดรวมภาษี',
                dataIndex: 'amount',
                key: 'amount',
              }, {
                title: 'ผู้อนุมัติ',
                dataIndex: 'vat',
                key: 'vat',
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

              const columns = [
                { title: 'เลขที่เอกสาร', width: 140, dataIndex: 'name', key: 'name', fixed: 'left',sorter: (a, b) => a.name - b.name},
                { title: 'วันที่สั่งซื้อ', width: 100, dataIndex: 'age', key: 'age', width: 150,sorter: (a, b) => a.age - b.age },
                { title: 'ผู้ขาย', dataIndex: 'sale', key: '1', width: 150 },
                { title: 'Cost Center', dataIndex: 'costcontrol', key: '2', width: 150 },
                { title: 'วันที่รับของ', dataIndex: 'age', key: '3', width: 150 },
                { title: 'ยอดรวม', dataIndex: 'price', key: '4', width: 150 },
                { title: 'ยอดภาษี', dataIndex: 'price', key: '5', width: 150 },
                { title: 'ยอดรวมภาษี', dataIndex: 'price', key: '6', width: 100 },
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
              
              const data = [];
              for (let i = 10000; i < 10020; i++) {
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

              const { getFieldDecorator } = this.props.form;

            return(
                <div>
                    
                    <Row>
      <Col span={16}>
      <Form >




  
          <Row>
      <Col span={8}><FormItem
            label="เลขที่เอกสาร"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก เลขที่เอกสาร"  />
            
             </FormItem></Col>
          
      <Col span={8}>
          
      <FormItem
            label="ผู้ขาย"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก ผู้ขาย" />
          </FormItem>
          
          </Col>
          <Col span={8}>
          
          <FormItem
                label="Cost Center"
                {...formItemLayout2}
              >
                <Search placeholder="ค้นหาจาก Cost center" />
              </FormItem>
              
              </Col>
          
      
    </Row>

     <Row>
      <Col span={8}><FormItem
            label="วัสดุ"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก วัสดุ"  />
            
             </FormItem></Col>
          
      <Col span={8}>
          
      <FormItem
            label="เครื่องมือ"
            {...formItemLayout2}
          >
            <Search placeholder="ค้นหาจาก เครื่องมือ" />
          </FormItem>
          
          </Col>
          <Col span={8}>
          
          <FormItem
                label="ผู้อนุมัติ"
                {...formItemLayout2}
              >
                <Search placeholder="ค้นหาจาก ผู้อนุมัติ" />
              </FormItem>
              
              </Col>
          
      
    </Row>
    

</Form>
</Col>
<Col span={8}>

 <Row>
      <Col span={24}><FormItem
            label="วันที่เอกสาร"
            {...formItemLayout2}
          >
            <RangePicker locale={locale} />
            
             </FormItem></Col>
          
      
          
          
      
    </Row>

    <Row>
      <Col span={24}><FormItem
            label="กำหนดส่งของ"
            {...formItemLayout2}
          >
            <RangePicker locale={locale} />
            
             </FormItem></Col>
          
      
          
          
      
    </Row>
</Col>
</Row>
<Row>
<Col span={24}>


<Table columns={columns} bordered onChange={this.onChange}   dataSource={data} pagination={{ position: 'none', pageSize:'50' }} scroll={{ x: 1900, y: 400 }} />
</Col>
</Row>

                </div>
            )
        }
}

const FormPO = Form.create()(POLIST);
export default FormPO