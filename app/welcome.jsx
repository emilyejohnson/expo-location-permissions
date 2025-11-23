import {StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
 
const Welcome = () => {
    const router = useRouter();
    return (
        <>
        <ImageBackground
        source={require('../assets/images/people-moving.gif')}
        style={styles.background}
        >
        <ScreenWrapper>
         <StatusBar style="dark" />
            <View style={styles.container}>
                <View style={styles.topTextContainer}>
                    <Pressable onPress={()=> router.push('login')}>
                        <Text style={[styles.loginText]}>
                                Login
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.welcome}>
                    <Text style={styles.title}>friendzone</Text>
                    <Text style={styles.punchline}>MAKE NEW FRIENDS WITH PEOPLE AROUND YOU</Text>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Sign Up"
                        buttonStyle={{marginHorizontal: wp(1)}}
                        onPress={()=> router.push('signUp')}
                    />

                    <Text style={styles.footerText}>    Privacy Policy & Terms of Service</Text>
                </View>
                
            </View>

        </ScreenWrapper>         
            
    </ImageBackground>

        </>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 100, 
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: wp(6)
    },
    welcome: {
        alignItems: 'center',
        gap: 80,
      },

    background: {
        flex: 1,
        width: null,
        height: null,
    },

    topTextContainer: {
        flexDirection: 'row-reverse', 
        alignSelf:'flex-end', 

    },

    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: hp(1.6),
        borderWidth: 1,
        borderColor: '#ffffff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderTopRightRadius: 10, 
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 0,
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
        paddingVertical: 30,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30, 
        borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 0,
    },

    footer: {
        flexDirection: 'column',
        width: '250', 
    
    },

    footerText: {
        textAlign: 'center',
        color: 'black',
        fontSize: hp(1.4),
        marginVertical: 10,

    },


})