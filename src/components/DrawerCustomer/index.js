import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../../Contexts";

export default function DrawerCustomer(props) {

    const { imageProfile, user } = useContext(AuthContext)
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <View style={styles.containerAvatar}>
                    <Image style={styles.avatar} source={imageProfile === null ? require('../../imgs/Avatar.png') : { uri: imageProfile }} />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.saudacao}>Bem-vindo!</Text>
                    <Text style={styles.nameUser} numberOfLines={1}>{user.name}</Text>
                </View>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,


    }

    , containerAvatar: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',

        zIndex: 10,
        borderRadius: 200 / 2 * 100,
        marginBottom: 20,
    },
    avatar: {
        width: 200,
        height: 200,
        zIndex: 3,
        borderWidth: 4,
        borderColor: '#dcdcdc',
        borderRadius: 200 / 2 * 100,
        objectFit: 'cover',
    },

    containerText: {

        width: "50%",
        alignItems: 'center',
        justifyContent: 'center',


    },
    saudacao: {

        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    nameUser: {

        fontSize: 20,
        marginBottom: 50,


    }
})