import * as React from 'react';
import { Text, View } from 'react-native';


import Content from '../components/createActivity/Content';
import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";


const CreateActivity = ({route, navigation},props) => {

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'CreateActivity'}
        />
        <Content/>
      </React.Fragment>
    </Container>
  );
};

export default CreateActivity;
