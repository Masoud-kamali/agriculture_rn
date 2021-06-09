import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import AHeader from "../program/AHeader";
import ActivityItem from "./ActivityItem";
import deviceStorage from "../../services/deviceStorage";
import Realm from "realm";
import {UserSchema} from '../../db/Schemas';
import instance from '../../services/axios';
import * as Progress from 'react-native-progress';
import {getProgramById} from '../../services/getProgramById';


const Content = (props) => {

  const {navigation} = props;

  // const [secondProgram, setSecondProgram] = useState(false);
  const [daily_irrigation_activity, setDaily_irrigation_activity] = useState(null);
  // const [daily_irrigation_activity_ended, setDaily_irrigation_activity_ended] = useState(null);
  const [activities, setActivities] = useState([]);
  const [ended_Activities, setEnded_Activities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{


    (async () => {

      const token = await deviceStorage.loadToken();


      await instance.get('/daily_irrigation_activity', {
        headers:{
          Authorization: `Token ${token.token}`
        }
      })
        .then(async function(response) {

          let temp_daily_irrigation_activity = [];

          response.data.map(async (item ,key)=>{

            if(item.status === 2){

              let items = await getProgramById(item, token);

              await temp_daily_irrigation_activity.push(items);

              setDaily_irrigation_activity(temp_daily_irrigation_activity);
              let tempActivity = [...activities, ...temp_daily_irrigation_activity];


              setActivities(tempActivity);

            }

          });

        });

      setIsLoading(false);

    })();

    },[]);


  return (
    <View style={{height: '100%', backgroundColor:'#e8ffdf'}}>
      {
        !isLoading && activities.length > 0 ?
                <SafeAreaView style={{paddingBottom: '15%', height:'100%'}}>
                  <FlatList
                      data={activities}
                      renderItem={(item) => <ActivityItem
                          item={item}
                          navigation={navigation}
                      />}
                      keyExtractor={item => item.id}
                  />
                </SafeAreaView>
                : !isLoading && activities.length === 0 ?
                  <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf', height:'100%'}}>
                    <View style={{justifyContent:'center', alignItems:'center', marginTop: 20}}>
                      <Text style={{fontSize: 18, fontWeight: 'bold', color:'#060659'}}>برنامه ای برای نمایش وجود ندارد</Text>
                    </View>
                  </SafeAreaView> :
                <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf', height:'100%', alignItems:'center'}}>
                  <Progress.Circle size={40} indeterminate={true} color={'#0e004b'} style={{marginTop: 40}} borderWidth={2}/>
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

export default Content;
