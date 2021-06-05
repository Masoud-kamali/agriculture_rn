import deviceStorage from './src/services/deviceStorage.js';
import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import {ScrollView, Platform, PermissionsAndroid} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ForgetPassword from './src/screens/ForgetPassword';
import Main from './src/screens/Main';
import SideMenu from './src/components/drawer/SideMenu';
import Program from './src/screens/Program';
import Inbox from './src/screens/Inbox';
import Message from './src/screens/Message';
import CreateActivity from './src/screens/CreateActivity';
import Loading from './src/screens/Loading';
import ProgramDetail from './src/screens/ProgramDetail';


import Realm from 'realm';
import {UserSchema} from './src/db/Schemas'

import {AuthContext} from './src/auth/Auth';
import {requestLocationPermission} from './src/services/locationPermission';


console.disableYellowBox = true;



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawerNavigator({navigation, route}) {
  return (
    <Drawer.Navigator
      drawerPosition= "right"
      headerRight={true}
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
      <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
  );
}

// function ActivityDrawerNavigator({navigation, route}) {
//   return (
//     <Drawer.Navigator
//       drawerPosition= "right"
//       headerRight={true}
//       screenOptions={{ swipeEnabled: false }}
//       drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
//       <Drawer.Screen name="Activity" component={Program}/>
//     </Drawer.Navigator>
//   );
// }


function ProgramDrawerNavigator({navigation, route}) {
  return (
    <Drawer.Navigator
      drawerPosition= "right"
      headerRight={true}
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
      <Drawer.Screen name="Program" component={Program}/>
    </Drawer.Navigator>
  );
}

function InboxDrawerNavigator({navigation, route}) {
  return (
    <Drawer.Navigator
      drawerPosition= "right"
      headerRight={true}
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
      <Drawer.Screen name="Inbox" component={Inbox}/>
    </Drawer.Navigator>
  );
}

function MessageDrawerNavigator({navigation, route}) {
  return (
    <Drawer.Navigator
      drawerPosition= "right"
      headerRight={true}
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
      <Drawer.Screen name="Message" component={Message}/>
    </Drawer.Navigator>
  );
}



const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');
  const [geoJson, setGeoJson] = useState(null);

  const authContext = React.useMemo(
    ()=>({
      newToken : async token => {
        setUserToken(token)
      },
      geoJson : async geoJsonData => {
        setGeoJson(geoJsonData)
      },
      farmData: {farmData: geoJson}
    })
  );




  useEffect(async ()=>{

    await requestLocationPermission();

    const realm = await Realm.open({
      schema: [UserSchema],
    });

    const token = await deviceStorage.loadToken();
    await setUserToken(token.token);
    setIsLoading(false);

  },[]);

  return (
    <AuthContext.Provider value={authContext}>

      <NavigationContainer initialRouteName="Login">
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
          {
            !isLoading ?
                userToken === '' ? (
                <React.Fragment>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                </React.Fragment>
              ):(
                <React.Fragment>
                  <Stack.Screen name="MainDrawerNavigator" component={MainDrawerNavigator} />
                  {/*<Stack.Screen name="ActivityDrawerNavigator" component={ActivityDrawerNavigator} />*/}
                  <Stack.Screen name="ProgramDrawerNavigator" component={ProgramDrawerNavigator} />
                  <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
                  <Stack.Screen name="InboxDrawerNavigator" component={InboxDrawerNavigator} />
                  <Stack.Screen name="MessageDrawerNavigator" component={MessageDrawerNavigator} />
                  <Stack.Screen name="CreateActivity" component={CreateActivity} />
                </React.Fragment>
              ) : <Stack.Screen name="Loading" component={Loading} />
          }

        </Stack.Navigator>
      </NavigationContainer>

    </AuthContext.Provider>
  );
};


export default App;
