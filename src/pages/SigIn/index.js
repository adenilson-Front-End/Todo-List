import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts';

export default function SignIn() {
    const { loginUser, setUser, authUser } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    async function handleSigIn() {

        if (email === '' || password === '') {
            alert('Preencha todos os campos!');
            return;
        }
        await loginUser(email, password, setUser);
    }

    const navigation = useNavigation()
    return (


        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonIcon} onPress={() => navigation.navigate('Inicio')}>
                <Feather style={styles.icon} name='arrow-left' size={30} color={'#000'} />
            </TouchableOpacity>
            <Image
                style={styles.imgBackGround}
                source={require('../../imgs/bgLogin.png')}
            />
            <View style={styles.formulario}>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.input} placeholder="Seu email..." />
                <TextInput
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    style={styles.input} secureTextEntry={true} placeholder="Sua senha..." />
                <TouchableOpacity style={styles.button} activeOpacity={0.8}
                    onPress={handleSigIn}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginRight: 8 }}>Entrar </Text>
                        {authUser && (
                            <ActivityIndicator size={30} color={'#000'} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    imgBackGround: {
        flex: 1,
        resizeMode: 'cover',
        zIndex: 1,
    },

    buttonIcon: {
        position: 'absolute',
        borderRadius: 50 / 2 * 100,
        borderWidth: 2,
        zIndex: 99,
        top: 20,
        left: 20,
    },
    formulario: {
        width: '80%',
        height: '35%',

        bottom: 50,

        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',

        zIndex: 99,
    },
    input: {
        width: '100%',
        height: 50,
        paddingEnd: 14,
        paddingStart: 14,
        marginTop: 20,
        fontSize: 18,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    button: {
        width: '100%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 2,
        backgroundColor: '#FFF',
    },
});
