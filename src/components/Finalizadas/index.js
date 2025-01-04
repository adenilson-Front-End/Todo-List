import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'

export default function Finalizadas({ data }) {
    return (
        <View style={styles.containerItens}>


            <View style={styles.areaItem}>
                <Text style={styles.title}>{data.name}</Text>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItens: {

        alignItems: 'center',
        backgroundColor: '#000',
        marginTop: 10

    },
    areaItem: {
        width: '98%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: 4,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginLeft: 8,
        fontWeight: "bold",
        textDecorationLine: 'line-through'
    }
})