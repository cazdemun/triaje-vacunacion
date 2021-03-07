import React from 'react';
import { Layout, Steps } from 'antd';
import { Machine } from 'xstate';

import logoFooter from '../assets/logo_footer.png'
import bg from '../assets/bg.jpg'
import { Redirect } from 'react-router-dom';

import Descarte from './Descarte';
import Resultado from './Resultado';
import Evaluacion from './Evaluacion';
import Consentimiento from './Consentimiento';

import { loginStates } from './Login'

const { Header, Footer } = Layout

// check state/context if logged from redirect

const descarteStates = {
  initial: 'confirmation',
  states: {
    idle: {
      on: {
        SEND_EMAIL: 'confirmation'
      }
    },
    confirmation: {
      on: {
        ACCEPT: 'idle'
      }
    }
  }
};

const consentimientoStates = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        SEND_EMAIL: 'confirmation'
      }
    },
    confirmation: {
      on: {
        CANCEL: 'idle'
      }
    }
  }
};

export const triajeMachine = Machine({
  id: 'triaje',
  initial: 'loging',
  context: {
    logged: false,
    nombre: '',
    apellidos: '',
    dni: '',
  },
  states: {
    canceled: {},
    finished: {},
    loging: {
      on: {
        START_LOGIN: 'descarte'
      },
      ...loginStates
    },
    descarte: {
      on: {
        CANCEL: 'loging',
        NEXT: 'evaluacion'
      },
      ...descarteStates
    },
    evaluacion: {
      on: {
        PREV: 'descarte',
        NEXT: 'resultado'
      }
    },
    resultado: {
      on: {
        PREV: 'evaluacion',
        NEXT: 'consentimiento',
      }
    },
    consentimiento: {
      on: {
        FINISH: 'loging.fromfinished' // I want this to be able just on consentimiento.confirmation
      },
      ...consentimientoStates
    },
  }
});

const currentStep = (current) => {
  if (current.matches('descarte'))
    return 0;
  if (current.matches('evaluacion'))
    return 1;
  if (current.matches('resultado'))
    return 2;
  if (current.matches('consentimiento'))
    return 3;
}

const Triaje = ({ current, send }) => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
      <Header style={{ display: 'flex', alignItems: 'center', height: '70px', backgroundColor: '#ffffff' }} >
        <h1 style={{ flex: '1' }}>Hola, <b>María Robles</b></h1>
        <Steps style={{ flex: '2' }} current={currentStep(current)} size='small'>
          <Steps.Step title="Descarte Covid-19" />
          <Steps.Step title="Evaluación Pre-Vacunación" />
          <Steps.Step title="Resultado de Evaluación" />
          <Steps.Step title="Consentimiento de Vacunación" />
        </Steps>,
  </Header>
      {(() => {
        switch (current.value) {
          case 'evaluacion':
            return <Evaluacion {...{ current, send }} />
          case 'resultado':
            return <Resultado {...{ current, send }} />
          case 'canceled':
          case 'finished':
            return <Redirect to={{ pathname: '/' }} />
          default:
            break;
        }
      })()}
      {current.matches('descarte') ? <Descarte {...{ current, send }} /> : <></>}
      {current.matches('consentimiento') ? <Consentimiento {...{ current, send }} /> : <></>}
      {current.matches('loging') ? <Redirect to={{ pathname: '/' }} /> : <></>}
      <Footer style={{ height: '50px', padding: '0px 50px', backgroundColor: 'transparent', display: 'flex' }}>
        <span style={{ flex: '1' }} >
          <img src={logoFooter} alt='' style={{ height: '30px' }} />
        </span>
        <p style={{ margin: '0' }}>©2021 OpenCovid Perú - Todos los derechos reservados.</p>
      </Footer>
    </Layout >
  );
}

export default Triaje;

