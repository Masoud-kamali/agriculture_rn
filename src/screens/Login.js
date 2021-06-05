import React, {useEffect, useState} from 'react';
import {View, ToastAndroid, StyleSheet} from 'react-native';
import Content from '../components/login/Content';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import instance from '../services/axios';
import {AuthContext} from '../auth/Auth';
import deviceStorage from '../services/deviceStorage';
import Realm from "realm";
import {UserSchema} from '../db/Schemas';



let props = {
    name:'Login',
    title:'ورود کاربر'
};


const Login = ({navigation}) => {

    const { newToken } = React.useContext(AuthContext);

    // const {navigate} = useNavigation();
    const[userName,setUserName] = useState('');
    const[password,setPassword] = useState('');
    const[isLoading,setIsLoading] = useState(false);

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
            setIsLoading(true);
            instance.post('/api-token-auth/', {
                username: userName,
                password: password,
            })
              .then(async function(response) {
                  await instance.get('/user',{
                      headers:{
                          Authorization: `Token ${response.data.token}`
                      }
                  })
                    .then(async function(response) {
                        const realm = await Realm.open({
                            schema: [UserSchema],
                        });
                        let user;

                        realm.write(() => {
                            user = realm.create("User", {
                                id: response.data.id,
                                first_name: response.data.first_name,
                                last_name: response.data.last_name,
                                username: response.data.username,
                                email: response.data.email,
                                is_active: response.data.is_active,
                                date_joined: response.data.date_joined,
                                avatar: response.data.avatar,
                                access_to_all_farms: response.data.access_to_all_farms,
                                role: response.data.role,
                                permissions: response.data.permissions
                            });
                        });

                    })
                    .catch(function (error) {
                      setIsLoading(false)
                        console.log(error);
                    });
                  setIsLoading(false);
                  await newToken(response.data.token);
                  await deviceStorage.saveItem("token", response.data.token);
              })
              .catch(function (error) {
                  if(error.response.data.non_field_errors !== undefined){
                      Toast.show(error.response.data.non_field_errors[0], Toast.LONG);
                  }
              });
        }
    };

    return(
      <React.Fragment>
        <View style={{backgroundColor:'#fff'}}>
          <Content
            userNameHandler={(e)=>userNameHandler(e)}
            passwordHandler={(e)=>passwordHandler(e)}
            loginUser={loginUser}
            navigation={navigation}
          />
        </View>
        <Spinner
          visible={isLoading}
          textContent={'ارسال اطلاعات ...'}
          textStyle={styles.spinnerTextStyle}
        />
      </React.Fragment>
    );
};

const styles =  StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});

export default Login;
