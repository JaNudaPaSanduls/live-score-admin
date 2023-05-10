import React, {useState} from 'react';
import './login.css'
import { Form, Button, Input, message, notification } from "antd";
import axios from 'axios';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState("");
  const [msg, contextHolder] = message.useMessage();
  const [Notification, NoticontextHolder] = notification.useNotification();

  const openNotification = () => {
    Notification.open({
      message: 'Scoover software agreement',
      description:
        'Media Unit of debarawewa national college is developed this webApplication for battle of RuhunuMarrons 1day match. You can not miss use this application or share username, password, session id. If ypu share these things we can get legal action throw Sri Lanka National Data Sharing Policy.',
      duration: 0,
      key: 'notification 1',
      type: 'info',
      style: {
        width: 500,
      }
  });}

  const onFormSubmit = async (e) => {
    msg.open({
      type: 'loading',
      content: 'Login...',
      duration: 0,
    });
    const user = {
      username: username,
      password: password,
      session: session
    }

    await axios.post('https://livescore-dnc.vercel.app/user/login', user)
      .then((res) => {
        setTimeout(() => {
          message.open({
            type: 'success',
            content: 'Login Successfully'
          })
        }, 2000);
        localStorage.setItem("user", "log");
        localStorage.setItem("session", session);
        localStorage.setItem("token", res.data.token);
        window.location = '/';
      })
      .catch((error) => {
        msg.destroy();
        setTimeout(() => {
          message.open({
            type: 'error',
            content: 'Username, password or session id incorrect.'
          })
        }, 2000);
      });
  }

  return (
    <div className="login" onLoad={openNotification}>
        {contextHolder}
        {NoticontextHolder}
        <img className="top-img" src="https://i.postimg.cc/L4qhq4Cw/png-2.png"/>
        <h1>Login</h1>
        <Form
          onFinish={onFormSubmit}
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 5 }}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username"
                },
                { whitespace: false },
                { min: 4 }
              ]}
              hasFeedback>
                <Input onChange={(e) => setUsername(e.target.value)} placeholder="Type your username" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password"
                },
                { min: 6 }
              ]}>
                <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Type your password" />
            </Form.Item>

            <Form.Item
              name="session"
              label="Session"
              tooltip="Get it from a WebApp team member"
              rules={[
                {
                  required: true,
                  message: "Please enter your session id"
                },
                { min: 3 }
              ]}>
                <Input.Password onChange={(e) => setSession(e.target.value)} placeholder="Type your session" />
            </Form.Item>

            <div className="btn">
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button block type="primary" htmlType="submit">
                Login 
                </Button>
              </Form.Item>
            </div>
            <div className="txt">
              <img className="bottom-img" src="https://i.postimg.cc/pdnKYQqb/marrons-png.png" />
              <h5 className="text">Scoover. Developed by WebApp Team of <b>DNC@MU</b>.</h5>
            </div>
        </Form>
    </div>
  )
}

export default Login

// Score Adding system
// Player Score player 1 / player 2 name playing if change reset to 0 player