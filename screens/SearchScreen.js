import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity,FlatList,TextInput,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { firebase, db,auth } from "../firebase";
import { collection, getDocs, orderBy, onSnapshot, getDoc,doc } from "firebase/firestore";

const SearchScreen = ({navigation}) => {
  const [data,setData]=useState();
  useEffect(() => {
    async function fetchData() {
      //order the posts in descending order
      const querySnapshot = await getDocs(collection(db, "users"),orderBy("username"));
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedUsers);
      console.log("Fetching...")
    }
    fetchData();
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      {(data && <Search data={data} navigation={navigation}/>)}
    </SafeAreaView>
  )
}

const Header=({navigation})=>(
  <View style={styles.headerContainer}>
  <TouchableOpacity onPress={()=>navigation.goBack()}>
  <AntDesign name="left" size={30} color="white" />
  </TouchableOpacity>
  <Text style={styles.headerText}>Search Friends</Text>
  <Text></Text>
</View>
)

const Search = ({data,navigation}) => {

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  
  const handleSearch = (text) => {
    const filtered = data.filter(item =>
      item.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="grey"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Items user={item} navigation={navigation}/>
        )}
      />
    </View>
  );
};

const Items=({user,navigation})=>{
  return(
    <TouchableOpacity onPress={()=>navigation.push('ProfileScreen',user)}>
  <View style={{flexDirection: "row", justifyContent:"space-between", margin:5, alignItems:"center",height:60}}>
    <View style={{flexDirection:"row", alignItems:"center"}}>
      <Image
      source={{uri: user.profile_picture}}
      style={styles.img}
      />
      <Text style={{color:"white", marginLeft:5, fontWeight:700, fontSize:18}}> {user.username} </Text>
    </View>
  </View>
  </TouchableOpacity>
  )
}
export default SearchScreen

const styles=StyleSheet.create({
    container:{
      backgroundColor:"black",
      flex:1
    },
    headerText:{
      color:"white",
      fontWeight:"600",
      fontSize:20
    },
    headerContainer:{
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:'center',
      marginTop:10
    },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
      color:"white",
    },
    item: {
      fontSize: 16,
      marginBottom: 8,
      color:"white"
    },
    img:{
      width:45,
      height: 45,
      borderRadius:50,
      marginLeft:5,
      borderWidth:2,
      borderColor: '#ff8501',
    }
  })