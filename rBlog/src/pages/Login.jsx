import React from "react";
import { Form, Card, Button, Input } from "antd";
import "../styles/login.less";

function Login() {
  return (
    <div className="login-container">
      <div className="left"></div>
      <div className="right">
        <Card title="登录">
          <Form>
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
