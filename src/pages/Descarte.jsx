import React from 'react';
import { Layout, Col, Row, Button, Card, Divider, Tooltip, Radio, Modal } from 'antd';

import { QuestionCircleFilled } from '@ant-design/icons'

import iconoDeclaracion from '../assets/declaracion_icono.png'

const { Content } = Layout

const Descarte = ({ current, send }) => <>
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
        <Button danger size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('CANCEL')}>
          Cancelar
        </Button>
        <div style={{ flex: '1' }} />
        <Button danger type='primary' size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('NEXT')}>
          Siguiente
        </Button>
      </Row>
    </Col>
  </Content >
  <Modal
    centered
    maskClosable={false}
    closable={false}
    visible={current.matches('descarte.confirmation')}
    footer={
      <Row style={{ justifyContent: 'center' }}>
        <Button danger style={{ fontWeight: 'bold', borderRadius: '5px' }} size='large' key="submit" type="primary" onClick={() => send('ACCEPT')}>
          Entendido
          </Button>
      </Row>
    }
  >
    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={iconoDeclaracion} alt='' style={{ height: '150px', margin: '0px 0px 20px 0px' }} />
      <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Bienvenido a tu Evaluación de Salud antes de recibir la Vacuna</p>
      <p style={{ width: '450px', textAlign: 'center' }}>Antes de iniciar tu evaluación recuerda que esta información tiene <span style={{ fontWeight: 'bold' }}>Carácter de declaración jurada</span> y solo puede ser llenada una sola vez.</p>
    </Col>
  </Modal>
</>

export default Descarte;

