import { View, Text, TextInput, Image, Button } from "react-native";
import { currentUser } from "firebase/auth";
import { addDoc, doc, serverTimestamp,query,onSnapshot,getDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, formik } from "formik";
import { Divider } from "react-native-elements";
import {db, firebase, auth} from '../../firebase'
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A Url is required"),
  caption: Yup.string().max(2200, "Caption has reached the Character limit"),
});

const PlaceholderImg =
  "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzY2VuZXJ5fGVufDB8fDB8fHww&w=1000&q=80";

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceholderImg);
  const [currentLoggedInUser, setCurrentLoggedInUser]=useState(null);

  const getUserName=async ()=>{
    const user = auth.currentUser;
    const docRef=doc(db, "users", user.email);

  // const unsubscribe = onSnapshot(q, (snapshot) => {
  //   snapshot.docs.map((doc) => {
  //     setCurrentLoggedInUser({
  //       username: doc.data().username,
  //       profilePicture: doc.data().profile_picture,
  //     });
  //   });
  // });
  const document = await getDoc(docRef);
   if (document.exists()) {
      const documentData = document.data();
      // console.log("Document Data:", documentData);
      setCurrentLoggedInUser(documentData);
    } else {
      console.log("Document not found.");
    }
  console.log("Hello");
    // return unsubscribe;
  }
useEffect(() => {
  getUserName();

}, [])

const uploadPostToFire=async (imageUrl,caption)=>{
  // const unsubscribe=db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
  //   imageUrl: imageUrl,
  //   user: currentLoggedInUser.username,
  //   profile_picture: currentLoggedInUser.profilePicture,
  //   owner_uid: firebase.auth().createUser.uid,
  //   owner_email: firebase.auth().currentUser.email,
  //   caption: caption,
  //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   likes_by_users: [],
  //   comments: [],
  // })
  // .then(()=>navigation.goBack())
  // return unsubscribe;
    const currentUser = auth.currentUser;

  const unsubscribe = await addDoc(collection(db, 'users', currentUser.email, 'posts'), {
    imageUrl: imageUrl,
    user: currentLoggedInUser.username,
    profile_picture: currentLoggedInUser.profile_picture,
    owner_uid: currentUser.email,
    owner_email: currentUser.email,
    caption: caption,
    createdAt: serverTimestamp(),
    likes_by_users: [],
    comments: [],
  })
  .then(() => navigation.goBack());
}

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        console.log(values)
        uploadPostToFire(values.imageUrl, values.caption)
        navigation.goBack()}}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={{margin:20, justifyContent:"space-between",flexDirection:"row"}}>
            <Image
              source={{ uri: thumbnailUrl ? thumbnailUrl:PlaceholderImg }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{flex:1, marginLeft:10}}>
            <TextInput
            placeholder="Enter Captions...."
            placeholderTextColor="gray"
            multiline={true}
            style={{ color: "white", fontSize: 20 }}
            onChangeText={handleChange("caption")}
            onBlur={handleBlur('caption')}
            value={values.caption} 
          />      
        </View>
          </View>
          <Divider width={0.2} orientation="vertical"/>

          <TextInput
          onChange={e=>setThumbnailUrl(e.nativeEvent.text)}
            placeholder="Enter Image Url..."
            placeholderTextColor="gray"
            style={{ color: "white", fontSize:18 }}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{fontSize:10, color:"red"}}>
              {errors.imageUrl}
            </Text>
          )}

          <Button onPress={handleSubmit} title="Share" disabled={!isValid}>Share</Button>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
