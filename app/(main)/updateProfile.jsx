import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from '../../components/Input';
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContexts";
import { hp, wp } from "../../helpers/common";
import { getUserImageSrc, uploadFile } from "../../services/imageService";
import { updateUser } from "../../services/userService";

// needs to refresh data and redirect to profile

const UpdateProfile = () => {
        const router = useRouter();

        const [loading, setLoading] = useState(false); 
    
        // const onLogout = async ()=>{
            
        //     const {error} = await supabase.auth.signOut();
        //     if(error){
        //         Alert.alert('Logout', "Error signing out!")
        //     }
        // }
    
        const {user: currentUser, setAuth} = useAuth();

        const [user, setUser] = useState({
            name: '',
            city: '',
            bio: '',
            image: null,
            interests: ''
        });

        useEffect(()=>{
            if(currentUser){
                setUser({
                    name: currentUser.name || '',
                    city: currentUser.city || '',
                    bio: currentUser.bio || '',
                    image: currentUser.image || null,
                    interests: currentUser.interests || '',
                });
            }
        },[currentUser])

        const onPickImage = async ()=>{
        // need to add camera as an option
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7,
            });


            if (!result.canceled) {
                setUser({...user, image: result.assets[0]});
                }
        }

        const onSubmit = async ()=>{
            let userData = {...user};
            let {name, city, bio, image, interests} = userData;
            if(!name || !city || !bio || !interests || !image){
                Alert.alert('Profile', "Please fill in all fields");
                return;
            }
            setLoading(true);


            if(typeof image == 'object'){
                let imageRes = await uploadFile('profiles', image?.uri, true);
                if(imageRes.success) userData.image = imageRes.data;
                else userData.image = null;

            }

            const res = await updateUser(currentUser?.id, userData);
            setLoading(false);

            console.log('update user result: ', res);
        }

        let imageSource = user.image && typeof user.image == 'object'? user.image.uri : getUserImageSrc(user.image);

    return (
        <ScreenWrapper>
            <View style={styles.topHeader}>
               
                {/* <Pressable onPress={()=> router.back()}> <Icon name='arrowLeft' strokeWidth={1.6}  color={'black'} /></Pressable> */}
                
                {/* back button throws error, need to investigate further */}
  
                <Text style={styles.topHeader}>friendzone</Text>

            </View>
                      

            <View style={styles.container}>

  
<Text style={styles.subTitle}>Edit Profile</Text>
                    <View style={styles.avatarContainer}>   
                        <Image source={imageSource} style={styles.avatar} />
                        <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                            <Icon name="camera" size={20} strokeWidth={2.5} />
                        </Pressable>

                    
                    </View >  

                <View style={styles.header}>
                    <Text style={styles.userName}>{user && user.name}</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{fontSize: hp(1.5), color: 'black'}}>
                        Please enter your details here
                    </Text>

                        <Input
                            icon={<Icon name="city" size={26} strokeWidth={1.6} />}
                            placeholder='City'
                            value={user.city}
                            onChangeText={value=> setUser({...user, city: value})}
                        />
                        <Input
                            icon={<Icon name="bio" size={26} strokeWidth={1.6} />}
                            placeholder='Bio'
                            value={user.bio}
                            multiline={true}
                            containerStyle={styles.bio}
                            onChangeText={value=> setUser({...user, bio: value})}
                        />
                        <Input
                            icon={<Icon name="interests" size={26} strokeWidth={1.6} />}
                            placeholder='Interests'
                            value={user.interests}
                            multiline={true}
                            containerStyle={styles.bio}
                            onChangeText={value=> setUser({...user, interests: value})}
                        />
                    <View style={styles.updateButton}>
                        <Button title="Update" loading={loading} onPress={onSubmit} />
                    </View>
              
                </View>

          </View>
            <View style={styles.footer}>
            <View style={styles.icons}>

                <Pressable onPress={()=> router.push('settings')}>
                    <Icon name="settings" strokeWidth={1.6}  color={'black'} />
                </Pressable>
                <Pressable onPress={()=> router.push('messages')}>
                    <Icon name="messages" strokeWidth={1.6}  color={'black'} />
                </Pressable>
                <Pressable onPress={()=> router.push('home')}>
                    <Icon name="home"  strokeWidth={1.6}  color={'black'} />
                </Pressable>
                <Pressable onPress={()=> router.push('search')}>
                    <Icon name="finder" strokeWidth={1.6}  color={'black'} />
                </Pressable>
                <Pressable onPress={()=> router.push('profile')}>
                    <Avatar 
                        uri={user?.image}
                        size={hp(4.3)}
                        rounded={theme.radius.sm}
                        style={{borderWidth: 2}}
                        /> 
                </Pressable>
            </View>
        </View> 
    </ScreenWrapper>

    )
}

export default UpdateProfile

const styles = StyleSheet.create({
         container: {
            flex: 1,
            gap: 25,
            paddingHorizontal: wp(5),

            
          },
          avatarContainer: {
            height: hp(12),
            width: hp(12),
            alignSelf: 'center',

          },
            userName: {
            fontSize: hp(2),
            color: '#000000ff',
          },
          avatar: {
            width: '100%',
            height: '100%',
            borderRadius: '50%' ,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor: theme.colors.darkLight
          },
          cameraIcon: {
            position: 'absolute',
            bottom: 0,
            right: -10,
            padding: 8,
            borderRadius: 50,
            backgroundColor: 'white',
            shadowColor: theme.colors.textLight,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 7
          },
          form: {
            gap: 10,
            alignItems: 'center',
          },
          topHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 10,
            fontWeight: theme.fonts.extraBold,
            fontSize: hp(4),

          },
          header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',

            marginTop: 5,
          },
          icons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 40,
          },
          title: {
            color: '#000000ff',
            fontSize: hp(4),
            paddingTop: 0,
            textAlign: 'center',
            fontWeight: theme.fonts.extraBold,
          
          },
        subTitle: {
            color: '#000000ff',
            fontSize: hp(2),
            paddingTop: 5,
            textAlign: 'center',
            fontWeight: theme.fonts.extraBold,
          
          },
          footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            marginBottom: 20,
            marginTop: 5,
          },
          bio: {
            flexDirection: 'row',
            height: hp(15),
            alignItems: 'flex-start',
            paddingVertical: 15,
          },
          updateButton: {
            backgroundColor: theme.colors.primary,
            height: hp(6.6),
            width: wp(60),
            justifyContent: 'center',
            alignItems: 'center',
            borderCurve: 'continuous',
            borderTopRightRadius: 20, 
            borderTopLeftRadius: 20, 
            borderBottomLeftRadius: 20, 
            borderBottomRightRadius: 0,
          }
})