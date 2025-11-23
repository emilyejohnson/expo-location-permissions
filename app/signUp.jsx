import { Alert, Pressable, StyleSheet, Text, View, ImageBackground  } from 'react-native'
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

const SignUp = () => {
      const router = useRouter();
      const emailRef = useRef("");
      const nameRef = useRef("");
      const passwordRef = useRef("");
      const confirmPasswordRef = useRef("");
      const [loading, setLoading] = useState(false);
      
      const onSubmit = async ()=> {
          if(!emailRef.current || !passwordRef.current){
            Alert.alert('Sign Up', "Please fill in all the fields")
            return;
          }

          if (passwordRef.current !== confirmPasswordRef.current) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
          }
          
          let name = nameRef.current.trim();
          let email = emailRef.current.trim();
          let password = passwordRef.current.trim();

          setLoading(true);

          const {data: {session}, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name
              }
            }
          }, { redirectTo: 'updateProfile' }  );

        
          setLoading(false);

          console.log('session: ', session);
          console.log('error: ', error);
          if(error){
            Alert.alert('Sign up', error.message);
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

          <View style={styles.welcome}>

            <Text style={styles.punchline}>MAKE NEW FRIENDS WITH PEOPLE AROUND YOU</Text>
          </View>


          <View style={styles.form}>
              <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                  Please enter your details to create an account
              </Text>
              <Input
                  icon={<Icon name="name" size={26} strokeWidth={1.6} color={'black'}  />}
                  placeholder='Enter your name'
                  onChangeText={value=> nameRef.current = value}
              />
              <Input
                  icon={<Icon name="mail" size={26} strokeWidth={1.6} color={'black'} />}
                  placeholder='Enter Your Email'
                  onChangeText={value=> emailRef.current = value}
              />
              <Input
                  icon={<Icon name="password" size={26} strokeWidth={1.6} color={'black'} />}
                  placeholder='Enter Your Password'
                  secureTextEntry
                  onChangeText={value=> passwordRef.current = value}
              />
              <Input
                  icon={<Icon name="password" size={26} strokeWidth={1.6} color={'black'} />}
                  placeholder='Confirm Your Password'
                  secureTextEntry
                  onChangeText={value=> confirmPasswordRef.current = value}
              />


          </View>
          <View style={styles.footer}> 
            <Button title={'Sign Up'} loading={loading} onPress={onSubmit} />
                          <Text style={styles.footerText}>
                Already have an account?
              </Text>
              <Pressable onPress={()=> router.push('login')}>
                <Text style={[StyleSheet.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Log in</Text>
              </Pressable>
          </View>
        </View>  
        </ScreenWrapper>
        </ImageBackground>
      </>
    )
  }
 
export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),

  },
  welcome: {
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
  },

  title: {
    color: 'white',
    fontSize: hp(7),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
},
  punchline: {
    color: 'white',
    fontSize: hp(2.5),
    width: wp(60),
    textAlign: 'left',
    fontWeight: theme.fonts.bold,
    paddingLeft: 30,
    paddingRight: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderTopRightRadius: 30, 
    borderTopLeftRadius: 30, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 0,
    
},
  form: {
    gap: 10,
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

