import React, { Component } from 'react'
import { Button } from 'antd';

class LastDeposit extends Component {

    handleSubmit = () => {
        this.props.btnSubmit()
    }

    handleHome = () => {
        this.props.btnHome()
    }

    render(){
        const { btnNewUser } = this.props
        return (
            <div id="page-transitions" className="page-build">
	            <div className="header shadow-large header-light header-logo-app gradient-body-h">
		            <div className="cd_left">{btnNewUser.Username && btnNewUser.Username ? <Button type="primary" onClick={this.handleHome} disabled>กลับ</Button> : <Button type="primary" onClick={this.handleHome}>กลับ</Button>}</div>
                    <div className="cd_center">ตรวจสอบรายการฝากก่อน "ยืนยัน"</div>
                    <div className="cd_right"><Button type="danger" onClick={this.handleSubmit}>ยืนยัน</Button></div>
                </div>
            </div>
        )
    }
}

export default LastDeposit