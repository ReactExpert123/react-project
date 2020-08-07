import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Player } from 'video-react';

import WebRoute from './routes/WebRoute';
import AdminRoute from './routes/AdminRoute';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isAdminPath: false,
            loading: false
        }
    }

    componentDidMount() {
        const isAdminPath = window.location.href.includes('admin');
        this.setState({isAdminPath: isAdminPath});
    }

    render() {
      return (
        <BrowserRouter>
            <React.Suspense fallback={loading()}>             
                {this.state.isAdminPath ? <AdminRoute /> : <WebRoute/>}
            </React.Suspense>
        </BrowserRouter>
      );
    }
  }
  
  export default App;