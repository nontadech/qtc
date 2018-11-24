import axios from 'axios'

//ฟังก์ชันบันทึกข้อมูลผู้ใช้ โดยเราจะเช็คว่าเป็นการเพิ่มข้อมูลใหม่ หรือปรับปรุงข้อมูล
export const saveDataNew = (values) => {
   

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `https://admin.pananauto.com/api/PostSignup`,
            data: values,
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
              }
            
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            if (results.data.Status===0) {
                dispatch({ type: 'SAVE_USER_SUCCESS' })
                
            } else {
                dispatch({ type: 'SAVE_USER_REJECTED', payload: results.data.Text })
            }
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_USER_REJECTED', payload: err.Text })
        })
    }
}


export const saveRegisterMember = (values) => {
   

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `https://admin.pananauto.com/api/PostNewSignup`,
            data: values,
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
              }
            
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            if (results.data.Status===0) {
                dispatch({ type: 'SAVE_REGISTER_SUCCESS' })
                
            } else {
                dispatch({ type: 'SAVE_REGISTER_REJECTED', payload: results.data.Text })
            }
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_REGISTER_REJECTED', payload: err.Text })
        })
    }
}

export const sendLine = (values) => {
   
    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `https://admin.pananauto.com/api/PostSendLine`,
           //url: `http://localhost:3009/users`,
           data: values
           ,
           headers: {
               'Accept': 'application/json',
               "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
             }
          //headers: { 'content-type': 'application/json', 'Accept': 'application/json'}
          //headers: { authorization: localStorage.getItem('token') }
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })
           
           if (results.data.Status===0) {
               dispatch({ type: 'SAVE_LINE_SUCCESS' })
               
           } else {
               dispatch({ type: 'SAVE_LINE_REJECTED', payload: results.data.Text })
           }
       
       }).catch(err => {
           //กรณี error
           dispatch({ type: 'SAVE_LINE_REJECTED', payload: err.Text })
       })
   }
}
