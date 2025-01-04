import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../pages/inicio";
import SignIn from "../pages/SigIn";
import SignUp from "../pages/SignUp";


const AuthStack = createNativeStackNavigator();

export default function AuthInicio() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Inicio" component={Inicio} options={{
                headerShown: false
            }} />

            <AuthStack.Screen name="SignIn" component={SignIn} options={{
                headerShown: false
            }} />

            <AuthStack.Screen name="SignUp" component={SignUp} options={{
                headerShown: false
            }} />

        </AuthStack.Navigator>
    )
}