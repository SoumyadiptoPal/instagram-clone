import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { firebase,db,auth } from '../../firebase';
import { getDoc } from 'firebase/firestore';

// export const bottomTabIcons=[
//     {
//         name:"Home",
//         active: <MaterialIcons name="home-filled" size={24} color="white" />,
//         inactive: <Octicons name="home" size={24} color="white" />
//     },
//     {
//         name:"Search",
//         active: <FontAwesome name="search" size={24} color="white" />,
//         inactive:<AntDesign name="search1" size={24} color="white" />
//     },
//     {
//         name: "Reels",
//         active: <MaterialCommunityIcons name="movie-open-play" size={24} color="white" />,
//         inactive:<MaterialCommunityIcons name="movie-open-play-outline" size={24} color="white" />
//     },
//     {
//         name: "Shop",
//         active:<MaterialCommunityIcons name="shopping" size={24} color="white" />,
//         inactive: <MaterialCommunityIcons name="shopping-outline" size={24} color="white" />
//     },
//     {
//       name: "Profile",
//       active: <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/400px-Pierre-Person.jpg"}} style={{width:30,
//       height: 30,
//       borderRadius:20,
//       borderColor: 'white',
//     borderWidth:2}}
//     onPress={()=> navigation.push('ProfileScreen')}/>,
//       inactive: <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/400px-Pierre-Person.jpg"}} style={{width:30,
//       height: 30,
//       borderRadius:20,
//       borderColor: 'white',
//       borderWidth:0}} 
//       onPress={()=> navigation.push('ProfileScreen')}/>
//     }
    
// ]

const BottomTabs = ({navigation, profile}) => {
  const [activeTab, setActiveTab]=useState("Home")
  const icons=[
    {
        name:"Home",
        active: <MaterialIcons name="home-filled" size={24} color="white" />,
        inactive: <Octicons name="home" size={24} color="white" />
    },
    {
        name:"Search",
        active: <FontAwesome name="search" size={24} color="white" />,
        inactive:<AntDesign name="search1" size={24} color="white" />
    },
    {
        name: "Reels",
        active: <MaterialCommunityIcons name="movie-open-play" size={24} color="white" />,
        inactive:<MaterialCommunityIcons name="movie-open-play-outline" size={24} color="white" />
    },
    {
        name: "Shop",
        active:<MaterialCommunityIcons name="shopping" size={24} color="white" />,
        inactive: <MaterialCommunityIcons name="shopping-outline" size={24} color="white" />
    },
    {
      name: "Profile",
      active: <Image source={{uri:profile.profile_picture}} style={{width:30,
      height: 30,
      borderRadius:20,
      borderColor: 'white',
    borderWidth:2}}
    />,
      inactive: <Image source={{uri:profile.profile_picture}} style={{width:30,
      height: 30,
      borderRadius:20,
      borderColor: 'white',
      borderWidth:0}} 
      />
    }
    
]
  const handlePress=(name)=>{
    if(activeTab==name)
    return;
    if(name=="Search")
    navigation.push('SearchScreen');
    if(name=="Profile")
    navigation.push('ProfileScreen',profile);
    if(name=="Home")
    navigation.push('HomeScreen');
  }
  const Icon=({icon})=>(
  <View>
  <TouchableOpacity onPress={()=>handlePress(icon.name)}>
  {(icon.name===activeTab)?icon.active:  icon.inactive}
  </TouchableOpacity>
  </View>
)
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation='vertical'/>
    <View style={styles.container}>
      {icons.map((icon,index)=>(
        <Icon key={index} icon={icon}/>
      ))}
    </View>
    </View>
  )
}

export default BottomTabs

const styles=StyleSheet.create({
  wrapper:{
    position:'absolute',
    width:'100%',
    bottom:'0%',
    zIndex:100,
    backgroundColor:'black'
  },
  container:{
    flexDirection:"row",
    justifyContent:"space-around",
    height:50,
    paddingTop:10
  },
})