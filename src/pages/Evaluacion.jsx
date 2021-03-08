import React, { useState } from "react";
import {
  Layout,
  Col,
  Row,
  Button,
  Card,
  Divider,
  Radio,
  Input,
  Tooltip,
  Form
} from "antd";
import { QuestionCircleFilled } from '@ant-design/icons'


const { Content } = Layout;
const { TextArea } = Input;

const QuestionWithTextArea1 = () => {
  const [textAreaEnabled, setTextAreaEnabled] = useState(false)

  return <>
    <Form.Item name='4' rules={[{ required: true, message: 'Por favor, seleccione una opción.' }]}>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
          ¿Es alérgico a algún medicamento, alimento, vacuna o al látex?
      </p>
        <Radio.Group buttonStyle="solid">
          <Radio.Button style={{ width: "45px" }} value="SI" onClick={() => setTextAreaEnabled(true)}>
            Si
        </Radio.Button>
          <Radio.Button style={{ width: "45px" }} value="NO" onClick={() => setTextAreaEnabled(false)}>
            No
        </Radio.Button>
        </Radio.Group>
      </Row>
    </Form.Item>
    <Divider />
    {textAreaEnabled ? <>
      <p>¿Cuáles son?</p>
      <Form.Item name='detalle' rules={[{ required: true, message: 'Por favor, escribe una opción.' }]}>
        <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Escribe tu respuesta..' />
      </Form.Item>
    </> : null}
  </>
}

const EnfermedadesCronicas = () => <>
  <p>Ejemplos de enfermedades crónicas:</p>
  <p style={{ margin: '0px' }}>- Cáncer</p>
  <p style={{ margin: '0px' }}>- Enfermedades cardíacas</p>
  <p style={{ margin: '0px' }}>- Infartos</p>
  <p style={{ margin: '0px' }}>- Enfermedades respiratorias</p>
  <p style={{ margin: '0px' }}>- Diabetes, entre otros.</p>
</>

const QuestionWithTextArea2 = () => {
  const [textAreaEnabled, setTextAreaEnabled] = useState(false)

  return <>
    <Form.Item name='14' rules={[{ required: true, message: 'Por favor, seleccione una opción.' }]}>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
          ¿Tiene alguna enfermedad crónica? <Tooltip placement="bottom" title={<EnfermedadesCronicas />}><QuestionCircleFilled /></Tooltip>
        </p>
        <Radio.Group buttonStyle="solid">
          <Radio.Button style={{ width: "45px" }} value="SI" onClick={() => setTextAreaEnabled(true)}>
            Si
        </Radio.Button>
          <Radio.Button style={{ width: "45px" }} value="NO" onClick={() => setTextAreaEnabled(false)}>
            No
        </Radio.Button>
        </Radio.Group>
      </Row>
    </Form.Item>
    <Divider />
    {textAreaEnabled ? <>
      <p>¿Cuáles son?</p>
      <Form.Item name='detalle' rules={[{ required: true, message: 'Por favor, escribe una opción.' }]}>
        <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Escribe tu respuesta..' />
      </Form.Item>
    </> : null}
  </>
}

const Evaluacion = ({ current, send }) => {
  const [form] = Form.useForm();

  return (
    <Content style={{ display: "flex", flexDirection: "column" }}>
      <Col
        offset={3}
        span={18}
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          marginTop: "100px",
        }}
      >

        <Card
          style={{ borderRadius: "10px", margin: "0px 0px 20px 0px" }}
          title="Ahora examinemos las posibles enfermedades preexistentes que tengas"
        >
          <Form form={form}>
            {current.matches('evaluacion.firstquestion') ? <QuestionWithTextArea1 /> : null}
            {current.matches('evaluacion.secondquestion') ? <QuestionWithTextArea2 /> : null}
            {current.matches('evaluacion.thirdquestion') || current.matches('evaluacion.loading') ?
              <>
                <Form.Item name='24' rules={[{ required: true, message: 'Por favor, seleccione una opción.' }]}>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
                      ¿Tienes leucemia, cáncer o alguna enfermedad que afecte la efectividad de la vacuna?
                  </p>
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button style={{ width: "45px" }} value="SI">
                        Si
                  </Radio.Button>
                      <Radio.Button style={{ width: "45px" }} value="NO">
                        No
                  </Radio.Button>
                    </Radio.Group>
                  </Row>
                </Form.Item >
                <Divider />
                <Form.Item name='34' rules={[{ required: true, message: 'Por favor, seleccione una opción.' }]}>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
                      ¿Haz recibido algún tratamiento continuo en los últimos 15 días o transfusiones de sangre o derivados de los últimos 6 meses?
                    </p>
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button style={{ width: "45px" }} value="SI">
                        Si
                  </Radio.Button>
                      <Radio.Button style={{ width: "45px" }} value="NO">
                        No
                  </Radio.Button>
                    </Radio.Group>
                  </Row>
                </Form.Item >
                <Divider />
                <Form.Item name='34' rules={[{ required: true, message: 'Por favor, seleccione una opción.' }]}>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
                      ¿Convive con personas de edad avanzada o alguna persona con cáncer, trasplantes, recibe quimioterapia corticoide o alguna otra circunstancia que afecte a la inmunidad?
                    </p>
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button style={{ width: "45px" }} value="SI">
                        Si
                  </Radio.Button>
                      <Radio.Button style={{ width: "45px" }} value="NO">
                        No
                  </Radio.Button>
                    </Radio.Group>
                  </Row>
                </Form.Item >
              </> : null}
          </Form>
        </Card>

        <Row>
          <Button danger size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('PREV')}>
            Anterior
        </Button>
          <div style={{ flex: '1' }} />
          <Form form={form} onFinish={(values) => { send('NEXT', { data: values }); }}>
            <Button loading={current.matches('evaluacion.loading')} danger htmlType="submit" type='primary' size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }}>
              Siguiente
            </Button>
          </Form>
        </Row>
      </Col>
    </Content >
  );
}
export default Evaluacion;