import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BalanceContext } from './BalanceContext';

function Payments() {
    const { transactions, deleteTransaction } = useContext(BalanceContext);

    const handleDelete = (id) => {
        deleteTransaction(id);
    };

    const renderItem = ({ item }) => (
        <View style={styles.paymentItem}>
            <Text style={styles.paymentText}>Balance: {item.amount}</Text>
            <Text style={styles.paymentText}>Date: {item.date}</Text>
            <Text style={styles.paymentText}>Situation: {item.status}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 15,
    },
    paymentItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        position: 'relative',
    },
    paymentText: {
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default Payments;
