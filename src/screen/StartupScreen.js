import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style.js';

const StartupScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const usersData = await AsyncStorage.getItem('users');
                if (usersData !== null) {
                   
                    navigation.navigate('Login');
                } else {
                  
                    navigation.navigate('Register');
                }
            } catch (error) {
                console.error('Kullanıcı kontrolünde hata:', error);
            }
        };

        checkUser();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default StartupScreen;
