import React from 'react';
import { Layout, Button, Card, Col, Statistic, Divider, Row } from 'antd';
import { SmileTwoTone } from '@ant-design/icons'

const { Content } = Layout

const Resultado = ({ current, send }) => (
  <Content style={{ display: 'flex', flexDirection: 'column' }}>
    <Col offset={5} span={14} style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card style={{
        borderRadius: '10px', margin: '0px 0px 20px 0px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      }}>
        <Row style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <h1 style={{ margin: '0px' }}>¡Felicitaciones María! Puedes recibir la vacuna contra el <span style={{ color: 'red' }}>Covid-19</span></h1>
        </Row>
        <Row style={{ padding: '50px 0px' }}>
          <Card style={{ borderRadius: '20px', margin: '0px 5px 0px 5px', flex: '2', backgroundColor: '#ebf7ee' }}>
            <Statistic style={{ color: 'green' }}
              title="Tu evaluación de salud ha sido:" value={'APROBADO'} valueStyle={{ color: '#3ebe61', fontWeight: 'bold' }} prefix={<SmileTwoTone twoToneColor='#3ebe61' />} />
          </Card>
          <Card style={{ borderRadius: '20px', margin: '0px 5px 0px 5px', flex: '3' }}>
            <Row style={{ justifyContent: 'space-evenly' }}>
              <Statistic title="Descarte de Covid-19" value={'APROBADO'} style={{ textAlign: 'center' }} />
              <Divider type="vertical" style={{ height: '60px' }} />
              <Statistic title="Evaluación Pre-Vacunación" value={'APROBADO'} style={{ textAlign: 'center' }} />
            </Row>
          </Card>
        </Row>
      </Card >
      <Row>
        <Button danger size='large' style={{ borderRadius: '10px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('PREV')}>
          Anterior
        </Button>
        <div style={{ flex: '1' }} />
        <Button danger type='primary' size='large' style={{ borderRadius: '10px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('NEXT')}>
          Siguiente
        </Button>
      </Row>
    </Col>
  </Content>
);

export default Resultado;


/* <p style={{ margin: '10px 15px' }}>Ingresa tu correo electrónico y te enviaremos el resultado de tu evaluación de salud.</p>
    <Row>
      <Input style={{ margin: '0px 20px', borderRadius: '10px', flex: '1' }} />
      <Button danger type='primary' size='large' style={{ borderRadius: '10px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('NEXT')}>
        Enviar
      </Button>
    </Row> */