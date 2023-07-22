import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect,useState,useRef } from "react";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import { firebase, db } from "../firebase";
import { collection, collectionGroup, getDocs, orderBy, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [posts,setPosts]=useState([]);

  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

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
      <BottomTabs icons={bottomTabIcons} />
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
