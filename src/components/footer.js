import React, { Component } from 'react'

import { Link } from 'react-router'

class Footer extends Component {
    render(){
        const { Page,Step } = this.props
        if(Step==='1')
        {
        return (
            <div id="page-transitions" className="page-build">
	            <div className="footerpage shadow-large header-light header-logo-app bg-gray-dark">
                {
                    Page==='deposit' ? 
                    <Link to="/deposit" className="footer_culum1_ac"><i className="fas fa-clock"></i>&nbsp;&nbsp;ฝาก</Link> :
                    <Link to="/deposit" className="footer_culum1"><i className="fas fa-clock"></i>&nbsp;&nbsp;ฝาก</Link>
                }
                {
                    Page==='withdraw' ?
                    <Link to="/home?PAGE=withdraw" className="footer_culum2_ac"><i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;ถอน</Link> :
                    <Link to="/home?PAGE=withdraw" className="footer_culum2"><i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;ถอน</Link>
                }
                {
                    Page==='shop' ?
                    <Link to="/home?PAGE=shop" className="footer_culum3_ac"><i className="fas fa-gift"></i>&nbsp;&nbsp;รางวัล</Link> :
                    <Link to="/home?PAGE=shop" className="footer_culum3"><i className="fas fa-gift"></i>&nbsp;&nbsp;รางวัล</Link>

                }
                {
                    Page==='help' ?
                    <Link to="/betting_step" className="footer_culum4_ac"><i className="fas fa-futbol"></i>&nbsp;&nbsp;แทงบอล</Link> :
                    <Link to="/betting_step" className="footer_culum4"><i className="fas fa-futbol"></i>&nbsp;&nbsp;แทงบอล</Link>
                }
                </div>
            </div>
        )
        }else{
            return (
                <div id="page-transitions" className="page-build">
                    <div className="footerpage shadow-large header-light header-logo-app bg-gray-dark">
                    {
                        Page==='help' ?
                        <Link to="/betting_step" className="footer_culum4_ac"><i className="fas fa-futbol"></i>&nbsp;&nbsp;แทงบอล</Link> :
                        <Link to="/betting_step" className="footer_culum4"><i className="fas fa-futbol"></i>&nbsp;&nbsp;แทงบอล</Link>
                    }
                    {
                        Page==='deposit' ? 
                        <Link to="/deposit_home" className="footer_culum1_ac"><i className="fas fa-clock"></i>&nbsp;&nbsp;ฝาก</Link> :
                        <Link to="/deposit_home" className="footer_culum1"><i className="fas fa-clock"></i>&nbsp;&nbsp;ฝาก</Link>
                    }
                    {
                        Page==='withdraw' ?
                        <Link to="/withdraw_home" className="footer_culum2_ac"><i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;ถอน</Link> :
                        <Link to="/withdraw_home" className="footer_culum2"><i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;ถอน</Link>
                    }
                    {
                        Page==='shop' ?
                        <Link to="/shop_home" className="footer_culum3_ac"><i className="fas fa-gift"></i>&nbsp;&nbsp;รางวัล</Link> :
                        <Link to="/shop_home" className="footer_culum3"><i className="fas fa-gift"></i>&nbsp;&nbsp;รางวัล</Link>
    
                    }
                    
                    </div>
                </div>
            )
        }
    }
}

export default Footer