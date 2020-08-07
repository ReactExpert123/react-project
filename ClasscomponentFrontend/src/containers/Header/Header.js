import React , {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import classnames from "classnames";
import './style.css';
import Logo from '../../assets/img/brand/logo.png'

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
            <Navbar className={classnames("top", this.state.navbarColor)} expand="lg">
                
                <div className="navbar-translate">
                    <NavbarBrand
                        data-placement="bottom"
                        href="/home"
                        // target="_blank"
                        title="Coded by Creative Tim"
                    >
                        <img src = {Logo} alt = "Logo" />
                    </NavbarBrand>
                    <button
                        aria-expanded={this.state.navbarCollapse}
                        className={classnames("navbar-toggler navbar-toggler", {
                        toggled: this.state.navbarCollapse
                        })}
                        onClick={this.toggleNavbarCollapse}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <Collapse
                className="justify-content-end"
                navbar
                isOpen={this.state.navbarCollapse}
                >
                <Nav navbar>
                    
                    <NavItem>
                        <a href="/home">
                            <i className="nc-icon nc-book-bookmark" /> HOME
                        </a>
                    </NavItem>
                    <NavItem>
                        <a  href="/reviews">
                            <i className="nc-icon nc-book-bookmark" /> REVIEWS
                        </a>
                    </NavItem>
                    <NavItem>
                        <a href="/faq">
                            <i className="nc-icon nc-book-bookmark" /> FAQ
                        </a>
                    </NavItem>
                    <NavItem>
                        <a href="">
                            <i className="nc-icon nc-book-bookmark" />
                        </a>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default Header