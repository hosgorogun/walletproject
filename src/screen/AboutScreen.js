import React from 'react';
import { Text, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';

function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Number One Wallet</Text>
            <Text style={styles.infoText}>
                Welcome to Number One Wallet! This app provides a secure way to manage your finances.
            </Text>
            <Text style={styles.infoText}>
                <Text style={styles.bold}>Project Name:</Text> Number One Wallet
            </Text>
            <Text style={styles.infoText}>
                <Text style={styles.bold}>Developer:</Text> Ogün Hoşgör
            </Text>
            <Text style={styles.infoText}>
                <Text style={styles.bold}>Email:</Text>{' '}
                <TouchableOpacity onPress={() => Linking.openURL('mailto:hosgorogun@gmail.com')}>
                    <Text style={styles.link}>hosgorogun@gmail.com</Text>
                </TouchableOpacity>
            </Text>
            <Text style={styles.infoText}>
                <Text style={styles.bold}>Phone:</Text> 05370185193
            </Text>
            <View style={styles.contactContainer}>
                <Text style={styles.contactText}>For any inquiries or support, please contact us via email or phone.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f7',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    link: {
        color: '#3498db',
        textDecorationLine: 'underline',
    },
    contactContainer: {
        marginTop: 20,
    },
    contactText: {
        fontSize: 16,
        color: '#555',
    },
});

export default AboutScreen;
