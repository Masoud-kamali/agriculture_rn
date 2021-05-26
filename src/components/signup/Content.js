import React,{useState} from 'react';

import {View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import {CheckBox} from 'native-base';
import Toast from 'react-native-simple-toast';

import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import Ripple from "react-native-material-ripple";


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Content = (props) =>{
    const {firstNameHandler, lastNameHandler, userNameHandler, passwordHandler, confirmPasswordHandler,  signUpUser, isSelectedHandler} = props;

    const [focusFirstNameHandler, setFocusFirstNameHandler] = useState(false);
    const [focusLastNameHandler, setFocusLastNameHandler] = useState(false);
    const [focusUserHandler, setFocusUserHandler] = useState(false);
    const [focusPassHandler, setFocusPassHandler] = useState(false);
    const [focusConfirmPassHandler, setFocusConfirmPassHandler] = useState(false);

    const [isSelected, setIsSelected] = useState(false);

    const selectedHandler = (selected) => {
        setIsSelected(selected);
        isSelectedHandler(selected);
    };

    const _changeBorderFirstName = () =>{
        setFocusFirstNameHandler(true);
        setFocusLastNameHandler(false);
        setFocusUserHandler(false);
        setFocusPassHandler(false);
        setFocusConfirmPassHandler(false);
    };

    const _changeBorderLastName = () =>{
        setFocusFirstNameHandler(false);
        setFocusLastNameHandler(true);
        setFocusUserHandler(false);
        setFocusPassHandler(false);
        setFocusConfirmPassHandler(false);
    };

    const _changeBorderUser = () =>{
        setFocusFirstNameHandler(false);
        setFocusLastNameHandler(false);
        setFocusUserHandler(true);
        setFocusPassHandler(false);
        setFocusConfirmPassHandler(false);
    };

    const _changeBorderPass = () =>{
        setFocusFirstNameHandler(false);
        setFocusLastNameHandler(false);
        setFocusUserHandler(false);
        setFocusPassHandler(true);
        setFocusConfirmPassHandler(false);
    };

    const _changeBorderConfirmPass = () =>{
        setFocusFirstNameHandler(false);
        setFocusLastNameHandler(false);
        setFocusUserHandler(false);
        setFocusPassHandler(false);
        setFocusConfirmPassHandler(true);
    };


    return(
        <View style={styles.container}>
            <View style={styles.secHeader}>
                <Text style={styles.TextHeader}>ثبت نام کاربر</Text>
            </View>
            <View style={styles.secOne}>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusFirstNameHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderFirstName()}
                >
                    <TextInput
                        placeholder="نام"
                        style={styles.textInputStyle}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        onFocus={()=>_changeBorderFirstName()}
                        onChangeText={(event)=>firstNameHandler(event)}
                    />
                    <Entypo name="user" size={focusFirstNameHandler ? 26 : 22} color="#090962" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusLastNameHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderLastName()}
                >
                    <TextInput
                        placeholder="نام خانوادگی"
                        style={styles.textInputStyle}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        onFocus={()=>_changeBorderLastName()}
                        onChangeText={(event)=>lastNameHandler(event)}
                    />
                    <Entypo name="user" size={focusLastNameHandler ? 26 : 22} color="#090962" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusUserHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderUser()}
                >
                    <TextInput
                        placeholder="نام کاربری"
                        style={[styles.textInputStyle, {paddingRight:9}]}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        onFocus={()=>_changeBorderUser()}
                        onChangeText={(event)=>userNameHandler(event)}
                    />
                    <Icon name="user" size={focusUserHandler ? 26 : 24} color="#090962" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusPassHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderPass()}
                >
                    <TextInput
                        placeholder="رمز عبور"
                        style={[styles.textInputStyle, {paddingRight:9}]}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        secureTextEntry={true}
                        onFocus={()=>_changeBorderPass()}
                        onChangeText={(event)=>passwordHandler(event)}
                    />
                    <Icon name="lock" size={focusPassHandler ? 30 : 26} color="#090962" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusConfirmPassHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderConfirmPass()}
                >
                    <TextInput
                        placeholder="تکرار رمز عبور"
                        style={[styles.textInputStyle, {paddingRight:9}]}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        secureTextEntry={true}
                        onFocus={()=>_changeBorderConfirmPass()}
                        onChangeText={(event)=>confirmPasswordHandler(event)}
                    />
                    <Icon name="lock" size={focusConfirmPassHandler ? 30 : 26} color="#090962" />
                </TouchableOpacity>
                <View style={styles.checkboxContainer}>
                    <Text style={styles.label}>
                        من قوانین و شرایط را قبول می کنم.
                    </Text>
                    <CheckBox checked={isSelected} color="green" onPress={()=> selectedHandler(!isSelected)} />
                </View>
                <Ripple style={styles.loginBtn} onPress={signUpUser}>
                    <Text style={styles.buttonText}>ثبت نام</Text>
                </Ripple>
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
        backgroundColor:'#0e240a',
        paddingTop:0,

    },
    textTitle: {
        marginTop:30,
        marginBottom:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 24,
        color:'#fff',
        fontWeight:'bold',
        fontFamily:'IRANSansMobile_Light',

    },
    secOne:{
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#ebf7e3',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 15,
    },
    secHeader:{
        marginTop: 40,
        margin: 0,
        padding:0,
        height: h/11,
        backgroundColor:'#219372',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent:'center',

    },

    TextHeader:{
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
    },
    secOnePartOne:{
        margin:0,
        marginTop:30,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        borderBottomWidth:1,
        borderColor:'#090962',
        width: '90%',
        paddingBottom: 5
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
        marginRight:10,
        textAlign:'right',
        width:'90%',
        paddingBottom:-20,
        fontFamily:'IRANSansMobile_Light',
    },
    loginBtn:{
        marginTop: 30,
        marginBottom: 5,
        width:'90%',
        backgroundColor : '#219372',
        padding:6,
        borderRadius: 7,
    },

    firstBtn:{
        marginTop: 30,
        width:'90%',
        backgroundColor : '#274d99',
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        marginTop: 30,
        marginRight: 25,
    },
    label: {
        marginRight: 5,
        textAlign:'right',
        width:'90%',
        fontSize: 16,

    },
});

export default React.memo(Content);
