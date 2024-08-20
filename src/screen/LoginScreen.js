import React, { useContext, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BalanceContext } from './BalanceContext';
import BannerComponent from './adsKit';
import HMSAccount, {
  HMSAccountAuthService,
  HMSAuthRequestOptionConstants,
  HMSAuthScopeListConstants,
  HMSAuthParamConstants
} from '@hmscore/react-native-hms-account';

function LoginScreen({ navigation }) {
    const { loginUser } = useContext(BalanceContext);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        const { email, password } = userInfo;

        try {
            const usersData = await AsyncStorage.getItem('users');
            if (usersData !== null) {
                const users = JSON.parse(usersData);
                const user = users.find(user => user.email === email);

                if (user && user.password === password) {  
                    loginUser(user); 
                    console.log('Giriş Başarılı:', user);
                    navigation.navigate('Home');
                } else {
                    console.log('Kullanıcı Bulunamadı veya Şifre Hatalı');
                    Alert.alert('Giriş Hatası', 'E-posta veya şifre hatalı.');
                }
            } else {
                console.log('Hiç kullanıcı kaydedilmemiş');
                Alert.alert('Giriş Hatası', 'Hiç kullanıcı kaydedilmemiş.');
            }
        } catch (error) {
            console.error('Giriş Yapılamadı:', error);
            Alert.alert('Giriş Hatası', 'Giriş yapılamadı. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const handleNavigateToRegister = () => {
        navigation.navigate('Register');
    };

    const handleHuaweiLogin = () => {
        const signInData = {
            accountAuthParams: HMSAuthParamConstants.DEFAULT_AUTH_REQUEST_PARAM,
            authRequestOption: [
                HMSAuthRequestOptionConstants.ID_TOKEN,
                HMSAuthRequestOptionConstants.ACCESS_TOKEN
            ],
            authScopeList: [HMSAuthScopeListConstants.EMAIL]
        };

        HMSAccountAuthService.signIn(signInData)
            .then((response) => {
                console.log('Huawei Sign In Successful:', response);
               
                const user = {
                    email: response.email, 
                    
                };
                loginUser(user);
                navigation.navigate('Home'); 
            })
            .catch((err) => {
                console.error('HUAWEI Sign-In Error:', err);
                Alert.alert('Giriş Hatası', 'HUAWEI hesabıyla giriş yapılamadı. Lütfen tekrar deneyin.');
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./Morgan.png')} />
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>Continue by signing in</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#a9a9a9"
                        onChangeText={text => setUserInfo({ ...userInfo, email: text })}
                        value={userInfo.email}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#a9a9a9"
                        onChangeText={text => setUserInfo({ ...userInfo, password: text })}
                        value={userInfo.password}
                    />
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNavigateToRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHuaweiLogin} style={styles.accountButton}>
                    <Text style={styles.accountButtonText}>Login with Huawei Account</Text>
                </TouchableOpacity>
                <View style={styles.bannerContainer}>
                    <BannerComponent />
                </View>
                <BannerComponent />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666', 
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#3498db', // Ana renk
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerButton: {
        marginBottom: 10,
    },
    registerButtonText: {
        color: '#3498db', 
        fontSize: 16,
    },
    accountButton: {
        marginTop: 10,
    },
    accountButtonText: {
        color: '#3498db', 
        fontSize: 16,
    },
    bannerContainer: {
        height: 100,
        padding: 50,
    },
});

export default LoginScreen;
