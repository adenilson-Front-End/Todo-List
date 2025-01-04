import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/auth";
import { StatusBar } from "react-native";
import AuthProvaider from './src/Contexts';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvaider>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <Routes />
      </AuthProvaider>
    </NavigationContainer>
  );
}
