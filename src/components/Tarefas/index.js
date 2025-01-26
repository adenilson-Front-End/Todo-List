import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import Header from "../Header";
import { useContext } from "react";
import { AuthContext } from "../../Contexts";
export default function Tarefas({ data, deleteTarefa, tarefasConcluida, editTarefa }) {

    const { tarefas } = useContext(AuthContext)



    return (
        <View style={styles.containerItens}>

            {tarefas.length > 0 ? (
                <View style={styles.areaItem}>
                    <Text numberOfLines={1} style={{ width: 250, fontSize: 20, marginLeft: 8, fontWeight: "bold" }}>{data.tarefa}</Text>

                    <View style={styles.areaButtons}>
                        <TouchableOpacity style={styles.button} onPress={editTarefa}>
                            <Feather name="edit-2" size={15} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={deleteTarefa}>
                            <Feather name="trash-2" size={15} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={tarefasConcluida}>
                            <Feather name="check-square" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

            ) : (
                <View style={{ flex: 1, backgroundColor: 'red' }}>
                    <Text style={{ color: '#fff' }}>Nada por aqui</Text>
                </View>

            )}



        </View>
    )
}

const styles = StyleSheet.create({
    containerItens: {

        flex: 1,
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
    areaButtons: {
        width: "30%",
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-around',

    },
    button: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40 / 2 * 100,
        marginRight: 8,
        backgroundColor: '#000'
    }
})