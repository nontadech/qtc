import axios from 'axios'
import Config from '../config'

const BASE_URL = Config.BASE_URL
export const loadPR = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_PR_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetList`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_PR_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_PR_REJECTED', payload: err.message })
        })
    }
}


export const loadPREdit = (Id) => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_PREDIT_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetData?Id=${Id}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_PREDIT_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_PREDIT_REJECTED', payload: err.message })
        })
    }
}

export const loadSubDoc = (IdSubDoc) => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_SUBDOC_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetOpenNew?Id=${IdSubDoc}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_SUBDOC_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_SUBDOC_REJECTED', payload: err.message })
        })
    }
}

export const loadCostCenterBy = (IdSubDoc) => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_COSTCODE_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetCostCenterBy?Find=${IdSubDoc}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_COSTCODE_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_COSTCODE_REJECTED', payload: err.message })
        })
    }
}

export const loadCostCenter = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_COSTCENTER_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetCostCenter`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_COSTCENTER_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_COSTCENTER_REJECTED', payload: err.message })
        })
    }
}

export const loadItem = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_ITEM_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetItem`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_ITEM_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_ITEM_REJECTED', payload: err.message })
        })
    }
}

export const loadUser = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_USER_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetUser`, {
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


export const loadUnit = () => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_UNIT_PENDING' })
        return axios.get(`${BASE_URL}/pr/GetUnit`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            
            dispatch({ type: 'LOAD_UNIT_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_UNIT_REJECTED', payload: err.message })
        })
    }
}

export const PRSave = (values) => {
   
    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/pr/Save`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })
           
           if (results.data.Status===0) {
               dispatch({ type: 'SAVE_PR_SUCCESS' })
               
           } else {
               dispatch({ type: 'SAVE_PR_REJECTED', payload: results.data.Text })
           }
       
       }).catch(err => {
           //กรณี error
           dispatch({ type: 'SAVE_PR_REJECTED', payload: err.Text })
       })
   }
}


export const PRDelele = (values) => {
   
    return (dispatch) => {
       //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
       //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
       return axios({
           method: 'post',
           url: `${BASE_URL}/pr/del`,
           data: values
           ,
           headers: [{ 'content-type': 'application/json', 'Accept': 'application/json'},{ 'X-Signature': 'Signature' }]
       }).then(results => {
           //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
           //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
           //dispatch({ type: 'SAVE_USER_SUCCESS' })
           
           if (results.data.Status===0) {
               dispatch({ type: 'DEL_PR_SUCCESS' })
               
           } else {
               dispatch({ type: 'DEL_PR_REJECTED', payload: results.data.Text })
           }
       
       }).catch(err => {
           //กรณี error
           dispatch({ type: 'DEL_PR_REJECTED', payload: err.Text })
       })
   }
}