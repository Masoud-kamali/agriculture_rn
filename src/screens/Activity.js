import * as React from 'react';
import { Text, View } from 'react-native';


import NContent from '../components/activity/NContent';
import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";


// const Tab = createMaterialTopTabNavigator();

const Activity = ({route, navigation},props) => {

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'Activity'}
        />
        <NContent/>
      </React.Fragment>
    </Container>
  );
};

export default Activity;
