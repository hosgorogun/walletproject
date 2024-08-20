import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BalanceContext } from './BalanceContext';

function WithdrawScreen({ navigation }) {
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [iban, setIban] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const { balance, updateBalance, addTransaction } = useContext(BalanceContext);

    const handleWithdraw = async () => {
        const numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            Alert.alert('Hata', 'Geçerli bir miktar girin.');
            return;
        }

        if (numericAmount > balance) {
            Alert.alert('Yetersiz Bakiye', 'Bakiyeniz yetersiz.');
            return;
        }


        if (!iban || !name || !surname) {
            Alert.alert('Hata', 'IBAN, Ad ve Soyad bilgilerini doldurun.');
            return;
        }

        try {
            

            await updateBalance(-numericAmount); 
            const transaction = {
                id: Date.now().toString(), 
                amount: (-numericAmount).toFixed(2),
                date: new Date().toLocaleDateString(),
                status: 'Withdrawn',
                iban,
                name,
                surname
            };
            await addTransaction(transaction); 

            Alert.alert(
                'Para Çekme İşlemi',
                `₺${numericAmount.toFixed(2)} başarıyla çekildi!`,
                [
                    {
                        text: 'Tamam',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Hata', 'Para çekme işlemi gerçekleştirilemedi.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Withdraw Money</Text>
            <TextInput
                style={styles.input}
                placeholder="Amount to be withdrawn"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="IBAN"
                value={iban}
                onChangeText={setIban}
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Lastname"
                value={surname}
                onChangeText={setSurname}
            />
            <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
                <Text style={styles.buttonText}>Withdraw</Text>
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
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 18,
    },
});

export default WithdrawScreen;
