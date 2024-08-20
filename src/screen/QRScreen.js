import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';

function QRScreen({ navigation }) {
    const handleScanQR = () => {
        Alert.alert('QR Kod Okuma', 'QR kod okuma işlevi henüz uygulanmadı.');
    };

    const handleGenerateQR = () => {
        Alert.alert('QR Kod Oluştur', 'QR kod oluşturma işlevi henüz uygulanmadı.');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>QR Transactions</Text>
                
                <Image
                    style={styles.qrImage}
                    source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FakeQRCode' }} 
                />
                
                <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
                    <Text style={styles.buttonText}>Generate QR Code</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={handleScanQR}>
                    <Text style={styles.buttonText}>Read QR Code</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
                    <Image 
                        style={styles.navIcon} 
                        source={{ uri: 'https://via.placeholder.com/20?text=🏠' }} 
                    />
                    <Text style={styles.navButtonText}>Home Page</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 20,
    },
    qrImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db', 
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#3498db', 
        borderRadius: 10,
        marginTop: 20,
    },
    navIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default QRScreen;
