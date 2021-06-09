import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import Dialog from "react-native-dialog";
import Feather from 'react-native-vector-icons/Feather';
import Ripple from "react-native-material-ripple";
import MapboxGL from '@react-native-mapbox-gl/maps';
import { getDistance } from 'geolib';

import moment from "moment-jalaali";
import fa from "moment/src/locale/fa";
import Realm from "realm";
import {UserSchema} from '../../db/Schemas';
import instance from '../../services/axios';
import deviceStorage from '../../services/deviceStorage';
moment.locale("fa", fa);
moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

MapboxGL.setAccessToken("pk.eyJ1IjoibWFzb3VkMTIzIiwiYSI6ImNrcGh6Y2hobTJ3YjkydW54dzdxbWljamgifQ.VIo429gpnL3Lz-7pq0dAhA");

const Content = (props) => {

  const {navigation, activity, farmData, desc} = props;

  const [cameraCenter, setCameraCenter] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [polygonCenter, setPolygonCenter] = useState(null);
  const [programId, setProgramId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [locationDiffVisible, setLocationDiffVisible] = useState(false);
  const [userLocation, setUserLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const decZoomHandler = () =>{
    let zoom = zoomLevel;
    if(zoom > 8){
      zoom -= .2;
      setZoomLevel(zoom)
    }else {
      setZoomLevel(8);
      Toast.show('امکان کوچک نمایی بیشتر وجود ندارد', Toast.LONG);
    }
  };

  const incZoomHandler = () =>{
    let zoom = zoomLevel;
    if(zoom < 20){
      zoom += .2;
      setZoomLevel(zoom)
    }else {
      setZoomLevel(20);
      Toast.show('امکان بزرگ نمایی بیشتر وجود ندارد', Toast.LONG);
    }
  };

  const regionChange = async (e) =>{
    let zoom = await _map.getZoom();

    if(zoom < 8){
      zoom = 8;
      Toast.show('امکان کوچک نمایی بیشتر وجود ندارد', Toast.LONG);
      await setZoomLevel(zoom);

    }else if(zoom > 20){
      zoom = 20;
      Toast.show('امکان بزرگ نمایی بیشتر وجود ندارد', Toast.LONG);
      await setZoomLevel(zoom);

    }else {
      await setZoomLevel(zoom);

    }
    let coordinate = e.geometry.coordinates;
    await setCameraCenter(coordinate);
  };

  const showDialog = (id) => {
    setProgramId(id);
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
    setLocationDiffVisible(false);

  };

  const handleActivity = async () => {

    let distance = await getDistance({latitude: userLocation[0], longitude: userLocation[1]}, {
      latitude: polygonCenter[1],
      longitude: polygonCenter[0],
    }, 0.1);

    if(distance > 5000 || distance == null) {
      setLocationDiffVisible(true)

    }else{

      (async () => {

        const realm = await Realm.open({
          schema: [UserSchema],
        });
        const user = await realm.objects("User");


        const token = await deviceStorage.loadToken();

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        today.setHours(today.getHours() + 4);
        today.setMinutes(today.getMinutes() + 30);

        await instance.post('/daily_irrigation_activity/', {
          worker : user[0].id,
          program : activity.id,
          start_time : today.toISOString(),
          end_time : today.toISOString()
        },{
          headers:{
            Authorization: `Token ${token.token}`
          }
        })
          .then(async function(response) {
            navigation.navigate('MainDrawerNavigator')
          })
          .catch(function (error) {
            console.log(error.message);
          });

        setIsLoading(false);

      })();

    }

    setDialogVisible(false);
  };

  let _map = useRef(null);

  useEffect(()=> {
    _map.current;

    let xArray = [];
    let yArray = [];

    let centerOfPolygon;

    (async () => {

      for(let i = 0; i < farmData.features.length; i++){
        if (farmData.features[i].properties.name === 'R12-04') {
          let polyLength = farmData.features[i].geometry.coordinates[0][0].length;
          for(let j = 0; j < polyLength; j++){
            yArray.push(farmData.features[i].geometry.coordinates[0][0][j][0]);
            xArray.push(farmData.features[i].geometry.coordinates[0][0][j][1]);
          }

          let yMin = Math.min(...yArray);
          let yMax = Math.max(...yArray);
          let xMin = Math.min(...xArray);
          let xMax = Math.max(...xArray);

          let x = xMin + ((xMax - xMin) / 2);
          let y = yMin + ((yMax - yMin) / 2);
          centerOfPolygon = [y, x];
          setCameraCenter(centerOfPolygon);
          setPolygonCenter(centerOfPolygon);
        }
      }

    })();


  },[]);


  return (
    <View style={{alignItems:'center', justifyContent:'center', padding: 5}}>
      <View style={{height: 200, width: '90%', borderColor: '#090934', borderWidth: 2}}>
        <MapboxGL.MapView
          ref={(c) => (_map = c)}
          logoEnabled = {false}
          styleURL={MapboxGL.StyleURL.Satellite}
          style={{flex: 1}}
          minZoomLevel={7}
          maxZoomLevel={13}
          onRegionDidChange = {(e)=>regionChange(e)}
        >
          <MapboxGL.Camera
            centerCoordinate={cameraCenter}
            zoomLevel={zoomLevel}
          />

          <MapboxGL.ShapeSource
            id='farms'
            shape={props.farmData}
          >
            {
              props.farmData.features.map((item, key) => (
                <MapboxGL.FillLayer
                  key={key}
                  id={`${key}`}
                  sourceLayerID = {`farms`}
                  style={polygonStyle.smileyFace}
                  layerIndex={2}
                  filter={['==', 'name', `${activity.p_farm}`]}
                />
              ))
            }

          </MapboxGL.ShapeSource>
          <MapboxGL.UserLocation
            onUpdate={(location)=>{
              let tempUserLocation = [];
              tempUserLocation[0] = location.coords.latitude;
              tempUserLocation[1] = location.coords.longitude;
              setUserLocation(tempUserLocation);
            }}
            showsUserHeadingIndicator={true}
          />
          <MapboxGL.PointAnnotation
            key="key1"
            id="id1"
            title="Test"
            coordinate={polygonCenter}>
          </MapboxGL.PointAnnotation>
        </MapboxGL.MapView>
        <TouchableOpacity
          onPress={() => incZoomHandler()}
          activeOpacity={0.7}
          style={[
            styles.button,
            { position: 'absolute', left: '1%', top: '2%' },
          ]}>
          <Feather name="zoom-in" size={25} color="#fff" style={styles.textIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => decZoomHandler()}
          activeOpacity={0.7}
          style={[
            styles.button,
            { position: 'absolute', left: '1%', top: '25%' },
          ]}>
          <Feather name="zoom-out" size={25} color="#fff" style={styles.textIconStyle} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#fff', margin: 5, width: '90%', padding: 5, height: null, borderColor: '#090942', borderWidth: 2}}>
        <View style={styles.secOne}>
          <View style={styles.secOneLeft}>
              <Text style={styles.activityValue}>{activity.p_program_type}</Text>
            <Text style={styles.activityValue}>{activity.p_farm}</Text>
            <Text style={styles.activityValue}>{moment(activity.p_created_at, 'YYYY-M-D').format('jYYYY/jM/jD')}</Text>
            <Text style={styles.activityValue}>{moment(activity.start_time, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')}</Text>
            <Text style={styles.activityValue}>{activity.p_rand}</Text>
            <Text style={styles.activityValue}>{activity.p_index}</Text>
            <Text style={styles.activityValue}>{activity.p_from_faro}</Text>
            <Text style={styles.activityValue}>{activity.p_to_faro}</Text>
          </View>
          <View style={styles.secOneMiddle}>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
            <Text style={styles.pointStyle}>:</Text>
          </View>
          <View style={styles.secOneRight}>
            <Text style={styles.activityName}>نوع فعالیت</Text>
            <Text style={styles.activityName}>نام مزرعه</Text>
            <Text style={styles.activityName}>تاریخ ایجاد فعالیت</Text>
            <Text style={styles.activityName}>زمان شروع فعالیت</Text>
            <Text style={styles.activityName}>راند</Text>
            <Text style={styles.activityName}>شاخص</Text>
            <Text style={styles.activityName}>از فارو</Text>
            <Text style={styles.activityName}>تا فارو</Text>
          </View>
        </View>
        {
          !desc ?
            <View style={styles.secTwo}>
              <Ripple style={styles.submitButton} onPress = {()=>showDialog(activity.id)}>
                <Text style={styles.submitText}>پایان فعالیت</Text>
              </Ripple>
            </View> : null
        }
        <Dialog.Container
          visible={dialogVisible}
          headerStyle={{backgroundColor:'#f9fbff', margin: 0, justifyContent:'center', alignItems:'center'}}
          contentStyle={{backgroundColor:'#f9fbff', borderRadius: 5}}
          footerStyle={{justifyContent:'center', alignItems:'center'}}
        >
          <Dialog.Title><View><Text style={{fontSize: 22, fontWeight:'bold'}}>ایجاد فعالیت</Text></View></Dialog.Title>
          <Dialog.Description>
            <View style={{padding: 2}}><Text style={{fontSize: 16}}>آیا از شروع این بخش از فعالیت اطمینان دارید؟</Text></View>
          </Dialog.Description>
          <Dialog.Button label="بله، شروع می کنم" onPress={handleActivity} style={{backgroundColor:'#144d39', margin:5, color:'#fff', borderRadius:5, padding: 10}}/>
          <Dialog.Button label="خیر، شروع نمی کنم" onPress={handleCancel} style={{backgroundColor:'#7e0f16', margin:5, color:'#fff', borderRadius:5, padding: 10}}/>
        </Dialog.Container>

        <Dialog.Container
          visible={locationDiffVisible}
          headerStyle={{backgroundColor:'#f9fbff', margin: 0, justifyContent:'center', alignItems:'center'}}
          contentStyle={{backgroundColor:'#f9fbff', borderRadius: 5}}
          footerStyle={{justifyContent:'center', alignItems:'center'}}
        >
          <Dialog.Title><View><Text style={{fontSize: 22, fontWeight:'bold'}}>عدم تطابق موقعیت مکانی</Text></View></Dialog.Title>
          <Dialog.Description>
            <View style={{padding: 2}}><Text style={{fontSize: 16}}>برای ثبت فعالیت باید فاصله شما به مزرعه کمتر باشد</Text></View>
          </Dialog.Description>
          <Dialog.Button label="متوجه شدم" onPress={handleCancel} style={{backgroundColor:'#060659', margin:5, color:'#fff', borderRadius:5, padding: 10}}/>
        </Dialog.Container>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  secOne: {
    height: null,
    flexDirection: 'row',
    width: '100%'
  },

  secOneRight:{
    width: '40%',
    margin: 10,
    alignItems:'flex-end',
  },

  secOneMiddle:{
    width: '10%',
    margin: 3,
    marginTop: 10,
    alignItems:'flex-end',

  },

  secOneLeft:{
    width: '40%',
    margin: 3,
    marginTop: 10,
    alignItems:'flex-end',


  },

  activityName:{
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color:'#0c1b08',
  },

  pointStyle:{
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
    color:'#130066',
  },

  activityValue:{
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color:'#130066',
  },

  buttonStyle:{
    alignItems:'flex-start',
    paddingTop: 9
  },

  secTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  submitText: {
    fontSize: 19,
    fontWeight:'bold',
    color: '#fff',
  },

  submitButton:{
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#194d14',
    borderRadius: 7,
    padding: 8,
  },

  contentText: {
    fontSize: 14,
    fontWeight:'bold',
    color: '#fff',
  },

  contentButton:{
    backgroundColor:'#c1783e',
    borderRadius: 7,
    padding: 4,
    paddingRight:6,
    paddingLeft:6
  },

  button: {
    margin: 10,
    width: 35,
    height: 35,
    backgroundColor: '#140067',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },


});

const polygonStyle = {
  smileyFace: {
    fillAntialias: true,
    fillColor: 'rgba(9,9,212,0.84)',
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },
};

export default Content;
