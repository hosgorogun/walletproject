import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { BalanceContext } from './BalanceContext';

function ProfileScreen({ navigation }) {
    const { currentUser, updateUser, balance } = useContext(BalanceContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editableUser, setEditableUser] = useState({});

    useEffect(() => {
        if (currentUser) {
           
            setEditableUser({ ...currentUser, balance });
        }
    }, [currentUser, balance]);

    const handleSave = async () => {
        try {
            await updateUser(editableUser); 
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!currentUser) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    style={styles.profileImage}
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user.png' }}
                />
                <Text style={styles.title}>Profile</Text>
            </View>

            {isEditing ? (
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={editableUser.firstName}
                        onChangeText={(text) => setEditableUser({ ...editableUser, firstName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={editableUser.lastName}
                        onChangeText={(text) => setEditableUser({ ...editableUser, lastName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={editableUser.email}
                        onChangeText={(text) => setEditableUser({ ...editableUser, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={editableUser.phone}
                        onChangeText={(text) => setEditableUser({ ...editableUser, phone: text })}
                    />
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Cancel" onPress={() => setIsEditing(false)} />
                </View>
            ) : (
                <View style={styles.details}>
                    <Text style={styles.info}>First Name: {editableUser.firstName || 'N/A'}</Text>
                    <Text style={styles.info}>Last Name: {editableUser.lastName || 'N/A'}</Text>
                    <Text style={styles.info}>Email: {editableUser.email || 'N/A'}</Text>
                    <Text style={styles.info}>Phone Number: {editableUser.phone || 'N/A'}</Text>
                    <Text style={styles.info}>Card Number: {editableUser.cardNumber || 'N/A'}</Text>
                    <Text style={styles.info}>Papara Number: {editableUser.paparaNumber || 'N/A'}</Text>
                    <Text style={styles.info}>
                        Balance: ₺{(editableUser.balance !== undefined ? editableUser.balance.toFixed(2) : 0)}
                    </Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.footerButtonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Help')}>
                    <Text style={styles.footerButtonText}>Help</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    details: {
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
    editButton: {
        marginTop: 20,
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    footerButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
