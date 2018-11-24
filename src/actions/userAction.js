import axios from 'axios'
import Config from '../config'

const BASE_URL = Config.BASE_URL
export const loadUser = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_USER_PENDING' })
        return axios.get(`${BASE_URL}/user/GetData?Id=0`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ

            dispatch({ type: 'LOAD_USER_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_USER_REJECTED', payload: err.message })
        })
    }
}


export const loadUserEdit = (Type) => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_USEREDIT_PENDING' })
        return axios.get(`${BASE_URL}/user/GetData?Id=${Type}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ

            dispatch({ type: 'LOAD_USEREDIT_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_USEREDIT_REJECTED', payload: err.message })
        })
    }
}

export const UserSave = (values) => {

    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/user/Save`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })

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


export const UserDelele = (values) => {

    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/user/del`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })

           if (results.data.Status===0) {
               dispatch({ type: 'DEL_USER_SUCCESS' })

           } else {
               dispatch({ type: 'DEL_USER_REJECTED', payload: results.data.Text })
           }

       }).catch(err => {
           //กรณี error
           dispatch({ type: 'DEL_USER_REJECTED', payload: err.Text })
       })
   }
}
