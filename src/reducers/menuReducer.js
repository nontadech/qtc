//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    menuSave: { data: null, isLoading: true, isRejected: false },
    menuParent: { data: null, isLoading: true, isRejected: false },
    menuList: { dataMenu: null, isLoadingMenu: true, isRejectedMenu: false },
    menuTree: { dataMenuTree: null, isLoadingMenuTree: true, isRejectedMenuTree: false },
    menuEdit: { dataMenuEdit: null, isLoadingMenuEdit: true, isRejectedMenuEdit: false },
    menuDel: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้
        case 'SAVE_MENU_SUCCESS':
            return { ...state, menuSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_MENU_REJECTED':
            return { ...state, menuSave: { data: action.payload, isLoading: false, isRejected: true } }

            //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้
        case 'DEL_MENU_SUCCESS':
        return { ...state, menuDel: { data: null, isLoading: false, isRejected: false } }
        case 'DEL_MENU_REJECTED':
        return { ...state, menuDel: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม
        case 'LOAD_PARENT_PENDING':
        return { ...state, menuParent: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_PARENT_SUCCESS':
        return { ...state, menuParent: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_PARENT_REJECTED':
        return { ...state, menuParent: { data: action.payload, isLoading: false, isRejected: true } }

         //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม
         case 'LOAD_MENU_PENDING':
         return { ...state, menuList: { dataMenu: null, isLoadingMenu: true, isRejectedMenu: false } }
         case 'LOAD_MENU_SUCCESS':
         return { ...state, menuList: { dataMenu: action.payload, isLoadingMenu: false, isRejectedMenu: false } }
         case 'LOAD_MENU_REJECTED':
         return { ...state, menuList: { dataMenu: action.payload, isLoadingMenu: false, isRejectedMenu: true } }

         //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม
         case 'LOAD_MENUTREE_PENDING':
         return { ...state, menuTree: { dataMenuTree: null, isLoadingMenuTree: true, isRejectedMenuTree: false } }
         case 'LOAD_MENUTREE_SUCCESS':
         return { ...state, menuTree: { dataMenuTree: action.payload, isLoadingMenuTree: false, isRejectedMenuTree: false } }
         case 'LOAD_MENUTREE_REJECTED':
         return { ...state, menuTree: { dataMenuTree: action.payload, isLoadingMenuTree: false, isRejectedMenuTree: true } }


         //เก็บ state การดึงข้อมูลรายการแจ้งซ่อม
         case 'LOAD_MENUEDIT_PENDING':
         return { ...state, menuEdit: { dataMenuEdit: null, isLoadingMenuEdit: true, isRejectedMenuEdit: false } }
         case 'LOAD_MENUEDIT_SUCCESS':
         return { ...state, menuEdit: { dataMenuEdit: action.payload, isLoadingMenuEdit: false, isRejectedMenuEdit: false } }
         case 'LOAD_MENUEDIT_REJECTED':
         return { ...state, menuEdit: { dataMenuEdit: action.payload, isLoadingMenuEdit: false, isRejectedMenuEdit: true } }

        default:
            return state
    }
}