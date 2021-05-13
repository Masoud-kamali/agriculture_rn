import React, {useState, useEffect} from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, View, Text, StyleSheet, TouchableOpacity} from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Ripple from "react-native-material-ripple";
import RNExitApp from 'react-native-exit-app';
import {useNavigation} from '@react-navigation/native';


function SideMenu({ navigation, route },props) {

  const {navigate, goBack, toggleDrawer, openDrawer, closeDrawer} = useNavigation();

  return(
    <View style={styles.container}>
      <View style={styles.head}>
        <View>
          <Text style={styles.userText}>
            رحمت الله قاسمی
          </Text>
          <Text style={styles.skillText}>
            تکنسین آبیاری
          </Text>
        </View>
          <FontAwesome name='user' size={35} color='#ff7f29' style={styles.headIcon} />
      </View>
      <View style={styles.body}>
        <Ripple style={styles.layerBtn} onPress={()=> navigation.navigate('MainDrawerNavigator')}>
          <Text
            style={styles.layerText}

          >
           خانه
          </Text>
          <FontAwesome name='home' style={styles.activityIcon}/>
        </Ripple>
        <Ripple style={styles.layerBtn} onPress={()=> navigation.navigate('ActivityDrawerNavigator')}>
          <Text
            style={styles.layerText}

          >
           فعالیت های من
          </Text>
          <AntDesign name='solution1' style={styles.activityIcon}/>
        </Ripple>
        <Ripple style={styles.layerBtn} onPress={()=> navigation.navigate('PlanDrawerNavigator')}>
          <Text
            style={styles.layerText}

          >
           برنامه های من
          </Text>
          <AntDesign name='calendar' style={styles.activityIcon}/>
        </Ripple>
        <Ripple style={styles.layerBtn} onPress={()=> navigation.navigate('InboxDrawerNavigator')}>
          <Text
            style={styles.layerText}
          >
           پیام ها
          </Text>
          <FontAwesome name='envelope' style={styles.envelopeIcon}/>
        </Ripple>
        <Ripple style={styles.exitBtn} onPress={()=> RNExitApp.exitApp()}>
          <Text
            style={styles.layerText}
          >
            خروج
          </Text>
          <MaterialIcons name='exit-to-app' style={styles.activityIcon}/>
        </Ripple>
      </View>

    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  head:{
    width:'100%',
    height: 70,
    backgroundColor:'#143910',
    paddingRight:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
  },
  userText:{
    fontSize: 15,
    color:'#fff',
    fontWeight: 'bold'
  },
  skillText:{
    marginTop: 5,
    fontSize: 12,
    color:'#fff',
  },
  body:{
    width:'100%',
    height:'90%',
    paddingBottom: 10
  },
  headText:{
    fontSize:12,
    color:'#fff',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:5,
    paddingRight:5,
    padding: 2,
    fontFamily:'IRANSansMobile_Light',
  },
  headIcon:{
    color:'#ff990a',
    padding:10,
    paddingLeft:14,
  },
  weatherBtn:{
    paddingRight:15,
    paddingTop:11,
    padding:13,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    height: null,
    justifyContent: 'flex-end',
  },
  layerBtn:{
    paddingRight:15,
    paddingTop:8,
    padding:11,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    height: null,
    justifyContent: 'flex-end',
    borderTopWidth:0.5,
    borderColor:'#999',
  },
  exitBtn:{
    paddingRight:15,
    padding:8,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    height: null,
    justifyContent: 'flex-end',
    borderTopWidth:0.5,
    borderColor:'#999',
  },
  subLayerBtn:{
    paddingRight:28,
    paddingTop:6,
    padding:6,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    height: null,
    justifyContent: 'flex-end',
  },
  featureBtn:{
    paddingRight:50,
    padding:5,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    justifyContent: 'flex-end',
  },
  layerText:{
    fontSize:16,
    color:'#111',
    marginRight:16,
    fontFamily:'IRANSansMobile_Light',
  },
  subLayerText:{
    fontSize:14,
    color:'#111',
    marginRight:16,
    fontFamily:'IRANSansMobile_Light',
  },
  bodyText:{
    fontSize:12,
    color:'#111',
    marginRight:18,
    fontFamily:'IRANSansMobile_Light',
  },
  layerIcon:{
    fontSize:28,
    color:'#8e3573',

  },
  activityIcon:{
    fontSize:25,
    color:'#6e6861',

  },
  envelopeIcon:{
    fontSize:25,
    color:'#6e6861',

  },
  exitIcon:{
    fontSize:26,
    color:'#ea1f13',

  },
  subLayerIcon:{
    fontSize:22,
    color:'#101082',

  },
  featureIcon:{
    fontSize:18,
    color:'#0fae12',

  },
  borderBody:{
    borderTopWidth:0.5,
    borderColor:'#999',
  },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  checkedCircle: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#131313' // You can set it default or with yours one…
  }
});

export default SideMenu;
