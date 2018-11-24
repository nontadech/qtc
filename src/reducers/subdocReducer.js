//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    subdocSave: { data: null, isLoading: true, isRejected: false },
    subdocList: { data: null, isLoading: true, isRejected: false },
    subdocEdit: { data: null, isLoading: true, isRejected: false },
    subdoctypeList: {data: null, isLoading: true, isRejected: false},
    subdocDel:{data: null, isLoading: true, isRejected: false}
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้งาน
        case 'SAVE_SUBDOC_SUCCESS':
            return { ...state, subdocSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_SUBDOC_REJECTED':
            return { ...state, subdocSave: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้
        case 'DEL_SUBDOC_SUCCESS':
        return { ...state, subdocDel: { data: null, isLoading: false, isRejected: false } }
        case 'DEL_SUBDOC_REJECTED':
        return { ...state, subdocDel: { data: action.payload, isLoading: false, isRejected: true } }

         //เก็บ state การดึงข้อมูล ผู้ใช้งาน
         case 'LOAD_SUBDOC_PENDING':
         return { ...state, subdocList: { dataSubdoc: null, isLoadingSubdoc: false, isRejectedSubdoc: false } }
         case 'LOAD_SUBDOC_SUCCESS':
         return { ...state, subdocList: { dataSubdoc: action.payload, isLoadingSubdoc: false, isRejectedSubdoc: false } }
         case 'LOAD_SUBDOC_REJECTED':
         return { ...state, subdocList: { dataSubdoc: action.payload, isLoadingSubdoc: false, isRejectedSubdoc: true } }

         //เก็บ state การดึงข้อมูล ผู้ใช้งาน มาแก้ไข
         case 'LOAD_SUBDOCEDIT_PENDING':
         return { ...state, subdocEdit: { dataEdit: null, isLoadingEdit: true, isRejectedEdit: false } }
         case 'LOAD_SUBDOCEDIT_SUCCESS':
         return { ...state, subdocEdit: { dataEdit: action.payload, isLoadingEdit: false, isRejectedEdit: false } }
         case 'LOAD_SUBDOCEDIT_REJECTED':
         return { ...state, subdocEdit: { dataEdit: action.payload, isLoadingEdit: false, isRejectedEdit: true } }

          //เก็บ state การดึงข้อมูล ผู้ใช้งาน มาแก้ไข
          case 'LOAD_SUBDOCTYPE_PENDING':
          return { ...state, subdoctypeList: { data: null, isLoading: true, isRejected: false } }
          case 'LOAD_SUBDOCTYPE_SUCCESS':
          return { ...state, subdoctypeList: { data: action.payload, isLoading: false, isRejected: false } }
          case 'LOAD_SUBDOCTYPE_REJECTED':
          return { ...state, subdoctypeList: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}