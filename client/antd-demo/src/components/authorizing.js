import React, {Component} from 'react';
import '../App.css';
import ApiHandler from '../api_handler';
import {Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import constants from '../constants';
import {Layout, Result, message} from 'antd';
import { DownOutlined, UserOutlined, MessageOutlined, SmileOutlined, LikeOutlined,ExceptionOutlined,FileDoneOutlined, StarOutlined } from '@ant-design/icons';


export class Authorizing extends Component {
   constructor(props){
      super(props)
      this.state={
        redirect: false
      }
   }

   componentDidMount(){
    let cod = this.props.match.params.code
    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         client_id: constants.appd,
         client_secret: constants.appc,
         code: cod
      })
    }).then(response => {
      if(response.status != 200){
        message.danger('something went wrong')
        return;
      }
      else{
        response.json().then(res => {
          window.localStorage.setItem('token', res['access_token'])
          this.setState({redirect: true})
        })
      }
    })
   }

   render(){
    return(
      (this.state.redirect ? <Redirect to='/user'/> : 
      <Layout style={{backgroundColor: '#fff'}}>
      <Result
        icon={<SmileOutlined />}
        title="Authorizing, Please wait. Redirect .... There is cors issue. For demo please use the direct link on the home page navigation bar"
      />
      </Layout>)
    );
  }
}

