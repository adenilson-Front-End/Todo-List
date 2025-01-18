import { createContext, useState, useEffect, use, cloneElement } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../services/firebaseConnection';
import { auth } from '../services/firebaseConnection';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export default function AuthProvaider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ authUser, setAuthuser ] = useState(false);
    const [ tarefas, setTarefas ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        async function loadStorange() {
            const storangeUser = await AsyncStorage.getItem('@todoApp');

            if (storangeUser) {
                await setUser(JSON.parse(storangeUser))
            }

            setLoading(false)

        }
        loadStorange()
    }, [])



    async function registerUser(email, password, name, setUser) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const user = userCredential.user;

            // Atualiza o displayName no Firebase Authentication
            await updateProfile(user, {
                displayName: name, // Nome de exibição
            });

            const data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
            }
            setUser(data);

            storangeUser(data)
        } catch (err) {
            console.log('Erro ao cadastrar usuario', err);
        }
    }

    async function loginUser(email, password) {
        setAuthuser(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
                setUser,
            );

            const user = userCredential.user;

            const data = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            }

            setUser(data);

            storangeUser(data)
            console.log('Logado con sucesso', user.displayName);
            setAuthuser(false);
            return;
        } catch (err) {
            console.log('Error ao fazer login', err.code);
            setAuthuser(false);
        }
    }

    useEffect(() => {
        //buscando tarefas do usuario logado
        if (user) {
            getTarefas();
        }
    }, [ user ]);

    async function getTarefas() {
        if (!user) {
            console.log('Usuario não autenticado');
            return [];
        }

        const tarefasRef = await collection(db, 'tarefas');

        //filtrando as tarefas com base do UID e adicionando ao usuario responsavel
        const q = query(
            tarefasRef,
            where('uid', '==', user.uid),
            orderBy('createdAt', 'desc'),
        );

        try {
            const tarefasUser = await onSnapshot(q, (snaphot) => {
                let listaDeTarefas = [];

                snaphot.forEach((doc) => {
                    listaDeTarefas.push({
                        autor: doc.data().autor,
                        tarefa: doc.data().tarefa,
                        id: doc.id,
                        uid: user.uid,
                        createdAt: new Date(),
                    });
                });

                setTarefas(listaDeTarefas);

            });
        } catch (err) {
            console.log(err);
        }
    }

    async function addTarefa(name) {
        try {
            const docRef = await addDoc(collection(db, 'tarefas'), {
                autor: user.name,
                tarefa: name,

                uid: user.uid,

                createdAt: new Date(),
            });

            const newTarefa = {
                id: docRef.id,
                autor: user.name,
                uid: user.uid,
                tarefa: name,
                createdAt: new Date(),
            };

            setTarefas([ ...tarefas, newTarefa ]);

        } catch (err) {
            console.log('Erro ao cadastrar tarefa: ', err);
        }
    }

    async function removeTarefa(id) {
        const docRef = await doc(db, 'tarefas', id);
        await deleteDoc(docRef)
    }



    async function logOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
            .catch((err) => {
                setUser(null);
            });
    }

    async function storangeUser(data) {
        await AsyncStorage.setItem('@todoApp', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider
            value={{
                registerUser,
                loginUser,
                loading,
                logOut,
                addTarefa,
                removeTarefa,
                tarefas,
                authUser,


                signed: !!user,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
