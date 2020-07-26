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
const { Search,TextArea } = Input;

export class DirectPage extends Component {
   constructor(props){
      super(props)
      this.state={
        select: 'select option',
        repoData: [],
        visible: false,
        visible2: false,
        repo_name: "",
        value: "",
        title: ""
      }
   }

   componentDidMount(){
    //const token = window.localStorage.getItem('token') 
    fetch(constants.base_url + '/repos/Nair18/', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if(response.status != 200){
        message.danger('something went wrong')
        return;
      }
      else{
        response.json().then(res => {
          console.log(res)
          this.setState({repoData: res})
        })
      }
    })
   }
   handleOk = () => {
      message.info("Doesnt work, Sorry!!!!")
      let token = constants.at
      fetch(constants.github_url + `/repos/Nair18/${this.state.title}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': `token ${token}`
        },
        body: JSON.stringify({
          description: this.state.value,
        })
      }).then(response => {
        this.setState({visible: false})
        response.json().then(res => console.log(res))
      })
  }

  handleOk2 = () => {
      message.info("Doesnt work, Sorry!!!!")
      let token = constants.at
      fetch(constants.github_url + `/repos/Nair18/${this.state.title}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': `token ${token}`
        },
        body: JSON.stringify({
          description: this.state.value,
        })
      }).then(response => {
        this.setState({visible: false})
        response.json().then(res => console.log(res))
      })
  }
  onCreateButtonClick = () => {
    this.setState({visible2: true})
  }

  handleCancel = () => {
    this.setState({visible: false})
  }

  handleCancel2 = () => {
    this.setState({visible2: false})
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  onChange2 = ({ target: { value } }) => {
    this.setState({ repo_name: value });
  }

  onEditClick = (repo,content) => {
      console.log(repo)
      console.log(content)
      if(content === null){
        content = ""
      }
      this.setState({value: content, title: repo}, () => {this.setState({visible: true})})
   }
   render(){
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return(
      <Layout style={{backgroundColor: '#fff'}}>
      <Row style={{marginTop: '3%'}}>
        <Col span={12} push={6}>
          <Text level={1}> Showing repos of user @Nair18</Text>
        </Col>
        <Col push={3}>
          <Button onClick={this.onCreateButtonClick}>Create new repo</Button>
        </Col>
      </Row>
      <Row style={{marginTop: '3%', marginBottom: '3%'}}>
            <Col span={12} push={6}>
            <List
              itemLayout="vertical"
              size="large"
            pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 10,
            }}  
            dataSource={this.state.repoData}
    
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text={item.stars} key="list-vertical-star-o" />,
                  <IconText icon={item.license === null ? ExceptionOutlined : FileDoneOutlined} text={item.license}/>,
                  <Button warning onClick={() => this.onEditClick(item.name, item.description)}>Edit</Button>
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
          </Row>
          <Modal
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <TextArea rows={4} placeholder="Type description" value={this.state.value} onChange={this.onChange}/>
          </Modal>
          <Modal
            title="Create a new repo"
            visible={this.state.visible2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
          >
            <Row style={{margin: '2%'}}>
            <Input value={this.state.repo_name} placeholder="Type repository name here" onChange={this.onChange2}/>
            </Row>
            <Row style={{margin: '2%'}}>
            <TextArea rows={4} placeholder="Type description" value={this.state.value} onChange={this.onChange}/>
            </Row>
          </Modal>
      </Layout>
      
    );
  }
}

