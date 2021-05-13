import React, { useState, useEffect, useRef } from 'react';

import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ScrollView} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SideMenu from '../drawer/SideMenu';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Message = (props) => {

  const {navigation} = props;

  return(
    <View style={styles.content}>
      <Ripple onPress={()=> navigation.navigate('MessageDrawerNavigator')}>
        <View style={styles.secOne}>

          <View style={styles.secOneLeft}>
            <Text style={styles.activityValue}>پیام اول</Text>
            <Text style={styles.activityValue}>رضا رضایی</Text>
          </View>

          <View style={styles.secOneMiddle}>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
          </View>

          <View style={styles.secOneRight}>
            <Text style={styles.activityName}>عنوان پیام</Text>
            <Text style={styles.activityName}>کاربر ارسال کننده</Text>
          </View>

          <View style={styles.secOneEnd}>
            <Ripple style={styles.buttonStyle}>
              <MaterialIcons name="mark-email-unread" size={40} color='#1A0051' style={styles.iconStyle}/>
            </Ripple>
          </View>
        </View>
      </Ripple>
    </View>
  )
};

const Content = (props) => {

  const {navigation} = props;

  return (
    <View style={{height: '100%', backgroundColor:'#e8ffdf'}}>
      <SafeAreaView style={{marginBottom: '15%'}}>
        <FlatList
          data={DATA}
          renderItem= {(props) => <Message navigation={navigation}/>}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({

  content: {
    width:'90%',
    height: 90,
    backgroundColor:'#fff',
    elevation: 10,
    right: -20,
    marginBottom:8,
    marginTop:8,
  },

  secOne: {
    height: '80%',
    flexDirection: 'row',
    margin: 5,
  },

  secOneRight:{
    width: '30%',
    margin: 10,
    alignItems:'flex-end',
  },

  secOneMiddle:{
    width: '6%',
    margin: 3,
    marginTop: 10,
    alignItems:'flex-end',

  },

  secOneLeft:{
    width: '35%',
    margin: 3,
    marginTop: 10,
    alignItems:'flex-end',

  },

  secOneEnd:{
    width: '15%',
  },


  activityName:{
    fontSize: 15,
    fontStyle: 'italic',
    padding: 3,
    color:'#0c1b08',
  },

  pointStyle:{
    fontSize: 15,
    padding: 3,
    color:'#130066',
  },

  activityValue:{
    fontSize: 15,
    padding: 3,
    color:'#130066',
  },

  buttonStyle:{
    alignItems:'flex-end',
    paddingTop: 20
  },

  secTwo: {
    alignItems: 'center',
    justifyContent: 'center',
  },


});


export default Content;
