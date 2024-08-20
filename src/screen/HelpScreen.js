import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HelpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
        <Text style={styles.link}>Frequently Asked Questions (FAQ)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ContactSupport')}>
        <Text style={styles.link}>Contact Support</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.link}>Terms Of Use</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: '#007bff',
    marginVertical: 10,
  },
});

export default HelpScreen;
