import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
const Stack=createStackNavigator();

const screenOptions={
    headerShown: false
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'
    screenOptions={screenOptions}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/> 
        <Stack.Screen name='NewPostScreen' component={NewPostScreen}/>
        <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export const SignedOutStack=()=>(
  <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'
    screenOptions={screenOptions}>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='SignupScreen' component={SignUpScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)