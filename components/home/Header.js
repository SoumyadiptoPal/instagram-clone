import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Octicons,Entypo, AntDesign } from '@expo/vector-icons'; 

const Header = ({navigation}) => {
  return (
    <View style={style.container}>
        <TouchableOpacity onPress={()=> navigation.push('LoginScreen')}>
      <Image 
      style={style.logo}
      source={require('../../assets/logo.png')}/>
      </TouchableOpacity>
      <View style={style.iconsContainer}>
        <TouchableOpacity style={style.icon} onPress={()=>navigation.push('NewPostScreen')}>
      <Octicons name="diff-added" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={style.icon}>
      <Entypo name="heart-outlined" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={style.icon}>
        <View style={style.unReadBadge}><Text style={style.unReadBadgeText}>20</Text></View>
      <AntDesign name="message1" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </View>
    
  )
}

export default Header

const style=StyleSheet.create({
    logo:{
        width:100,
        height:50,
        resizeMode: "contain"
    },
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:20
    },
    iconsContainer:{
        flexDirection:'row'
    },
    icon:{
        marginLeft: 10
    },
    unReadBadge:{
        backgroundColor: "red",
        position:"absolute",
        left: 12,
        bottom:15,
        width:25,
        height:18,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        zIndex:100,

    },
    unReadBadgeText:{
        color:'white',
        fontWeight:"600"
    }
})