import * as React from 'react';
import { Text, View } from 'react-native';

import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";
import DescContent from '../components/inbox/DescContent';


// const Tab = createMaterialTopTabNavigator();

const Message = ({route, navigation},props) => {

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'Inbox'}
        />
        <DescContent/>
      </React.Fragment>
    </Container>
  );
};

export default Message;
