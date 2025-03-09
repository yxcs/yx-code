import React from "react";
import { Form, Card, Button, Input, message } from "antd";
import { login } from '../apis/user';
import "../styles/login.less";

function Login() {
  const handleLogin = async (values) => {
    const res = await login(values);
    if (res) {
      const { token } = res.data;
      localStorage.setItem('token', token);
      message.success('登录成功，即将跳转');
      window.location.href = '/home'
    }
  };

  return (
    <div className="login-container">
      <div className="left"></div>
      <div className="right">
        <Card title="登录">
          <Form onFinish={handleLogin}>
            <Form.Item label="姓名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input type="text" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password  placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
