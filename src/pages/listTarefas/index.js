import { useContext } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AuthContext } from '../../Contexts';
import Header from '../../components/Header';
import Tarefas from '../../components/Tarefas';

export default function ListTarefas() {
    const { tarefas, removeTarefa } = useContext(AuthContext);



    async function handleRemoveTarefa(item) {

        await removeTarefa(item);
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

                        />
                    )}

                    ListEmptyComponent={

                        <View style={styles.areaTextNadaPorAqui}>

                            <Image style={styles.image} source={require('../../imgs/fundoNenhumaTarefa.png')} />
                            <Text style={styles.mensage}>Poxa! Nada por aqui!</Text>
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
        backgroundColor: "#fff",
        width: Dimensions.get('window').width, // pega toda largura da tela
        height: Dimensions.get('window').height - 90 // pega toda altura da tela

    },
    image: {
        width: 250,
        height: 250
    },
    mensage: {
        fontSize: 30,
        color: '#dcdcdc'

    }
});
