import * as React from 'react';
import { Text, View } from 'react-native';
import Content from '../components/finishActivity/Content';
import MyHeader from '../components/header/MyHeader';
import {Container} from "native-base";
import {AuthContext} from '../auth/Auth';


const FinishActivity = ({route, navigation}, props) => {

  const { farmData } = React.useContext(AuthContext);
  const {activity, desc} = route.params;

  return (
    <Container style={{height: '100%'}}>
      <React.Fragment style={{height: '100%'}}>
        <MyHeader
          name={'finishActivity'}
        />
        <Content
          activity={activity}
          desc={desc}
          navigation={navigation}
          farmData = {farmData.farmData}
        />
      </React.Fragment>
    </Container>
  );
};

export default FinishActivity;
