import React from 'react';
import { Layout, Col, Row, Button, Input, Tooltip, Modal, Form } from 'antd';

import logo from '../assets/logo_ocp.jpg'
import vacunometro from '../assets/login_panel2.png'
import { Redirect } from 'react-router-dom';
import { QuestionCircleFilled } from '@ant-design/icons'

import iconoCalendario from '../assets/calendario_icono.png'

import { assign, send } from 'xstate'
import { backend } from '../Constants'


const { Content } = Layout

// check state/context if logged from redirect
// logged: inactive -> loading -> logged
// load info and pass to context
// on redirect pass info from dni to state
// const fetchUser = (dni, cui) => new Promise((resolve, reject) => {
//   console.log(dni, cui)
//   setTimeout(() => resolve({
//     dni: dni,
//     cui: cui,
//     nombre: 'Martha',
//     apellidos: 'Robles',
//     userid: '1',
//   }), 1500)
// })

const throwError = s => {
  console.log(s)
  throw new Error(s);
}

const fetchUser = (dni, cui) => fetch(backend + `registro?dni=${dni}&cui=${cui}`,
  {
    method: 'POST'
  })
  .then(res => res.json())
  .then(res => { console.log(res); return res; })
  // check for error here to show last modal (how do i make two errors, ternary logic on action: send('')?)
  .then(res => res.status === 500 ? throwError('invalid dni i guess') : res)
  .then(res => ({
    dni: dni,
    cui: cui,
    nombre: res.name,
    apellidos: res.apellido,
    usuario_id: res.usuario_id,
  }))

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
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'getUser',
        src: (context, event) => fetchUser(event.dni, event.cui),
        onDone: {
          actions: [
            assign({ dni: (context, event) => event.data.dni }),
            assign({ cui: (context, event) => event.data.cui }),
            assign({ nombre: (context, event) => event.data.nombre }),
            assign({ apellidos: (context, event) => event.data.apellidos }),
            assign({ usuario_id: (context, event) => event.data.usuario_id.toString() }),
            send('START_LOGIN')
          ]
        },
        onError: {
          target: 'failure',
          // target: 'idle',
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    failure: {
      on: {
        RETURN: 'idle'
      }
    }
  }
};

const checkAllNumbers = s => s.split('').reduce((acc, x) => acc && (parseInt(x) >= 0), true)

const LeftPanel = ({ current, send }) => {
  const [form] = Form.useForm();

  return (
    <Col span={24} style={{ backgroundColor: '#ffffff', flex: '1', display: 'flex', flexDirection: 'column', margin: "50px 50px 25px 50px" }}>
      <img src={logo} alt='open-covid-login-logo' style={{ flex: 'none', width: '280px' }} />
      <Col className='form-body' style={{
        flex: '1', padding: '0px 25px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start'
      }}>
        <p style={{ fontWeight: 'bold', fontSize: '24px' }}>Conoce si cumples con los requisitos para recibir la vacuna contra el <span style={{ color: 'red' }}>COVID-19</span></p>
        <div>Documento de identidad</div>
        <Form form={form} onFinish={(values) => send('FETCH', { dni: values.dni, cui: values.cui })}>
          <Row style={{ display: 'flex', alignItems: 'start', margin: '10px 0px 25px 0px', width: '100%' }} gutter={[16, 16]}>
            <Col span={18}>
              <Form.Item name="dni" initialValue={current.context.dni} rules={[
                { required: true, message: 'Por favor ingresa tu DNI' },
                { validator: (_, value) => value.length === 8 ? Promise.resolve(value) : Promise.reject(''), message: 'El DNI debe tener 8 dígitos' },
                { validator: (_, value) => checkAllNumbers(value) ? Promise.resolve(value) : Promise.reject(''), message: 'El DNI debe ser solo dígitos' }
              ]}>
                <Input style={{ borderRadius: '5px', height: '50px', flex: '1' }} onChange={() => send('ENABLE')}
                  disabled={current.matches('loging.loading')} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="cui" rules={[
                { required: true, message: 'Y el CUI' },
                { validator: (_, value) => value ? (value.length === 1 ? Promise.resolve(value) : Promise.reject('')) : Promise.reject(''), message: 'Solo 1 dígito' },
                { validator: (_, value) => value ? (checkAllNumbers(value) ? Promise.resolve(value) : Promise.reject('')) : Promise.reject(''), message: 'Solo dígitos' }
              ]}>
                <Input style={{ borderRadius: '5px', height: '50px', flex: '1' }}
                  disabled={current.matches('loging.inactive') || current.matches('loging.fromfinished') || current.matches('loging.loading')} />
              </Form.Item>
            </Col>
            <Col span={2} style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title='Introduzca su código de identidad tal como se ve en la imagen.'><QuestionCircleFilled /></Tooltip>
            </Col>
          </Row>
          <Form.Item >
            <Button type='primary' size='large' htmlType="submit"
              loading={current.matches('loging.loading')}
              style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }}
              disabled={current.matches('loging.inactive') || current.matches('loging.fromfinished')}>
              Siguiente
            </Button>
          </Form.Item>
        </Form>
      </Col>
    ©2021 OpenCovid Perú - Todos los derechos reservados.
    </Col>
  )
}

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
        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>¡Ya completaste el triaje!</p>
        <p style={{ width: '450px', textAlign: 'center' }}>Vuelve dentro de 21 días para saber si estas listo para la segunda dosis de vacunación.</p>
      </Col>
    </Modal>
    <Modal
      centered
      maskClosable={false}
      closable={false}
      visible={current.matches('loging.failure')}
      footer={
        <Row style={{ justifyContent: 'center' }}>
          <Button danger style={{ fontWeight: 'bold', borderRadius: '5px' }} size='large' key="submit" type="primary" onClick={() => send('RETURN')}>
            Entendido
          </Button>
        </Row>
      }
    >
      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={iconoCalendario} alt='' style={{ height: '150px', margin: '0px 0px 20px 0px' }} />
        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>¡ERROR!</p>
        <p style={{ width: '450px', textAlign: 'center' }}>Puede que el DNI o el CUI sean incorrectos</p>
      </Col>
    </Modal>
  </Layout>)
  : <Redirect to={{ pathname: '/triaje' }} />

export default Login;

