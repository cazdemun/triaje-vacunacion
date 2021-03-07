import React from 'react';
import { Layout, Col, Row, Button, Card, Divider, Tooltip } from 'antd';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import logoFooter from '../assets/logo_footer.png'
import bg from '../assets/bg.jpg'
import vacunometro from '../assets/login_panel2.png'
import { Redirect } from 'react-router-dom';

import { QuestionCircleFilled } from '@ant-design/icons'

const { Content, Header, Footer } = Layout

// check state/context if logged from redirect

const procesoMachine = Machine({
  id: 'toggle',
  initial: 'descarte',
  context: {
    nombre: '',
    apellidos: '',
    dni: '',
  },
  states: {
    descarte: {
      on: {
        NEXT: 'evaluacion'
      }
    },
    // descarte: { states: {  } }
    evaluacion: {},
    resultado: {},
    consentimiento: {},
  }
});

const Descarte = ({ current, send }) =>
  <Layout style={{ minHeight: "100vh", backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
    <Header style={{ height: '70px', backgroundColor: '#ffffff' }} />
    <Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Col offset={3} span={18} style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card style={{ borderRadius: '10px', margin: '0px 0px 20px 0px' }}
          title='Comenzaremos descartando una posible infección de Covid-19'>
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>En las últimas dos semanas, ¿Has dado positivo en COVID-19 o actualmente está siendo monitoreado por COVID-19?</p>
            <Button style={{ width: '45px' }}>Si</Button>
            <Button style={{ width: '45px' }}>No</Button>
          </Row>
          <Divider />
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>En las últimas dos semanas, ¿Has tenido contacto con alguien que dio positivo en COVID-19? ¿Está en cuarentena?</p>
            <Button style={{ width: '45px' }}>Si</Button>
            <Button style={{ width: '45px' }}>No</Button>
          </Row>
          <Divider />
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Tiene actualmente o has tenido en los últimos 14 días fiebre, escalofríos, tos, dificultad para respirar, falta de aire,
fatiga, dolores musculares o corporales, dolor de cabeza, pérdida de gusto y del olfato, dolor de garganta, náuseas,
vómitos o diarrea?, ¿Ha recibido plasma de paciente convaleciente? <Tooltip placement="bottom" title="Tratamiento con el plasma de la sangre de personas que se han recuperado de Covid-19."><QuestionCircleFilled /></Tooltip></p>
            <Button style={{ width: '45px' }}>Si</Button>
            <Button style={{ width: '45px' }}>No</Button>
          </Row>
        </Card>
        <Row>
          <Button style={{ borderRadius: '10px', height: '50px' }}>Cancelar</Button>
          <div style={{ flex: '1' }} />
          <Button style={{ borderRadius: '10px', height: '50px' }} onClick={() => send('NEXT')}>Siguiente</Button>
        </Row>
      </Col>
    </Content>
    <Footer style={{ height: '50px', padding: '0px 50px', backgroundColor: 'transparent', display: 'flex' }}>
      <span style={{ flex: '1' }} >
        <img src={logoFooter} style={{ height: '30px' }} />
      </span>
      <p style={{ margin: '0' }}>©2021 OpenCovid Perú - Todos los derechos reservados.</p>
    </Footer>
  </Layout >

const Proceso = () => {
  const [current, send] = useMachine(procesoMachine);
  return (() => {
    switch (current.value) {
      case 'descarte':
        return <Descarte {...{ current, send }} />
      case 'evaluacion':
        return <div>Evaluacion</div>
      case 'resultado':
        return <div>Resultado</div>
      case 'consentimiento':
        return <div>Consentimiento</div>
      default:
        break;
    }
  })()
}

export default Proceso;

