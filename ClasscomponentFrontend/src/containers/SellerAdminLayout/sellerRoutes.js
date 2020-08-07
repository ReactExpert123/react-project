import React from 'react';

const Dashboard = React.lazy(() => import('./../../views/admin/SellerAdmin/Dashboard'));
const PupStoreList = React.lazy(() => import('../../views/admin/SellerAdmin/PupStoreList'));
const PupSoldList = React.lazy(() => import('../../views/admin/SellerAdmin/PupSoldList'));
const PupOrderdList = React.lazy(() => import('../../views/admin/SellerAdmin/PupOrderdList'));
const Message = React.lazy(() => import('../../views/admin/SellerAdmin/Message'));
const PupAdd = React.lazy(() => import('../../views/admin/SellerAdmin/PupAdd'));
const PupEdit = React.lazy(() => import('../../views/admin/SellerAdmin/PupEdit'));
const PupDetail = React.lazy(() => import('../../views/admin/SellerAdmin/PupDetail'));
const Review = React.lazy(() => import('../../views/admin/SellerAdmin/Reviews'));
const Customer = React.lazy(() => import('../../views/admin/SellerAdmin/Customers'));
const AllData = React.lazy(() => import('../../views/admin/SellerAdmin/AllData'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const sellerRoutes = [
  // { path: '/admin/dashboard', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/dashboard?status=key', name: 'Dashboard', component: Dashboard },

  // { path: '/admin/pup', exact: true, name: 'Pup', component: PupStoreList },
  { path: '/admin/pup/store',exact: true, name: 'Store', component: PupStoreList },
  { path: '/admin/pup/add', name: 'Add', component: PupAdd },
  { path: '/admin/pup/edit/:id', name: 'Edit', component: PupEdit },
  { path: '/admin/pup/detail/:id', name: 'Detail', component: PupDetail },

  { path: '/admin/pup/sold', name: 'Sold', component: PupSoldList },
  { path: '/admin/pup/ordered', name: 'Ordered', component: PupOrderdList },
  { path: '/admin/message', exact: true, name: 'Message', component: Message },
  { path: '/admin/reviewData/:id', name: 'Review', component: Review },
  { path: '/admin/customer', name: 'Customer', component: Customer },
  { path: '/admin/hideData', name: 'aaa', component: AllData },
  { path: '/admin/payment', name: 'Payment', component: PupStoreList },

];

export default sellerRoutes;
