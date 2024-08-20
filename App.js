import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen'; 
import RegisterScreen from "./src/screen/RegisterScreen";
import HomeScreen from './src/screen/HomeScreen';
import WithdrawScreen from './src/screen/WithdrawScreen';
import DepositScreen from './src/screen/DepositScreen';
import { BalanceProvider } from './src/screen/BalanceContext';
import  SendMoneyScreen  from './src/screen/SendMoneyScreen';
import StartupScreen from './src//screen/StartupScreen';
import UsersListScreen from './src/screen/UsersListScreen';
import QRScreen from './src/screen/QRScreen';
import Accountt from './src/screen/Account';
import Card from "./src/screen/Card";
import Payments from './src/screen/payments';
import StockDataScreen from "./src/screen/StockDataScreen";
import SettingsScreen from "./src/screen/SettingsScreen";
import HelpScreen from "./src/screen/HelpScreen";
import Terms  from "./src/screen/Terms";
import ContactSupport from "./src/screen/ContactSupport";
import Faq  from "./src/screen/Faq";
import ChangePasswordScreen from "./src/screen/ChangePasswordScreen";
import AboutScreen from "./src/screen/AboutScreen";
import ProfileScreen from "./src/screen/ProfileScreen";



const Stack = createNativeStackNavigator()
function App() {
    return (
        <BalanceProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Startup">
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown : false}} />
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown : false}} />
                <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{headerShown : false}} />
                <Stack.Screen name="Deposit" component={DepositScreen} options={{headerShown : false}} />
                <Stack.Screen name="SendMoney" component={SendMoneyScreen} options={{headerShown : false}} />
                <Stack.Screen name="Startup" component={StartupScreen} options={{headerShown : false}} />
                <Stack.Screen name="UsersList" component={UsersListScreen}options={{headerShown : false}} />
                 <Stack.Screen name="QR" component={QRScreen}options={{headerShown : false}} />
                 <Stack.Screen name="Account" component={Accountt}options={{headerShown : false}} />
                 <Stack.Screen name="Card" component={Card}options={{headerShown : false}} />
                 <Stack.Screen name="Payments" component={Payments}options={{headerShown : false}} />
                 <Stack.Screen name="StockData" component={StockDataScreen}options={{headerShown : false}} />
                 <Stack.Screen name="Settings" component={SettingsScreen}options={{headerShown : false}} />
                 <Stack.Screen name="Help" component={HelpScreen}options={{headerShown : false}} />
                 <Stack.Screen name="Terms" component={Terms}options={{headerShown : false}} />
                 <Stack.Screen name="FAQ" component={Faq}options={{headerShown : false}} />
                 <Stack.Screen name="ContactSupport" component={ContactSupport}options={{headerShown : false}} />
                 <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}options={{headerShown : false}} />
                 <Stack.Screen name="Profile" component={ProfileScreen}options={{headerShown : false}} />
                 <Stack.Screen name="About" component={AboutScreen}options={{headerShown : false}} />
                 
            </Stack.Navigator>
       </NavigationContainer>
       </BalanceProvider>

       
        
    );
    
}

export default App;                     