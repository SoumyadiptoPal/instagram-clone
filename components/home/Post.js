import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements';
import { Octicons,Entypo, AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Post = ({post}) => {
  return (
    <View style={{marginBottom: 30}}>
        <Divider width={1} orientation='vertical'/>
      <PostHeader post={post}/>
      <PostImage post={post}/>
      <View style={{marginHorizontal:15, marginTop: 10}}>
      <PostFooter/>
      <Likes post={post}/>
      <Caption post={post}/>
      {
        (post.comments.length>0)?<CommentsSection post={post}/>:null
      }
      <Comments post={post}/>
      </View>
    </View>
  )
}

const PostHeader=({post})=>{
  return(
  <View style={{flexDirection: "row", justifyContent:"space-between", margin:5, alignItems:"center"}}>
    <View style={{flexDirection:"row", alignItems:"center"}}>
      <Image
      source={{uri: post.profile_picture}}
      style={style.story}
      />
      <Text style={{color:"white", marginLeft:5, fontWeight:700}}> {post.user} </Text>
    </View>
    <Text style={{color:"white", fontWeight:"900"}}>...</Text>
  </View>
  )
}

const PostImage=({post})=>(
  <View style={{width:"100%", height:450}}>
  <Image source={{uri:post.imageUrl}}
  style={{height:"100%", resizeMode:"cover"}}/>
  </View>
)

const PostFooter=()=>(
  <View style={{flexDirection:"row"}}>
    <View style={style.leftFooterIcons}>
    <TouchableOpacity>
    <Entypo name="heart-outlined" size={28} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
    <Feather name="message-circle" size={28} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
    <FontAwesome name="send-o" size={28} color="white" />
    </TouchableOpacity>
    </View>
  <View style={{flex:1, alignItems:'flex-end'}}>
  <Feather name="bookmark" size={26} color="white" />
  </View>
  </View>
)

const Likes=({post})=>(
  <View style={{flexDirection:'row', marginTop:4}}>
  <Text style={{color:'white', fontWeight:"600"}}>{post.likes.toLocaleString('en')} likes</Text>
  </View>
)

const Caption=({post})=>(
  <View style={{marginTop:5}}>
  <Text style={{color:'white'}}>
    <Text style={{fontWeight:"600"}}>{post.user} </Text>
    <Text>{post.caption}</Text>
    </Text>
    </View>
)

const CommentsSection=({post})=>(
  <Text style={{color:'grey', marginTop:5}}>
    View {post.comments.length>1 ? 'all': ''} {post.comments.length} {post.comments.length>1 ? 'comments': 'comment'}
  </Text>
)

const Comments=({post})=>(
  <>
  {
    post.comments.map((comment, index)=>(
      <View style={{marginTop:5}} key={index}>
    <Text style={{color:'white'}}>
    <Text style={{fontWeight:"600"}}>{comment.user} </Text>
    <Text>{comment.comment}</Text>
    </Text>
    </View>
    ))
  }
  </>
)
export default Post

const style=StyleSheet.create({
  story:{
      width:35,
      height: 35,
      borderRadius:50,
      marginLeft:5,
      borderWidth:2,
      borderColor: '#ff8501',

  },
  leftFooterIcons:{
    flexDirection:"row",
    width:"32%",
    justifyContent:"space-between"
  }

})