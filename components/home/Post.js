import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, SubText } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Divider } from 'react-native-elements';
import { Octicons,Entypo, AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { firebase,db,auth } from '../../firebase';
import { currentUser } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const Post = ({post}) => {
  const handleLike=async (post)=>{
    const email=auth.currentUser.email;
    const currentLikeStatus=!post.likes_by_users.includes(
      email
    )
    const postRef = doc(db,"users",email,"posts",post.id);
    const likesUpdate = currentLikeStatus
    ? arrayUnion(email)
    : arrayRemove(email);

  await updateDoc(postRef, { likes_by_users: likesUpdate })
    .then(() => {
      console.log("Document Updated");
    })
    .catch((error) => {
      console.error("Error while updating", error);
    });

  }
  
  return (
    <View style={{marginBottom: 30}}>
        <Divider width={1} orientation='vertical'/>
      <PostHeader post={post}/>
      <PostImage post={post}/>
      <View style={{marginHorizontal:15, marginTop: 10}}>
      <PostFooter post={post} handleLike={handleLike}/>
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

const PostFooter=({handleLike, post})=>{
  const windowHeight = Dimensions.get('window').height;

// This state would determine if the drawer sheet is visible or not
const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

// Function to open the bottom sheet 
const handleOpenBottomSheet = () => {
  setIsBottomSheetOpen(true);
};

// Function to close the bottom sheet
const handleCloseBottomSheet = () => {
  setIsBottomSheetOpen(false);
};

  return(
  <View style={{flexDirection:"row"}}>
    <Modal
  animationType="slide"
  transparent={true} 
  visible={isBottomSheetOpen}
  onRequestClose={handleCloseBottomSheet} >

    <View style={[style.bottomSheet, { height: windowHeight * 0.6 }]}>
      <View style={{ flex: 0, width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text></Text>
        <Text style={{fontSize: 18, fontWeight:"600"}}>Comments</Text>
        <TouchableOpacity onPress={handleCloseBottomSheet}>
        <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
      
      </View>
  </View>
</Modal>
    <View style={style.leftFooterIcons}>
    <TouchableOpacity onPress={()=>handleLike(post)}>
    {post.likes_by_users.includes(
      auth.currentUser.email
    )? <AntDesign name="heart" size={28} color="red" />:<Entypo name="heart-outlined" size={28} color="white"/>}
    </TouchableOpacity>
    <TouchableOpacity onPress={handleOpenBottomSheet}>
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
)}

const Likes=({post})=>(
  <View style={{flexDirection:'row', marginTop:4}}>
  <Text style={{color:'white', fontWeight:"600"}}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
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
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'red'
},

})