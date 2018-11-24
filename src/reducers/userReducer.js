//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    userSave: { data: null, isLoading: true, isRejected: false },
    userList: { data: null, isLoading: true, isRejected: false },
    userEdit: { data: null, isLoading: true, isRejected: false },
    usertypeList: {data: null, isLoading: true, isRejected: false},
    userDel:{data: null, isLoading: true, isRejected: false}
}

export default (state = initialState, action) => {
    switch (action.type) {

        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้งาน
        case 'SAVE_USER_SUCCESS':
            return { ...state, userSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_USER_REJECTED':
            return { ...state, userSave: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้
        case 'DEL_USER_SUCCESS':
        return { ...state, userDel: { data: null, isLoading: false, isRejected: false } }
        case 'DEL_USER_REJECTED':
        return { ...state, userDel: { data: action.payload, isLoading: false, isRejected: true } }

         //เก็บ state การดึงข้อมูล ผู้ใช้งาน
         case 'LOAD_USER_PENDING':
         return { ...state, userList: { dataUser: null, isLoadingUser: false, isRejectedUser: false } }
         case 'LOAD_USER_SUCCESS':
         return { ...state, userList: { dataUser: action.payload, isLoadingUser: false, isRejectedUser: false } }
         case 'LOAD_USER_REJECTED':
         return { ...state, userList: { dataUser: action.payload, isLoadingUser: false, isRejectedUser: true } }

         //เก็บ state การดึงข้อมูล ผู้ใช้งาน มาแก้ไข
         case 'LOAD_USEREDIT_PENDING':
         return { ...state, userEdit: { dataEdit: null, isLoadingEdit: true, isRejectedEdit: false } }
         case 'LOAD_USEREDIT_SUCCESS':
         return { ...state, userEdit: { dataEdit: action.payload, isLoadingEdit: false, isRejectedEdit: false } }
         case 'LOAD_USEREDIT_REJECTED':
         return { ...state, userEdit: { dataEdit: action.payload, isLoadingEdit: false, isRejectedEdit: true } }

          //เก็บ state การดึงข้อมูล ผู้ใช้งาน มาแก้ไข
          case 'LOAD_USERTYPE_PENDING':
          return { ...state, usertypeList: { data: null, isLoading: true, isRejected: false } }
          case 'LOAD_USERTYPE_SUCCESS':
          return { ...state, usertypeList: { data: action.payload, isLoading: false, isRejected: false } }
          case 'LOAD_USERTYPE_REJECTED':
          return { ...state, usertypeList: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}
