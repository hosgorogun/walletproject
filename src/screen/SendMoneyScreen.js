import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { BalanceContext } from './BalanceContext';

function SendMoneyScreen({ navigation }) {
    const [amount, setAmount] = useState('');
    const [recipientPaparaNumber, setRecipientPaparaNumber] = useState('');
    const [description, setDescription] = useState('');
    const { balance, setBalance } = useContext(BalanceContext);

    const handleSendMoney = async () => {
        const numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            Alert.alert('Geçersiz Tutar', 'Lütfen geçerli bir tutar girin.');
            return;
        }

        if (recipientPaparaNumber.trim() === '') {
            Alert.alert('Geçersiz Alıcı Bilgileri', 'Lütfen alıcının Papara numarasını girin.');
            return;
        }

        if (numericAmount > balance) {
            Alert.alert('Yetersiz Bakiye', 'Bakiyeniz yetersiz.');
            return;
        }

        try {
            
            const response = await axios.post('https://your-api-endpoint.com/send-money', {
                amount: numericAmount,
                recipientPaparaNumber,
                description
            });

            if (response.data.success) {
              
                setBalance(balance - numericAmount);
                Alert.alert(
                    'Başarı',
                    `₺${numericAmount.toFixed(2)} başarıyla ${recipientPaparaNumber}\'e gönderildi!`,
                    [{ text: 'Tamam', onPress: () => navigation.goBack() }]
                );
            } else {
                Alert.alert('Hata', 'Para gönderme işlemi sırasında bir hata oluştu.');
            }
        } catch (error) {
            Alert.alert('Hata', 'Para gönderme işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Send Money</Text>

            <TextInput
                style={styles.input}
                placeholder="Recipient's Papara Number"
                value={recipientPaparaNumber}
                onChangeText={setRecipientPaparaNumber}
                placeholderTextColor="#888"
            />

            <TextInput
                style={styles.input}
                placeholder="Amount to be sent"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor="#888"
            />

            <TextInput
                style={styles.input}
                placeholder="Description (Optional)"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={handleSendMoney}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    backButton: {
        padding: 10,
        borderRadius: 5,
        borderColor: '#007bff',
        borderWidth: 1,
    },
    backButtonText: {
        fontSize: 18,
        color: '#007bff',
    },
});

export default SendMoneyScreen;
