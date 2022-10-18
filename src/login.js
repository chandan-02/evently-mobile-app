// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
// import { LinearTextGradient } from "react-native-text-gradient";

// funcitonality 
import fetcher from '../functionality/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '' })

  const SignIn = async () => {
    setLoading(true)
    try {
      // console.log(userData)
      const resLogin = await fetcher.post('/user-main/login', {
        email: userData.email,
        password: userData.password
      })
      let res = resLogin.data;
      if (res.success) {
        await AsyncStorage.setItem('token', res?.jwt?.token);
        navigation.navigate('home')
      }
      setLoading(false)
    } catch (error) {
      if (error.response.data) {
        alert(`${error.response.data.data}`)
      }
      setLoading(false)
      console.log(error.response)
    }
  }

  useEffect(() => {
    (async () => {
      const jwtToken = await AsyncStorage.getItem('token');
      if (jwtToken) {
        setIsLogged(true);
        setTimeout(() => {
          navigation.navigate('home')
        },500);
      }
    })();
  }, [])

  if (!isLogged) {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>

          <Text style={{ fontWeight: '800', fontSize: 41, color: '#101727', marginBottom: 25 }}>
            Evently Sign in</Text>
        </View>

        <KeyboardAvoidingView style={{ marginBottom: 10 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="example@gmail.com"
            onChangeText={text => {
              // console.log(text)
              setUserData({ ...userData, email: text })
            }} />
        </KeyboardAvoidingView >

        <KeyboardAvoidingView style={{ marginBottom: 10 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text style={styles.label}>Password</Text>
          <TextInput secureTextEntry={showPassword} style={styles.input}
            onChangeText={text => setUserData({ ...userData, password: text })} placeholder="*********" />
        </KeyboardAvoidingView >

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 12 }}>
            <Checkbox
              color="#101727"
              value={isChecked}
              onValueChange={() => {
                setShowPassword(!showPassword)
                setChecked(!isChecked);
              }} />
            <Text style={{ color: '#101727', marginLeft: 7, }}>Show password </Text>
          </View>

          <Pressable style={styles.btn} onPress={SignIn}>
            {
              !loading ?
                <Text style={{ color: '#fff', fontSize: 16 }}> Continue</Text>
                :
                <ActivityIndicator color="#fff" />
            }
          </Pressable>
        </KeyboardAvoidingView >

      </View>
    );
  }
  else {
    return <View style={{ ...styles.container, alignItems: 'center' }}>
      <Text>Please wait, verifying auth</Text>
      <ActivityIndicator color="#101727" style={{marginTop:15}}/>
    </View>
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#949DB0',
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderRadius: 5

  },
  label: {
    fontSize: 16,
    color: '#101727',
    marginBottom: 5
  },
  btn: {
    backgroundColor: '#101727',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5
  }
});
