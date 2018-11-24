import React, { Component } from 'react';
//import './App.css';
import Button from 'antd/lib/button';

import { connect } from 'react-redux'
import { saveRegisterMember,sendLine } from '../actions/signinAction'


import { Form,Input,Modal } from 'antd';
var qs = require('qs');


const FormItem = Form.Item;


const liff = window.liff;  



class SigninPage extends Component {

  constructor(props) {

    super(props);
    this.state = {
      displayName : '',
      userId : '',
      pictureUrl : '',
      statusMessage : '',
      datalist: null,
      databank:null,
      dataweb:null,
      err : null,
      number:null,
      statuslogin:null,
      loading: false,
    };

    

    this.closeApp = this.closeApp.bind(this);

  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  closeLoading = () => {
    this.setState({ loading: false });
  }

  componentDidMount() {
    //window.addEventListener('load', this.initialize);
   
  }

  closeApp(event) {
    event.preventDefault();
    liff.closeWindow();
  }
  

  


  handleSubmit = (e) => {
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.enterLoading()
        // ส่งไลน์หาแม่ทีม
        let data = { 
          web:this.props.dataConfig.WebId,
          MemberCode :this.props.lineConfig.userId,
          //MemberCode:'Uf3c885994143d5632c0a7419d5b76bcb',
          mobile:values.Tel,
          pass:values.password,
          line:this.props.dataConfig.LineId,
          text:`คุณมีลูกค้าใหม่เบอร์โทร ${values.Tel.substring(0,5)}xxxxx`
         }       
     
         let mdata =  qs.stringify(data)

        this.props.dispatch(saveRegisterMember(mdata)).then(() => {

          if (!this.props.userRegister.isRejected) {
            this.closeLoading()
            this.props.TopComponent()
            //this.success()
         }else{
           Modal.error({
               title: 'ขออภัยค่ะ',
               content: this.props.userRegister.data,
             });
             this.closeLoading()

             
         }
        
         
      })
      
      }
    });
  }

 
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('ยืนยันรหัสผ่าน ไม่ตรงกัน!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  



  render() {

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

    


    

    

    return (
        

            
<div>
  
    

    


	
      <div className="page-login bg-white">
         <div className="content bottom-0">
        <h5 className="center-text">ลงทะเบียนสมาชิกใหม่</h5>
<h5>&nbsp;</h5>
        <Form onSubmit={this.handleSubmit}>

        
          
<FormItem
  {...formItemLayout}
  label="เบอร์มือถือ"
  hasFeedback
>
  {getFieldDecorator('Tel', {
    rules: [{
      required: true, message: 'กรุณาป้อนเบอร์มือถือ',
    }],
  })(
    <Input size="large"  />
  )}
</FormItem>


<FormItem
          {...formItemLayout}
          label="รหัสผ่าน"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'กรุณาป้อนรหัสผ่าน!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" size="large" />
          )}
        </FormItem>

 <FormItem
          {...formItemLayout}
          label="ยืนยัน รหัสผ่าน"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'กรุณายืนยันรหัสผ่าน!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" size="large" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>






</Form>

        <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit}> สมัครสมาชิก</Button>
       
       {1===1 ? '' : (
          <div>
            <br />
       <br />
       <h5>พิเสษสุดๆๆ</h5>
        
    <img src={process.env.PUBLIC_URL+'/images/pictures/gold.png'} className="preload-image responsive-image round-element shadow-large" alt="img"/>
    
            </div>
       )}
         </div>
    </div>
  
        


    </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(SigninPage);

//export default WrappedRegistrationForm;


function mapStateToProps(state) {
  return {
    userRegister: state.signinReducer.userRegister,
    lineSave : state.signinReducer.lineSave
  }
}

export default connect(mapStateToProps)(WrappedRegistrationForm)
