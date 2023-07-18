import { View, Text, TextInput, Image, Button } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, formik } from "formik";
import { Divider } from "react-native-elements";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A Url is required"),
  caption: Yup.string().max(2200, "Caption has reached the Character limit"),
});

const PlaceholderImg =
  "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzY2VuZXJ5fGVufDB8fDB8fHww&w=1000&q=80";

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceholderImg);
  const [caption,setCaption]=useState("");
  const handleSubmit=()=>{

  }
  // return (
  //   <Formik
  //     initialValues={{ caption: "", imageUrl: "" }}
  //     onSubmit={(values) => {
  //       console.log(values)
  //       navigation.goBack()}}
  //     validationSchema={uploadPostSchema}
  //     validateOnMount={true}
  //   >
  //     {({
  //       handleBlur,
  //       handleChange,
  //       handleSubmit,
  //       values,
  //       errors,
  //       isValid,
  //     }) => (
  //       <>
  //         <View style={{margin:20, justifyContent:"space-between",flexDirection:"row"}}>
  //           <Image
  //             source={{ uri: thumbnailUrl ? thumbnailUrl:PlaceholderImg }}
  //             style={{ width: 100, height: 100 }}
  //           />
  //           <View style={{flex:1, marginLeft:10}}>
  //           <TextInput
  //           placeholder="Enter Captions...."
  //           placeholderTextColor="gray"
  //           multiline={true}
  //           style={{ color: "white", fontSize: 20 }}
  //           onChangeText={handleChange("caption")}
  //           onBlur={handleBlur('caption')}
  //           value={values.caption} 
  //         />      
  //       </View>
  //         </View>
  //         <Divider width={0.2} orientation="vertical"/>

  //         <TextInput
  //         onChange={e=>setThumbnailUrl(e.nativeEvent.text)}
  //           placeholder="Enter Image Url..."
  //           placeholderTextColor="gray"
  //           style={{ color: "white", fontSize:18 }}
  //           onChangeText={handleChange('imageUrl')}
  //           onBlur={handleBlur('imageUrl')}
  //           value={values.imageUrl}
  //         />
  //         {errors.imageUrl && (
  //           <Text style={{fontSize:10, color:"red"}}>
  //             {errors.imageUrl}
  //           </Text>
  //         )}

  //         <Button onPress={handleSubmit} title="Share" disabled={!isValid}>Share</Button>
  //       </>
  //     )}
  //   </Formik>
  // );
  return(
    <View>
      <View>
        {/* <Image source={{ uri: thumbnailUrl ? thumbnailUrl:PlaceholderImg }}
        style={{ width: 100, height: 100 }}
         /> */}
      </View>
      <View>
      <TextInput
          onChange={e=>setCaption(e.nativeEvent.text)}
            placeholder="Enter Captions..."
            placeholderTextColor="gray"
            style={{ color: "white", fontSize:18 }}  
          />
      </View>
      <Button onPress={handleSubmit} title="Share">Share</Button>
    </View>
  )
};

export default FormikPostUploader;
