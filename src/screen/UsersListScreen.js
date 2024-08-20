import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersListScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await AsyncStorage.getItem('users');
                if (usersData !== null) {
                    setUsers(JSON.parse(usersData));
                }
            } catch (error) {
                console.error('Kullanıcılar alınırken hata:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (email) => {
        try {
            // Kullanıcıyı filtreleme
            let updatedUsers = users.filter(user => user.email !== email);

            // Güncellenmiş kullanıcıları AsyncStorage'a kaydetme
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

            // State güncelleme
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Kullanıcı silinirken hata:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.userText}>First Name: {item.firstName}</Text>
            <Text style={styles.userText}>Last Name: {item.lastName}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
            <Text style={styles.userText}>Phone: {item.phone}</Text>
            <Text style={styles.userText}>Card Number: {item.cardNumber}</Text>
            <Text style={styles.userText}>Papara Number: {item.paparaNumber}</Text>
            <TouchableOpacity onPress={() => deleteUser(item.email)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registered Users</Text>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.email} // Benzersiz bir anahtar kullanılması önerilir
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    userText: {
        fontSize: 18,
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default UsersListScreen;
