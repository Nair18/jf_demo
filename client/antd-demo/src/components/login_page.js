import React, {Component} from 'react';
import '../App.css';
import ApiHandler from '../api_handler';
import {Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import constants from '../constants';
import {Button, Layout, Space, List, Avatar, Row, Col, message, Input, Dropdown, Menu, Icon,Card,Typography, Carousel,Modal,Form,Spin} from 'antd';
import { DownOutlined, UserOutlined, MessageOutlined, LikeOutlined,ExceptionOutlined,FileDoneOutlined, StarOutlined } from '@ant-design/icons';
const {Text, Title} = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export class LoginPage extends Component {
   constructor(props){
      super(props)
      this.state={
        select: 'select option',
        listData: null,
        url: `https://github.com/login/oauth/authorize?client_id=${constants.appd}`
      }
   }
   handleMenuClick = (e) => {
      this.setState({select: e.key})
      console.log('click', e);
   }
   
   handleSearch = (user_name) => {
      if(this.state.select === 'select option'){
          message.warning('please select the option to search');
          return;
      }
      let api = new ApiHandler(user_name, this.state.select);
      let response = api.route_requests()
      console.log(response)
      response.then(res => {
        console.log(res)
        if(res instanceof Array === false){
          res = [];
        }
        this.setState({listData: res})
      })
   }


  render(){
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="repository" icon={<UserOutlined />} selected={true}>
            All repositories
        </Menu.Item>
        <Menu.Item key="followers" icon={<UserOutlined />}>
            All followers
        </Menu.Item>
        <Menu.Item key="popular follower" icon={<UserOutlined />}>
            Most popular follower
        </Menu.Item>
      </Menu>
    );
    
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return(
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" style={{textAlign: 'right'}} >
            <Menu.Item key="1"><a href={this.state.url}>Sign in</a></Menu.Item>
            <Menu.Item key="2"><a href='/direct'>Direct Access</a></Menu.Item>
          </Menu>
        </Header>
        <Content style={{marginTop: '5%', textAlign: 'center'}}>
          <Title level={1}>GitFetch</Title>
        </Content>

        <Content style={{marginTop: '5%', backgroundColor: '#fff' }}>
          <Row style={{textAlign: 'center'}}>
            <Col style={{marginTop: '1%', marginLeft: '25%'}}>
              <Dropdown overlay={menu}>
                <Button size='large'>
                  {this.state.select} <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col style={{marginTop: '1%', textAlign: 'center'}}>
              <Search
                size='large'
                placeholder="Input username"
                onSearch={value => this.handleSearch(value)}
                style={{ width: 600 }}
              />
            </Col>    
          </Row>
          <Row style={{marginLeft: '40%'}}>
            <Text secondary>search for repos, followers and much more</Text>
          </Row>
          {this.state.listData != null ?
          <Row style={{marginTop: '3%'}}>
            <Col span={12} push={6}>
            <List
              itemLayout="vertical"
              size="large"
            pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 5,
            }}  
            dataSource={this.state.listData}
    
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text={item.stars} key="list-vertical-star-o" />,
                  <IconText icon={item.license === null ? ExceptionOutlined : FileDoneOutlined} text={item.license}/>,
                ]}
              >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.name}</a>}
                description={item.description}
              />
              {item.content}
              {item.created_at}
            </List.Item>
            )}
          />
            </Col>
          </Row> : null }
        </Content>

        <Footer style={{backgroundColor: '#fff', textAlign: 'center', paddingTop: '5%'}}>
          <Text>Powered by Karthik</Text>
        </Footer>
      </Layout>
    );
  }
}

