import React from 'react';
import { Layout, Button } from 'antd';

const { Content } = Layout

const Evaluacion = ({ current, send }) => (
  <Content style={{ display: 'flex', flexDirection: 'column' }}>
    <Button style={{ borderRadius: '10px', height: '50px' }} onClick={() => send('NEXT')}>Siguiente</Button>
  </Content>
);

export default Evaluacion;
