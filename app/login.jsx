import { Alert, Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useRef } from 'react'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import Input from '../components/Input'
import Button from '../components/Button'
import { supabase } from '../lib/supabase'

// Keyboard covers inputs!!!

const Login = () => {
      const router = useRouter();
      const emailRef = useRef("");
      const passwordRef = useRef("");
      const [loading, setLoading] = useState(false);
      
      const onSubmit = async ()=> {
          if(!emailRef.current || !passwordRef.current){
            Alert.alert('Login', "Please fill in all the fields")
            return;
          }
          let email = emailRef.current.trim();
          let password = passwordRef.current.trim(); 
          setLoading(true);
          const {error} = await supabase.auth.signInWithPassword({
              email,
              password
          });

          setLoading(false);

          console.log('error: ', error);
          if(error){
            Alert.alert('Login', error.message);
          }
      }

    return (
      <>
      <ImageBackground
        source={require('../assets/images/people-moving.gif')}
        style={styles.background}
      >
        <ScreenWrapper>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <BackButton router={router} />

          <View>
            <Text style={styles.title}>friendzone</Text>

          </View>


          <View style={styles.form}>
              <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                  Please Log In to Enter
              </Text>
              <Input
                  icon={<Icon name="mail" size={26} strokeWidth={1.6} color={'black'} />}
                  placeholder='Enter Your Email'
                  onChangeText={value=> emailRef.current = value}
              />
              <Input
                  icon={<Icon name="password" size={26} strokeWidth={1.6} color={'black'}  />}
                  placeholder='Enter Your Password'
                  secureTextEntry
                  onChangeText={value=> passwordRef.current = value}
              />
              <Text style={styles.forgotPassword}>
                  Forgot Password?
              </Text>

             
          </View>

          <View style={styles.footer}>
          <Button title={'  Login  '} loading={loading} onPress={onSubmit} />
            <Text style={styles.footerText}>
                Don't Have an account?
            </Text>
              <Pressable onPress={()=> router.push('signUp')}>
                <Text style={[StyleSheet.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Sign Up</Text>
              </Pressable>
          </View>
        </View>  
        </ScreenWrapper>
        </ImageBackground>
      </>
    )
  }
 
export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 100,
    paddingHorizontal: wp(5),

  },
  title: {
    color: 'white',
    fontSize: hp(7),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
},
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 20,
    color: 'white',
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  footer: {
    flexDirection: '',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  }
})
