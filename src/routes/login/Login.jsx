import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, routerRedux } from 'dva/router';
import './Login.less';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    userName: 'guest',
    password: 'guest'
  }
  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(routerRedux.replace('/list'));
        console.log('Received values of form: ', values);
        sessionStorage.setItem('guest', values.userName)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { userName, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 300,margin: '0 auto',marginTop:100}}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue: userName
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: password
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="" style={{float:"right"}}>Forgot password</a>
          <Button type="primary" onClick={this.handleSubmit} htmlType="submit" className="login-form-button" style={{width:'100%'}}>
             <Link to={{ pathname: '/list'}}>Log in</Link>
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default connect()(Login);
