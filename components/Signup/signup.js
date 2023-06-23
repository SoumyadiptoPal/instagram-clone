import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import React,{useState} from 'react'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from "yup";
import Validator from 'email-validator'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {firebase, db} from '../../firebase'
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

const Signup = ({navigation}) => {
  const SignUpFormSchema=Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password:Yup.string()
    .required()
    .min(6, 'Your password has to have atleast 6 characters'),
    username: Yup.string()
    .required()
    .min(4, 'Your password has to have atleast 4 characters')
  })
  const onSignUp=async (email,password,username)=>{
    const auth=getAuth(firebase);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("signUp successful")
        try {
          const docRef = await setDoc(doc(db, "users", email), {
            username:username,
            email: email,
            profile_picture: "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg",
          });
          // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error in Sign Up',errorMessage);
      });
  }
  return (
    <View style={styles.wrapper}>
      <Formik
      initialValues={{email: '',password:'',username:''}}
      onSubmit={(values)=>onSignUp(values.email,values.password,values.username)}
      validationSchema={SignUpFormSchema}
      validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid})=>(<>
          <View style={[styles.inputField,{borderColor:(values.email.length<1 || Validator.validate(values.email))?'#ccc':'red'}]}>
      <TextInput
      placeholder='Email'
      placeholderTextColor="#444"
      autoCapitalize='none'
      keyboardType='email-address'
      textContentType='emailAddress'
      autoFocus={true}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}/>
      </View>
      <View style={[styles.inputField,{borderColor:(values.username.length<1 || values.username.length>3)?'#ccc':'red'}]}>
      <TextInput
      placeholder='Username'
      placeholderTextColor="#444"
      autoCapitalize='none'
      keyboardType='default'
      textContentType='username'
      autoFocus={true}
      onChangeText={handleChange('username')}
      onBlur={handleBlur('username')}
      value={values.username}/>
      </View>
      <View style={[styles.inputField,{borderColor:(values.password.length<1 || values.password.length>5)?'#ccc':'red'}]}>
      <TextInput
      placeholder='Password'
      placeholderTextColor="#444"
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={true}
      textContentType='password'
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      value={values.password}
      />
      </View>
      <Pressable
      style={styles.button(isValid)}
      onPress={handleSubmit}
      >
        <Text 
        style={styles.buttonText}
        >Sign Up</Text>
      </Pressable>
      <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.push('LoginScreen')}>
            <Text style={{color:'#6BB0F5'}}> Log In</Text>
          </TouchableOpacity>
      </View>
        </>)}
      </Formik>
    </View>
  )
}

export default Signup

const styles=StyleSheet.create({
    inputField:{
        borderRadius:4,
        padding:12,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1,
    },
    wrapper:{
        marginTop:80,
    },
    loginContainer:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:50
    },
    button:(isValid)=>({
      backgroundColor:isValid ? '#30A2FF' : '#9DB2BF',
      alignItems:'center',
      justifyContent:'center',
      height:50,
      borderRadius:4,
      width:"100%"
    }),
    buttonText:{
      fontWeight:'400',
      fontSize:20,
      color:'#fff'
    }
})