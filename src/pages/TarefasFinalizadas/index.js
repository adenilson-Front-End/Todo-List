import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AuthContext } from "../../Contexts";
import Tarefas from "../../components/Tarefas";
import Finalizadas from "../../components/Finalizadas";
import Header from "../../components/Header";

export default function TarefasFinalizadas() {

    const { tarefasFinalizadas } = useContext(AuthContext)


    return (
        <View style={styles.container}>
            <View style={styles.areaHeader}>
                <Header title={'Tarefas finalizadas'} />
            </View>
            <FlatList
                data={tarefasFinalizadas}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Finalizadas data={item} />}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

        flex: 1,

        backgroundColor: '#000',

    },

    areaHeader: {
        width: '100%',
        height: 50,

    },
    areaItens: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    }
})