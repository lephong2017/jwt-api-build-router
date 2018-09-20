import { Popover,Checkbox, Button,Row,Col ,Icon,Tooltip } from 'antd';
import React from 'react';
import {ListOfRole,fullRole,abcd} from '../exampledata/data';
export default class App extends React.Component {
  state = {
    visible: false,
    edit:false,
    listRole:[],
    checkBoxRole:[],  
  }
  componentWillMount(){ 
      
      this.setState({listRole:ListOfRole});
  }
  addRole=()=>{
        this.setState({edit:!this.state.edit});
        var {listRole,checkBoxRole}= this.state;
        checkBoxRole.map((val,ind)=>{
            return (!listRole.includes(val))? listRole.push(val):  null;
        })
        this.setState({listRole:[...listRole]});
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  onChange=(e)=> {
    var arr=[];
    var checkedObj ={
        name:e.target.value,
        description:e.target.value,
    }
    arr.push(checkedObj);
    this.setState({checkBoxRole:arr});
  }
  render() {
    abcd();
    var {isDisabled} = this.props;
    const {edit,listRole} =this.state;
    const ContentEditRole =(
        <div>
            <h3>Quyền hiện tại: </h3>
            <Row type="flex" justify="center">
                {
                    listRole.map((val,ind)=>{
                        return (<Col  key={ind}>
                            <Tooltip placement="leftBottom" title={val.description}>
                                <Button>{val.name}</Button>
                            </Tooltip>
                        </Col>
                        )
                    })
                }
                {
                    (edit)?
                    (
                        <Button onClick={this.addRole} type="primary" >
                            <Icon type="edit" theme="outlined" /> Save
                        </Button>
                    )
                    :
                    (
                        <Button onClick={()=>this.setState({edit:!this.state.edit})} type="primary" >
                            <Icon type="edit" theme="outlined" /> Edit
                        </Button>
                    )
                }
            </Row>
            {
                (edit)?
                (
                    <Row>
                        {
                            fullRole.map((val,ind)=>{
                               let check =listRole.includes(val);
                            return (<div key={ind}>
                                <Col span={12}><Checkbox onChange={this.onChange} defaultChecked={check} value={val.name}>{val.name}</Checkbox></Col>
                            </div>
                                ) 
                            })
                        }
                    </Row>
                )
                :
                (
                    <div></div>
                )
            }
            <a onClick={this.hide}>Close</a>
        </div>
    );
    if(this.props.acttype==='SET_ROLE'){
        return (
          <div>
            <Popover
                content={ContentEditRole}
                title="Cài đặt quyền cho user"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                overlayStyle={{
                    width: "55vh"
                }}
            >
                <Button disabled={isDisabled}  type="success" shape="circle" icon="idcard" />
            </Popover>
          </div>
        );
      }
  }
}
