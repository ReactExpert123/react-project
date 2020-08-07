import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from './_sellerNav';
import adminnavigation from './_sellerAdminNav';
// routes config
import routes from './sellerRoutes';

// const SellerAside = React.lazy(() => import('./SellerAside'));
const SellerFooter = React.lazy(() => import('./SellerFooter'));
const SellerHeader = React.lazy(() => import('./SellerHeader'));

class SellerAdminLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    localStorage.removeItem('api_token');
    this.props.history.push('/admin')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <SellerHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            {localStorage.getItem("username") === "Super Admin"?<AppSidebarNav navConfig={ adminnavigation } {...this.props} router={router}/>:<AppSidebarNav navConfig={ navigation } {...this.props} router={router}/>} 
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/admin/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <SellerAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <SellerFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default SellerAdminLayout;
