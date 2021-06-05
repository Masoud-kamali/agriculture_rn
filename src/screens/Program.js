import * as React from 'react';
import { Text, View } from 'react-native';
import Content from '../components/program/Content';
import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";


// const Tab = createMaterialTopTabNavigator();

const Program = ({route, navigation}, props) => {

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'Program'}
        />
        <Content
          navigation={navigation}
        />
      </React.Fragment>
    </Container>
  );
};

export default Program;
