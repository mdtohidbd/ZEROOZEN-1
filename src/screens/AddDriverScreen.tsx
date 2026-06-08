import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddDriverScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [vehicle, setVehicle] = useState('Leave Unassigned');
  
  const [isVehicleModalVisible, setVehicleModalVisible] = useState(false);
  const vehicles = ['Leave Unassigned', 'EV-PRIME-01 (Heavy Duty)', 'EV-CARGO-04 (Mid-Range)', 'EV-LOGISTIC-09 (Express)'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADD DRIVER</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Onboarding Module Box */}
          <View style={styles.onboardingBox}>
            <Text style={styles.onboardingTitle}>ONBOARDING MODULE</Text>
            <Text style={styles.onboardingText}>
              Register a new operator to the fleet management system.
            </Text>
          </View>

          <View style={styles.formGroup}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="e.g. Abdullah Al-Mamun"
                placeholderTextColor="#5a4136"
                autoCapitalize="words"
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.phonePrefix}>
                  <Text style={styles.phonePrefixText}>+880</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="1XXX XXXXXX"
                  placeholderTextColor="#5a4136"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* NID Number */}
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>NID NUMBER</Text>
                <Text style={styles.labelHint}>13 digits required</Text>
              </View>
              <TextInput
                style={styles.input}
                value={nid}
                onChangeText={setNid}
                placeholder="19XXXXXXXXXXX"
                placeholderTextColor="#5a4136"
                keyboardType="numeric"
              />
              <Text style={styles.helperText}>Enter the unique identifier from the national identity card.</Text>
            </View>

            {/* Assign Vehicle */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ASSIGN VEHICLE</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                activeOpacity={0.8}
                onPress={() => setVehicleModalVisible(true)}
              >
                <Text style={[styles.dropdownText, vehicle === 'Leave Unassigned' && { color: '#FFFFFF' }]}>{vehicle}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#5a4136" />
              </TouchableOpacity>
            </View>

            {/* Identity Verification (Photo Upload) */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>IDENTITY VERIFICATION</Text>
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
                <MaterialCommunityIcons name="camera-outline" size={32} color="#aa8a7d" style={{ marginBottom: 8 }} />
                <Text style={styles.uploadText}>UPLOAD DRIVER PORTRAIT</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Action */}
      <View style={styles.bottomActionContainer}>
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>ADD DRIVER</Text>
        </TouchableOpacity>
      </View>

      {/* Vehicle Selection Modal */}
      <Modal visible={isVehicleModalVisible} transparent={true} animationType="fade" onRequestClose={() => setVehicleModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setVehicleModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign Vehicle</Text>
            {vehicles.map((v, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setVehicle(v);
                  setVehicleModalVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, vehicle === v && { color: '#FF6600', fontWeight: 'bold' }]}>{v}</Text>
                {vehicle === v && <MaterialCommunityIcons name="check" size={20} color="#FF6600" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080808',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#080808',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120, // Space for bottom button
  },
  onboardingBox: {
    borderLeftWidth: 2,
    borderLeftColor: '#FF6600',
    paddingLeft: 16,
    marginBottom: 24,
    paddingVertical: 4,
  },
  onboardingTitle: {
    color: '#c7c6c6',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  onboardingText: {
    color: '#e3bfb1',
    fontSize: 14,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  label: {
    color: '#c7c6c6',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  labelHint: {
    color: '#888888',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  input: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    height: 52,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  phonePrefix: {
    backgroundColor: '#261812',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#1E1E1E',
  },
  phonePrefixText: {
    color: '#FF6600',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: 'bold',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    letterSpacing: 2,
  },
  helperText: {
    color: '#888888',
    fontSize: 12,
    marginTop: 8,
    lineHeight: 18,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    height: 52,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  uploadBox: {
    backgroundColor: '#141414',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#1E1E1E',
    borderRadius: 4,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#aa8a7d',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomActionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#080808',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
  },
  submitButton: {
    backgroundColor: '#FF6600',
    height: 56,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#141414',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  modalTitle: {
    color: '#888888',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 8,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  modalOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
