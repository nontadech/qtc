//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    prSave: { data: null, isLoading: true, isRejected: false },
    prList: { dataList: null, isLoadingList: true, isRejectedList: false },
    prEdit: { dataEdit: null, isLoadingEdit: true, isRejectedEdit: false },
    userList: { dataUser: null, isLoadingUser: true, isRejectedUser: false },
    unitList: { dataUnit: null, isLoadingUnit: true, isRejectedUnit: false },
    itemList: { dataItem: null, isLoadingItem: true, isRejectedItem: false },
    subdocList: { dataSubdoc: null, isLoadingSubdoc: true, isRejectedSubdoc: false },
    costList: { dataCost: null, isLoadingCost: true, isRejectedCost: false },
    costCodeList: { dataCostcode: null, isLoadingCostcode: true, isRejectedCostcode: false },
    prDel:{data: null, isLoading: true, isRejected: false}
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้งาน
        case 'SAVE_PR_SUCCESS':
            return { ...state, prSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_PR_REJECTED':
            return { ...state, prSave: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้
        case 'DEL_PR_SUCCESS':
        return { ...state, prDel: { data: null, isLoading: false, isRejected: false } }
        case 'DEL_PR_REJECTED':
        return { ...state, prDel: { data: action.payload, isLoading: false, isRejected: true } }

         //เก็บ state การดึงข้อมูล ผู้ใช้งาน
         case 'LOAD_PR_PENDING':
         return { ...state, prList: { dataList: null, isLoadingList: false, isRejectedList: false } }
         case 'LOAD_PR_SUCCESS':
         return { ...state, prList: { dataList: action.payload, isLoadingList: false, isRejectedList: false } }
         case 'LOAD_PR_REJECTED':
         return { ...state, prList: { dataList: action.payload, isLoadingList: false, isRejectedList: true } }

         //เก็บ state การดึงข้อมูล ผู้ใช้งาน มาแก้ไข
         case 'LOAD_PREDIT_PENDING':
         return { ...state, prEdit: { dataEdit: null, isLoadingEdit: true, isRejectedEdit: false } }
         case 'LOAD_PREDIT_SUCCESS':
         return { ...state, prEdit: { dataEdit: action.payload, isLoadingEdit: false, isRejectedEdit: false } }
         case 'LOAD_PREDIT_REJECTED':
         return { ...state, prEdit: { dataEdit: action.payload, isLoadingEdit: false, isRejectedEdit: true } }

          //เก็บ state การดึงข้อมูล ผู้ใช้งาน มาแก้ไข
          case 'LOAD_USER_PENDING':
          return { ...state, userList: { dataUser: null, isLoadingUser: true, isRejectedUser: false } }
          case 'LOAD_USER_SUCCESS':
          return { ...state, userList: { dataUser: action.payload, isLoadingUser: false, isRejectedUser: false } }
          case 'LOAD_USER_REJECTED':
          return { ...state, userList: { dataUser: action.payload, isLoadingUser: false, isRejectedUser: true } }

          case 'LOAD_UNIT_PENDING':
          return { ...state, unitList: { dataUnit: null, isLoadingUnit: true, isRejectedUnit: false } }
          case 'LOAD_UNIT_SUCCESS':
          return { ...state, unitList: { dataUnit: action.payload, isLoadingUnit: false, isRejectedUnit: false } }
          case 'LOAD_UNIT_REJECTED':
          return { ...state, unitList: { dataUnit: action.payload, isLoadingUnit: false, isRejectedUnit: true } }


          case 'LOAD_ITEM_PENDING':
          return { ...state, itemList: { dataItem: null, isLoadingItem: true, isRejectedItem: false } }
          case 'LOAD_ITEM_SUCCESS':
          return { ...state, itemList: { dataItem: action.payload, isLoadingItem: false, isRejectedItem: false } }
          case 'LOAD_ITEM_REJECTED':
          return { ...state, itemList: { dataItem: action.payload, isLoadingItem: false, isRejectedItem: true } }

            //เก็บ state การดึงข้อมูล ผู้ใช้งาน
         case 'LOAD_SUBDOC_PENDING':
         return { ...state, subdocList: { dataSubdoc: null, isLoadingSubdoc: false, isRejectedSubdoc: false } }
         case 'LOAD_SUBDOC_SUCCESS':
         return { ...state, subdocList: { dataSubdoc: action.payload, isLoadingSubdoc: false, isRejectedSubdoc: false } }
         case 'LOAD_SUBDOC_REJECTED':
         return { ...state, subdocList: { dataSubdoc: action.payload, isLoadingSubdoc: false, isRejectedSubdoc: true } }

          //เก็บ state การดึงข้อมูล ผู้ใช้งาน
          case 'LOAD_COSTCENTER_PENDING':
          return { ...state, costList: { dataCost: null, isLoadingCost: false, isRejectedCost: false } }
          case 'LOAD_COSTCENTER_SUCCESS':
          return { ...state, costList: { dataCost: action.payload, isLoadingCost: false, isRejectedCost: false } }
          case 'LOAD_COSTCENTER_REJECTED':
          return { ...state, costList: { dataCost: action.payload, isLoadingCost: false, isRejectedCost: true } }

          //เก็บ state การดึงข้อมูล ผู้ใช้งาน
          case 'LOAD_COSTCODE_PENDING':
          return { ...state, costCodeList: { dataCostcode: null, isLoadingCostcode: false, isRejectedCostcode: false } }
          case 'LOAD_COSTCODE_SUCCESS':
          return { ...state, costCodeList: { dataCostcode: action.payload, isLoadingCostcode: false, isRejectedCostcode: false } }
          case 'LOAD_COSTCODE_REJECTED':
          return { ...state, costCodeList: { dataCostcode: action.payload, isLoadingCostcode: false, isRejectedCostcode: true } }

        default:
            return state
    }
}