import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import FormikPostUploader from './FormikPostUploader';

const AddNewPost = ({navigation}) => {
  return (
   <View style={styles.container}>
    <Header navigation={navigation}/>
    <FormikPostUploader navigation={navigation}/>
   </View>
  )
}
const Header=({navigation})=>(
  <View style={styles.headerContainer}>
  <TouchableOpacity onPress={()=>navigation.goBack()}>
  <AntDesign name="left" size={30} color="white" />
  </TouchableOpacity>
  <Text style={styles.headerText}>NEW POST</Text>
  <Text></Text>
</View>
)

export default AddNewPost

const styles=StyleSheet.create({
  container:{
    marginHorizontal:10
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    marginTop:10
  },
  headerText:{
    color:'white',
    fontWeight:"600",
    fontSize:20,
    // marginRight:28
  }
})