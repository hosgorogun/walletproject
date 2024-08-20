import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Modal, Linking, ScrollView, Alert } from 'react-native';
import { BalanceContext } from './BalanceContext';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

function HomeScreen({ navigation }) {
    const { balance, updateBalance, loadBalance, logoutUser } = useContext(BalanceContext);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [modalVisible, setModalVisible] = useState(false);
    const [balanceData, setBalanceData] = useState([balance]);
    const [paparaNumber, setPaparaNumber] = useState('');

    useEffect(() => {
        loadBalance();
        fetchPaparaNumber();

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setBalanceData(prevData => [...prevData, balance]);
    }, [balance]);

    const fetchPaparaNumber = async () => {
        try {
            const usersData = await AsyncStorage.getItem('users');
            if (usersData !== null) {
                const users = JSON.parse(usersData);
                
                const currentUserEmail = 'hosgorogun@gmail.com'; 
                const currentUser = users.find(user => user.email === currentUserEmail);
                
                if (currentUser && currentUser.paparaNumber) {
                    setPaparaNumber(currentUser.paparaNumber);
                } else {
                    console.log('Papara number not found for user');
                }
            } else {
                console.log('No users data found');
            }
        } catch (error) {
            console.error('Papara Number Fetch Error:', error);
        }
    };

    const openYouTube = () => {
        Linking.openURL('https://www.youtube.com/premium');
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleWithdraw = () => {
        navigation.navigate('Withdraw', {
            onWithdraw: async (amount) => {
                try {
                    const newBalance = balance - amount;
                    await updateBalance(newBalance);
                } catch (error) {
                    console.error('Withdraw Error:', error);
                }
            },
        });
    };

    const handleDeposit = () => {
        navigation.navigate('Deposit', {
            onDeposit: async (amount) => {
                try {
                    const newBalance = balance + amount;
                    await updateBalance(newBalance);
                } catch (error) {
                    console.error('Deposit Error:', error);
                }
            },
        });
    };

    const handleSendMoney = () => {
        navigation.navigate('SendMoney', {
            onSendMoney: async (amount) => {
                try {
                    const newBalance = balance - amount;
                    await updateBalance(newBalance);
                } catch (error) {
                    console.error('Send Money Error:', error);
                }
            },
        });
    };

    const handleLogout = () => {
        Alert.alert(
            "Çıkış Yap",
            "Uygulamadan çıkmak istediğinizden emin misiniz?",
            [
                {
                    text: "Hayır",
                    style: "cancel"
                },
                {
                    text: "Evet",
                    onPress: async () => {
                        try {
                            await logoutUser(navigation);
                            navigation.navigate('Login');
                        } catch (error) {
                            console.error('Logout Error:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.time}>{currentTime}</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.settingsIcon} onPress={toggleModal}>
                            <Image 
                                style={styles.profileImage}
                                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.balanceContainer}>
                    <Text style={styles.currency}>₺</Text>
                    <Text style={styles.balance}>{balance.toFixed(2)}</Text>
                    <Text style={styles.accountNumber}>Papara Number: {paparaNumber || 'Not Available'}</Text>
                </View>
                <View style={styles.transactionButtons}>
                    <TouchableOpacity style={styles.transactionButton} onPress={handleWithdraw}>
                        <Image
                            style={styles.transactionIcon}
                            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/cash-in-hand.png' }}
                        />
                        <Text style={styles.transactionButtonText}>Withdraw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transactionButton} onPress={handleDeposit}>
                        <Image
                            style={styles.transactionIcon}
                            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/deposit.png' }}
                        />
                        <Text style={styles.transactionButtonText}>Deposit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.transactionButton} onPress={handleSendMoney}>
                        <Image
                            style={styles.transactionIcon}
                            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/send.png' }}
                        />
                        <Text style={styles.transactionButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.graphContainer}>
                    <Text style={styles.graphTitle}>Balance Trend</Text>
                    <LineChart
                        data={{
                            labels: balanceData.map((_, index) => index.toString()),
                            datasets: [{
                                data: balanceData,
                            }],
                        }}
                        width={screenWidth - 20}
                        height={220}
                        yAxisLabel="₺"
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#f5f5f5',
                            backgroundGradientTo: '#f5f5f5',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '6',
                                strokeWidth: '2',
                                stroke: '#fff',
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={styles.cashbackContainer}>
                    <Text style={styles.cashbackText}>CASHBACK</Text>
                    <TouchableOpacity style={styles.cashbackButton}>
                        <Text style={styles.cashbackButtonText}>Half is from us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cashbackButton} onPress={openYouTube}>
                        <Text style={styles.cashbackButtonText}>YouTube 50% instant cash</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('QR')}>
                    <Image style={styles.navIcon} source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/qr-code.png' }} />
                    <Text style={styles.navButtonText}>QR Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Payments')}>
                    <Image style={styles.navIcon} source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/money.png' }} />
                    <Text style={styles.navButtonText}>Payments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Card')}>
                    <Image style={styles.navIcon} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png' }} />
                    <Text style={styles.navButtonText}>Papara Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('StockData')}>
                    <Image style={styles.navIcon} source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/line-chart.png' }} />
                    <Text style={styles.navButtonText}>Exchange</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalItem} onPress={() => { toggleModal(); navigation.navigate('Profile'); }}>
                            <Text style={styles.modalItemText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={() => { toggleModal(); navigation.navigate('Settings'); }}>
                            <Text style={styles.modalItemText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={() => { toggleModal(); navigation.navigate('Help'); }}>
                            <Text style={styles.modalItemText}>Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={handleLogout}>
                            <Text style={styles.modalItemText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
                            <Text style={styles.closeModalText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#3498db',
        elevation: 4,
    },
    time: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIcon: {
        marginRight: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    balanceContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    currency: {
        fontSize: 24,
        color: '#3498db',
    },
    balance: {
        fontSize: 40,
        color: '#333',
        fontWeight: 'bold',
    },
    accountNumber: {
        fontSize: 14,
        color: '#777',
    },
    transactionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    transactionButton: {
        alignItems: 'center',
    },
    transactionIcon: {
        width: 50,
        height: 50,
    },
    transactionButtonText: {
        marginTop: 5,
        color: '#3498db',
    },
    graphContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    graphTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    cashbackContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    cashbackText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cashbackButton: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
    cashbackButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#3498db',
    },
    navButton: {
        alignItems: 'center',
    },
    navIcon: {
        width: 24,
        height: 24,
    },
    navButtonText: {
        marginTop: 5,
        color: '#fff',
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        elevation: 5,
    },
    modalItem: {
        paddingVertical: 10,
    },
    modalItemText: {
        fontSize: 16,
        color: '#3498db',
    },
    closeModalButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    closeModalText: {
        fontSize: 16,
        color: '#e74c3c',
    },
});

export default HomeScreen;
