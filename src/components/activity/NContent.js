import * as React from 'react';
import {Text, View, StyleSheet, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyHeader from '../header/MyHeader';
import Content from '../Main/Content';
import Ripple from 'react-native-material-ripple';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import {useState} from 'react';

const w = Dimensions.get('window').width;

const Aheader = (props) =>{

  const [selectedColorOne, setSelectedColorOne] =  useState('#fff');
  const [selectedColorTwo, setSelectedColorTwo] =  useState('#d2d2d2');

  const {setFinished} = props;

  const selectedHandler = (isSelected, item) => {
    setFinished(isSelected);
    if(item === 1){

      setSelectedColorOne('#d2d2d2');
      setSelectedColorTwo('#fff');

    }else if(item === 2){

      setSelectedColorOne('#fff');
      setSelectedColorTwo('#d2d2d2');

    }
  };

  return(
    <View style={styles.AheaderContainer}>
      <Ripple style={[styles.center, styles.AheaderRight, styles.AheaderBorderLeft, {backgroundColor: selectedColorOne}]} onPress={()=>selectedHandler(true, 1)}>
        <View>
          <Text style={styles.AheaderH3Text}>فعالیت های انجام شده</Text>
        </View>
        <MaterialCommunityIcons name="account-check" size={23} style={styles.AheaderIcon}/>
      </Ripple>

      <Ripple style={[styles.center, styles.AheaderRight, styles.AheaderBorderLeft, {backgroundColor: selectedColorTwo}]} onPress={()=>selectedHandler(false,2)}>
        <View>
          <Text style={styles.AheaderH3Text}>فعالیت های در حال انجام</Text>
        </View>
        <MaterialCommunityIcons name="account-clock" size={23} style={styles.AheaderIcon}/>
      </Ripple>
    </View>
  )
};

const ActivityItem = () => {
  return(
      <View style={styles.content}>
        <View style={styles.secOne}>

          <View style={styles.secOneEnd}>
            <Ripple style={styles.buttonStyle}>
              <Ionicons name="trash" size={25} color='#A60C00' style={styles.iconStyle}/>
            </Ripple>
            <Ripple style={styles.buttonStyle}>
              <MaterialCommunityIcons name="message-reply-text" color='#005909' size={25} style={styles.iconStyle}/>
            </Ripple>
            <Ripple style={styles.buttonStyle}>
              <MaterialIcons name="my-location" size={25} color="#1A0D8C" style={styles.iconStyle} />
            </Ripple>
          </View>

          <View style={styles.secOneLeft}>
            <Text style={styles.activityValue}>آبیاری (راند اول)</Text>
            <Text style={styles.activityValue}>R07-09</Text>
            <Text style={styles.activityValue}>رحمت الله قاسمی</Text>
            <Text style={styles.activityValue}>در حال اجرا</Text>
          </View>

          <View style={styles.secOneMiddle}>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
          </View>

          <View style={styles.secOneRight}>
            <Text style={styles.activityName}>نوع فعالیت</Text>
            <Text style={styles.activityName}>شماره مزرعه</Text>
            <Text style={styles.activityName}>نام کاربر</Text>
            <Text style={styles.activityName}>وضعیت</Text>
          </View>
        </View>
        <View style={styles.secTwo}>
          <Ripple style={styles.submitButton}>
            <Text style={styles.submitText}>پایان عملیات اجرایی</Text>
          </Ripple>
        </View>

      </View>
  )
};
const FinishedActivityItem = () => {
  return(
      <View style={[styles.content, {height:135}]}>
        <View style={styles.secOne}>
          <View style={styles.secOneEnd}>
            <Ripple style={styles.buttonStyle}>
              <FontAwesome name="check-square" size={30} color='#489026' style={styles.iconStyle}/>
            </Ripple>
            <Ripple style={styles.buttonStyle}>
              <MaterialCommunityIcons name="message-reply" size={28} color='#FF9614' style={[styles.iconStyle]}/>
            </Ripple>
          </View>

          <View style={styles.secOneLeft}>
            <Text style={styles.activityValue}>آبیاری (راند اول)</Text>
            <Text style={styles.activityValue}>R07-09</Text>
            <Text style={styles.activityValue}>رحمت الله قاسمی</Text>
            <Text style={styles.activityValue}>در حال اجرا</Text>
          </View>

          <View style={styles.secOneMiddle}>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
          </View>

          <View style={styles.secOneRight}>
            <Text style={styles.activityName}>نوع فعالیت</Text>
            <Text style={styles.activityName}>شماره مزرعه</Text>
            <Text style={styles.activityName}>نام کاربر</Text>
            <Text style={styles.activityName}>وضعیت</Text>
          </View>
        </View>

      </View>
  )
};

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

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const NContent = () => {

  const [finished, setFinished] = useState(false);

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View style={{height: '90%'}}>
      <Aheader setFinished={setFinished} />
      {
        !finished ?
          <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf'}}>
            <FlatList
              data={DATA}
              renderItem={ActivityItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
          :

          <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf'}}>
            <FlatList
              data={DATA}
              renderItem={FinishedActivityItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f1f1f1'
  },
  AheaderContainer: {
    width:'100%',
    height: w/9,
    flexDirection:'row',
    elevation: 6,
    top:0,
    backgroundColor:'#fff',
  },
  center:{
    alignItems:'center',
    justifyContent:'center',
    height: '100%'
  },
  AheaderLeft:{
    width: w/10,
  },
  AheaderRight:{
    width: '50%',
    flexDirection: 'row',
  },
  AheaderBorderLeft:{
    borderLeftWidth: 0.4,
    borderColor:'#666'
  },
  AheaderIcon:{
    color:'#444',
    marginLeft:8,
  },
  AheaderH3Text:{
    fontSize:13,
    color:'#444',
    textAlign:'center',
    fontFamily:'IRANSansMobile_Light',
  },
  AheaderH4Text:{
    fontSize:10,
    color:'#666',
    textAlign:'center',
    fontFamily:'IRANSansMobile_Light',

  },
  body:{
    margin:3,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
  },

  content: {
    width:'90%',
    height: 180,
    backgroundColor:'#fff',
    elevation: 10,
    right: -20,
    marginBottom:10,
    marginTop:10,
  },

  secOne: {
    height: '70%',
    flexDirection: 'row',
    margin: 5,
  },

  secOneRight:{
    width: '25%',
    margin: 10,
    alignItems:'flex-end',
  },

  secOneMiddle:{
    width: '8%',
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
    width: '20%',
    padding: 10,
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
    alignItems:'flex-start',
    paddingTop: 9
  },

  secTwo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitText: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#fff',
  },

  submitButton:{
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#194d14',
    borderRadius: 7,
    padding: 8,
  },


});

export default NContent;
