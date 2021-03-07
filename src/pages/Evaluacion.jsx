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
  Tooltip
} from "antd";
import { QuestionCircleFilled } from '@ant-design/icons'


const { Content } = Layout;
const { TextArea } = Input;

const QuestionWithTextArea1 = () => {
  const [textAreaEnabled, setTextAreaEnabled] = useState(false)

  return <>
    <Row style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
        ¿Es alérgico a algún medicamento, alimento, vacuna o al látex?
      </p>
      <Radio.Group buttonStyle="solid">
        <Radio.Button style={{ width: "45px" }} value="yes" onClick={() => setTextAreaEnabled(true)}>
          Si
        </Radio.Button>
        <Radio.Button style={{ width: "45px" }} value="no" onClick={() => setTextAreaEnabled(false)}>
          No
        </Radio.Button>
      </Radio.Group>
    </Row>
    <Divider />
    <div style={{ visibility: textAreaEnabled ? 'visible' : 'hidden' }}>
      <p>¿Cuáles son?</p>
      <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Escribe tu respuesta..' />
    </div>
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
    <Row style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
        ¿Tiene alguna enfermedad crónica? <Tooltip placement="bottom" title={<EnfermedadesCronicas />}><QuestionCircleFilled /></Tooltip>
      </p>
      <Radio.Group buttonStyle="solid">
        <Radio.Button style={{ width: "45px" }} value="yes" onClick={() => setTextAreaEnabled(true)}>
          Si
        </Radio.Button>
        <Radio.Button style={{ width: "45px" }} value="no" onClick={() => setTextAreaEnabled(false)}>
          No
        </Radio.Button>
      </Radio.Group>
    </Row>
    <Divider />
    <div style={{ visibility: textAreaEnabled ? 'visible' : 'hidden' }}>
      <p>¿Cuáles son?</p>
      <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder='Escribe tu respuesta..' />
    </div>
  </>
}

const Evaluacion = ({ current, send }) => (
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
        {current.matches('evaluacion.firstquestion') ? <QuestionWithTextArea1 /> : null}
        {current.matches('evaluacion.secondquestion') ? <QuestionWithTextArea2 /> : null}
        {current.matches('evaluacion.thirdquestion') ?
          <>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
                ¿Tienes leucemia, cáncer o alguna enfermedad que afecte la efectividad de la vacuna?
          </p>
              <Radio.Group buttonStyle="solid">
                <Radio.Button style={{ width: "45px" }} value="yes">
                  Si
            </Radio.Button>
                <Radio.Button style={{ width: "45px" }} value="no">
                  No
            </Radio.Button>
              </Radio.Group>
            </Row>
            <Divider />
            <Row style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
                ¿Haz recibido algún tratamiento continuo en los últimos 15 días o transfusiones de sangre o derivados de los últimos 6 meses?
          </p>
              <Radio.Group buttonStyle="solid">
                <Radio.Button style={{ width: "45px" }} value="yes">
                  Si
            </Radio.Button>
                <Radio.Button style={{ width: "45px" }} value="no">
                  No
            </Radio.Button>
              </Radio.Group>
            </Row>
            <Divider />
            <Row style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0px 100px 0px 0px", flex: "1" }}>
                ¿Convive con personas de edad avanzada o alguna persona con cáncer, trasplantes, recibe quimioterapia corticoide o alguna otra circunstancia que afecte a la inmunidad?
          </p>
              <Radio.Group buttonStyle="solid">
                <Radio.Button style={{ width: "45px" }} value="yes">
                  Si
            </Radio.Button>
                <Radio.Button style={{ width: "45px" }} value="no">
                  No
            </Radio.Button>
              </Radio.Group>
            </Row>
          </> : null}
      </Card>

      <Row>
        <Button danger size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('PREV')}>
          Anterior
        </Button>
        <div style={{ flex: '1' }} />
        <Button danger type='primary' size='large' style={{ borderRadius: '5px', height: '50px', width: '150px', fontWeight: 'bold' }} onClick={() => send('NEXT')}>
          Siguiente
        </Button>
      </Row>
    </Col>
  </Content>
);

export default Evaluacion;