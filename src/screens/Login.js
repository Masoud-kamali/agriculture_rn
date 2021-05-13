import React, {useEffect, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import Content from '../components/login/Content';
import MyHeader from '../components/header/MyHeader';
import Toast from 'react-native-simple-toast';

let props = {
    name:'Login',
    title:'ورود کاربر'
};


const Login = ({navigation}) => {

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

        if(userName == ''){
            Toast.show('نام کاربری را وارد کنید', Toast.LONG);
        }else if(password == ''){
            Toast.show('رمز عبور را وارد کنید', Toast.LONG);
        }else{
            navigation.navigate('MainDrawerNavigator')
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
