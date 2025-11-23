import { Pressable, StyleSheet, Text, View, } from 'react-native'
import { hp } from '../helpers/common'
import Loading from './Loading'

const LogoutButton = ({

    textStyle,
    title='',
    onPress=()=>{},
    loading = false,

}) => {


    if(loading){
        return (
            <View style={[styles.button]}>
                <Loading />
            </View>
        )
    }
    return(
        <Pressable onPress={onPress} style={[styles.button]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}

export default LogoutButton

const styles = StyleSheet.create({
    button:{
        alignSelf:'flex-end' ,
        borderWidth: 1,
        borderColor: '#ffffffff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderTopRightRadius: 10, 
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 0,
    },
    text: {
        fontSize: hp(2),
        color:'white',

    
    }
})