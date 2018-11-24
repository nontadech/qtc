import React,{ Component } from 'react'
import { connect } from 'react-redux'

import windowSize from 'react-window-size'

import { UserSave,loadUser,loadUserEdit,UserDelele } from '../actions/userAction'

/* layout */
import RightAction from '../components/layout/rightAction'
import ListPO from '../components/user/list'
import { Radio, Icon, Modal, Form, Input, Row, Col, Spin, Upload } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

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
      ac_tab_footer:'tab1',
      fileListPicture: null,
      fileListSignature: null
    }
  }


  componentDidMount(){
    this.props.dispatch(loadUser())
    this.props.dispatch(loadUserEdit('0'))
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
    this.props.dispatch(UserSave(values)).then(() => {

      if (!this.props.userSave.isRejected) {
         //message.success('บันทึกข้อมูลเสร็จเรียบร้อย');
         Modal.success({
          title: 'สำเร็จ',
            content: 'บันทึกข้อมูลเสร็จเรียบร้อย',
          });
         this.props.form.resetFields();
         this.ShowTabFooter('tab1')
         this.props.dispatch(loadUser())
      }else{
        Modal.error({
          title: 'ขออภัยค่ะ',
            content: this.props.userSave.data,
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
          values.FileProfilePicture = values.FileProfilePicture && values.FileProfilePicture[0].thumbUrl ? values.FileProfilePicture[0].thumbUrl : values.FileProfilePicture;
          values.FileSignature = values.FileSignature && values.FileSignature[0].thumbUrl ? values.FileSignature[0].thumbUrl : values.FileSignature;
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
  this.props.dispatch(loadUserEdit(id))
}

/** ลบข้อมูล */
confirm = (id) => {

let obj = {
  Id:id
}
  this.props.dispatch(UserDelele(obj)).then(() => {

    if (!this.props.userDel.isRejected) {

      Modal.success({
        title: 'สำเร็จ',
          content: 'ลบข้อมูลเสร็จเรียบร้อย',
        });
       this.ShowTabFooter('tab1')
       this.props.dispatch(loadUser())

    }else{

      Modal.error({
        title: 'ขออภัยค่ะ',
          content: this.props.userDel.data,
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



normFilePicture = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
normFileSignature = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
      const { userList,userEdit } = this.props
      const { dataUser,isRejectedUser,isLoadingUser } = userList
      const { dataEdit,isRejectedEdit,isLoadingEdit } = userEdit




         if ( isRejectedUser || isRejectedEdit) {
             return <div className="alert alert-danger"></div>
         }

         if ( isLoadingUser || isLoadingEdit || !dataUser || !dataEdit) {
             return <div className="example"><Spin size="large" /></div>
         }


        let dataAll;
        if(typedata==='New'){
            dataAll = {
              Name: "1",
              UserName: "1",
              Id: "New",
              Email: "1",
              Telephone: "1",
              Position: "1",
              isEmployee: 1,
              Status: 1,
              FileProfilePicture: null,
              FileSignature: null,
              Password: "1",
              CreateBy: "1",
              CreateById: "1",
              FKSubDocType: 18,
              CostCenter: 1,
              ProfilePicture: 'Test'
            }
        }else{
          dataAll = {
              Name: dataEdit.Data.Name.toString(),
              UserName: dataEdit.Data.UserName.toString(),
              Id: dataEdit.Data.Id,
              Email: dataEdit.Data.Email.toString(),
              Telephone:dataEdit.Data.Telephone.toString(),
              Position: dataEdit.Data.Position.toString(),
              isEmployee: dataEdit.Data.isEmployee,
              Status: dataEdit.Data.Status,
              FileProfilePicture: dataEdit.Data.FileProfilePicture.toString(),
              Password: dataEdit.Data.Password.toString(),
              CreateBy: dataEdit.Data.CreateBy.toString(),
              CostCenter: dataEdit.Data.CostCenter
          }
        }


        const uploadButton = (
          <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>

          </div>
        );
        const imageUrl = this.state.imageUrl;
        const propsPicture = {
          multiple: false,
          onChange: this.handleChange,
          beforeUpload: (file) => {
            this.setState(({ fileListPicture }) => ({
              fileListPicture: file
            }));
            return false;
          },
          disabled: this.state.fileListPicture ? true : false,
          showUploadList: {showPreviewIcon: false},
          onRemove: (file) => {
            this.setState(({ fileListPicture }) => ({
              fileListPicture: null
            }));
          },
        };
        const propsSignature = {
          multiple: false,
          onChange: this.handleChange,
          beforeUpload: (file) => {
            this.setState(({ fileListSignature }) => ({
              fileListSignature: file
            }));
            return false;
          },
          disabled: this.state.fileListSignature ? true : false,
          showUploadList: {showPreviewIcon: false},
          onRemove: (file) => {
            this.setState(({ fileListSignature }) => ({
              fileListSignature: null
            }));
          },
        };
        return (


<div>
    <div className={showhide==='Show' ? 'content_left_ac':'content_left'} style={{minHeight:this.props.windowHeight-55}}>
    <div style={{ background: '#f0f2f5', padding: 0, minHeight: 380,width:'100%' }}>
      <div className="content_left_head">
          <div className="content_left_head_left">
              <div className="list_head_top">
              <span style={{paddingLeft:10,paddingRight:10}} >
              {ac_tab_footer==='tab1' ? 'User':`${titleform} User`}

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
    label="รูป"
  >
    <div className="dropbox">
      {getFieldDecorator('FileProfilePicture', {
        valuePropName: 'fileListPicture',
        getValueFromEvent: this.normFilePicture
      })(
        <Upload
          {...propsPicture}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      )}
    </div>
  </FormItem>
</Col>
<Col span={12}>
<FormItem
    {...formItemLayout2}
    label="ลายเซ็น"
  >
    <div className="dropbox">
      {getFieldDecorator('FileSignature', {
        valuePropName: 'fileListSignature',
        getValueFromEvent: this.normFileSignature
      })(
        <Upload
          {...propsSignature}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      )}
    </div>
  </FormItem>
</Col>
</Row>
<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="ProfilePicture"
hasFeedback
>
{getFieldDecorator('ProfilePicture', {
initialValue:dataAll.ProfilePicture,
rules: [{
required: true, message: 'กรุณาป้อนชื่อ',
}],
})(
<Input  />
)}
</FormItem>
</Col>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="CreateById"
hasFeedback
>
{getFieldDecorator('CreateById', {
initialValue:dataAll.CreateById,
rules: [{
required: true, message: 'กรุณาป้อนยูส',
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
label="ชื่อ"
hasFeedback
>
{getFieldDecorator('Name', {
initialValue:dataAll.Name,
rules: [{
required: true, message: 'กรุณาป้อนชื่อ',
}],
})(
<Input  />
)}
</FormItem>
</Col>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="ยูส"
hasFeedback
>
{getFieldDecorator('UserName', {
initialValue:dataAll.UserName,
rules: [{
required: true, message: 'กรุณาป้อนยูส',
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
label="เมล์"
hasFeedback
>
{getFieldDecorator('Email', {
initialValue:dataAll.Email,
rules: [{
required: true, message: 'กรุณาป้อนเมล์',
}],
})(
<Input  />
)}
</FormItem>
</Col>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="เบอร์"
hasFeedback
>
{getFieldDecorator('Telephone', {
initialValue:dataAll.Telephone,
rules: [{
required: true, message: 'กรุณาป้อนเบอร์',
}],
})(
<Input  />
)}
</FormItem>
</Col>
</Row>
<Row>
<Col span={12}>
</Col>
</Row>
<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="ตำแหน่ง"
hasFeedback
>
{getFieldDecorator('Position', {
initialValue:dataAll.Position,
rules: [{
required: true, message: 'กรุณาป้อนตำแหน่ง',
}],
})(
<Input  />
)}
</FormItem>
</Col>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="พนักงาน"

>
{getFieldDecorator('isEmployee', {
initialValue:dataAll.isEmployee,
rules: [{
required: true, message: 'กรุณาเลือกพนักงาน',
}],
})(
<RadioGroup >
<Radio value={1}>เป็นพนักงาน</Radio>
<Radio value={0}>ไม่เป็น</Radio>
</RadioGroup>
)}
</FormItem>
</Col>
</Row>


<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="รหัสผ่าน"
hasFeedback
>
{getFieldDecorator('Password', {
initialValue:dataAll.Password,
rules: [{
required: true, message: 'กรุณาป้อนรหัสผ่าน',
}],
})(
<Input  />
)}
</FormItem>
</Col>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="สร้างโดย"
hasFeedback
>
{getFieldDecorator('CreateBy', {
initialValue:dataAll.CreateBy,
rules: [{
required: true, message: 'กรุณาป้อนผู้สร้าง',
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
<Radio value={-1}>ไม่ใช้งาน</Radio>
</RadioGroup>
)}
</FormItem>
</Col>
</Row>
<Row>
<Col span={12}>
<FormItem
{...formItemLayout2}
label="องค์กร"

>
{getFieldDecorator('CostCenter', {
initialValue:dataAll.CostCenter,
rules: [{
required: true, message: 'กรุณาเลือกองค์กร',
}],
})(
<RadioGroup >
<Radio value={1}>ทุกแผนกทุกโครงการ</Radio>
<Radio value={0}>บางแผนก</Radio>
</RadioGroup>
)}
</FormItem>
</Col>
</Row>


</Col>
</Row>
</Form>
        )
        :''}
         {ac_tab_footer==='tab1' ? <ListPO data={dataUser.Data} deleteData={this.confirm} editData={this.editData} />:''}
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
    userSave: state.userReducer.userSave,
    userList: state.userReducer.userList,
    userEdit: state.userReducer.userEdit,
    userDel: state.userReducer.userDel
  }
}

const HomeComponent = Form.create()(Home);
export default windowSize(connect(mapStateToProps)(HomeComponent))
