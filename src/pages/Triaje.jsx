import React from 'react';
import { Layout, Steps } from 'antd';
import { assign, send, Machine } from 'xstate';

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

// Promise.all()
// .then( fetch)

const fetchResults = (usuario_id, respuestas1, respuestas2) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(true), 1500)
})

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

const evaluacionStates = {
  initial: 'firstquestion',
  states: {
    firstquestion: {
      on: {
        NEXT: {
          actions: [assign({
            respuestas2: (context, event) => {
              const someAnswer = Object.keys(event.data).reduce((acc, k) => {
                if (k === 'detalle')
                  return { ...acc, detalle: event.data['detalle'] }
                else
                  return {
                    ...acc,
                    pregunta_id: k.toString(),
                    respuesta: event.data[k],
                  }
              }, {})
              console.log('event', event)
              console.log('someAnswer', someAnswer)
              return [...context.respuestas2.filter(x => x.pregunta_id !== someAnswer.pregunta_id), someAnswer]
            }
          })],
          target: 'secondquestion'
        }
      }
    },
    secondquestion: {
      on: {
        PREV: 'firstquestion',
        NEXT: {
          actions: [assign({
            respuestas2: (context, event) => {
              const someAnswer = Object.keys(event.data).reduce((acc, k) => {
                if (k === 'detalle')
                  return { ...acc, detalle: event.data['detalle'] }
                else
                  return {
                    ...acc,
                    pregunta_id: k.toString(),
                    respuesta: event.data[k],
                  }
              }, {})
              console.log('event', event)
              console.log('someAnswer', someAnswer)
              return [...context.respuestas2.filter(x => x.pregunta_id !== someAnswer.pregunta_id), someAnswer]
            }
          })],
          target: 'thirdquestion'
        }
      }
    },
    thirdquestion: {
      on: {
        PREV: 'secondquestion',
        NEXT: {
          actions: [
            assign({
              respuestas2: (context, event) => {
                console.log(Object.keys(event.data)
                  .map(k => ({
                    pregunta_id: k.toString(),
                    respuesta: event.data[k],
                  })))
                return [...context.respuestas2]
              }
            })
          ],
          target: 'loading'
        }
      }
    },
    loading: {
      invoke: {
        id: 'getResults',
        src: (context, event) => fetchResults(event.dni, event.cui),
        onDone: {
          actions: [
            assign({ results: (context, event) => event.data.results }),
            send('RESULT')
          ]
        },
        onError: {
          actions: [assign({ error: (context, event) => event.data }), send('RESULTS')]
        }
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
    nombre: '',
    apellidos: '',
    dni: '',
    cui: '',
    usuario_id: '',
    respuestas1: [],
    respuestas2: [],
    results: true,
    error: '',
    //
    logged: false,
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
        CANCEL: 'loging.idle',
        NEXT: {
          actions: [
            assign({
              respuestas1: (context, event) => Object.keys(event.data)
                .map(k => ({
                  pregunta_id: k.toString(),
                  respuesta: event.data[k],
                }))
            })
          ],
          target: 'evaluacion'
        }
      },
      ...descarteStates
    },
    evaluacion: {
      on: {
        PREV: 'descarte.idle',
        RESULT: 'resultado'
      },
      ...evaluacionStates
    },
    resultado: {
      on: {
        PREV: 'evaluacion.thirdquestion',
        NEXT: 'consentimiento',
      }
    },
    consentimiento: {
      on: {
        FINISH: 'loging.idle' // I want this to be able just on consentimiento.confirmation // loging.fromFinished
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
        <h1 style={{ flex: '1' }}>Hola, <b style={{ fontSize: '18px' }}>{current.context.nombre}</b></h1>
        <Steps style={{ flex: '2' }} current={currentStep(current)} size='small'>
          <Steps.Step title="Descarte Covid-19" />
          <Steps.Step title="Evaluación Pre-Vacunación" />
          <Steps.Step title="Resultado de Evaluación" />
          <Steps.Step title="Consentimiento de Vacunación" />
        </Steps>,
  </Header>
      {(() => {
        switch (current.value) {
          case 'resultado':
            return <Resultado {...{ current, send }} />
          case 'canceled':
          case 'finished':
            return <Redirect to={{ pathname: '/' }} />
          default:
            break;
        }
      })()}
      {current.matches('evaluacion') ? <Evaluacion {...{ current, send }} /> : <></>}
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

