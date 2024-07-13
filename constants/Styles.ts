import { StyleSheet } from 'react-native';

import { Colors } from './Colors';



export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: Colors.light.headerBackgound,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        flexBasis: 100,
        flexGrow: 0,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        flexBasis: 0,
        flexGrow: 1,
        gap: 10,
    },
    footerContainer: {
        backgroundColor: Colors.light.footerBackgound,
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
        flexBasis: 100,
        flexGrow: 0,
    },
    textInput: {
        backgroundColor: Colors.light.tint,
        height: 32,
        borderRadius: 8,
        paddingHorizontal: 8,
        minWidth: 200
    }
});

