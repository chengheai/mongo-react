import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'dva/router';
import './Login.less';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // dispatch(routerRedux.replace('/list'));
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 300,margin: '0 auto',marginTop:100}}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" defaultValue='admin' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" defaultValue='admin' />
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
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
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
