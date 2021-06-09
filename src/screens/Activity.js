import * as React from 'react';
import { Text, View } from 'react-native';
import Content from '../components/activity/Content';
import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";


// const Tab = createMaterialTopTabNavigator();

const Activity = ({route, navigation}, props) => {

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'Activity'}
        />
        <Content
          navigation={navigation}
        />
      </React.Fragment>
    </Container>
  );
};

export default Activity;
