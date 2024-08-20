
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
    },
    img: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputView: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
    },
    inputText: {
        height: '100%',
        color: '#003f5c',
        fontSize: 16,
    },
    loginBtn: {
        width: '100%',
        backgroundColor: '#3f51b5',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotAndSignUpText: {
        color: '#3f51b5',
        fontSize: 16,
    },
});

export default styles;