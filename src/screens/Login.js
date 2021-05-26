import React, {useEffect, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import Content from '../components/login/Content';
import MyHeader from '../components/header/MyHeader';
import Toast from 'react-native-simple-toast';
import instance from '../services/axios';
import deviceStorage from '../services/deviceStorage';
import {AuthContext} from '../auth/Auth';

let props = {
    name:'Login',
    title:'ورود کاربر'
};


const Login = ({navigation}) => {

    const { newToken } = React.useContext(AuthContext);

    // const {navigate} = useNavigation();
    const[userName,setUserName] = useState('');
    const[password,setPassword] = useState('');

    const userNameHandler = (event)=>{
        setUserName(event);
    };

    const passwordHandler = (event)=>{
        setPassword(event);
    };



    const loginUser = async () => {
        //

        if(userName == ''){
            Toast.show('نام کاربری را وارد کنید', Toast.LONG);
        }else if(password == ''){
            Toast.show('رمز عبور را وارد کنید', Toast.LONG);
        }else{
            instance.post('/api-token-auth/', {
                username: userName,
                password: password,
            })
              .then(async function(response) {
                  // console.log(response.status);
                  // await newToken(response.data.token);
                  // await deviceStorage.saveItem("token", response.data.token);
                  // if(response.status === 201){
                  //     navigation.navigate('MainDrawerNavigator')
                  // }
              })
              .catch(function (error) {
                  if(error.response.data.non_field_errors !== undefined){
                      Toast.show(error.response.data.non_field_errors[0], Toast.LONG);
                  }
              });
        }
    };

    return(
        <View style={{backgroundColor:'#fff'}}>
                <Content
                    userNameHandler={(e)=>userNameHandler(e)}
                    passwordHandler={(e)=>passwordHandler(e)}
                    loginUser={loginUser}
                    navigation={navigation}
                />
        </View>
    );
};



export default Login;
