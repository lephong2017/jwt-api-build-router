import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { Button } from 'antd';
class MyButton extends Component{
  constructor(props){
    super(props)
    this.state={
      propsDemo:PropTypes.object.isRequired,
    }
  }


  render(){
    var { ID,obj,pagination,isDisabled} = this.props;
    if(this.props.acttype==='ADD') {
      return (
        <div>
          <Button disabled={isDisabled} onClick={()=>this.props.onClick} type="primary" shape="circle" icon="add" />
        </div>
      );
    }
    if(this.props.acttype==='EDIT'){
      if(ID!==undefined&&!isDisabled){
        return (
          <div>
            <Link to={`/${obj}/${ID}/${pagination}/edit`} >
                <Button disabled={isDisabled} onClick={()=>this.props.onClick} type="primary" shape="circle" icon="edit" />
            </Link> 
          </div>
        );
      }else
      if(ID!==undefined){
        return (
          <div>
              <Button disabled={isDisabled} onClick={()=>this.props.onClick}  type="primary" shape="circle" icon="edit" />
          </div>
        );
      }else return (
      <div>
        <Button disabled={isDisabled} onClick={()=>this.props.onClick}  type="primary" shape="circle" icon="edit" />
      </div>);
    }
    if(this.props.acttype==='DELETE'){
      return (
        <div>
          <Button disabled={isDisabled} onClick={()=>{this.props.onClickComponent();}}  type="danger" shape="circle" icon="delete" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
      products: state.products,
      saveCateCode:state.saveCateCode,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyButton);
