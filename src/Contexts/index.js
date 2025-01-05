import { createContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../services/firebaseConnection';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const AuthContext = createContext();

export default function AuthProvaider({ children }) {

    const [ tarefas, setTarefas ] = useState([]);

    const [ tarefasFinalizadas, setTarefasFinalizadas ] = useState([ {} ]);

    const [ imageProfile, setImageProfile ] = useState(null);

    useEffect(() => {
        async function getData() {
            const docRef = await collection(db, 'listaDeTarefas');

            getDocs(docRef).then((snapshot) => {
                let listaTarefas = [];
                snapshot.forEach((doc) => {
                    listaTarefas.push({
                        id: doc.id,
                        name: doc.data().name
                    })


                })
                setTarefas(listaTarefas)
            })
        }

        getData();
    }, [ tarefas ]);


    //adicionando tarefas no banco de dados

    async function addTarefas(tarefa) {
        await addDoc(collection(db, 'listaDeTarefas'), {
            name: tarefa,
        })

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
            value={{ tarefas, tarefasFinalizadas, imageProfile, pickerImageProfile, addTarefas }}
        >
            {children}
        </AuthContext.Provider>
    );
}
