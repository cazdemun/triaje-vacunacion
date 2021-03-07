import React from "react";
import {
  Layout,
  Col,
  Row,
  Button,
  Card,
  Divider,
  Radio,
  // Input,
} from "antd";

const { Content } = Layout;
// const { TextArea } = Input;

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
      {/* <Card style={{ borderRadius: '10px', margin: '0px 0px 20px 0px' }}
        title='Ahora examinemos las posibles enfermedades preexistentes que tengas'>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Es alérgico a algún medicamento, alimento, vacuna o el latéx?</p>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: '45px' }} value="yes">Si</Radio.Button>
            <Radio.Button style={{ width: '45px' }} value="no">No</Radio.Button>
          </Radio.Group>
        </Row>
        <Divider />

        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Cuáles son?</p>

          <TextArea rows={4} placeholder='Escribe tu respuesta' style={{ borderRadius: '10px', marginTop: '15px', marginBottom: '30px' }}  />

        </Row>
        
        
      </Card> */}
      {/* <Card style={{ borderRadius: '10px', margin: '0px 0px 20px 0px' }}
        title='Ahora examinemos las posibles enfermedades preexistentes que tengas'>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Tienes alguna enfermedad crónica? <Tooltip placement="bottom" title="Ejemplos de enfermedades crónicas: 
          Cancer 
          Enfermedades cardíacas
          Infartos
          Enfermedades respiratorias
          Daiabetes, entre otros">
            <QuestionCircleFilled /></Tooltip></p>
          <Radio.Group buttonStyle="solid">
            <Radio.Button style={{ width: '45px' }} value="yes">Si</Radio.Button>
            <Radio.Button style={{ width: '45px' }} value="no">No</Radio.Button>
          </Radio.Group>
        </Row>
        <Divider />

        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0px 100px 0px 0px', flex: '1' }}>¿Cuál / Cuáles son?</p>
          <TextArea rows={4} placeholder='Escribe tu respuesta' style={{ borderRadius: '10px', marginTop: '15px', marginBottom: '30px' }}  />
        </Row>        
      </Card> */}

      <Card
        style={{ borderRadius: "10px", margin: "0px 0px 20px 0px" }}
        title="Ahora examinemos las posibles enfermedades preexistentes que tengas"
      >
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
      </Card>

      <Row>
        <Button
          style={{ borderRadius: "10px", height: "46px" }}
          onClick={() => send("PREV")}
        >
          Cancelar
        </Button>
        <div style={{ flex: "1" }} />
        <Button
          style={{ borderRadius: "10px", height: "46px" }}
          onClick={() => send("NEXT")}
        >
          Siguiente
        </Button>
      </Row>
    </Col>
  </Content>
);

export default Evaluacion;