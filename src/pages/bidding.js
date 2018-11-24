import React,{ Component } from 'react'
import { connect } from 'react-redux'

import windowSize from 'react-window-size'

/* layout */
import RightAction from '../components/layout/rightAction'

import { DatePicker,Select,Radio,Icon,Modal, Form,Input,message,Row, Col,Spin,Tree,TreeSelect, Button } from 'antd';


import locale from 'antd/lib/date-picker/locale/th_TH';
import debounce from 'lodash/debounce';

const { TextArea } = Input;

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

function findObjectById(root, id) {
    if (root.key == id){
      return root;
    }
    if (root.children) {
      for (var k in root.children) {
        if (root.children[k].key == id) {
          return root.children[k];
        }
        else if (root.children[k].children) {
          var result = findObjectById(root.children[k], id);
          if (result) {
            return result;
          }
        }
      }
    }
  };


  

  

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
      ac_tab_footer:'tab3',
      treeData: [{
        title: "<Default>",
        key: '1',
        children: []
      }],
      keyname:1
    }

    
  }


  componentDidMount(){
    
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



ShowHideMenu = (type) => {
  this.setState({showhide:type})
}


ShowTabFooter = (tab) => {
  this.setState({ac_tab_footer:tab})
}



onSelect = (selectedKeys, info) => {
    //console.log('selected', selectedKeys, info);
    
    //this[`Code`].value = selectedKeys.split('-')[0]
    //this[`Name`].value = selectedKeys.split('-')[1]
    this.setState({keyname:selectedKeys})

    var obJect = this.state.treeData
    var ids = [`${selectedKeys}`];
    
    var Codex = this[`Code`].value
    var Name = this[`Name`].value
   
    let CodeInput =''
    let NameInput =''
    if(selectedKeys==1)
    {
      // ค่าเริ่มต้น
      //this[`Code`].c
      this[`Name`].focus();
      NameInput = 'Default'
      //this.nameInput.focus();

    }else{

      obJect.forEach(function iter(a) {
        if (ids.includes(a.key)) {
          console.log(a.title)
          CodeInput = a.title.split('-')[0]
          NameInput = a.title.split('-')[1]
          //this[`Code`].value = a.title
        }
          Array.isArray( a.children) && a.children.forEach(iter);
        });

        
    }
    this[`Code`].value = CodeInput
    this[`Name`].value = NameInput
    



  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  deleteItem =(e)=> {
    var object = this.state.treeData[0]

    var key = this.state.keyname

    function removeFromTree(parent, childNameToRemove){
      parent.children = parent.children
          .filter(function(child){ return child.key !== childNameToRemove})
          .map(function(child){ return removeFromTree(child, childNameToRemove)});
      return parent;
    }
    object = removeFromTree(object, `${key}`)  

    this.setState({treeData:[object]})
      
  }


  addItem =(e)=>{

  var ob = this.state.treeData[0]
  var obJect = this.state.treeData

  var bla = findObjectById(ob, this.state.keyname);


  var count = [];


function getCount(data, level) {
level = level || 0;
count[level] = count[level] || 0;
for (var k in data) {
    data.hasOwnProperty(k) && count[level]++;
    typeof data[k] === 'object' && getCount(data[k], level + 1);
}
}

// สร้าง key id ไม่ให้ซ้ำกัน
getCount(obJect);


function getSum(total, num) {
    return total + num;
}

var keyid = count.reduce(getSum)
bla.children.push({
    title: "-default",
    key: `${keyid}`,
    children: []
});

this.setState({treeData:[ob],keyname:keyid})
this[`Name`].focus();

  }

  updateItem =(e)=>{

    var obJect = this.state.treeData
    var ids = [`${this.state.keyname}`];
    
    var Codex = this[`Code`].value
    var Name = this[`Name`].value
    
    obJect.forEach(function iter(a) {
    if (ids.includes(a.key)) {
        a.title = `${Codex} - ${Name}`
    }
      Array.isArray( a.children) && a.children.forEach(iter);
    });
      this.setState({treeData:obJect})

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
      
      
        return (
            

<div>
    <div className={showhide==='Show' ? 'content_left_ac':'content_left'} style={{minHeight:this.props.windowHeight-55}}>
    <div style={{ background: '#f0f2f5', padding: 0, minHeight: 380,width:'100%' }}>
      <div className="content_left_head">
          <div className="content_left_head_left">
              <div className="list_head_top">
              <span style={{paddingLeft:10,paddingRight:10}} >
              {ac_tab_footer==='tab1' ? 'ประมูล':'ประมูล'}
             
              </span>
             
              </div>
          </div>
        
          
      </div>


      <div className="contentbody" style={{height: this.props.windowHeight-145}}>

        {ac_tab_footer==='tab2' ? 
        (
          'xx'
        )
        :''}
         {ac_tab_footer==='tab3' ? (
             <div>
               <Row>
          <Col span={12}>
          <FormItem
{...formItemLayout2}
label="ชื่อ"
hasFeedback
>
<Button type="danger" onClick={(e)=>this.addItem(e)}>เพิ่มแถว</Button> <Button type="danger" onClick={(e)=>this.deleteItem(e)}>ลดแถว</Button>
</FormItem>
          </Col>
          </Row>
                 <div style={{backgroundColor:'#fff',height:this.props.windowHeight-350,overflow:'auto'}} className="bdTree">
                 
                  <Tree
        showLine
        showIcon
        defaultExpandAll={true}
        autoExpandParent={true}
        onSelect={this.onSelect}
        ref={input => { this[`Tree`] = input } }
      >
        {this.renderTreeNodes(this.state.treeData)}
      </Tree>
      </div>
     
      
      <div style={{bottom:100,paddingTop:20}}>
      <fieldset>
    <legend>รายละเอียด:</legend>
    <Row>
          <Col span={12}>
          <FormItem
{...formItemLayout2}
label="รหัส"
hasFeedback
>
<input type="text" ref={input => { this[`Code`] = input } }  onChange={(e)=>this.updateItem(e)} className="inputItem2" style={{width:90,textAlign:'left'}} />
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
<input type="text" ref={input => { this[`Name`] = input } }  onChange={(e)=>this.updateItem(e)} className="inputItem2" style={{width:200,textAlign:'left'}} />
</FormItem>
          </Col>
          </Row>
      <Row>
          <Col span={12}>
          <FormItem
{...formItemLayout2}
label="วันเริ่ม"
hasFeedback
>
<DatePicker locale={locale} onChange={this.onChangeDate}   />
</FormItem>
          </Col>
          <Col span={12}>
          <FormItem
{...formItemLayout2}
label="วันเสร็จ"
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
label="หมายเหตุ"
hasFeedback
>
<input ref={(input) => { this.nameInput = input; }} className="inputItem2" style={{width:'100%'}} />
</FormItem>
          </Col>
          </Row>
          
</fieldset>
      </div>
                 </div>
         ):''}

      </div>
  
      <div className="footerpage">
            <div className="content_left_footer_left">
            
          <div className={ac_tab_footer==='tab1' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab1')}><Icon type="bars" theme="outlined" style={{fontSize:22}} /> รายการ</div>
          <div className={ac_tab_footer==='tab2' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab2')}><Icon type="file-protect" theme="outlined" style={{fontSize:22}} /> BOQ</div>
          <div className={ac_tab_footer==='tab3' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab3')}><Icon type="file-protect" theme="outlined" style={{fontSize:22}} /> WBS</div>
          <div className={ac_tab_footer==='tab4' ? 'tabfooter_ac':'tabfooter'} onClick={()=>this.ShowTabFooter('tab4')}><Icon type="file-protect" theme="outlined" style={{fontSize:22}} /> Item listing</div>
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


const HomeComponent = Form.create()(Home);
export default windowSize(HomeComponent)
