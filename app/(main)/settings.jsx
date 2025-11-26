import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContexts";
import { hp } from "../../helpers/common";


const Settings = () => {

        const router = useRouter();
    
        const {user, setAuth} = useAuth();
    return (
        <ScreenWrapper>
        <View style={styles.topHeader}>
                                        {/* <Pressable onPress={()=> router.back()}> <Icon name="arrowLeft" strokeWidth={1.6}  color={'black'} /></Pressable> */}
                          
        <Text style={styles.topHeader}>friendzone</Text>
                        
        </View>
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
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

export default Settings

const styles = StyleSheet.create({
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        fontWeight: theme.fonts.extraBold,
        fontSize: hp(4),
    },
    container: {
        flex: 1,

      },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
      },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 40,

      },
    title: {
        color: '#000000',
        fontSize: hp(2),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontWeight: theme.fonts.extraBold,
        marginLeft: 20,
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