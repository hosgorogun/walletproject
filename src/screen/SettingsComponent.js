import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsComponent = ({ onPressBack }) => {
  const [domestic, setDomestic] = useState(true); 
  const [international, setInternational] = useState(false); 

  const toggleDomestic = () => setDomestic(previousState => !previousState);
  const toggleInternational = () => setInternational(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Domestic Purchases:</Text>
          <Switch
            value={domestic}
            onValueChange={toggleDomestic}
            trackColor={{ true: '#0047ab', false: '#c4c4c4' }}
            thumbColor={domestic ? '#fff' : '#fff'}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>International Purchases:</Text>
          <Switch
            value={international}
            onValueChange={toggleInternational}
            trackColor={{ true: '#0047ab', false: '#c4c4c4' }}
            thumbColor={international ? '#fff' : '#fff'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#0047ab',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingsContainer: {
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsComponent;
