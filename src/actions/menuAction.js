import axios from 'axios'
import Config from '../config'

const BASE_URL = Config.BASE_URL
//const WebId = Config.WebId
export const loadParent = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_PARENT_PENDING' })
        return axios.get(`${BASE_URL}/menu/GetParentData`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_PARENT_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_PARENT_REJECTED', payload: err.message })
        })
    }
}

export const loadMenu = (Type) => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_MENU_PENDING' })
        return axios.get(`${BASE_URL}/menu/GetData?Id=${Type}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_MENU_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_MENU_REJECTED', payload: err.message })
        })
    }
}

export const loadMenuEdit = (Type) => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_MENUEDIT_PENDING' })
        return axios.get(`${BASE_URL}/menu/GetData?Id=${Type}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_MENUEDIT_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_MENUEDIT_REJECTED', payload: err.message })
        })
    }
}


export const loadMenuTree = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_MENUTREE_PENDING' })
        return axios.get(`${BASE_URL}/menu/GetTree`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_MENUTREE_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_MENUTREE_REJECTED', payload: err.message })
        })
    }
}


export const MenuSave = (values) => {
   
    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/menu/Save`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })
           
           if (results.data.Status===0) {
               dispatch({ type: 'SAVE_MENU_SUCCESS' })
               
           } else {
               dispatch({ type: 'SAVE_MENU_REJECTED', payload: results.data.Text })
           }
       
       }).catch(err => {
           //กรณี error
           dispatch({ type: 'SAVE_MENU_REJECTED', payload: err.Text })
       })
   }
}


export const MenuDelele = (values) => {
   
    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/menu/del`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })
           
           if (results.data.Status===0) {
               dispatch({ type: 'DEL_MENU_SUCCESS' })
               
           } else {
               dispatch({ type: 'DEL_MENU_REJECTED', payload: results.data.Text })
           }
       
       }).catch(err => {
           //กรณี error
           dispatch({ type: 'DEL_MENU_REJECTED', payload: err.Text })
       })
   }
}


export const PhotoSave = (values) => {
   
    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/menu/Save`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })
           
           if (results.data.Status===0) {
               dispatch({ type: 'SAVE_MENU_SUCCESS' })
               
           } else {
               dispatch({ type: 'SAVE_MENU_REJECTED', payload: results.data.Text })
           }
       
       }).catch(err => {
           //กรณี error
           dispatch({ type: 'SAVE_MENU_REJECTED', payload: err.Text })
       })
   }
}

/*
const formData = new FormData()
  formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
  axios.post('my-domain.com/file-upload', formData)

  */