import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Page404 = lazy(() => import('../pages/404'))
const FacultyDashboard = lazy(() => import('../pages/facultyhome'))
const ApproveRequest = lazy(() => import('../pages/ApproveRequest'))
const ApproveProof = lazy(() => import('../pages/ApprovedProof'))
const UploadReportForm = lazy(() => import('../pages/UploadReportForm'))
const TransportRequest = lazy(() => import('../pages/Transport'));
const TransportForm = lazy(() => import('../pages/TransportRequest'));
const UserManagement = lazy(() => import('../pages/Users'));
const Addnewusers = lazy(()=>import('../pages/AddNewUsers'))
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/faculty-dashboard', // the url
    component: FacultyDashboard, // view rendered
  },
  {
    path: '/manage-users', // the url
    component: UserManagement, // view rendered
  },
  {
    path: '/addnew-users', // the url
    component: Addnewusers, // view rendered
  },
  {
    path: '/approve-request', 
    component: ApproveRequest, 
  },
  {
    path: '/approve-report', 
    component: ApproveProof, 
  },
  {
    path: '/report-submission', 
    component: UploadReportForm, 
  },
  {
    path: '/transport-request', 
    component: TransportRequest, 
  },
  {
    path: '/transport-submit', 
    component: TransportForm, 
  },
  {
    path: '/forms',
    component: Forms,
  },
  
  {
    path: '/404',
    component: Page404,
  },

]

export default routes
