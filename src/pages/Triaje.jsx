import React from 'react';
import { Layout, Steps } from 'antd';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import logoFooter from '../assets/logo_footer.png'
import bg from '../assets/bg.jpg'
import { Redirect } from 'react-router-dom';

import Descarte from './Descarte';
import Resultado from './Resultado';
import Evaluacion from './Evaluacion';
import Consentimiento from './Consentimiento';

const { Header, Footer } = Layout

// check state/context if logged from redirect

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
    finished: {},
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
    consentimiento: {
      on: {
        FINISH: 'finished' // I want this to be able just on consentimiento.confirmation
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

const Triaje = () => {
  const [current, send] = useMachine(triajeMachine);

  console.log(current.value)

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
          case 'descarte':
            return <Descarte {...{ current, send }} />
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
      {current.matches('consentimiento') ? <Consentimiento {...{ current, send }} /> : <></>}
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

