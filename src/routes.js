import App from './App2'
//import RequireAuth from './auth'


import forgotPass from './forgotpass'
import Layout from './pages/layout'
import User from './pages/user'
import Menu from './pages/menu'
import IndexPage from './pages/index'
import PR from './pages/pr'
import SubDoc from './pages/subdoc'
import Approve from './pages/approve'
import Home from './pages/home'
import Bidding from './pages/bidding'

const routes = [{
    path : '/',
    component : App,
    indexRoute : { component : Home },
    childRoutes : [
        { path : 'pr/:id', component: PR },
        { path : 'user', component: User },
        { path : 'menu', component: Menu },
        { path : 'DocAutorun', component: SubDoc },
        { path : 'Approve', component:Approve},
        { path : 'Bidding', component:Bidding}
  
  ]
}]

export default routes