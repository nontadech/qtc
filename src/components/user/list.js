import React, { Component } from 'react'

import { DatePicker,Button,Popconfirm,Select,Table, Form,Input,Icon,Tooltip,Row, Col } from 'antd';

import locale from 'antd/lib/date-picker/locale/th_TH';



class POLIST extends Component {

  onChange = () => {

  }
        render(){
            
              
          const {data,deleteData,editData} = this.props
          
              const columns = [
                { title: 'AutoRunPattern', width: 150, dataIndex: 'AutoRunPattern', key: 'AutoRunPattern',fixed: 'left',sorter: (a, b) => a.AutoRunPattern.length - b.AutoRunPattern.length},
                { title: 'Name', dataIndex: 'Name', key: 'Name',width: 150 },
                { title: 'NameEn', dataIndex: 'NameEn', key: 'NameEn' },
                { title: 'AutoRunType', width: 150, dataIndex: 'AutoRunType', key: 'AutoRunType',sorter: (a, b) => a.AutoRunType.length - b.AutoRunType.length },
                { title: 'Description', dataIndex: 'Description', key: 'Description', width: 150 },
                { title: 'DocTypeName', dataIndex: 'DocTypeName', key: 'DocTypeName', width: 150 },
                { title: 'IsRekey', dataIndex: 'IsRekey', key: 'IsRekey', width: 150 },
               
                { title: 'Status', dataIndex: 'Status', key: 'Status',width: 80 }
                , {
                  title: 'Action',
                  width: 100,
                  align:'center',
                  fixed: 'right',
                  render: (text, record) => (
                    <span>
                     
                      <a href="javascript:;" onClick={()=>editData(record.Id,'Edit','แก้ไขข้อมูล')}><Tooltip placement="left" title="แก้ไข"><Icon type="edit" theme="outlined" style={{fontSize:24, color:'#1a77f6'}} /></Tooltip></a>
                      
                      <Popconfirm placement="topLeft" title="คุณต้องการลบข้อมูล ใช่หรือไม่" onConfirm={()=>deleteData(record.Id)} okText="Yes" cancelText="No">
                      <a href="javascript:;"><Tooltip placement="right" title="ลบ"><Icon type="delete" theme="outlined" style={{fontSize:24, color:'#aa1b10'}} /></Tooltip></a>
                     </Popconfirm>
                    </span>
                  )
                }
              ];
              
              
              

            return(
                <div>
                    
   


<Table columns={columns} bordered onChange={this.onChange}   dataSource={data} pagination={{ position: 'none', pageSize:'50' }} scroll={{ x: 1400, y: 500 }} />


                </div>
            )
        }
}

//const FormPO = Form.create()(POLIST);
export default POLIST