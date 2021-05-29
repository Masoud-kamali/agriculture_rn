import React, {useEffect, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import MyHeader from '../components/header/MyHeader';
import Content from "../components/Main/Content";
import {Container} from "native-base";
import deviceStorage from '../services/deviceStorage';
import instance from '../services/axios';
import Toast from 'react-native-simple-toast';


let props = {
    name:'Main',
    title:'Tourism'
};

const Main = ({route, navigation},props) => {

  const [farms, setFarms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{

    (async () => {
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

    return(
        <Container style={{height: '100%'}}>
            <React.Fragment>
                <MyHeader
                    name={'Main'}
                />
              {
                !isLoading ?
                  <Content farms = {farms} /> : null
              }
            </React.Fragment>
        </Container>
    );
};



export default Main;
