import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity, Image, FlatList, Dimensions,ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import { AntDesign,MaterialCommunityIcons,MaterialIcons,Feather } from '@expo/vector-icons';
import { firebase, db,auth } from "../firebase";
import { currentUser } from "firebase/auth";
import { collection, collectionGroup, getDocs, orderBy, onSnapshot, getDoc,doc } from "firebase/firestore";

// import {useNavigation} from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

const ProfileScreen = ({navigation,route}) => {
  // const navigation=useNavigation();
  const [profile,setProfile]=useState(route.params);
  const currentUser=auth.currentUser;
  const [posts,setPosts]=useState();
  
  
  useEffect(() => {
    const fetchData=async()=>{
    const querySnapshot = await getDocs(collection(db, "users", currentUser.email, "posts"));
    const fetchedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(fetchedPosts);
    }
    fetchData();
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
        <Header navigation={navigation} profile={profile}/>
        <Top profile={profile}/>
        <Middle profile={profile} currentUser={currentUser}/>
        <ImageGrid data={posts}/>
    </SafeAreaView>
  )
}
const Header=({navigation, profile})=>(
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
    <AntDesign name="left" size={30} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerText}>{profile.email}</Text>
    <TouchableOpacity><SimpleLineIcons name="options-vertical" size={24} color="white" /></TouchableOpacity>
  </View>
  )

  const Top=({profile})=>{

    return(
      <View>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <View style={styles.cont1}>
            <Image source={{uri:profile.profile_picture}}
            style={styles.image}/>
          </View>
          <View style={styles.cont2}>
            <View style={{display:'flex', alignItems:'center'}}>
              <Text style={{color:"white", fontWeight:"bold"}}>100</Text>
              <Text style={{color:"white", fontWeight:"bold"}}>Posts</Text>
            </View>
            <View style={{display:'flex', alignItems:'center'}}>
            <Text style={{color:"white", fontWeight:"bold"}}>100</Text>
              <Text style={{color:"white", fontWeight:"bold"}}>Followers</Text>
            </View>
            <View style={{display:'flex', alignItems:'center'}}>
            <Text style={{color:"white", fontWeight:"bold"}}>100</Text>
              <Text style={{color:"white", fontWeight:"bold"}}>Following</Text>
            </View>
          </View>
        </View>
        <View style={{display:"flex",flexDirection:"row", marginTop:10}}>
            <Text style={{color:"white", fontWeight:"bold", marginLeft:10, fontSize:18}}>{profile.username} </Text>
            <Image source={require("../assets/Daco_47477.png")} style={{width:25,height:25}}/>
        </View>
        <View>
          <Text style={{color:"white", marginLeft:10, maxWidth:250}}>Hello, My name is Soumyadipto Pal. I love reading books. What about You?</Text>
        </View>
        </View>
    )
  }

  const Middle=({profile,currentUser})=>{
    const Icons=[
      {
          name:"Grid",
          active:<MaterialCommunityIcons name="grid" size={30} color="white" />,
          inactive:<MaterialCommunityIcons name="grid" size={30} color="grey" />
      },
      {
          name:"Reels",
          active:<MaterialIcons name="live-tv" size={30} color="white" />,
          inactive:<MaterialIcons name="live-tv" size={30} color="grey" />
      },
      {
          name: "Profile",
          active: <Feather name="user" size={30} color="white" />,
          inactive:<Feather name="user" size={30} color="grey" />
      },
    ]
  const [activeTab, setActiveTab]=useState("Grid");
    return(
      <View>
        <View style={{display:"flex", flexDirection:"row", alignItems:'center', justifyContent:"space-around",marginBottom:8}}>
          {(currentUser.email===profile.email)?
          <>
            <TouchableOpacity><Text  style={styles.button}>Followers</Text></TouchableOpacity>
          <TouchableOpacity><Text  style={styles.button}>Following</Text></TouchableOpacity>
          </>:<>
          <TouchableOpacity><Text  style={styles.button}>Follow</Text></TouchableOpacity>
          <TouchableOpacity><Text  style={styles.button}>Message</Text></TouchableOpacity>
          </>}   
        </View>
        <Divider width={1} orientation='vertical'/>
        <View style={styles.cont4}>
      {Icons.map((icon,index)=>(
          <View key={index}>
          <TouchableOpacity onPress={()=>setActiveTab(icon.name)}>
          {(icon.name===activeTab)?icon.active:  icon.inactive}
          </TouchableOpacity>
          </View>  
      ))}
      </View>
      <Divider width={1} orientation='vertical'/>

      </View>
    )
  }
  const ImageGrid = ({ data }) => {
    const Data=[
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },{
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },{
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },{
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },{
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      },
      {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg"
      }
    ]
    const renderItem = ({ item }) => (
      <Image source={{uri:item.imageUrl}} style={styles.images} />
    );
  
    return (
      <View style={styles.cont3}>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={3} // Number of columns you want in the grid
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{flexGrow:1}}
        />
      </View>
      
    );
  };

export default ProfileScreen

const styles=StyleSheet.create({
    container:{
      backgroundColor:"black",
      flex:1,
      color:"white"
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
      },
      image:{
        width:100,
        height: 100,
        borderRadius:60,
        marginLeft:10,
        borderWidth:3,
        borderColor: '#ff8501',
    },
    cont1:{
      flex:1,
    },
    cont2:{
      flex:2,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',     
    },
    cont3:{
      marginTop:10,
      height:Dimensions.get('window').height-350
    },
    cont4:{
      display:"flex",
      flexDirection:"row",
    justifyContent:"space-around",
    height:45,
    alignItems:'center',
    },
    button:{
      width:170,
      height:40,
      fontSize:17,
      color:"white",
      backgroundColor:"#649bed",
      borderRadius:10,
      fontWeight:"700",
      textAlign:'center',
      textAlignVertical:'center',
      marginTop:10
    },
    images: {
      width: Dimensions.get('window').width / 3 - 10, // Divide by the number of columns and adjust padding/margin accordingly
      height: Dimensions.get('window').width / 3 - 10,
      margin: 5,
      resizeMode: 'cover',
    },

  })