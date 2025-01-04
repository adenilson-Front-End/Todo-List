import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

export default function Header({ title }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container} >

            <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    menu: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})