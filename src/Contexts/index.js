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

    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export default function AuthProvaider({ children }) {
    const [ input, setInput ] = useState('');
    const [ user, setUser ] = useState(null);
    const [ authUser, setAuthuser ] = useState(false);
    const [ tarefas, setTarefas ] = useState([]);
    const [ tarefasFinalizadas, setTarefasFinalizadas ] = useState([]);
    const [ listaTarefasFinalizadas, setListaDeTarefasFinalizadas ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ idEditing, setIdEditing ] = useState('');
    const [ addLoadingTarefa, setAddLoadingTarefa ] = useState(false);
    const [ menu, setMenu ] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorange() {
            const storangeUser = await AsyncStorage.getItem('@todoApp');

            if (storangeUser) {
                await setUser(JSON.parse(storangeUser));
            }

            setLoading(false);
        }
        loadStorange();
    }, []);

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
            };
            setUser(data);

            storangeUser(data);
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
            };

            setUser(data);

            storangeUser(data);
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
            getTarefasFinalizadas();
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
        setAddLoadingTarefa(true);

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
            setAddLoadingTarefa(false);
        } catch (err) {
            console.log('Erro ao cadastrar tarefa: ', err);
            setAddLoadingTarefa(false);
        }
    }

    async function finalizarTarefa(tarefa, id) {
        if (!user) {
            alert('Usuario não autenticado');
            return [];
        }

        try {
            const tarefasRef = await addDoc(collection(db, 'finalizadas'), {
                autor: user.name,
                tarefa: tarefa,
                uid: user.uid,
                createdAt: new Date(),
            });

            const newFinalizadas = {
                id: tarefasRef.id,
                autor: user.name,
                uid: user.uid,
                tarefa: tarefa,
                createdAt: new Date(),
            };

            setTarefasFinalizadas([ ...tarefasFinalizadas, newFinalizadas ]);

            Alert.alert('Alerta', 'Deseja finalizar tarefa', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Ok', onPress: () => removeTarefa(id) },
            ]);
        } catch (err) {
            console.log('Erro ao finalizar tarefa', err.code);
        }
    }

    async function getTarefasFinalizadas(tarefa) {
        if (!user) {
            alert('Usuario não autenticado');
            return [];
        }

        const tarefaRef = await collection(db, 'finalizadas');

        const q = query(
            tarefaRef,
            where('uid', '==', user.uid),
            orderBy('createdAt', 'desc'),
        );
        try {
            const userTarefas = await onSnapshot(q, (snapshot) => {
                let listaFinalizadas = [];
                snapshot.forEach((doc) => {
                    listaFinalizadas.push({
                        autor: doc.data().autor,
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        uid: user.uid,
                        createdAt: new Date(),
                    });
                });

                setListaDeTarefasFinalizadas(listaFinalizadas);
            });
        } catch (err) {
            console.log('Erro ao buscar tarefas finalizadas: ', err.code);
        }
    }

    async function removeTarefa(id) {
        try {
            const docRef = await doc(db, 'tarefas', id);
            await deleteDoc(docRef);
        } catch (err) {
            console.log('Erro ao deletar tarefa', err);
        }
    }

    async function aditTarefa(tarefa) {
        await setInput(tarefa);
    }

    async function updateTarefa(id) {
        setAddLoadingTarefa(true);
        try {
            if (input === '') {
                alert('Favor editar tarefa! ');
                return;
            }
            const docRef = doc(db, 'tarefas', id);

            await updateDoc(docRef, {
                tarefa: input,
            });
            setInput('');
            setIdEditing('');
            navigation.goBack();
            setAddLoadingTarefa(false);
        } catch (err) {
            console.log('Erro ao editar tarefa', err);
            setAddLoadingTarefa(false);
        }
    }

    async function logOut() {
        await AsyncStorage.clear().then(() => {
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
                input,
                setInput,
                loading,
                addLoadingTarefa,
                logOut,
                addTarefa,
                aditTarefa,
                removeTarefa,
                setIdEditing,
                idEditing,
                setInput,
                updateTarefa,

                finalizarTarefa,
                getTarefasFinalizadas,
                listaTarefasFinalizadas,

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
