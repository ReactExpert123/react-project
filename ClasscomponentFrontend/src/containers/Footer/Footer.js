import React , {Component} from 'react';

import './style.css'

class Header extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            navbarColor : "navbar-transparent",
            navbarCollapse : false
        }
    }
    toggleNavbarCollapse = () => {
        this.setState({
            navbarCollapse : true
        })
        document.documentElement.classList.toggle("nav-open");
    };
    
    render(){
        return (
            <div className="footer-copyright text-center py-3">
               
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Pupcommerce.com </a>
                
            </div>
        )
    }
}

export default Header