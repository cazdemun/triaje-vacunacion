import React from 'react';
import { Layout, Col, Row, Button, Input, Tooltip } from 'antd';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import logo from '../assets/logo_ocp.jpg'
import vacunometro from '../assets/login_panel2.png'
import { Redirect } from 'react-router-dom';
import { QuestionCircleFilled } from '@ant-design/icons'

const { Content } = Layout

// check state/context if logged from redirect

const loginMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  context: {
    logged: false
  },
  states: {
    inactive: {
      on: {
        START_LOGIN: 'logged'
      }
    },
    // logged: inactive -> loading -> logged
    // load info and pass to context
    // on redirect pass info from dni to state
    logged: {}
  }
});

const LeftPanel = ({ current, send }) => (
  <Col span={24} style={{ backgroundColor: '#ffffff', flex: '1', display: 'flex', flexDirection: 'column', margin: "50px 50px 25px 50px" }}>
    <img src={logo} style={{ flex: 'none', width: '280px' }} />
    <Col className='form-body' style={{
      flex: '1', padding: '0px 25px',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start'
    }}>
      <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Conoce si cumples con los requisitos para recibir la vacuna contra el <span style={{ color: 'red' }}>COVID-19</span></p>
      <div>Documento de identidad</div>
      <Row style={{ display: 'flex', alignItems: 'center', margin: '10px 0px 25px 0px', width: '100%' }} gutter={[16, 16]}>
        <Col span={18}>
          <Input style={{ borderRadius: '10px', height: '50px', flex: '1' }} />
        </Col>
        <Col span={4}>
          <Input style={{ borderRadius: '10px', height: '50px', flex: '1' }} />
        </Col>
        <Col span={2}>
          <Tooltip title='Introduzca su código de identidad tal como se ve en la imagen.'><QuestionCircleFilled /></Tooltip> 
        </Col>
      </Row>
      <Button type='primary' size='large' style={{ borderRadius: '10px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('START_LOGIN')}>
        Siguiente
      </Button>
    </Col>
    ©2021 OpenCovid Perú - Todos los derechos reservados.
  </Col>
)

const Login = () => {
  const [current, send] = useMachine(loginMachine);

  console.log(current.value)

  return current.value === 'inactive' ?
    (<Layout style={{ height: "100vh" }}>
      <Content style={{ minHeight: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col span={12} style={{ backgroundColor: '#ffffff', display: 'flex', height: "100%" }}>
            <LeftPanel {...{ current, send }} />
          </Col>
          <Col span={12} style={{ backgroundColor: "#ef3f47", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={vacunometro} style={{ maxWidth: '75%' }} />
          </Col>
        </Row>
      </Content>
    </Layout>)
    : <Redirect to={{ pathname: '/triaje' }} />
}

export default Login;

