import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQScreen = () => {
  const faqs = [
    { question: "How do I reset my password?", answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to reset your password." },
    { question: "How can I contact customer support?", answer: "You can contact customer support by going to the 'Contact Support' section in the app or emailing support@example.com." },
    { question: "What is the refund policy?", answer: "Our refund policy allows you to request a refund within 30 days of purchase. Please contact our support team for more details." },
    
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  faqContainer: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: '#666',
  },
});

export default FAQScreen;
