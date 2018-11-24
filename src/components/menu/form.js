
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadParent,MenuSave,loadMenu,loadMenuEdit,loadMenuTree } from '../../actions/menuAction'

import { Form,Select,Input,Row,Spin,Radio,Button  } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;



class Step2 extends Component {

      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            //console.log('Received values of form: ', values);

            let idSave=null
            const { id,typedata} = this.props
            if(id===0 && typedata==='New'){
              idSave = 'New'
          }else if(id!==0 && typedata==='New'){
              idSave = 'New'
          }else{
            idSave = id
          }

            let data = { ...values, Id:idSave}
            this.props.saveData(data)
          }
        });
      }


    componentDidMount(){
      this.props.dispatch(loadMenuEdit(this.props.id))
    }
    render(){

    
    const { btnClose,dataList,id,menuEdit,typedata} = this.props
    const { getFieldDecorator } = this.props.form;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    
    const { dataMenuEdit,isRejectedMenuEdit,isLoadingMenuEdit } = menuEdit
     

        if (isRejectedMenuEdit) {
            return <div className="alert alert-danger">Error: {dataMenuEdit}</div>
        }
        
        if (isLoadingMenuEdit || !dataMenuEdit) {
            return <div className="example"><Spin size="large" /></div>
        }

        let dataAll = null
        if(id===0 && typedata==='New'){
            dataAll = {
              ParentId:'0',
              Name:'',
              NameEn:'',
              Description:'',
              Link:'',
              JournalType:true,
              MenuType:0
            }
        }else if(id!==0 && typedata==='New'){
            dataAll = {
              ParentId : id,
              Name:'',
              NameEn:'',
              Description:'',
              Link:'',
              JournalType:true,
              MenuType:0
            }
        }else{
          dataAll = {
            ParentId : dataMenuEdit.Data.ParentId.toString(),
            Name:dataMenuEdit.Data.Name,
            NameEn:dataMenuEdit.Data.NameEn,
            Description:dataMenuEdit.Data.Description,
            Link:dataMenuEdit.Data.Link,
            JournalType:dataMenuEdit.Data.JournalType,
            MenuType:dataMenuEdit.Data.MenuType
          }
        }



        return(
            <div>
                
                
                

            
            <Form onSubmit={this.handleSubmit}>




  
  <FormItem
          {...formItemLayout}
          label="หมวดหมู่"
          hasFeedback
        >
          {getFieldDecorator('ParentId', {
            initialValue:dataAll.ParentId,
            rules: [{
              required: true, message: 'กรุณาเลือกหมวดหมู่',
            }],
          })(
            <Select placeholder="หมวดหมู่" size="large">
      
              {dataList && dataList.map(e => {
                            return (
                                <Option key={e.Value} value={e.Value}>{e.Text}</Option>
                            )
                        })}
          </Select>
          )}
        </FormItem>

  <FormItem
  {...formItemLayout}
  label="ชื่อภาษาไทย"
  hasFeedback
>
  {getFieldDecorator('Name', {
    initialValue:dataAll.Name,
    rules: [{
        required: true, message: 'กรุณาป้อนชื่อภาษาไทย',
      }],
  })(
    <Input size="large"  />
  )}
</FormItem>
<FormItem
  {...formItemLayout}
  label="ชื่อภาษาอังกฤษ"
  hasFeedback
>
  {getFieldDecorator('NameEn', {
    initialValue:dataAll.NameEn,
    rules: [{
        required: true, message: 'กรุณาป้อนชื่อภาษาอังกฤษ',
      }],
  })(
    <Input size="large"  />
  )}
</FormItem>
<FormItem
  {...formItemLayout}
  label="รายละเอียด"
  hasFeedback
>
  {getFieldDecorator('Description', {
    initialValue:dataAll.Description,
    rules: [{
        required: true, message: 'กรุณาป้อนรายละเอียด',
      }],
  })(
    <Input size="large"  />
  )}
</FormItem>
<FormItem
  {...formItemLayout}
  label="ลิ้งค์"
  hasFeedback
>
  {getFieldDecorator('Link', {
    initialValue:dataAll.Link,
    rules: [{
        required: true, message: 'กรุณาป้อนลิ้งค์',
      }],
  })(
    <Input size="large"  />
  )}
</FormItem>

<FormItem
  {...formItemLayout}
  label="JournalType"
>

{getFieldDecorator('JournalType', {
    initialValue:dataAll.JournalType
  })(
    <RadioGroup  >
<Radio value={true}>ต้องผูกบัญชี</Radio>
<Radio value={false}>ไม่ต้องผูก</Radio>
</RadioGroup>

  )}

</FormItem>

<FormItem
  {...formItemLayout}
  label="MenuType"
>

{getFieldDecorator('MenuType', {
  initialValue:dataAll.MenuType,
  })(
    <RadioGroup  >
<Radio value={0}>ไม่มีหมวดหมู่</Radio>
<Radio value={1}>Document</Radio>
<Radio value={2}>Report</Radio>
</RadioGroup>

  )}

</FormItem>

  


</Form>

<div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={()=>btnClose()}
            >
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">Submit</Button>
          </div>
            </div>
        
        )
    }

}

const DepositStep2 = Form.create()(Step2);

function mapStateToProps(state) {
  return {
    menuEdit: state.menuReducer.menuEdit,
  }
}

export default connect(mapStateToProps)(DepositStep2)


