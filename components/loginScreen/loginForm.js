import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import Validator from 'email-validator'
import {firebase} from '../../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({navigation}) => {
  const LoginFormSchema=Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password:Yup.string()
    .required()
    .min(6, 'Your password has to have atleast 6 characters'),
  })
  const onLogin=async (email,password)=>{
    try{
      const auth=getAuth(firebase);
      signInWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    console.log("Firebase login Successful ",email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert(
      'Invalid Credentials',
      errorMessage,
      [
        {
          text:'OK',
          onPress:()=>{},
          style:'cancel',
        },
        {
          text: 'Sign Up', onPress:()=> navigation.push('SignupScreen')
        }
      ]
    )
  });
      
    }catch(error){
      console.log(error)
    }
  }
  return (
    <View style={styles.wrapper}>
      <Formik
      initialValues={{email: '',password:''}}
      onSubmit={(values)=>{
        onLogin(values.email, values.password);
      }}
      validationSchema={LoginFormSchema}
      validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid})=>(<>
          <View style={[styles.inputField,{borderColor:(values.email.length<1 || Validator.validate(values.email))?'#ccc':'red'}]}>
      <TextInput
      placeholder='Phone Number, UserName or email'
      placeholderTextColor="#444"
      autoCapitalize='none'
      keyboardType='email-address'
      textContentType='emailAddress'
      autoFocus={true}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}/>
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
      <View style={{alignItems:'flex-end', marginBottom:30}}>
        <Text style={{color:'red'}}>Forgot Password</Text>
      </View>
      <Pressable
      style={styles.button(isValid)}
      onPress={handleSubmit}
      >
        <Text 
        style={styles.buttonText}
        >Log In</Text>
      </Pressable>
      <View style={styles.signupContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.push('SignupScreen')}>
            <Text style={{color:'#6BB0F5'}}> Sign Up</Text>
          </TouchableOpacity>
      </View>
        </>)}
      </Formik>
    </View>
  )
}

export default LoginForm

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
    signupContainer:{
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