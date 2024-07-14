import { StyleSheet } from 'react-native';



export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
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
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-evenly",
        flexBasis: 100,
        flexGrow: 0,
    },
    textInput: {
        height: 32,
        borderRadius: 8,
        paddingHorizontal: 8,
        minWidth: 200,
        maxWidth:"80%",
        backgroundColor:"#27419B"
    }
});

