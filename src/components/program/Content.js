import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import AHeader from "./AHeader";
import ProgramItem from "./ProgramItem";
import deviceStorage from "../../services/deviceStorage";
import Realm from "realm";
import {UserSchema} from '../../db/Schemas';
import instance from '../../services/axios';

import * as Progress from 'react-native-progress';
const Content = (props) => {

  const {navigation} = props;

  const [secondProgram, setSecondProgram] = useState(false);
  const [daily_irrigation_program, setDaily_irrigation_program] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{

    (async () => {

      const token = await deviceStorage.loadToken();

      const realm = await Realm.open({
        schema: [UserSchema],
      });

      const user = await realm.objects("User");
      let permissions = user[0].permissions;
      let tempPermissions = [];

      for(let i = 0; i < permissions.length; i++){
        tempPermissions.push(permissions[i])
      }

      if(tempPermissions.includes("sugarcane_view_daily_irrigation_activity") || tempPermissions.includes("sugarcane_delete_daily_irrigation_activity") || tempPermissions.includes("sugarcane_confirm_daily_irrigation_activity") || tempPermissions.includes("sugarcane_change_daily_irrigation_activity") || tempPermissions.includes("sugarcane_add_daily_irrigation_activity")){

        await instance.get('/daily_irrigation_program', {
          headers:{
            Authorization: `Token ${token.token}`
          }
        })
          .then(async function(response) {
            console.log(response.data.results);
            setDaily_irrigation_program(response.data.results);
            let tempProgram = [...programs, ...response.data.results];
            setPrograms(tempProgram);

            setIsLoading(false);
          })
      }

    })();

  },[]);


  return (
    <View style={{height: '90%'}}>
      <AHeader setSecondProgram={setSecondProgram} page={'Program'}/>
      {
        !isLoading ?
            !secondProgram ?
                <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf', height:'100%'}}>
                  <FlatList
                      data={programs}
                      renderItem={(item) => <ProgramItem
                          item={item}
                          navigation={navigation}
                      />}
                      keyExtractor={item => item.id}
                  />
                </SafeAreaView>
                :
                <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf', height:'100%'}}>
                  <FlatList
                      data={programs}
                      renderItem={(item) => <ProgramItem
                        item={item}
                        navigation={navigation}
                      />}
                      keyExtractor={item => item.id}
                  />
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
