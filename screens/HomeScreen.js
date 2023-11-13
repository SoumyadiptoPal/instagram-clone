import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect,useState,useRef } from "react";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";
import { firebase, db,auth } from "../firebase";
import { currentUser } from "firebase/auth";
import { collection, collectionGroup, getDocs, orderBy, onSnapshot, getDoc,doc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [posts,setPosts]=useState([]);
  const [profile,setProfile]=useState({});
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const currentUser=auth.currentUser;
  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (scrollViewRef.current) {
      const newScrollOffset = contentHeight - scrollOffset;
      scrollViewRef.current.scrollTo({ y: newScrollOffset, animated: false });
    }
  };

  useEffect(() => {
    async function fetchData() {
      //order the posts in descending order
      const querySnapshot = await getDocs(collectionGroup(db, "posts"),orderBy("createdAt", "desc"));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      // console.log(posts);
      const profil=await getDoc(doc(db,"users",currentUser.email));
      setProfile(profil.data());
    }

    const unsubscribe = onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        fetchData();
      });
    });
    fetchData();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView
       ref={scrollViewRef}
       onScroll={(event) => setScrollOffset(event.nativeEvent.contentOffset.y)}
       onContentSizeChange={handleContentSizeChange}
      >
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      {
        profile && <BottomTabs navigation={navigation} profile={profile}/>
      }
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
