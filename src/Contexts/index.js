import { createContext, useState } from "react";

export const AuthContext = createContext();



export default function AuthProvaider({ children }) {

    const [ tarefas, setTarefas ] = useState([
        {
            id: '1',
            name: 'Comprar pão',
            date: new Date(),
        },
        {
            id: '2',
            name: 'Estudar React Native',
            date: new Date(),
        },
    ])

    const [ tarefasFinalizadas, setTarefasFinalizadas ] = useState([ {
        id: '1',
        name: 'Comprar pão',
        date: new Date(),

    } ])

    console.log(tarefas)
    return (
        <AuthContext.Provider value={{ tarefas, tarefasFinalizadas }}>
            {children}
        </AuthContext.Provider>
    )
}