import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import LogoutButton from "../../components/LogoutButton";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContexts";
import { hp } from "../../helpers/common";
import { supabase } from "../../lib/supabase";

export default function MapScreen() {


  const router = useRouter();
    
  const {user, setAuth} = useAuth();
    
    
    
  const onLogout = async ()=>{
            
  const {error} = await supabase.auth.signOut();
        if(error){
                Alert.alert('Logout', "Error signing out!")
            }
  }

  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null); // Ref to control the MapView

  useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
        })();
      }, []);

      const goToMyLocation = () => {
        if (location && mapRef.current) {
          mapRef.current.animateCamera({
            center: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            pitch: 0,
            heading: 0,
            altitude: 1000,
            zoom: 15,
          });
        }
      };
      return (
      
        <ScreenWrapper>
        <View style={styles.container}>
        
     <Text style={styles.topHeader}>friendzone</Text>
          {location ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              mapType="satellite" // Set mapType to 'satellite' for satellite view
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true} // Shows the blue dot for user's location
            >
              {/* This marker, a self closing tag, is the red marker/pin. Not necessary to have. We may want to change it to be the user profile picture? */}
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Users Profile Picture"
              />
<LogoutButton title="Logout" color="#ffffff" onPress={onLogout} />

            </MapView>
          ) : (
            <Text>{errorMsg || 'Waiting for location...'}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="FriendZone Button" onPress={goToMyLocation} />
           
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
   
      );
    }

     const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      map: {
        width: '100%',
        height: '100%',
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
      buttonContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000000ff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderTopRightRadius: 10, 
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 10,
      },
        header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
        icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 40,

      },
        footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
        marginTop: 10,
      },

    });