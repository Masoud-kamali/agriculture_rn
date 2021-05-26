import React, {useEffect, useState} from 'react';
import {View, ToastAndroid, Image, StyleSheet} from 'react-native';
import MyHeader from '../components/header/MyHeader';
import Content from "../components/Main/Content";
import {Container} from "native-base";


let props = {
  name:'Main',
  title:'Tourism'
};

const Loading = ({route, navigation},props) => {

  return(
    <Container style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/images/logo.jpg')}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({

  container:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:30,
    marginBottom:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 350,
    height: 350,
  },
});

export default Loading;
