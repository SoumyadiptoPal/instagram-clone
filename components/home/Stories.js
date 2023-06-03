import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Users } from '../../data/users'


const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Users.map((story, index)=>(
                <View key={index} style={{alignItems:"center"}}>
                <Image source={{uri: story.image}}
                style={style.story} />
                <Text style={{color:"white"}}>{
                (story.user.length>8)?story.user.slice(0,7).toLowerCase()+"...":story.user.toLowerCase()
                }
                </Text>
                </View>
            ))}
            <Image/>
        </ScrollView>
    </View>
  )
}

export default Stories

const style=StyleSheet.create({
    story:{
        width:70,
        height: 70,
        borderRadius:50,
        marginLeft:10,
        borderWidth:3,
        borderColor: '#ff8501',

    }
})