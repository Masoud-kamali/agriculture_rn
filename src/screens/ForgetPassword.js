import React, {useEffect, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import Content from '../components/forgetPassword/Content';
import Toast from 'react-native-simple-toast';


const ForgetPassword = ({navigation}) => {

    // const {navigate} = useNavigation();
    const[phoneNumber,setPhoneNumber] = useState('');

    const phoneNumberHandler = (event)=>{
        setPhoneNumber(event);
    };


    const forgetPassword = async () => {

        if(phoneNumber == ''){
            Toast.show('شماره تلفن همراه را وارد کنید', Toast.LONG);
        }else{
            navigation.navigate('Login')
        }

    };

    return(
        <View style={{backgroundColor:'#fff'}}>
            <Content
                phoneNumberHandler={(e)=>phoneNumberHandler(e)}
                forgetPassword={forgetPassword}
                navigation={navigation}
            />
        </View>
    );
};



export default ForgetPassword;
