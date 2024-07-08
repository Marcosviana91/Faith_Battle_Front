import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';

import Home from '@/pages/home/home';
import Login from '@/pages/home/login';




export default function HomeScreen() {
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    if (userData) {
        return <Home />;
    }
    return < Login />
}