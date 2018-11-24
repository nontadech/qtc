import React, { Component } from 'react';
import { connect } from 'react-redux'
import windowSize from 'react-window-size'
import { loadMenu } from './actions/menuAction'
import HeaderList from './components/header'
import { Layout, Form } from 'antd';
const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menustep : 0,
      visible: false,
      selectedFile: null,
      menudata:null,
      menuseleted:null,
      titleform:null,
      Count:0,
      id:0,
      typedata:null,
    }
  }


  componentDidMount(){
    // โหลดเมนูเริ่มต้น
    this.props.dispatch(loadMenu('0'))
  }
    
      closeMenu = () => {
        this.setState({
          menustep:0,
          menuseleted:0
        })
      }

  render() {


    const { menuList } = this.props
    const { dataMenu,isRejectedMenu,isLoadingMenu } = menuList


    if (isRejectedMenu) {
      return <div className="alert alert-danger">Error: {dataMenu}</div>
    }
  
    if (isLoadingMenu || !dataMenu) {
      return <div className="example"></div>
    }

    return (
      <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <HeaderList menu={this.state} dataMenu={dataMenu} />
    </Header>
    <Content style={{ padding: '0 0px', marginTop: 43, minHeight: this.props.windowHeight-45 }} onClick={()=>this.closeMenu()} >
    {this.props.children}
    </Content>
  </Layout>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    //อ่านค่าเมนูเริ่มต้นการทำงาน จาก Reducer ที่ชื่อ menuList
    menuList : state.menuReducer.menuList,
  }
}

const HomeComponent = Form.create()(App);
export default windowSize(connect(mapStateToProps)(HomeComponent))