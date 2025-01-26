import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Home from '../pages/home';
import Profile from '../pages/profile';
import AuthHome from './app.routes';
import ListTarefas from '../pages/listTarefas';
import TarefasFinalizadas from '../pages/TarefasFinalizadas';

const TabAuth = createBottomTabNavigator();

export default function AuthTab() {
    return (
        <TabAuth.Navigator initialRouteName="Criar" screenOptions={{ tabBarStyle: { borderTopWidth: 0, elevation: 0 } }}>
            <TabAuth.Screen
                name="A fazer"
                component={ListTarefas}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="file-text" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />

            <TabAuth.Screen
                name="Criar"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="plus" color={color} size={size} />
                    ),
                    headerShown: false,
                }}


            />
            <TabAuth.Screen
                name="Finalizadas"
                component={TarefasFinalizadas}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="check-square" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </TabAuth.Navigator>
    );
}
