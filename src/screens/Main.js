import React, {useEffect, useState} from 'react';
import {View, ToastAndroid, SafeAreaView, Text, BackHandler} from 'react-native';
import MyHeader from '../components/header/MyHeader';
import Content from "../components/Main/Content";
import {Container} from "native-base";
import deviceStorage from '../services/deviceStorage';
import instance from '../services/axios';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../auth/Auth';
import * as Progress from 'react-native-progress';
import NetInfo from '@react-native-community/netinfo';
import Dialog from 'react-native-dialog';


let props = {
    name:'Main',
    title:'Tourism'
};

const Main = ({route, navigation},props) => {

  const { geoJson } = React.useContext(AuthContext);


  const [farms, setFarms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(()=>{

    (async () => {

      NetInfo.fetch().then(state => {

        if(state.isConnected !== true) {
          setDialogVisible(true)

        }
      });


      const token = await deviceStorage.loadToken();
      await instance.post('/user/user_farms_all', {},{
        headers:{
          Authorization: `Token ${token.token}`
        }
      })
        .then(async function(response) {
          setFarms(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });


    })();

  },[]);

  const handleCancel = () =>{
    setDialogVisible(false)
  };

    return(
        <Container style={{height: '100%'}}>
            <React.Fragment>
                <MyHeader
                    name={'Main'}
                />
              {
                !isLoading ?
                  <Content
                    farms = {farms}
                    geoJson = {geoJson}
                  /> :
                  <SafeAreaView style={{paddingBottom: '10%', backgroundColor:'#e8ffdf', height:'100%', alignItems:'center'}}>
                    <Progress.Circle size={40} indeterminate={true} color={'#0e004b'} style={{marginTop: 40}} borderWidth={2}/>
                  </SafeAreaView>
              }
              <Dialog.Container
                visible={dialogVisible}
                headerStyle={{backgroundColor:'#f9fbff', margin: 0, justifyContent:'center', alignItems:'center'}}
                contentStyle={{backgroundColor:'#f9fbff', borderRadius: 5}}
                footerStyle={{justifyContent:'center', alignItems:'center'}}
              >
                <Dialog.Title><View><Text style={{fontSize: 22, fontWeight:'bold'}}>عدم ارتباط با اینترنت</Text></View></Dialog.Title>
                <Dialog.Description>
                  <View style={{padding: 2}}><Text style={{fontSize: 16}}>برای دریافت برنامه ها و ثبت فعالیت نیاز به اینترنت می باشد</Text></View>
                </Dialog.Description>
                <Dialog.Button label="متوجه شدم" onPress={handleCancel} style={{backgroundColor:'#060659', margin:5, color:'#fff', borderRadius:5, padding: 10}}/>
              </Dialog.Container>
            </React.Fragment>
        </Container>
    );
};



export default Main;
