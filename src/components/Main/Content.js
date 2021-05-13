import React, { useState, useEffect, useRef } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

MapboxGL.setAccessToken('pk.eyJ1IjoibWFzb3VkMTIzIiwiYSI6ImNrbm52Mm16ejE4ZTUycHBuc3I4NDY0MzgifQ.05o7FxVCewjjnflQE2oJbw');


const Content = (props) => {

    const [cameraCenter, setCameraCenter] = useState([
        48.519880,
        31.073618
    ]);
    const [zoomLevel, setZoomLevel] = useState(11);
    const [selectedFeature, setSelectedFeature] = useState({properties: { icon: '', message: ''},geometry:{ type: '', coordinates: [0,0] }});

  const zoomExtentHandler = () =>{
    setZoomLevel(11)
  };

  const decZoomHandler = () =>{
    let zoom = zoomLevel;
    if(zoom > 8){
      zoom -= .2;
      setZoomLevel(zoom)
    }else {
      Toast.show('امکان کوچک نمایی بیشتر وجود ندارد', Toast.LONG);
    }

  };

  const incZoomHandler = () =>{
    let zoom = zoomLevel;
    if(zoom < 16){
      zoom += .2;
      setZoomLevel(zoom)
    }else {
      Toast.show('امکان بزرگ نمایی بیشتر وجود ندارد', Toast.LONG);
    }
  };

  const regionChange = async (e) =>{

    let zoom = await _map.getZoom();
    await setZoomLevel(zoom);

    let coordinate = e.geometry.coordinates;
    await setCameraCenter(coordinate);
  };

    useEffect(()=> {

      _map.current;


    },[]);


    let _map = useRef(null);

    return (
      <View style={{ flex: 1}}>
        <MapboxGL.MapView
          ref={(c) => (_map = c)}
          logoEnabled = {false}
          styleURL={MapboxGL.StyleURL.Satellite}
          style={{flex: 1}}
          onPress={()=>setSelectedFeature(null)}
          minZoomLevel={7}
          maxZoomLevel={13}
          // onRegionWillChange = {(e)=>regionChange(e)}
          onRegionDidChange = {(e)=>regionChange(e)}
        >
            <MapboxGL.Camera
              centerCoordinate={cameraCenter}
              zoomLevel={zoomLevel}
            />
        </MapboxGL.MapView>
          <TouchableOpacity
            onPress={() => alert('sdfsdf')}
            activeOpacity={0.3}
            style={[
                styles.button,
                { position: 'absolute', right: '3%', bottom: '2%' },
            ]}>
              <MaterialIcons name="my-location" size={32} color="#fff" style={styles.textIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => zoomExtentHandler()}
            activeOpacity={0.7}
            style={[
                styles.button,
                { position: 'absolute', left: '1%', top: '2%' },
            ]}>
              <FontAwesome name="map" size={25} color="#fff" style={styles.textIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => incZoomHandler()}
            activeOpacity={0.7}
            style={[
                styles.button,
                { position: 'absolute', left: '1%', top: '18%' },
            ]}>
              <Feather name="zoom-in" size={32} color="#fff" style={styles.textIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => decZoomHandler()}
            activeOpacity={0.7}
            style={[
                styles.button,
                { position: 'absolute', left: '1%', top: '28%' },
            ]}>
              <Feather name="zoom-out" size={32} color="#fff" style={styles.textIconStyle} />
          </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 10,
        width: 50,
        height: 50,
        backgroundColor: '#0e240a',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
})



export default Content;
