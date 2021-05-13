import React, {useEffect, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import MyHeader from '../components/header/MyHeader';
import Content from "../components/Main/Content";
import {Container} from "native-base";


let props = {
    name:'Main',
    title:'Tourism'
};

const Main = ({route, navigation},props) => {

    return(
        <Container style={{height: '100%'}}>
            <React.Fragment style={{height: '100%'}}>
                <MyHeader
                    name={'Main'}
                />
                <Content/>
            </React.Fragment>
        </Container>
    );
};



export default Main;
