import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const initialize = async () => {
            await loadCurrentUser();
            if (currentUser) {
                await loadBalance();
                await loadTransactions();
            }
        };
        initialize();
    }, [currentUser]);

    const loadBalance = async () => {
        try {
            if (currentUser) {
                const balanceData = await AsyncStorage.getItem(`balance_${currentUser.email}`);
                if (balanceData !== null) {
                    setBalance(parseFloat(balanceData));
                } else {
                    setBalance(0); // Set default balance if not found
                }
            }
        } catch (error) {
            console.error('Error loading balance:', error);
        }
    };

    const updateBalance = async (amount) => {
        try {
            setBalance(prevBalance => {
                const newBalance = prevBalance + amount;
                if (currentUser) {
                    AsyncStorage.setItem(`balance_${currentUser.email}`, newBalance.toString())
                        .catch(error => console.error('Error saving balance:', error));
                }
                return newBalance;
            });
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };

    const loginUser = async (user) => {
        try {
            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
            // Load balance after setting the current user
            await loadBalance();
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    const loadCurrentUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('currentUser');
            if (userData !== null) {
                const user = JSON.parse(userData);
                setCurrentUser(user);
                // Load balance after loading current user
                await loadBalance();
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error('Error loading current user:', error);
        }
    };

    const loadTransactions = async () => {
        try {
            if (currentUser) {
                const transactionsData = await AsyncStorage.getItem(`transactions_${currentUser.email}`);
                if (transactionsData !== null) {
                    setTransactions(JSON.parse(transactionsData));
                } else {
                    setTransactions([]); // Set default empty array if not found
                }
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    };

    const addTransaction = async (transaction) => {
        try {
            setTransactions(prevTransactions => {
                const newTransactions = [...prevTransactions, transaction];
                if (currentUser) {
                    AsyncStorage.setItem(`transactions_${currentUser.email}`, JSON.stringify(newTransactions))
                        .catch(error => console.error('Error saving transactions:', error));
                }
                return newTransactions;
            });
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            setTransactions(prevTransactions => {
                const newTransactions = prevTransactions.filter(transaction => transaction.id !== id);
                if (currentUser) {
                    AsyncStorage.setItem(`transactions_${currentUser.email}`, JSON.stringify(newTransactions))
                        .catch(error => console.error('Error saving transactions:', error));
                }
                return newTransactions;
            });
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            const usersData = await AsyncStorage.getItem('users');
            let users = [];
            if (usersData !== null) {
                users = JSON.parse(usersData);
                const userIndex = users.findIndex(user => user.email === currentUser.email);
                if (userIndex > -1) {
                    users[userIndex] = updatedUser;
                    await AsyncStorage.setItem('users', JSON.stringify(users));
                    await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
                    setCurrentUser(updatedUser);
                }
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const logoutUser = async (navigation) => {
        try {
            // Oturum bilgilerini temizleyin
            await AsyncStorage.removeItem('currentUser');
            
            // State güncellemeleri
            setCurrentUser(null); 
            setBalance(0); // Optional: reset balance if needed for visual consistency
            
            // Kullanıcıyı login ekranına yönlendirin
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out user:', error);
        }
    };

    return (
        <BalanceContext.Provider value={{ balance, updateBalance, loadBalance, loginUser, currentUser, transactions, addTransaction, deleteTransaction, updateUser, logoutUser }}>
            {children}
        </BalanceContext.Provider>
    );
};
