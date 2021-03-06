import React from 'react';
import { Layout, Col, Row, Button, Input } from 'antd';
import logo from './assets/logo_ocp.jpg'

const { Content, Footer } = Layout


const LeftPanel = () => (
  <Col span={24} style={{ backgroundColor: '#ffffff', flex: '1', display: 'flex', flexDirection: 'column', margin: "50px" }}>
    <img src={logo} style={{ flex: 'none', width: '280px' }} />
    <Col class='form-body' style={{
      display: 'flex', flex: '1',
      flexDirection: 'column', justifyContent: 'center',
      alignItems: 'flex-start', padding: '0px 25px'
    }}>
      <div>Conoce si cumples con los requisitos para recibir la vacuna contra el COVID-19</div>
      <div></div>
      <div>Documento de identidad</div>
      <Row style={{ display: 'flex', width: '100%' }} gutter={[16, 16]}>
        <Col span={18}>
          <Input style={{ flex: '1' }} />
        </Col>
        <Col span={4}>
          <Input style={{ flex: '1' }} />
        </Col>
        <Col span={2}>
          ?
        </Col>
      </Row>
      <Button>Siguiente</Button>
    </Col>
  </Col>
)

const Login = () => (
  <Layout style={{ height: "100vh" }}>
    <Content style={{ minHeight: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col span={12} style={{ backgroundColor: '#ffffff', display: 'flex', minHeight: "100%" }}>
          <LeftPanel />
        </Col>
        <Col span={12} style={{ backgroundColor: "#ef3f47", minHeight: "100%" }}>
          Hola en rojo
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default Login;

