import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isValidPassword = (password) => {
    return password.length >= 6;
};

function ChangePasswordScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [currentPasswordValid, setCurrentPasswordValid] = useState(true);

    const handleChangePassword = async () => {
        if (!isValidPassword(newPassword)) {
            Alert.alert('Error', 'New password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        try {
            const usersData = await AsyncStorage.getItem('users');
            if (usersData !== null) {
                const users = JSON.parse(usersData);
                const updatedUsers = users.map(user => {
                    if (user.password === currentPassword) {
                        return { ...user, password: newPassword };
                    }
                    return user;
                });

                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
                Alert.alert('Success', 'Password changed successfully');
                navigation.navigate('Login'); 
            } else {
                Alert.alert('Error', 'User not found');
            }
        } catch (error) {
            console.error('Password change failed:', error);
            Alert.alert('Error', 'An error occurred while changing the password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
                        secureTextEntry
                        onChangeText={text => {
                            setCurrentPassword(text);
                            setCurrentPasswordValid(text.length > 0);
                        }}
                        value={currentPassword}
                    />
                    {!currentPasswordValid && <Text style={styles.errorText}>Current password is required</Text>}
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        onChangeText={text => {
                            setNewPassword(text);
                            setPasswordValid(isValidPassword(text));
                        }}
                        value={newPassword}
                    />
                    {!passwordValid && <Text style={styles.errorText}>New password must be at least 6 characters</Text>}
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        onChangeText={text => setConfirmPassword(text)}
                        value={confirmPassword}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={handleChangePassword}
                style={[styles.changeButton, { backgroundColor: currentPasswordValid && passwordValid && newPassword === confirmPassword ? '#3498db' : '#aaa' }]}
                disabled={!currentPasswordValid || !passwordValid || newPassword !== confirmPassword}
            >
                <Text style={styles.changeButtonText}>Change Password</Text>
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
    changeButton: {
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    changeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;
