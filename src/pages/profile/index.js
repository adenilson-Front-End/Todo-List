import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { useContext } from "react";
import { AuthContext } from "../../Contexts";

export default function Profile() {

    const { user } = useContext(AuthContext)
    const navigation = useNavigation();
    const { logOut } = useContext(AuthContext)


    return (
        <View style={styles.container}>
            <Header title={'Perfil'} />
            <View style={styles.areaItens}>
                <TouchableOpacity style={styles.areaAvatar}>
                    <Image style={styles.avatar} source={require('../../imgs/Avatar.png')} />
                </TouchableOpacity>


                <Text numberOfLines={1} style={styles.nameUser}>Olá, {user.name}</Text>

                <View style={styles.areaButton}>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Nova tarefa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => logOut()}>
                        <Text style={{ color: '#D85A5A', fontSize: 22, fontWeight: 'bold' }}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    areaItens: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },

    areaAvatar: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        zIndex: 10,
        borderRadius: 200 / 2 * 100
    },
    avatar: {
        width: 200,
        height: 200,
        zIndex: 3,
        borderWidth: 4,
        borderColor: '#dcdcdc',
        borderRadius: 180 / 2 * 100,
        objectFit: 'cover',

    },

    nameUser: {
        width: 180,
        paddingEnd: 8,
        paddingStart: 8,
        fontSize: 20,

        marginTop: 30,
    },
    areaButton: {
        width: '80%',
        height: '20%',
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: '#000',
    }
})