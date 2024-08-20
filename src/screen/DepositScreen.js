import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { BalanceContext } from './BalanceContext';

function DepositScreen({ navigation }) {
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [loading, setLoading] = useState(false); 
    const { balance, updateBalance, addTransaction } = useContext(BalanceContext);

    const isValidCardNumber = (number) => {
        const cardNumberRegex = /^[0-9]{16}$/;
        return cardNumberRegex.test(number);
    };

    const isValidCvv = (cvv) => {
        const cvvRegex = /^[0-9]{3,4}$/;
        return cvvRegex.test(cvv);
    };

    const isValidExpiryDate = (date) => {
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expiryDateRegex.test(date);
    };

    const handleDeposit = async () => {
        if (loading) return; 
        
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            Alert.alert('Hata', 'Geçerli bir miktar girin.');
            return;
        }

        if (!isValidCardNumber(cardNumber)) {
            Alert.alert('Hata', 'Geçerli bir kart numarası girin.');
            return;
        }

        if (!isValidCvv(cvv)) {
            Alert.alert('Hata', 'Geçerli bir CVV girin.');
            return;
        }

        if (!isValidExpiryDate(expiryDate)) {
            Alert.alert('Hata', 'Geçerli bir SKT girin (MM/YY).');
            return;
        }

        setLoading(true); 
        try {
            await updateBalance(numericAmount);

            const transaction = {
                id: Date.now().toString(),
                amount: numericAmount.toFixed(2),
                date: new Date().toLocaleDateString(),
                status: 'Deposited',
                cardNumber,
                cvv,
                expiryDate
            };

            await addTransaction(transaction);

            Alert.alert(
                'Para Yatırma İşlemi',
                `₺${numericAmount.toFixed(2)} başarıyla yatırıldı!`,
                [
                    {
                        text: 'Tamam',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Hata', 'Para yatırma işlemi gerçekleştirilemedi.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deposit Money</Text>
            <TextInput
                style={styles.input}
                placeholder="Amount to be deposited"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
            />
            <TextInput
                style={styles.input}
                placeholder="Expiration Date (MM/YY)"
                value={expiryDate}
                onChangeText={setExpiryDate}
            />
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleDeposit}
                disabled={loading} 
            >
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Deposit</Text>}
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

export default DepositScreen;
