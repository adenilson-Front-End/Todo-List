import { useContext } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../../Contexts';
import Header from '../../components/Header';
import Tarefas from '../../components/Tarefas';
import { updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default function ListTarefas() {
    const {
        tarefas,
        removeTarefa,
        editTarefa,
        setInput,
        idEditing,
        setIdEditing,
        finalizarTarefa
    } = useContext(AuthContext);
    const navigation = useNavigation();

    async function handleRemoveTarefa(item) {
        await removeTarefa(item);
    }

    async function handleEditTarefa(tarefa, id) {
        navigation.navigate('Home');

        setIdEditing(id);

        setInput(tarefa);
        await editTarefa(tarefa);
    }

    async function handleFinalizarTarefa(tarefa, id) {


        await finalizarTarefa(tarefa, id)
    }



    return (
        <View style={styles.container}>
            <View style={styles.areaHeader}>
                <Header title={'Tarefas'} />
            </View>
            <View style={styles.areaItens}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tarefas}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Tarefas
                            data={item}
                            deleteTarefa={() => handleRemoveTarefa(item.id)}
                            editTarefa={() => handleEditTarefa(item.tarefa, item.id)}
                            tarefasConcluida={() => handleFinalizarTarefa(item.tarefa, item.id)}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.areaTextNadaPorAqui}>
                            <Image
                                style={styles.image}
                                source={require('../../imgs/fundoNenhumaTarefa.png')}
                            />
                            <Text style={styles.mensage}>Poxa! Nada por aqui!</Text>

                            <View style={{ marginTop: 40 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Criar')}>
                                    <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>Nova tarefa</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    }
                />
            </View>
        </View>
    );
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
    },
    areaTextNadaPorAqui: {
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        backgroundColor: '#fff',
        width: Dimensions.get('window').width, // pega toda largura da tela
        height: Dimensions.get('window').height - 99, // pega toda altura da tela
    },
    image: {
        width: 250,
        height: 250,
    },
    mensage: {
        fontSize: 30,
        color: '#dcdcdc',
    },
});
