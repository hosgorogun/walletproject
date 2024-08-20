import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.text}>
          {/* Add your terms of use content here */}
          Welcome to our app. By using this app, you agree to the following terms and conditions:
          {"\n\n"}
          1. **Acceptance of Terms**: By accessing and using the app, you accept and agree to be bound by these terms.
          {"\n\n"}
          2. **Modifications**: We reserve the right to modify these terms at any time. Any changes will be effective when we post them.
          {"\n\n"}
          3. **User Responsibilities**: You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          {"\n\n"}
          4. **Termination**: We may terminate or suspend your access to the app at our sole discretion.
          {"\n\n"}
          5. **Limitation of Liability**: Our liability is limited to the maximum extent permitted by law.
          {"\n\n"}
          6. **Governing Law**: These terms are governed by the laws of [Your Country].
          {"\n\n"}
          For more detailed information, please contact us at [Your Contact Information].
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default TermsScreen;
