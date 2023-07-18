import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useCallback} from 'react'
import { AntDesign } from '@expo/vector-icons';
import FormikPostUploader from './FormikPostUploader';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const AddNewPost = ({navigation}) => {
  const [file, setFile] = useState([]);
  return (
   <View style={styles.container}>
    <Header navigation={navigation} file={file} setFile={setFile}/>
    {
    (file.length>0 && <FormikPostUploader navigation={navigation}/>)
    }
   </View>
  )
}
const Header=({navigation, file, setFile})=>{

  const pickImages = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ multiple: true });
      if (result.type === 'success') {
        const selectedImages = result.docs;
        // Process the selected images as needed
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
 return(
  <View style={styles.headerContainer}>
  <TouchableOpacity onPress={()=>navigation.goBack()}>
  <AntDesign name="left" size={30} color="white" />
  </TouchableOpacity>
  <Text style={styles.headerText}>NEW POST</Text>
  <Text>
    <TouchableOpacity>
    <Ionicons name="add" size={30} color="white" onPress={pickImages}/>
    </TouchableOpacity>
  </Text>
</View>
)
  }

export default AddNewPost

const styles=StyleSheet.create({
  container:{
    marginHorizontal:10
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
    // marginRight:28
  }
})