import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


export default function Inicio() {
    const navigation = useNavigation()
    return (


        <View style={styles.container}>

            <Image style={styles.imgBackGround} source={require('../../imgs/bgInicio.png')} />
            <View style={styles.areaButtons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', }}>Fazer login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonText} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.linkText} >Criar uma conta gratuita.</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imgBackGround: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    areaButtons: {
        flex: 1,
        width: '100%',
        bottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 99
    },
    button: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 14,
    },
    linkText: {
        height: 36,
        color: '#FFF'
    }
})