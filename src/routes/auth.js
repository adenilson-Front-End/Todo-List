import AuthInicio from "./auth.routes";
import AuthHome from "./app.routes";
export default function Routes() {

    const signed = true;
    return (
        signed ? <AuthHome /> : <AuthInicio />
    )
}