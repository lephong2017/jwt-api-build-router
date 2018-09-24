import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,withRouter } from 'react-router-dom';
// import {PrivateRoute} from 'components/RouterProtected/PrivateRoute'
import {adminRoutes} from '../routes';
import Menu from '../components/menu/Menu';
import {setScopeAccess} from 'redux/categoryManagement/actions/cates';
import { connect } from 'react-redux';
// import {USERS} from 'settings/sessionStorage';
class App extends Component {
    componentDidMount(){
        // var ss =sessionStorage.getItem(USERS);
        // var obj = JSON.parse(ss);
        // if(ss!==null){
        //     this.props.setScopeOfUser(obj.profile['name']);
        // } 
       
    }
    render() {
        return (
            <Router >
                <div className="container-crud">
                    <Menu />
                    {
                        // this.props.scopeOfUser.includes("PRODUCT.WRITE")||this.props.scopeOfUser.includes("CATE.WRITE")?
                        this.showContentMenus(adminRoutes)
                        // this.showContentMenus(userRoutes)
                    }
                </div>
            </Router>
        );
    }

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            var that =this;
            result = routes.map((route, index) => {
                // console.log(that.props.history);
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        history={that.props.history}
                        component={route.main}
                    />
                );
            });
            
        }
        return <Switch>{result}</Switch>;
    }

}
const mapStateToProps = state => {
    return {
        scopeOfUser : state.scopeOfUser,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setScopeOfUser: (scope) => {
            dispatch(setScopeAccess(scope));
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
