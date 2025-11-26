import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContexts";
import { hp } from "../../helpers/common";
import { supabase } from "../../lib/supabase";


const Profile = () => {
        const router = useRouter();
    
        const {user, setAuth} = useAuth();
    
    
        const onLogout = async ()=>{
            
            const {error} = await supabase.auth.signOut();
            if(error){
                Alert.alert('Logout', "Error signing out!")
            }
        }
    return (
        <ScreenWrapper>
                        <View style={styles.topHeader}>
                            {/* <Pressable onPress={()=> router.back()}> <Icon name="arrowLeft" strokeWidth={1.6}  color={'black'} /></Pressable> */}
              
                            <Text style={styles.topHeader}>friendzone</Text>
            
                        </View>
            <View style={styles.container}>

            {/* <LogoutButton title="Logout" color="#ffffff" onPress={onLogout} /> */}
<Text style={styles.subTitle}>Profile</Text>
            <View style={{gap:15}}>
                <View style={styles.avatarContainer}>
                    <Avatar
                    uri={user?.image}
                    style={styles.avatar}
                    />
                        <Pressable style={styles.cameraIcon}  onPress={()=> router.push('updateProfile')}>
                            <Icon name="pencil" size={20} strokeWidth={2.5} />
                        </Pressable>
                </View>
            <View style={{alignItems: 'center', gap: 4}}>
                <Text style={styles.userName}>{user && user.name}</Text>
            </View>
            </View> 
            <View style={styles.info}>

            <View style={{alignItems: 'left', gap: 4}}>
                <Text style={styles.userInfo}>City: {user && user.city}</Text>
            </View>
            <View style={{alignItems: 'left', gap: 4}}>
                <Text style={styles.userInfo}>Bio: {user && user.bio}</Text>
            </View>
            <View style={{alignItems: 'left', gap: 4}}>
                <Text style={styles.userInfo}>Interests: {user && user.interests}</Text>
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

export default Profile

const styles = StyleSheet.create({
         container: {
            flex: 1,
            gap: 25,

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
            userName: {
            fontSize: hp(2),
            color: '#000000ff',
          },
          avatarContainer: {
            height: hp(12),
            width: hp(12),
            alignSelf: 'center',
          },
            avatar: {
            width: '100%',
            height: '100%',
            borderRadius: '50%' ,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor: theme.colors.darkLight
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
            justifyContent: 'space-between',
            marginBottom: 10,
          },
          userName: {
            fontSize: hp(2),
            color: '#000000ff',
          },
            userInfo: {
            fontSize: hp(3),
            color: '#000000ff',
            marginLeft: 30,
          },
          info: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'left',
            gap: 40,
            marginTop :40, 
          },
          icons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 40,
          },
          title: {
            color: '#ffffff',
            fontSize: hp(5),
            textAlign: 'center',
            fontWeight: theme.fonts.extraBold,
            marginLeft: 20,
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
})