import axios from 'axios'
import Config from '../config'

const BASE_URL = Config.BASE_URL

// โหลดค่า state เริ่มต้อนของการทำงาน
export const setUserId = (values) => {
    return (dispatch) => {
        dispatch({ type: 'SET_USERID' ,payload:values})
    }
}

// โหลดค่า state เริ่มต้อนของการทำงาน
export const setPhoto = (values) => {
    return (dispatch) => {
        dispatch({ type: 'SET_PHOTO' ,payload:values})
    }
}

// โหลดค่า state เริ่มต้อนของการทำงาน
export const setWebId = (values) => {
    return (dispatch) => {
        dispatch({ type: 'SET_WEBID' ,payload:values})
    }
}

// โหลดค่า state เริ่มต้อนของการทำงาน
export const setLineId = (values) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LINEID' ,payload:values})
    }
}