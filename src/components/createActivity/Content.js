import React, { useState, useEffect, useRef } from 'react';

import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Button} from 'react-native';

import Ripple from 'react-native-material-ripple';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';


const Content = (props) => {

  const [selectedLanguage, setSelectedLanguage] = useState();


  const [pickerTypeStart, setPickerTypeStart] = useState('date');
  const [pickerTypeEnd, setPickerTypeEnd] = useState('date');

    const [isDatePickerVisibleStart, setDatePickerVisibilityStart] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);

    const showDatePickerStart = () => {
      if(pickerTypeStart == 'time'){
        setPickerTypeStart('date');
        setDatePickerVisibilityStart(true);
      }else{
        setDatePickerVisibilityStart(true);
      }
    };

    const hideDatePickerStart = () => {
      setDatePickerVisibilityStart(false);

    };

    const handleConfirmStart = (date) => {
      console.warn("A date has been picked: ", date);
      if(pickerTypeStart == 'time'){
        hideDatePickerStart();
      }else{
        setPickerTypeStart('time');
        hideDatePickerStart();
        showDatePickerStart();
      }

    };

    const showDatePickerEnd = () => {
      if(pickerTypeEnd == 'time'){
        setPickerTypeEnd('date');
        setDatePickerVisibilityEnd(true);
      }else{
        setDatePickerVisibilityEnd(true);
      }
    };

    const hideDatePickerEnd = () => {
      setDatePickerVisibilityEnd(false);
    };

    const handleConfirmEnd = (date) => {
      console.warn("A date has been picked: ", date);
      if(pickerTypeEnd == 'time'){
        hideDatePickerEnd();
      }else{
        setPickerTypeEnd('time');
        hideDatePickerEnd();
        showDatePickerEnd();
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.dateButton}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="" value= "0" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>

        <Ripple
          style={styles.dateButton}
          title="Show Date Picker"
          onPress={showDatePickerStart}
        >
          <Text style={styles.dateText}>ثبت زمان شروع</Text>
        </Ripple>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleStart}
          mode={pickerTypeStart}
          onConfirm={handleConfirmStart}
          onCancel={hideDatePickerStart}
        />


        <Ripple
          style={styles.dateButton}
          title="Show Date Picker"
          onPress={showDatePickerEnd}
        >
          <Text style={styles.dateText}>ثبت زمان پایان</Text>
        </Ripple>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleEnd}
          mode={pickerTypeEnd}
          onConfirm={handleConfirmEnd}
          onCancel={hideDatePickerEnd}
        />


      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#e8ffdf'
  },

  content : {
    width: '85%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  dateButton : {
    width: '70%',
    backgroundColor:'#364959',
    borderRadius: 8,
    margin: 15
  },

  dateText : {
    fontSize: 20,
    textAlign: 'center',
    color:'#fff',
    padding: 8,
  },

});


export default Content;
