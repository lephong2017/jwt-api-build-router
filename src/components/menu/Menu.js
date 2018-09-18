import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const menus = [
    {
        name: 'Organ',
        to: '/organ',
        exact: true
    },
    {
        name : 'Category',
        to : '/cate-list',
        exact : false
    },
    {
        name : 'Products',
        to : '/product-list',
        exact : false
    },
    {
        name : 'Home',
        to : '/home',
        exact : false
    },
    // {
    //     name : 'Identity',
    //     to : '/security-api',
    //     exact : false
    // },
   
]

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? 'active' : '';
            return (
                <li className={`${active}`}>
                    <Link to={to} className="my-link" onClick={()=>{
                        history.push({pathname:`${to}`});
                        }}> 
                        {label}
                    </Link>
                </li>
            )
        }} />
    )
}

class Menu extends Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                    {this.showMenus(menus)}
                </ul>
            </nav>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                )
            });
        }
        return result;
    }

}

export default Menu;
