import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import { Posts } from "../data/posts";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import { firebase, db } from "../firebase";
import { collection, collectionGroup, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collectionGroup(db, "posts"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().caption}`);
      });
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {Posts.map((post, index) => (
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
