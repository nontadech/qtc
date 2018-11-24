//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    getUserId:{data:null},
    getPhoto:{data:null},
    getWebId:{data:null},
    getLineId:{data:null},
    getCredit: { data: null, isLoading: true, isRejected: false },
    getPoint: { data: null, isLoading: true, isRejected: false },
    InitialHome: { data: null, isLoading: false, isRejected: false }
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        //เก็บ state การดึงข้อมูลเครดิต
        case 'LOAD_CREDIT_PENDING':
        return { ...state, getCredit: { data: null, isLoading: true, isRejected: false } }
       case 'LOAD_CREDIT_SUCCESS':
        return { ...state, getCredit: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_POINT_SUCCESS':
        return { ...state, getPoint: { data: action.payload, isLoading: false, isRejected: false } }
    
        case 'LOAD_CREDIT_REJECTED':
        return { ...state, getCredit: { data: action.payload, isLoading: false, isRejected: true } }


         //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม
         case 'LOAD_INI_PENDING':
         return { ...state, InitialHome: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_INI_SUCCESS':
         return { ...state, InitialHome: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_INI_REJECTED':
         return { ...state, InitialHome: { data: action.payload, isLoading: false, isRejected: true } }



        // ค่าเริ่มต้อนของารทำงาน
        case 'SET_USERID':
        return { ...state, getUserId: { data: action.payload } }

         // ค่าเริ่มต้อนของารทำงาน
         case 'SET_PHOTO':
         return { ...state, getPhoto: { data: action.payload } }

          // ค่าเริ่มต้อนของารทำงาน
        case 'SET_WEBID':
        return { ...state, getWebId: { data: action.payload } }

         // ค่าเริ่มต้อนของารทำงาน
         case 'SET_LINEID':
         return { ...state, getLineId: { data: action.payload } }
          
        default:
            return state
    }
}