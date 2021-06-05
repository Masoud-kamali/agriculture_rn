import * as React from 'react';
import { Text, View } from 'react-native';
import Content from '../components/programDetail/Content';
import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";
import {AuthContext} from '../auth/Auth';


const Program = ({route, navigation}, props) => {

  const { farmData } = React.useContext(AuthContext);
  const {program} = route.params;

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'programDetail'}
        />
        <Content
          program={program}
          navigation={navigation}
          farmData = {farmData.farmData}
        />
      </React.Fragment>
    </Container>
  );
};

export default Program;
