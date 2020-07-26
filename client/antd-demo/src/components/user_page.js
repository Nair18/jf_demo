import React, {Component} from 'react';
import '../App.css';
import ApiHandler from '../api_handler';
import {Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import constants from '../constants';
import {Layout, Result, message} from 'antd';
import { DownOutlined, UserOutlined, MessageOutlined, SmileOutlined, LikeOutlined,ExceptionOutlined,FileDoneOutlined, StarOutlined } from '@ant-design/icons';


export class UserPage extends Component {
   constructor(props){
      super(props)
      this.state={
        select: 'select option',
        listData: null,
      }
   }

   componentDidMount(){
    const token = window.localStorage.getItem('token') 
    fetch('https://github.com/login/oauth/access_token', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      }
    }).then(response => {
      if(response.status != 200){
        message.danger('something went wrong')
        return;
      }
      else{
        response.json().then(res => {
          console.log(res)
          this.setState({userData: res})
        })
      }
    })
   }

   render(){
    return(
      <Layout style={{backgroundColor: '#fff'}}>
      <Result
        icon={<SmileOutlined />}
        title="Authorizing, Please wait. Redirect ...."
      />
      </Layout>
    );
  }
}

