import React, { useState, useEffect, useRef } from 'react';

import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ripple from 'react-native-material-ripple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DescMessage = () => {
  return(
    <View style={styles.content}>
        <View style={styles.secOne}>

          <View style={styles.secOneLeft}>
            <Text style={styles.activityValue}>پیام اول</Text>
            <Text style={styles.activityValue}>رضا رضایی</Text>
          </View>

          <View style={styles.secOneMiddle}>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
          </View>

          <View style={styles.secOneRight}>
            <Text style={styles.activityName}>عنوان پیام</Text>
            <Text style={styles.activityName}>کاربر ارسال کننده</Text>
            <Text style={styles.activityName}>محتوا پیام</Text>
          </View>
        </View>
        <View style={styles.secTwo}>
            <Text style={styles.submitText}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </Text>
        </View>
    </View>
  )
};

const DescContent = (props) => {


  return (
    <View style={{height: '100%', backgroundColor:'#e8ffdf'}}>
      <DescMessage/>
    </View>
  );
};

const styles = StyleSheet.create({

  content: {
    width:'90%',
    height: null,
    backgroundColor:'#fff',
    elevation: 10,
    right: -20,
    marginBottom:8,
    marginTop:8,
  },

  secOne: {
    height: null,
    flexDirection: 'row',
    margin: 5,
  },

  secOneRight:{
    width: '40%',
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
    width: '45%',
    margin: 3,
    marginTop: 10,
    alignItems:'flex-end',

  },

  activityName:{
    fontSize: 18,
    fontStyle: 'italic',
    padding: 3,
    color:'#0c1b08',
  },

  pointStyle:{
    fontSize: 18,
    padding: 3,
    color:'#130066',
  },

  activityValue:{
    fontSize: 18,
    padding: 3,
    color:'#130066',
  },

  buttonStyle:{
    alignItems:'flex-end',
    paddingTop: 20
  },

  secTwo: {
    alignItems: 'flex-start',
    padding: 10
  },

  submitText: {
    textAlign:'justify',

  },


});


export default DescContent;
