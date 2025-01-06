import { createContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../services/firebaseConnection';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
} from 'firebase/firestore';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export default function AuthProvaider({ children }) {
    const [ tarefas, setTarefas ] = useState([]);


    const [ tarefasFinalizadas, setTarefasFinalizadas ] = useState([]);

    const [ imageProfile, setImageProfile ] = useState(null);

    useEffect(() => {
        async function getDataTarefas() {
            const docRef = await collection(db, 'listaDeTarefas');

            getDocs(docRef).then((snapshot) => {
                let listaTarefas = [];
                snapshot.forEach((doc) => {
                    listaTarefas.push({
                        id: doc.id,
                        name: doc.data().name,
                    });
                });
                setTarefas(listaTarefas);
            });
        }

        async function getDataFinalizadas() {
            const docRef = await collection(db, 'finalizadas');
            getDocs(docRef).then((snapshot) => {
                let listaFinalizadas = [];
                snapshot.forEach((doc) => {
                    listaFinalizadas.push({
                        id: doc.id,
                        name: doc.data().name,
                    });
                });

                setTarefasFinalizadas(listaFinalizadas);
            });
        }
        getDataFinalizadas();

        getDataTarefas();
    }, [ tarefas ]);

    //adicionando tarefas no banco de dados

    async function addTarefas(tarefa) {
        await addDoc(collection(db, 'listaDeTarefas'), {
            name: tarefa,
        });
    }

    async function deleteTarefa(id) {
        Alert.alert('⚠️ Cuidado! ⚠️', 'Você deseja deletar esse item?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Ok', onPress: () => deleteItem(id) },
        ]);
    }

    async function deleteItem(id) {
        const docRef = doc(db, 'listaDeTarefas', id);
        await deleteDoc(docRef);
    }

    async function finalizarTarefa(nome) {
        await addDoc(collection(db, 'finalizadas'), {
            name: nome,
        });
    }

    async function pickerImageProfile() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [ 'images' ],
            allowsEditing: true,
            aspect: [ 4, 4 ],
        });

        if (!result.canceled) {
            setImageProfile(result.assets[ 0 ].uri);

            return;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                tarefas,
                tarefasFinalizadas,
                imageProfile,
                pickerImageProfile,
                addTarefas,
                deleteTarefa,
                finalizarTarefa,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
