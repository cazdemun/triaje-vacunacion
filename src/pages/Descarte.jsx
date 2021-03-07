import React from 'react';
import { Layout, Col, Row, Button, Card, Divider, Tooltip, Radio, Steps } from 'antd';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import logoFooter from '../assets/logo_footer.png'
import bg from '../assets/bg.jpg'
import vacunometro from '../assets/login_panel2.png'
import { Redirect } from 'react-router-dom';

import { QuestionCircleFilled } from '@ant-design/icons'
import Resultado from './Resultado';
import Evaluacion from './Evaluacion';
import Consentimiento from './Consentimiento';

const { Content, Header, Footer } = Layout

// check state/context if logged from redirect

const triajeMachine = Machine({
  id: 'toggle',
  initial: 'descarte',
  context: {
    nombre: '',
    apellidos: '',
    dni: '',
  },
  states: {
    canceled: {},
    descarte: {
      on: {
        CANCEL: 'canceled',
        NEXT: 'evaluacion'
      }
    },
    // descarte: { states: {  } }
    evaluacion: {
      on: {
        NEXT: 'resultado'
      }
    },
    resultado: {
      on: {
        PREV: 'evaluacion',
        NEXT: 'consentimiento',
      }
    },
    consentimiento: {},
  }
});

const Descarte = ({ current, send }) =>
  <Content style={{ display: 'flex', flexDirection: 'column' }}>
    <Col offset={3} span={18} style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card style={{
        borderRadius: '10px', margin: '0px 0px 20px 0px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      }}
        title={<p style={{ fontWeight: 'bold', margin: '0px' }}>Comenzaremos descartando una posible infección de Covid-19</p>}>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>En las últimas dos semanas, ¿Has dado positivo en COVID-19 o actualmente está siendo monitoreado por COVID-19?</p>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: '45px' }} value="yes">Si</Radio.Button>
            <Radio.Button style={{ width: '45px' }} value="no">No</Radio.Button>
          </Radio.Group>
        </Row>
        <Divider />
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>En las últimas dos semanas, ¿Has tenido contacto con alguien que dio positivo en COVID-19? ¿Está en cuarentena?</p>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: '45px' }} value="yes">Si</Radio.Button>
            <Radio.Button style={{ width: '45px' }} value="no">No</Radio.Button>
          </Radio.Group>
        </Row>
        <Divider />
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Tiene actualmente o has tenido en los últimos 14 días fiebre, escalofríos, tos, dificultad para respirar, falta de aire, fatiga, dolores musculares o corporales, dolor de cabeza, pérdida de gusto y del olfato, dolor de garganta, náuseas, vómitos o diarrea?, ¿Ha recibido plasma de paciente convaleciente? <Tooltip placement="bottom" title="Tratamiento con el plasma de la sangre de personas que se han recuperado de Covid-19."><QuestionCircleFilled /></Tooltip></p>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: '45px' }} value="yes">Si</Radio.Button>
            <Radio.Button style={{ width: '45px' }} value="no">No</Radio.Button>
          </Radio.Group>
        </Row>
      </Card>
      <Row>
        <Button danger size='large' style={{ borderRadius: '10px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('CANCEL')}>
          Cancelar
        </Button>
        <div style={{ flex: '1' }} />
        <Button danger type='primary' size='large' style={{ borderRadius: '10px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('NEXT')}>
          Siguiente
        </Button>
      </Row>
    </Col>
  </Content >


const currentStep = {
  'descarte': 0,
  'evaluacion': 1,
  'resultado': 2,
  'consentimiento': 3
}

const Triaje = () => {
  const [current, send] = useMachine(triajeMachine);
  return (
    <Layout style={{ minHeight: "100vh", backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
      <Header style={{ display: 'flex', alignItems: 'center', height: '70px', backgroundColor: '#ffffff' }} >
        <h1 style={{ flex: '1' }}>Hola, <b>María Robles</b></h1>
        <Steps style={{ flex: '2' }} current={currentStep[current.value]} size='small'>
          <Steps.Step title="Descarte Covid-19" />
          <Steps.Step title="Evaluación Pre-Vacunación" />
          <Steps.Step title="Resultado de Evaluación" />
          <Steps.Step title="Consentimiento de Vacunación" />
        </Steps>,
  </Header>
      {(() => {
        switch (current.value) {
          case 'descarte':
            return <Descarte {...{ current, send }} />
          case 'evaluacion':
            return <Evaluacion {...{ current, send }} />
          case 'resultado':
            return <Resultado {...{ current, send }} />
          case 'consentimiento':
            return <Consentimiento {...{ current, send }} />
          case 'canceled':
            return <Redirect to={{ pathname: '/' }} />
          default:
            break;
        }
      })()}
      <Footer style={{ height: '50px', padding: '0px 50px', backgroundColor: 'transparent', display: 'flex' }}>
        <span style={{ flex: '1' }} >
          <img src={logoFooter} style={{ height: '30px' }} />
        </span>
        <p style={{ margin: '0' }}>©2021 OpenCovid Perú - Todos los derechos reservados.</p>
      </Footer>
    </Layout >
  );
}

export default Triaje;

