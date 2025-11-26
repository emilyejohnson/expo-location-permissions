import { Pressable, StyleSheet, Text } from 'react-native'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const BackButton = ({size=26, router}) => {
    return(
        <Pressable onPress={()=> router.back()} style={styles.button}>
                                  <Text style={[styles.buttonText]}>
                                          Back
                                  </Text>
        </Pressable>
    )
}


export default BackButton

const styles = StyleSheet.create({
    button:{
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.small,
        backgroundColor: 'rgba(0,0,0,0.07',
        
    },

    buttonText: {
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
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 10,
    },
    text: {
        fontSize: hp(2.5),
        color:'white',
        fontWeight: theme.fonts.bold
    }
})