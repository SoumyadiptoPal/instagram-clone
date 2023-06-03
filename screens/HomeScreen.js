import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import {Posts} from "../data/posts"
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
// import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  // const navigation=useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Stories/>
      <ScrollView>
      {Posts.map((post,index)=>(
        <Post key={index} post={post}/>
      ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons}/>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
  container:{
    backgroundColor:"black",
    flex:1
  }
})