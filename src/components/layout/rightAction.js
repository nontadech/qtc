import React, { Component } from 'react'
import { Icon,Tooltip,Input,Button } from 'antd';
const { TextArea } = Input;

  
  class RightAction extends Component {
  state = {
    ac_tab:'Show',
    ac_tab_refer:''
  }

  ShowTab = (id) => {
    this.setState({
        ac_tab:'Show',
        ac_tab_refer:'',
    })
  }

  ShowTabRefer = (id) => {
    this.setState({
        ac_tab_refer:'Show',
        ac_tab:''
    })
  }
      render() {
          const { actionData,type,ShowHideMenu,btnLR } = this.props
          const { ac_tab,ac_tab_refer } = this.state
          return (
              <div>
                  {
                      btnLR ==='Hide' ? <div style={{textAlign:'right'}} className="cur_poiter"><Icon onClick={()=>ShowHideMenu('Show')} type="double-left" style={{ fontSize: '20px' }} theme="outlined" /></div>
                      : <div style={{textAlign:'left'}} className="cur_poiter"><Icon onClick={()=>ShowHideMenu('Hide')} type="double-right" style={{ fontSize: '20px' }} theme="outlined" /></div>
                  }
                  
            <div style={{paddingTop:15}} className="content_right_top">
            {btnLR ==='Hide' ? (
 <div>
 {type && type.map(result=>{
     return (
         <div key={result.name}>
             <span className={result.cssName==='ac' ? 'link_right_ac' : 'link_right'} onClick={()=>actionData(0,result.name)}>
               <Tooltip placement="left" title={result.text}>
               <button className={result.cssName==='ac' ? 'btn_right_ac' : 'btn_right'}><Icon type={result.name} style={{ fontSize: '35px' }} theme="outlined" /></button>
               </Tooltip>
            </span>
               <div style={{height:10}}></div>
       </div>
     )
 })}
 <div className={ac_tab==='Show' ? 'ac_tab':'ac_tab_normal'} onClick={()=>this.ShowTab('ac_tab')}>Activities</div>
 <div className={ac_tab_refer==='Show' ? 'ac_tab':'ac_tab_normal'} onClick={()=>this.ShowTabRefer('ac_tab_refer')}>อ้างอิง</div>
<div style={{backgroundColor:'#cccccc',height:1}}></div>
<div style={{height:5}}></div>
{ac_tab==='Show' ? (
    <div>
 <ul className="press2">
  <li className="post_c50"><img src="/images/5s.png" className="imglogo1"  /></li>
  <li className="post_c50"><Icon type="check-circle" theme="outlined" style={{color:'#3991be',fontSize:24}} /></li>
  </ul>
  <div style={{height:5}}></div>
  <ul className="press2">
  <li className="post_c50"><img src="/images/5s.png" className="imglogo1"  /></li>
  <li className="post_c50"><Icon type="plus-circle" theme="outlined" style={{color:'#3991be',fontSize:24}} /></li>
  </ul>
  </div>
):''}
</div>
            ):(
                <div>
                <ul className="press">
                {type && type.map(result=>{
                    return (
                        <li key={result.name}>
                            <span className={result.cssName==='ac' ? 'link_right_ac' : 'link_right'} onClick={()=>actionData(0,'New','เพิ่มข้อมูล')}>
                              <Tooltip placement="top" title={result.text}>
                              <button className={result.cssName==='ac' ? 'btn_right_ac' : 'btn_right'}><Icon type={result.name} style={{ fontSize: '35px' }} theme="outlined" /></button>
                              </Tooltip>
                           </span>
                              <div style={{height:10}}></div>
                      </li>
                    )
                })}
                </ul>

<div className={ac_tab==='Show' ? 'ac_tab_ac':'ac_tab_ac_normal'} onClick={()=>this.ShowTab('ac_tab')}>Activities</div>
 <div className={ac_tab_refer==='Show' ? 'ac_tab_ac':'ac_tab_ac_normal'} onClick={()=>this.ShowTabRefer('ac_tab_refer')}>อ้างอิง</div>
 
 {ac_tab==='Show' ? (
 <div className="comment_post">
 <TextArea placeholder="ลงความเห็นเกี่ยวกับเอกสารนี้" autosize={{ minRows: 2, maxRows: 6 }} />
 <div style={{height:5}}></div>
  <Button type="primary" size="small"  >Post Now</Button>

  <ul className="press2">
  <li className="post_c1"><img src="/images/5s.png" className="imglogo1"  /></li>
  <li className="post_c2"><Icon type="check-circle" theme="outlined" style={{color:'#56bc60',fontSize:24}} /></li>
  <li className="post_c3"><span className="post_name">Parinya</span> สมบูรณ์<div><Icon type="clock-circle" theme="outlined" />12/10/1028</div></li>
  <li className="post_c4"><Icon type="info-circle" theme="outlined" style={{color:'#51a2cb',fontSize:24}} /></li>

  </ul>
  <div style={{height:10}}></div>
  <ul className="press2">
  <li className="post_c1"><img src="/images/5s.png" className="imglogo1"  /></li>
  <li className="post_c2"><Icon type="plus-circle" theme="outlined" style={{color:'#3991be',fontSize:24}} /></li>
  <li className="post_c3"><span className="post_name">Parinya</span> สร้าง<div><Icon type="clock-circle" theme="outlined" />12/11/1028</div></li>
  <li className="post_c4"><Icon type="info-circle" theme="outlined" style={{color:'#51a2cb',fontSize:24}} /></li>
  
  </ul>

  </div>
 ):(
<div></div>
 )}
  

</div>

            )}
           
            </div>

            
            </div>
          ) 
      }
  }
  
  


export default RightAction