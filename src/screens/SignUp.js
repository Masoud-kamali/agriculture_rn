import React, {useEffect, useState} from 'react';
import {View, ToastAndroid, StatusBar} from 'react-native';
import Content from '../components/signup/Content';
import MyHeader from '../components/header/MyHeader';
import Toast from 'react-native-simple-toast';

let props = {
    name:'Login',
    title:'ورود کاربر'
};


const SignUp = ({navigation}) => {

    // const {navigate} = useNavigation();
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[userName, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[isSelected, setIsSelected] = useState(false);

    const firstNameHandler = (event)=>{
        setFirstName(event);
    };

    const lastNameHandler = (event)=>{
        setLastName(event);
    };

    const userNameHandler = (event)=>{
        setUserName(event);
    };

    const passwordHandler = (event)=>{
        setPassword(event);
    };

    const confirmPasswordHandler = (event)=>{
        setConfirmPassword(event);
    };

    const isSelectedHandler = (isSelected)=>{
        console.log(isSelected);
        setIsSelected(isSelected);
    };



    const signUpUser = async () => {

        if(firstName == ''){
            Toast.show('نام را وارد کنید', Toast.LONG);
        }else if(lastName == ''){
            Toast.show('نام خانوادگی را وارد کنید', Toast.LONG);
        }else if(userName == ''){
            Toast.show('نام کاربری را وارد کنید', Toast.LONG);
        }else if(password == ''){
            Toast.show('رمز عبور را وارد کنید', Toast.LONG);
        }else if(confirmPassword == ''){
            Toast.show('تایید رمز عبور را وارد کنید', Toast.LONG);
        }else if(confirmPassword != password){
            Toast.show('رمز عبورها یکسان نیست', Toast.LONG);
        }else if(isSelected != true){
            Toast.show('قوانین را قبول نکرده اید', Toast.LONG);
        }else{
            navigation.navigate('Login')
        }


    };

    return(
        <View style={{backgroundColor:'#fff'}}>
            <StatusBar
                backgroundColor="#405457"
            />
            <Content
                firstNameHandler={(e)=>firstNameHandler(e)}
                lastNameHandler={(e)=>lastNameHandler(e)}
                userNameHandler={(e)=>userNameHandler(e)}
                passwordHandler={(e)=>passwordHandler(e)}
                confirmPasswordHandler={(e)=>confirmPasswordHandler(e)}
                isSelectedHandler={(isSelected)=>isSelectedHandler(isSelected)}
                signUpUser={signUpUser}
            />
        </View>
    );
};



export default SignUp;
