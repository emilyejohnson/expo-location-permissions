import { StyleSheet, TextInput, View } from "react-native";
import { hp } from "../helpers/common";

const Input = (props) => {
    return(
        <View style={[styles.container, props.containerStyle && props.containerStyle]}>
            {
                props.icon && props.icon
            }
            <TextInput
                style={{flex:1}}
                placeholderTextColor={'black'}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
        </View>
    )
}

export default Input
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp(8.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: 'white',
        backgroundColor: 'rgba(201, 236, 246, 0.5)',
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 0, 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        borderCurve: 'continuous',
        paddingHorizontal: 18,
        gap: 12,
    }
})