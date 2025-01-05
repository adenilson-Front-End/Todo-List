import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/home";
import { TabRouter } from "@react-navigation/native";
import AuthTab from "./tab.routes";
import Inicio from "../pages/inicio";
import SignIn from "../pages/SigIn";
import Profile from "../pages/profile";
import ListTarefas from "../pages/listTarefas";
import DrawerCustomer from "../components/DrawerCustomer";

const AuthDrawer = createDrawerNavigator();

export default function AuthHome() {
    return (

        <AuthDrawer.Navigator drawerContent={(props) => <DrawerCustomer {...props} />} screenOptions={{ headerShown: false }} >

            <AuthDrawer.Screen name="Inicio" component={AuthTab} options={{ title: 'Inicio' }} />
            <AuthDrawer.Screen name="Home" component={Home} options={{ title: 'Home', drawerItemStyle: { display: 'none' } }} />
            <AuthDrawer.Screen name="Tarefas" component={ListTarefas} options={{ title: "Tarefas" }} />
            <AuthDrawer.Screen name="Perfil" component={Profile} options={{ title: "Perfil" }} />

        </AuthDrawer.Navigator >
    )
}