import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

const ContactSupportScreen = () => {
  const handleSubmit = () => {
    Alert.alert("Contact Support", "Your message has been sent!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        multiline
      />
      <Button title="Send Message" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  messageInput: {
    height: 100,
  },
});

export default ContactSupportScreen;
