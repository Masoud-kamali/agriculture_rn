import React, { useState, useEffect, useRef } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import deviceStorage from '../../services/deviceStorage';
import instance from '../../services/axios';

MapboxGL.setAccessToken("pk.eyJ1IjoibWFzb3VkMTIzIiwiYSI6ImNrcGh6Y2hobTJ3YjkydW54dzdxbWljamgifQ.VIo429gpnL3Lz-7pq0dAhA");

const Content = (props) => {


  const [cameraCenter, setCameraCenter] = useState([
      48.519880,
      31.073618
  ]);
  const [zoomLevel, setZoomLevel] = useState(11);
  const [selectedFeature, setSelectedFeature] = useState({properties: { icon: '', message: ''},geometry:{ type: '', coordinates: [0,0] }});

  const [polygonFarms, setPolygonFarms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

      (async () => {

        let tempSourcePolygonFeatures = [];

        await props.farms.map(async (item, key)=>{

          let feature = {
            type : 'Feature',
            geometry: {
              type: '',
              coordinates: ''
            },
            properties: {
              color: '#9ad4ff'
            }
          };

          await Object.keys(item).map(async (key, index) =>{
            if(key === 'geom'){
              feature.geometry = JSON.parse(item['geom'])
            }else{
              feature.properties[key] = item[key];
            }
          });
          tempSourcePolygonFeatures.push(feature)
        });

        let polygonGeoJson = {
          "type": "FeatureCollection",
          "features": tempSourcePolygonFeatures
        };

        props.geoJson(polygonGeoJson);

        await setPolygonFarms(polygonGeoJson);
        setIsLoading(false);

      })();

    },[]);


    let _map = useRef(null);

    return (
      <View style={{ flex: 1}}>
        {
          !isLoading ?
            <React.Fragment>
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
                <MapboxGL.UserLocation
                  // onUpdate={(location)=>console.log(location)}
                />
                <MapboxGL.Camera
                  centerCoordinate={cameraCenter}
                  zoomLevel={zoomLevel}
                />
                <MapboxGL.ShapeSource
                  id='farms'
                  shape={polygonFarms}
                  onPress={()=>alert('aa')}
                >
                  {
                    polygonFarms.features.map((item, key) => (
                      <MapboxGL.FillLayer
                        key={key}
                        id={`${key}`}
                        sourceLayerID = {`farms`}
                        style={polygonStyle.smileyFace}
                        // filter={['==', 'subCategory', `${item.properties.subCategory}`]}
                      />
                    ))
                  }

                </MapboxGL.ShapeSource>
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
            </React.Fragment> : null
        }
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
});

const polygonStyle = {
  smileyFace: {
    fillAntialias: true,
    fillColor: ['get', 'color'],
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)',
  },
};




export default Content;
