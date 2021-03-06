import React from 'react';
import { Layout, Col, Row, Button, Input, Tooltip, Modal } from 'antd';

import logo from '../assets/logo_ocp.jpg'
import vacunometro from '../assets/login_panel2.png'
import { Redirect } from 'react-router-dom';
import { QuestionCircleFilled } from '@ant-design/icons'

import iconoCalendario from '../assets/calendario_icono.png'

const { Content } = Layout

// check state/context if logged from redirect
// logged: inactive -> loading -> logged
// load info and pass to context
// on redirect pass info from dni to state

export const loginStates = {
  initial: 'inactive',
  states: {
    fromfinished: {
      on: {
        CONFIRM: 'inactive'
      }
    },
    inactive: {
      on: {
        ENABLE: 'idle'
      }
    },
    idle: {
    }
  }
};

const LeftPanel = ({ current, send }) => (
  <Col span={24} style={{ backgroundColor: '#ffffff', flex: '1', display: 'flex', flexDirection: 'column', margin: "50px 50px 25px 50px" }}>
    <img src={logo} alt='open-covid-login-logo' style={{ flex: 'none', width: '280px' }} />
    <Col className='form-body' style={{
      flex: '1', padding: '0px 25px',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start'
    }}>
      <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Conoce si cumples con los requisitos para recibir la vacuna contra el <span style={{ color: 'red' }}>COVID-19</span></p>
      <div>Documento de identidad</div>
      <Row style={{ display: 'flex', alignItems: 'center', margin: '10px 0px 25px 0px', width: '100%' }} gutter={[16, 16]}>
        <Col span={18}>
          <Input style={{ borderRadius: '5px', height: '50px', flex: '1' }} onChange={() => send('ENABLE')} />
        </Col>
        <Col span={4}>
          <Input style={{ borderRadius: '5px', height: '50px', flex: '1' }}
            disabled={current.matches('loging.inactive') || current.matches('loging.fromfinished')} />
        </Col>
        <Col span={2}>
          <Tooltip title='Introduzca su c??digo de identidad tal como se ve en la imagen.'><QuestionCircleFilled /></Tooltip>
        </Col>
      </Row>
      <Button type='primary' size='large'
        style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }}
        onClick={() => send('START_LOGIN')}
        disabled={current.matches('loging.inactive') || current.matches('loging.fromfinished')}>
        Siguiente
      </Button>
    </Col>
    ??2021 OpenCovid Per?? - Todos los derechos reservados.
  </Col>
)

const Login = ({ current, send }) => current.matches('loging') ?
  (<Layout style={{ height: "100vh" }}>
    <Content style={{ minHeight: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col span={12} style={{ backgroundColor: '#ffffff', display: 'flex', height: "100%" }}>
          <LeftPanel {...{ current, send }} />
        </Col>
        <Col span={12} style={{ backgroundColor: "#ef3f47", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={vacunometro} alt='' style={{ maxWidth: '75%' }} />
        </Col>
      </Row>
    </Content>
    <Modal
      centered
      maskClosable={false}
      closable={false}
      visible={current.matches('loging.fromfinished')}
      footer={
        <Row style={{ justifyContent: 'center' }}>
          <Button danger style={{ fontWeight: 'bold', borderRadius: '5px' }} size='large' key="submit" type="primary" onClick={() => send('CONFIRM')}>
            Entendido
          </Button>
        </Row>
      }
    >
      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={iconoCalendario} alt='' style={{ height: '150px', margin: '0px 0px 20px 0px' }} />
        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>??Ya completaste el triaje!</p>
        <p style={{ width: '450px', textAlign: 'center' }}>Vuelve dentro de 21 d??as para saber si estas listo para la segunda dosis de vacunaci??n.</p>
      </Col>
    </Modal>
  </Layout>)
  : <Redirect to={{ pathname: '/triaje' }} />

export default Login;

