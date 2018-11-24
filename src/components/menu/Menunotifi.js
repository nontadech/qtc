import React, { Component } from 'react'
import { Checkbox } from 'antd';

class MenuNotifi extends Component {
  onChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  }

  goApprove = () => {
    alert('OK')
  }
  state = {
    checked: true,
    disabled: false,
  };


  render(){
    return (
      <div className="menuqtc_notifi">
      <div className="notifycontainer">
      <div className="notify_all">
       <div className="notify_left">1 new notification</div>
       <div className="notify_right"><Checkbox checked={this.state.checked} onChange={this.onChange}>not don only</Checkbox></div>
       </div>


       <div className="notify_body">
       <div className="notify_contain">
            <div className="notify_body_l">
            <img alt="" src="/images/nophoto.png" className="imglogo1" />
            </div>
            <div className="notify_body_r">

            <span className="no_bold">กำลังรอให้คุณอนุมัติเอกสาร (โดย Customer)</span>
            <span><img src="/images/iconapprove.png" className="imgapprove" alt="" onClick={()=>this.goApprove()} /> PO No. 2299111</span>
            <span>No comment</span>
            <span><em>23/10/2018 13:30 AM</em></span>
            </div>
          </div>

       </div>

       <div className="dot_notify"></div>

       <div className="notify_body">
       <div className="notify_contain">
            <div className="notify_body_l">
            <img src="/images/nophoto.png" alt="" className="imglogo1" />
            </div>
            <div className="notify_body_r">

            <span className="no_bold">กำลังรอให้คุณอนุมัติเอกสาร (โดย Customer)</span>
            <span><img src="/images/iconapprove.png" alt="" className="imgapprove" onClick={()=>this.goApprove()} /> PO No. 2299111</span>
            <span>No comment</span>
            <span><em>23/10/2018 13:30 AM</em></span>
            </div>
          </div>

       </div>
</div>

      </div>
    )
  }
}

export default MenuNotifi
