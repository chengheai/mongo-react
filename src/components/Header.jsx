import React from 'react';
import { Link } from 'dva/router';
import { Icon, Layout, Menu, Dropdown } from 'antd';
const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/'>
        <Icon style={{marginRight: 5}} type="logout" />
        <span>logout</span>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" href='https://github.com/chengheai/mongo-react'>
        <Icon style={{marginRight: 5}} type="github" />
        <span>github</span>
      </a>
    </Menu.Item>
  </Menu>
);
class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }
  componentDidMount() {
   const username =  sessionStorage.getItem('guest');
   this.setState({
    username
   })
  }
  render() {
    return (
      <Header>
        <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{ color: '#fff' }}>LOGO</h1>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" style={{fontSize: 18, color: '#fff'}}>
              <Icon type="user" style={{fontSize: 18, marginRight: 5}} />
              {this.state.username} <Icon type="down" style={{fontSize: 16}} />
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
};

HeaderLayout.propTypes = {
};

export default HeaderLayout;
