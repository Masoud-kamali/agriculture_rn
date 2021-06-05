import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, TextInput} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    bgHeaderColor: {
        backgroundColor:'#0e240a',
        height: 60
    },
    bgWhiteColor: {
        backgroundColor:'#fff',
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    btn:{
        padding:13,
        borderRadius: 100,
    },
    icon:{
        fontSize: 43,
        color:'#fff',
    },
    iconGray:{
        fontSize:22,
        color:'#777',
    },
    textH1:{
        fontFamily:'bNazanin',
        fontSize:21,
        color:'#fff',
        fontWeight:'bold',
        marginRight:7,
    },

    textH2:{
        fontSize:18,
        color:'#fff',
        marginRight:5,
        fontFamily:'bNazanin',
    },

    textH3:{
        fontSize: 20,
        color:'#ffffff',
        marginRight:5,
        fontFamily:'bNazanin',
    },
    searchText:{
        width:'100%',
        height:'100%',
        textAlign:'right',
        fontFamily:'bNazanin',
    },

});


const MyHeader = (props)=>{

    const {navigate, goBack, toggleDrawer, openDrawer} = useNavigation();


    const MainHeader = () =>{
        return(
            <Header style={styles.bgHeaderColor} androidStatusBarColor='#0e240a'>
                <Right style={styles.row}>
                    {
                        props.title ?
                            <Text style={styles.textH2}>
                                {props.title}
                            </Text> :
                            <Text style={styles.textH1}>
                                اپلیکیشن پایش اراضی نیشکر
                            </Text>
                    }
                <Ripple style={styles.btn} onPress={()=>toggleDrawer()}>
                    <MaterialCommunityIcons name='menu' style={[styles.icon]} onPress={()=>openDrawer()}/>
                </Ripple>

                </Right>
            </Header>
        )
    };

    const ActivityHeader = () =>{
        return(
            <Header style={styles.bgHeaderColor} androidStatusBarColor='#0e240a'>
                <Right style={styles.row}>
                    {
                        props.title ?
                            <Text style={styles.textH2}>
                                {props.title}
                            </Text> :
                            <Text style={styles.textH1}>
                               فعالیت های من
                            </Text>
                    }
                <Ripple style={styles.btn} onPress={()=>toggleDrawer()}>
                    <MaterialCommunityIcons name='menu' style={[styles.icon]} onPress={()=>openDrawer()}/>
                </Ripple>

                </Right>
            </Header>
        )
    };

    const ProgramHeader = () =>{
        return(
            <Header style={styles.bgHeaderColor} androidStatusBarColor='#0e240a'>
                <Right style={styles.row}>
                    {
                        props.title ?
                            <Text style={styles.textH2}>
                                {props.title}
                            </Text> :
                            <Text style={styles.textH1}>
                               برنامه های من
                            </Text>
                    }
                <Ripple style={styles.btn} onPress={()=>toggleDrawer()}>
                    <MaterialCommunityIcons name='menu' style={[styles.icon]} onPress={()=>openDrawer()}/>
                </Ripple>

                </Right>
            </Header>
        )
    };
    const ProgramDetailHeader = () =>{
        return(
            <Header style={styles.bgHeaderColor} androidStatusBarColor='#0e240a'>
                <Right style={styles.row}>
                    {
                        props.title ?
                            <Text style={styles.textH2}>
                                {props.title}
                            </Text> :
                            <Text style={styles.textH1}>
                               جزئیات فعالیت
                            </Text>
                    }
                </Right>
            </Header>
        )
    };

    const InboxHeader = () =>{
        return(
            <Header style={styles.bgHeaderColor} androidStatusBarColor='#0e240a'>
                <Right style={styles.row}>
                    {
                        props.title ?
                            <Text style={styles.textH2}>
                                {props.title}
                            </Text> :
                            <Text style={styles.textH1}>
                               پیام ها
                            </Text>
                    }
                <Ripple style={styles.btn} onPress={()=>toggleDrawer()}>
                    <MaterialCommunityIcons name='menu' style={[styles.icon]} onPress={()=>openDrawer()}/>
                </Ripple>

                </Right>
            </Header>
        )
    };

    const CreateActivityHeader = () =>{
        return(
            <Header style={styles.bgHeaderColor} androidStatusBarColor='#0e240a'>
                <Right style={styles.row}>
                    {
                        props.title ?
                            <Text style={styles.textH2}>
                                {props.title}
                            </Text> :
                            <Text style={styles.textH1}>
                               ایجاد فعالیت
                            </Text>
                    }
                </Right>
            </Header>
        )
    };


    if (props.name === 'Main') {
        return MainHeader();
    }else if(props.name === 'Activity'){
        return ActivityHeader();
    }else if(props.name === 'Program'){
        return ProgramHeader();
    }else if(props.name === 'Inbox'){
        return InboxHeader();
    }else if(props.name === 'CreateActivity'){
        return CreateActivityHeader();
    }else if(props.name === 'programDetail'){
        return ProgramDetailHeader();
    }
};

export default MyHeader;
