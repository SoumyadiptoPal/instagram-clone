import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import AuthNavigation from "./authNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
    <AuthNavigation/>
    </SafeAreaView>
  );
}

const styles=new StyleSheet.create({
  AndroidSafeArea:{
    flex:1,
    backgroundColor: "white",
    paddingTop: Platform.OS==="android"?StatusBar.currentHeight:0
  }
})