import App from './App2'
//import RequireAuth from './auth'


import forgotPass from './forgotpass'
import Layout from './pages/layout'
import User from './pages/user'
import Menu from './pages/menu'
import IndexPage from './pages/index'
import PR from './pages/pr'
import SubDoc from './pages/subdoc'
import ApprovePage from './pages/approve'


const routes = [{
    path : '/',
    component : App,
    indexRoute : { component : PR },
    childRoutes : [
        { path : 'turnover/detail/:id', component: forgotPass },
        { path : 'user', component: User },
        { path : 'menu', component: Menu },
        { path : 'DocAutorun', component: SubDoc },
        { path : 'approve', component: ApprovePage },

  ]
}]

export default routes
