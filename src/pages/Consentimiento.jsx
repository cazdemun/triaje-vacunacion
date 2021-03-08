import React from 'react';
import { Layout, Button, Card, Col, Divider, Row, Input, Radio, Modal, Form } from 'antd';

import iconoConfirmacion from '../assets/confirmacion_icono.png'
import { backend } from '../Constants'
const { Content } = Layout

// NOTE: Si ya se envió entonces solo mostrar el modal sin tener que hacer todo lo demás
// Ya que estamos cambiar el estado a idle sucess y que ya no diga enviar sino solo mostrar modal o algo así

const Consentimiento = ({ current, send }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Content style={{ display: 'flex', flexDirection: 'column' }}>
        <Col offset={5} span={14} style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Card style={{
            borderRadius: '10px', margin: '0px 0px 20px 0px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          }}
            title={<p style={{ fontWeight: 'bold', margin: '0px' }}>Declara tu consentimiento para recibir la vacuna</p>}>
            <p style={{ margin: '0px' }}>Yo, <span style={{ fontWeight: 'bold' }}>MARIA ROBLES SANTILLANA</span> con DNI <span style={{ fontWeight: 'bold' }}>02765789</span> declaro haber sido informado(a) de los beneficios y potenciales efectos adversos de la vacuna contra la COVID19 y resueltas todas las preguntas y dudas al respecto, consciente de mis derechos y en forma voluntaria, en cumplimiento de la Resolución Nº 848-2020/MINSA <span style={{ fontWeight: 'bold' }}>doy mi consentimiento para que el personal de salud, me aplique la vacuna contra el COVID 19.</span></p>
            <Divider />
            <Form form={form} onFinish={(values) => {
              console.log('values.email', values.email)
              fetch(backend + `correo?usuario_id=${current.context.usuario_id}&correo=${values.email}`, {
                method: 'POST'
              })
              .then(res => res.json())
              .then(res => console.log(res))
              .catch(err => console.log(err))
              send('SEND_EMAIL', { data: values })
            }}>
              <Form.Item name='consentir' rules={[{ required: true, message: 'Por favor, seleccione una opción.' }]}>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Das tu consentimiento para vacunarte?</p>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button style={{ width: '45px' }} value="SI">Si</Radio.Button>
                    <Radio.Button style={{ width: '45px' }} value="NO">No</Radio.Button>
                  </Radio.Group>
                </Row>
              </Form.Item>
              <Divider />
              <p style={{ margin: '10px 15px' }}>Ingresa tu correo electrónico, te enviaremos el resultado Evaluación de Salud y Consentimiento de Aplicación de Vacuna.</p>
              <Row>
                <Form.Item name='email' rules={[{ required: true, message: 'Por favor, escribe un email.' }]} style={{ margin: '0px 20px', borderRadius: '5px', flex: '1' }}>
                  <Input style={{ borderRadius: '5px', height: '50px' }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type='primary' size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }}>
                    Enviar
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Card >
        </Col>
      </Content>
      <Modal
        centered
        visible={current.matches('consentimiento.confirmation')}
        onCancel={() => send('CANCEL')}
        footer={
          <Row style={{ justifyContent: 'center' }}>
            <Button danger style={{ fontWeight: 'bold', borderRadius: '5px' }} size='large' key="submit" type="primary" onClick={() => send('FINISH')}>
              Finalizar
          </Button>
          </Row>
        }
      >
        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={iconoConfirmacion} alt='' style={{ height: '150px', margin: '0px 0px 20px 0px' }} />
          <p style={{ textAlign: 'center' }}>Información enviada al correo <br /> <span style={{ fontWeight: 'bold', color: 'red', }}>mariarobles@gmail.com</span></p>
          <p style={{ fontWeight: 'bold', fontSize: '16px' }}>¡Gracias por participar de #YoMeVacuno!</p>
          <p style={{ width: '450px', textAlign: 'center' }}>Recuerda que debes llevar impreso el resultado de tu Evaluación de Salud y el Consentimiento para recibir la vacuna el día que acudas a vacunarte.</p>
        </Col>
      </Modal>
    </>
  );
}

export default Consentimiento;
