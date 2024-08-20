import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateRandomCardNumber = () => {
    const getRandomDigit = () => Math.floor(Math.random() * 10);
    const cardNumber = Array.from({ length: 16 }, () => getRandomDigit()).join('');
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};

const generatePaparaNumber = () => {
    const getRandomDigit = () => Math.floor(Math.random() * 10);
    const paparaNumber = Array.from({ length: 10 }, () => getRandomDigit()).join('');
    return paparaNumber;
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    return password.length >= 6;
};

function RegisterScreen({ navigation }) {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleRegister = async () => {
        const { email, password, confirmPassword } = userInfo;

        if (!isValidEmail(email)) {
            Alert.alert('Registration Error', 'Lütfen geçerli bir e-posta adresi girin.');
            return;
        }

        if (!isValidPassword(password)) {
            Alert.alert('Registration Error', 'Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Registration Error', 'Şifreler eşleşmiyor.');
            return;
        }

        try {
            const usersData = await AsyncStorage.getItem('users');
            let users = [];

            if (usersData !== null) {
                users = JSON.parse(usersData);
            }

            const newUser = {
                ...userInfo,
                cardNumber: generateRandomCardNumber(),
                paparaNumber: generatePaparaNumber(),
                balance: 0,
                transactions: []
            };

            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));

            console.log('Yeni Kullanıcı Kaydedildi:', newUser);
            navigation.navigate('Login');
        } catch (error) {
            console.error('Kullanıcı Kaydedilemedi:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Register to get started</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor="#888"
                        onChangeText={text => setUserInfo({ ...userInfo, firstName: text })}
                        value={userInfo.firstName}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor="#888"
                        onChangeText={text => setUserInfo({ ...userInfo, lastName: text })}
                        value={userInfo.lastName}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onChangeText={text => {
                            setUserInfo({ ...userInfo, email: text });
                            setEmailValid(isValidEmail(text));
                        }}
                        value={userInfo.email}
                    />
                    {!emailValid && <Text style={styles.errorText}>Invalid email address</Text>}
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#888"
                        onChangeText={text => {
                            setUserInfo({ ...userInfo, password: text });
                            setPasswordValid(isValidPassword(text));
                        }}
                        value={userInfo.password}
                    />
                    {!passwordValid && <Text style={styles.errorText}>Password must be at least 6 characters</Text>}
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        onChangeText={text => {
                            setUserInfo({ ...userInfo, confirmPassword: text });
                            setPasswordsMatch(userInfo.password === text);
                        }}
                        value={userInfo.confirmPassword}
                    />
                    {!passwordsMatch && <Text style={styles.errorText}>Passwords do not match</Text>}
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#888"
                        onChangeText={text => setUserInfo({ ...userInfo, phone: text })}
                        value={userInfo.phone}
                    />
                </View>
            </View>
            <TouchableOpacity 
                onPress={handleRegister} 
                style={[styles.registerButton, { backgroundColor: emailValid && passwordValid && passwordsMatch ? '#3498db' : '#aaa' }]} 
                disabled={!emailValid || !passwordValid || !passwordsMatch}
            >
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UsersList')} style={styles.viewUsersButton}>
                <Text style={styles.viewUsersButtonText}>View Registered Users</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f7',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 10,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
        position: 'absolute',
        right: 15,
        top: '100%',
        transform: [{ translateY: 5 }],
    },
    registerButton: {
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewUsersButton: {
        marginTop: 10,
    },
    viewUsersButtonText: {
        color: '#3498db',
        fontSize: 16,
    },
});

export default RegisterScreen;
