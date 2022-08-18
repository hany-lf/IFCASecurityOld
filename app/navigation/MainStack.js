/** @format */
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import AboutUs from '@screens/AboutUs';
import ResetScreen from '../screens/ResetPassword';
import ChangeLanguage from '@screens/ChangeLanguage';
import ChangePassword from '@screens/ChangePassword';
import Setting from '@screens/Setting';
import ContactUs from '@screens/ContactUs';
import ThemeSetting from '@screens/ThemeSetting';
import ProfileEdit from '@screens/ProfileEdit';
import Package from '../screens/Package';
import PackageComplate from '../screens/PackageComplate';

import { BottomTabNavigatorMazi, tabBarIcon } from './components';
import PackageHome from '../screens/Package/PackageHome';
import PackageHistory from '../screens/PackageHistory';
import EProductPageNotFound from '../screens/EProductPageNotFound';
import Vehicle from '../screens/Vehicle';
import VehicleHome from '../screens/Vehicle/VehicleHome';
import VehicleHeader from '../screens/Vehicle/VehicleHeader';
import VehicleDetail from '../screens/Vehicle/VehicleDetail';
import VehicleCheck from '../screens/Vehicle/VehicleCheck';
import VehicleCheckEdit from '../screens/Vehicle/VehicleCheckEdit';
import VehicleSearch from '../screens/VehicleHistory';
import VehicleList from '../screens/VehicleHistory/VehicleList';

const Stack = createStackNavigator();

export const WalletTabScreens = {
  HomeScreen: {
    component: HomeScreen,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  ProfileScreen: {
    component: ProfileScreen,
    options: {
      title: 'account',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'cog' }),
    },
  },
};

export const WalletMenu = () => (
  <BottomTabNavigatorMazi tabScreens={WalletTabScreens} />
);

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={WalletMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AboutUs'
        component={AboutUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ headerShown: false }}
        creenOptions={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name='ContactUs'
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChangeLanguage'
        component={ChangeLanguage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChangePassword'
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Setting'
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ProfileEdit'
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ThemeSetting'
        component={ThemeSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Package'
        component={Package}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PackageComplate'
        component={PackageComplate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PackageHome'
        component={PackageHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PackageHistory'
        component={PackageHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Vehicle'
        component={Vehicle}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name='VehicleHome'
        component={VehicleHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
       name='VehicleHeader'
       component={VehicleHeader}
       options={{ headerShown: false }}
     />
     <Stack.Screen
      name='VehicleDetail'
      component={VehicleDetail}
      options={{ headerShown: false }}
    />
      <Stack.Screen
       name='VehicleCheck'
       component={VehicleCheck}
       options={{ headerShown: false }}
     />
     <Stack.Screen
      name='VehicleCheckEdit'
      component={VehicleCheckEdit}
      options={{ headerShown: false }}
    />
      <Stack.Screen
        name='VehicleSearch'
        component={VehicleSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='VehicleList'
        component={VehicleList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EProductPageNotFound'
        component={EProductPageNotFound}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
