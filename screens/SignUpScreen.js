import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Signup from '../components/Signup/signup'
const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{uri:"https://w7.pngwing.com/pngs/477/609/png-transparent-logo-computer-icons-instagram-logo-instagram-logo-miscellaneous-text-trademark.png", height:100 , width:100}}/>
      </View>
      <Signup navigation={navigation}/>
    </View>
  )
}

export default SignUpScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:50,
        paddingHorizontal:12
    },
    logoContainer:{
        alignItems:'center',
        marginTop:60
    }
})