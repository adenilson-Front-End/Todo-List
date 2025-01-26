import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import Header from "../../components/Header";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts";
import { useNavigation } from "@react-navigation/native";


export default function Home() {




    const { addTarefa, addLoadingTarefa, input, setInput, updateTarefa, idEditing } = useContext(AuthContext);
    const navigation = useNavigation()


    async function handleTarefa() {

        if (input === '') {
            alert('Digite uma tarefa');
            return;
        }

        try {
            await addTarefa(input);

            navigation.navigate('A fazer')

            setInput('')

            return;
        } catch (err) {
            console.log(err)

        }
    }




    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
                <Header title={'Criar tarefas'} />
                <View style={styles.areaDados}>
                    <TextInput
                        value={input}
                        onChangeText={(value) => setInput(value)}
                        style={styles.input} placeholder={idEditing ? 'Editar tarefa...' : 'Nova tarefa...'} />
                    {idEditing === '' ? (
                        <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={handleTarefa}  >
                            {addLoadingTarefa ? (
                                <ActivityIndicator size={25} color={"#000"} />
                            ) : (
                                <Feather name="plus" size={25} color="#000" />
                            )}

                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={() => updateTarefa(idEditing)} >
                            {addLoadingTarefa ? (
                                <ActivityIndicator size={25} color={"#000"} />
                            ) : (
                                <Feather name="check" size={25} color="#000" />
                            )}
                        </TouchableOpacity>
                    )}



                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },

    areaDados: {
        width: '90%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#000',
    },
    input: {
        width: '80%',
        height: 50,
        fontSize: 18,
        borderRadius: 8,
        paddingStart: 10,
        paddingEnd: 10,
        backgroundColor: '#FFF',


    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    }
})