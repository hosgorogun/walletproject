import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BannerComponent from './adsKit';
import SettingsComponent from './SettingsComponent'; 

const { width } = Dimensions.get('window');

const CardComponent = ({ 
  title = "Bank Card", 
  expiryDate = "12/25",
  onPressSettings
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [flipped, setFlipped] = useState(false);
  const [showSettings, setShowSettings] = useState(false); 

  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        const users = usersData ? JSON.parse(usersData) : [];
        const currentUser = users[users.length - 2];
        if (currentUser) {
          setCardNumber(currentUser.cardNumber);
          setCardHolder(`${currentUser.firstName} ${currentUser.lastName}`);
        }
      } catch (error) {
        console.error('Failed to fetch card information:', error);
      }
    };

    fetchCardInfo();
  }, []);

  const flipCard = () => {
    const toValue = flipped ? 0 : 1;
    Animated.timing(flipAnim, {
      toValue,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  const rotateYFront = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotateYBack = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const handleActivate = () => {
    Alert.alert("Card Activated", "Your card has been activated successfully.");
  };

  const handleDeactivate = () => {
    Alert.alert("Card Deactivated", "Your card has been deactivated successfully.");
  };

  const handleSettingsPress = () => {
    setShowSettings(true); 
  };

  const handleBackToCard = () => {
    setShowSettings(false); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {showSettings ? (
        <SettingsComponent onPressBack={handleBackToCard} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Card Information</Text>
          </View>
          <TouchableOpacity onPress={flipCard}>
            <View style={styles.cardContainer}>
              <Animated.View style={[styles.card, { transform: [{ rotateY: rotateYFront }] }]}>
                <View style={[styles.cardFace, styles.frontFace]}>
                  <Text style={styles.cardTitle}>{title}</Text>
                  <Text style={styles.cardNumber}>{cardNumber}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.expiryDate}>Expiry Date: {expiryDate}</Text>
                    <Text style={styles.cardHolder}>{cardHolder}</Text>
                  </View>
                </View>
              </Animated.View>

              <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: rotateYBack }] }]}>
                <View style={styles.cardFace}>
                  <Text style={styles.cardBackDetails}>Card Number: {cardNumber}</Text>
                  <Text style={styles.cardBackDetails}>CVV: ***</Text>
                  <Text style={styles.bankName}>Bank Name</Text>
                </View>
              </Animated.View>
            </View>
          </TouchableOpacity>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleActivate}>
              <Text style={styles.actionText}>Activate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDeactivate}>
              <Text style={styles.actionText}>Deactivate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSettingsPress}>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerContainer}>
            <BannerComponent />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  header: {
    padding: 20,
    backgroundColor: '#3498db', 
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: width * 0.9,
    height: 200,
    perspective: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 15,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardFace: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  frontFace: {
    backgroundColor: '#3498db', 
  },
  cardBack: {
    backgroundColor: '#0073e6', 
    transform: [{ rotateY: '180deg' }],
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cardNumber: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  expiryDate: {
    fontSize: 14,
    color: '#fff',
  },
  cardHolder: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  cardBackDetails: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  bankName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  actionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white', 
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#3498db', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white', 
  },
});

export default CardComponent;
