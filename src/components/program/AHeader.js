import {default as React, useState} from "react";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import Ripple from "react-native-material-ripple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const w = Dimensions.get('window').width;

const AHeader = (props) =>{

    const [selectedColorOne, setSelectedColorOne] =  useState('#fff');
    const [selectedColorTwo, setSelectedColorTwo] =  useState('#d2d2d2');

    const {setSecondProgram} = props;

    const selectedHandler = (isSelected, item) => {
        setSecondProgram(isSelected);
        if(item === 1){

            setSelectedColorOne('#d2d2d2');
            setSelectedColorTwo('#fff');

        }else if(item === 2){

            setSelectedColorOne('#fff');
            setSelectedColorTwo('#d2d2d2');

        }
    };

    return(
        <View style={styles.AheaderContainer}>
            {
                props.page === 'Program' ?
                  <React.Fragment>
                      <Ripple style={[styles.center, styles.AheaderRight, styles.AheaderBorderLeft, {backgroundColor: selectedColorOne}]} onPress={()=>selectedHandler(true, 1)}>
                          <View>
                              <Text style={styles.AheaderH3Text}>برنامه های اتمام یافته</Text>
                          </View>
                          <MaterialCommunityIcons name="account-check" size={23} style={styles.AheaderIcon}/>
                      </Ripple>

                      <Ripple style={[styles.center, styles.AheaderRight, styles.AheaderBorderLeft, {backgroundColor: selectedColorTwo}]} onPress={()=>selectedHandler(false,2)}>
                          <View>
                              <Text style={styles.AheaderH3Text}>برنامه های انجام نشده</Text>
                          </View>
                          <MaterialCommunityIcons name="account-clock" size={23} style={styles.AheaderIcon}/>
                      </Ripple>
                  </React.Fragment> :
                  <React.Fragment>
                      <Ripple style={[styles.center, styles.AheaderRight, styles.AheaderBorderLeft, {backgroundColor: selectedColorOne}]} onPress={()=>selectedHandler(true, 1)}>
                          <View>
                              <Text style={styles.AheaderH3Text}>فعالیت های در حال انجام</Text>
                          </View>
                          <MaterialCommunityIcons name="account-check" size={23} style={styles.AheaderIcon}/>
                      </Ripple>

                      <Ripple style={[styles.center, styles.AheaderRight, styles.AheaderBorderLeft, {backgroundColor: selectedColorTwo}]} onPress={()=>selectedHandler(false,2)}>
                          <View>
                              <Text style={styles.AheaderH3Text}>فعالیت های انجام نشده</Text>
                          </View>
                          <MaterialCommunityIcons name="account-clock" size={23} style={styles.AheaderIcon}/>
                      </Ripple>
                  </React.Fragment>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    AheaderContainer: {
        width:'100%',
        height: w/9,
        flexDirection:'row',
        elevation: 6,
        top:0,
        backgroundColor:'#fff',
    },
    center:{
        alignItems:'center',
        justifyContent:'center',
        height: '100%'
    },
    AheaderLeft:{
        width: w/10,
    },
    AheaderRight:{
        width: '50%',
        flexDirection: 'row',
    },
    AheaderBorderLeft:{
        borderLeftWidth: 0.4,
        borderColor:'#666'
    },
    AheaderIcon:{
        color:'#444',
        marginLeft:8,
    },
    AheaderH3Text:{
        fontSize:13,
        color:'#444',
        textAlign:'center',
        fontFamily:'IRANSansMobile_Light',
    },
    AheaderH4Text:{
        fontSize:10,
        color:'#666',
        textAlign:'center',
        fontFamily:'IRANSansMobile_Light',

    },
});

export default AHeader;
