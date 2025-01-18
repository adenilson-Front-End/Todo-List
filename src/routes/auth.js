import AuthInicio from "./auth.routes";
import AuthHome from "./app.routes";
import { useContext, useState } from "react";
import { AuthContext } from "../Contexts";
import { ActivityIndicator, View } from "react-native";
export default function Routes() {
    const { signed, loading } = useContext(AuthContext);


    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color="#000" />
            </View>
        )
    }

    return (
        signed ? <AuthHome /> : <AuthInicio />
    )

}