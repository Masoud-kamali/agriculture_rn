import React,{useState} from 'react';

import {View, StyleSheet, Dimensions, Text, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Ripple from "react-native-material-ripple";


const w = Dimensions.get('window').width;

const Content = (props) =>{
    const {phoneNumberHandler, forgetPassword} = props;

    const [focusPhoneNumberHandler, setFocusPhoneNumberHandler] = useState(false);

    const _changeBorderPhoneNumber = () =>{
        setFocusPhoneNumberHandler(true);
    };


    return(
        <View style={styles.container}>
            <View style={styles.textTitle}>
                <Text style={styles.titleStyle}>فراموشی رمز عبور</Text>
            </View>
            <View style={styles.secOne}>
                <TouchableOpacity
                    style={[styles.secOnePartOne, focusPhoneNumberHandler ? {borderBottomWidth: 2.2} : {}]}
                    activeOpacity={0.9}
                    onPress={()=>_changeBorderPhoneNumber()}
                >
                    <TextInput
                        placeholder="شماره تلفن همراه"
                        style={styles.textInputStyle}
                        placeholderTextColor="#535353"
                        textAlign='right'
                        keyboardType='numeric'
                        onFocus={()=>_changeBorderPhoneNumber()}
                        onChangeText={(event)=>phoneNumberHandler(event)}
                    />
                    <Icon name="mobile-phone" size={26} color="#090962" />
                </TouchableOpacity>
                <Ripple style={styles.loginBtn} onPress={forgetPassword}>
                    <Text style={styles.buttonText}>بازیابی رمزعبور</Text>
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
        backgroundColor : '#0e240a',
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
});

export default React.memo(Content);
