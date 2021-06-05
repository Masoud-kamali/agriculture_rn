import {Text, View, StyleSheet} from "react-native";
import Ripple from "react-native-material-ripple";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";

import moment from "moment-jalaali";
import fa from "moment/src/locale/fa";
moment.locale("fa", fa);
moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

const ProgramItem = (props) => {

    const {item} = props.item;
    const {navigation} = props;

    return(
        <View style={styles.content}>
            <View style={styles.secOne}>
                <View style={styles.secOneEnd}>
                    <Ripple style={styles.buttonStyle}  onPress={()=> navigation.navigate('ProgramDetail', {program: item})}>
                        <MaterialCommunityIcons name="message-reply-text" color='#ff5366' size={30} style={styles.iconStyle}/>
                    </Ripple>
                </View>
                <View style={styles.secOneLeft}>
                    <Text style={styles.activityValue}>{item.program_type}</Text>
                    <Text style={styles.activityValue}>{item.farm}</Text>
                    <Text style={styles.activityValue}>{moment(item.created_at, 'YYYY-M-D').format('jYYYY/jM/jD')}</Text>
                </View>
                <View style={styles.secOneMiddle}>
                    <Text style={styles.pointStyle}>:</Text>
                    <Text style={styles.pointStyle}>:</Text>
                    <Text style={styles.pointStyle}>:</Text>
                </View>
                <View style={styles.secOneRight}>
                    <Text style={styles.activityName}>نوع فعالیت</Text>
                    <Text style={styles.activityName}>نام مزرعه</Text>
                    <Text style={styles.activityName}>تاریخ ایجاد</Text>
                </View>
            </View>
            <View style={styles.secTwo}>
                <Ripple style={styles.submitButton} onPress={()=> navigation.navigate('ProgramDetail', {program: item})}>
                    <Text style={styles.submitText}>شروع فعالیت</Text>
                </Ripple>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        width:'90%',
        height: 150,
        backgroundColor:'#fff',
        elevation: 10,
        right: -20,
        marginBottom:10,
        marginTop:10,
        borderRadius: 7
    },

    secOne: {
        height: '62%',
        flexDirection: 'row',
        margin: 5,
    },

    secOneRight:{
        width: '25%',
        margin: 10,
        alignItems:'flex-end',
    },

    secOneMiddle:{
        width: '8%',
        margin: 3,
        marginTop: 10,
        alignItems:'flex-end',
    },

    secOneLeft:{
        width: '35%',
        margin: 3,
        marginTop: 10,
        alignItems:'flex-end',
    },

    secOneEnd:{
        width: '20%',
        padding: 10,
    },

    activityName:{
        fontSize: 15,
        padding: 3,
        color:'#0c1b08',
    },

    pointStyle:{
        fontSize: 15,
        padding: 3,
        color:'#130066',
    },

    activityValue:{
        fontSize: 15,
        padding: 3,
        color:'#130066',
    },

    buttonStyle:{
        alignItems:'flex-start',
        paddingTop: 9
    },

    secTwo: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    submitText: {
        fontSize: 19,
        fontWeight:'bold',
        color: '#fff',
    },

    submitButton:{
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#194d14',
        borderRadius: 7,
        padding: 6,
        marginTop: 5,
    },

});

export default ProgramItem;
