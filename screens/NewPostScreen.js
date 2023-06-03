import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import AddNewPost from '../components/newPost/AddNewPost'
// import {useNavigation} from '@react-navigation/native';

const NewPostScreen = ({navigation}) => {
  // const navigation=useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default NewPostScreen

const styles=StyleSheet.create({
    container:{
      backgroundColor:"black",
      flex:1
    }
  })