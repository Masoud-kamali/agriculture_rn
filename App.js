
import 'react-native-gesture-handler';
import React from 'react';
import {ScrollView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ForgetPassword from './src/screens/ForgetPassword';
import Main from './src/screens/Main';
import SideMenu from './src/components/drawer/SideMenu';
import Activity from './src/screens/Activity';
// import Plan from './src/screens/Plan';
import Inbox from './src/screens/Inbox';
import Message from './src/screens/Message';
import CreateActivity from './src/screens/CreateActivity';


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

function ActivityDrawerNavigator({navigation, route}) {
  return (
    <Drawer.Navigator
      drawerPosition= "right"
      headerRight={true}
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
      <Drawer.Screen name="Activity" component={Activity}/>
    </Drawer.Navigator>
  );
}


// function PlanDrawerNavigator({navigation, route}) {
//   return (
//     <Drawer.Navigator
//       drawerPosition= "right"
//       headerRight={true}
//       screenOptions={{ swipeEnabled: false }}
//       drawerContent={(props) => <ScrollView><SideMenu {...props}/></ScrollView>}>
//       <Drawer.Screen name="Plan" component={Plan}/>
//     </Drawer.Navigator>
//   );
// }

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

  return (
      <NavigationContainer initialRouteName="Login">
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="MainDrawerNavigator" component={MainDrawerNavigator} />
          <Stack.Screen name="ActivityDrawerNavigator" component={ActivityDrawerNavigator} />
          {/*<Stack.Screen name="PlanDrawerNavigator" component={PlanDrawerNavigator} />*/}
          <Stack.Screen name="InboxDrawerNavigator" component={InboxDrawerNavigator} />
          <Stack.Screen name="MessageDrawerNavigator" component={MessageDrawerNavigator} />
          <Stack.Screen name="CreateActivity" component={CreateActivity} />


        </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
