import React,{useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, TextInput, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from "react-native-material-ripple";


const w = Dimensions.get('window').width;

const Content = (props) =>{

    useEffect(()=>{
        setFocusUserHandler(false);
        setFocusPassHandler(false);
    },[]);


    const {userNameHandler, passwordHandler, loginUser, navigation} = props;

    const [focusUserHandler, setFocusUserHandler] = useState(false);
    const [focusPassHandler, setFocusPassHandler] = useState(false);
    const [defaultText, setDefaultText] = useState('');

    const _changeBorderUser = () =>{
        setFocusUserHandler(true);
        setFocusPassHandler(false);
    };

    const _changeBorderPass = () =>{
        setFocusPassHandler(true);
        setFocusUserHandler(false);
    };

    const _removeBorderPass = async (item) =>{
        await setFocusPassHandler(false);
        await setFocusUserHandler(false);
        if(item == 1 ) {
            await navigation.navigate('ForgetPassword')
        }else if (item == 2) {
            await navigation.navigate('SignUp')
        }
    };


    return(
        <View style={styles.container}>
            <View style={styles.image}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/logo.jpg')}
                />
            </View>
            <View style={styles.secOne}>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusUserHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderUser()}
                >
                    <TextInput
                        placeholder="نام کاربری"
                        style={styles.textInputStyle}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        onFocus={()=>_changeBorderUser()}
                        onChangeText={(event)=>userNameHandler(event)}
                    />
                    <Icon name="user" size={24} color="#090962" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusPassHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderPass()}
                >
                    <TextInput
                        placeholder="رمز عبور"
                        style={styles.textInputStyle}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        secureTextEntry={true}
                        onFocus={()=>_changeBorderPass()}
                        onChangeText={(event)=>passwordHandler(event)}
                    />
                    <Icon name="lock" size={26} color="#090962" />
                </TouchableOpacity>
                <Ripple style={styles.loginBtn} onPress={loginUser}>
                    <Text style={styles.buttonText}>ورود</Text>
                </Ripple>
                <Ripple style={styles.firstBtn} onPress={loginUser}>
                    <Text style={styles.firstButtonText}>ورود با رمز یکبار مصرف</Text>
                </Ripple>
                <TouchableOpacity
                    style={styles.forgetPass}
                    activeOpacity={0.9}
                    onPress={()=>_removeBorderPass(1)}
                >
                    <Text style={styles.forgetPassText}>فراموشی رمز عبور</Text>
                    <MaterialCommunityIcons name="account-question" size={25} color="#090962" style={styles.textIconStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.forgetPass, {marginBottom: 20}]}
                    activeOpacity={0.9}
                    onPress={()=>_removeBorderPass(2)}
                >
                    <Text style={styles.forgetPassText}>ایجاد حساب کاربری</Text>
                    <Icon name="user-plus" size={23} color="#090962" style={styles.textIconStyle} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        padding:20,
        justifyContent: 'flex-start',
        backgroundColor:'#fff',
        paddingTop:0,

    },
    image: {
        marginTop:30,
        marginBottom:15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
    secOne:{
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#e2ffda',
        borderRadius: 8,
        padding: 15,
    },
    secOnePartOne:{
        margin:0,
        marginTop:30,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        borderBottomWidth:1,
        borderColor:'#090962',
        width: '90%'
    },
    forgetPass:{
        margin:0,
        marginTop:20,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        width: '90%',
    },

    forgetPassText:{
        marginRight: 5,
        fontSize:16
    },

    textIconStyle:{
        marginLeft: 5
    },

    textInputStyle:{
        fontSize:14,
        padding: 5,
        textAlign:'right',
        width:'90%',
        paddingBottom:-20,
        fontFamily:'IRANSansMobile_Light',
    },
    loginBtn:{
        marginTop: 30,
        width:'90%',
        backgroundColor : '#073707',
        padding:6,
        borderRadius: 7,
    },

    firstBtn:{
        marginTop: 30,
        width:'90%',
        backgroundColor : '#0e0c71',
        padding:6,
        borderRadius: 7,
    },

    buttonText: {
        textAlign: 'center',
        fontSize:20,
        color:'#fff',
    },
    firstButtonText: {
        textAlign: 'center',
        fontSize:16,
        color:'#fff',
        padding: 4
    },

    secTwo: {
        marginTop:30,
        padding:20,

    },
    secTwoTextOne: {
        fontSize:12,
        color:'#3f3f3f',
    },
    secTwoViewOne: {
        width: w/1.2,
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    //
    secTwoTextTwo:{
        color:'#d23d00',
        fontSize: 12,
        marginTop: 20,
    },
    root: {padding: 20, minHeight: 300, paddingTop:100},
    title: {textAlign: 'center', fontSize: 30},
    codeFiledRoot: {
        marginTop: 20,
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#008321',
        borderBottomWidth: 2,
    },
    head:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:10,
    },
});

export default React.memo(Content);
