import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function DrawerCustomer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <View style={styles.containerAvatar}>
                    <Image style={styles.avatar} source={require('../../imgs/Avatar.png')} />
                </View>
                <Text style={styles.saudacao}>Bem-vindo!</Text>
                <Text style={styles.nameUser} numberOfLines={1}>Adenilson Rosa</Text>
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
        borderWidth: 4,
        zIndex: 10,
        borderRadius: 200 / 2 * 100,
        marginBottom: 20,
    },
    avatar: {
        width: 180,
        height: 180,
        zIndex: 3,
        objectFit: 'cover',
    },
    saudacao: {
        width: 150,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nameUser: {
        width: 150,
        fontSize: 20,
        marginBottom: 50

    }
})