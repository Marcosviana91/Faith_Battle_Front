import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * Return a list with a boolean indicating if keyboard is showing, and their dict metrics
 * 
 * @returns [Boolean, {"height": Number, "screenX": Number, "screenY": Number, "width": Number}]
 */
export function useKeyboard() {
    const [keyboardIsShow, setKeyboardIsShow] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [keyboardIsShow]);
    return (Platform.OS === 'android' ? [keyboardIsShow, Keyboard.metrics()] : [false]);
}