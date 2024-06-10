import { useSelector } from 'react-redux'

import { RootReducer } from '@/store';

import Home from '@/pages/home/home';
import Login from '@/pages/home/login';


export default function HomeScreen(props: RouterScreenProps) {
    const playerData = useSelector((state: RootReducer) => state.authReducer.data)
    if (!playerData) {
        return <Login />
    }
    return <Home {...playerData} {...props} />;
}