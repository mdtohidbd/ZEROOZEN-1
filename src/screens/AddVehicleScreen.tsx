import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddVehicleScreen({ navigation }: any) {
  const [vehicleId, setVehicleId] = useState('');
  const [model, setModel] = useState('ZenGo Alfa');
  const [zenBoxSerial, setZenBoxSerial] = useState('');
  const [paymentType, setPaymentType] = useState('DIGITAL');
  const [dailyRent, setDailyRent] = useState('');
  const [ownerType, setOwnerType] = useState('GARAGE OWNER');

  const [isModelModalVisible, setModelModalVisible] = useState(false);
  const models = ['ZenGo Alfa', 'Kargo Alfa', 'Kargo Alfa MAX'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADD VEHICLE</Text>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.formGroup}>
            {/* Vehicle ID */}
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <View style={styles.labelSquare} />
                <Text style={styles.label}>VEHICLE ID</Text>
              </View>
              <TextInput
                style={styles.input}
                value={vehicleId}
                onChangeText={setVehicleId}
                placeholder="e.g. VH-051"
                placeholderTextColor="#5a4136" // From outline-variant
                autoCapitalize="characters"
              />
            </View>

            {/* Model Dropdown */}
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <View style={styles.labelSquare} />
                <Text style={styles.label}>MODEL</Text>
              </View>
              <TouchableOpacity 
                style={styles.dropdownButton}
                activeOpacity={0.8}
                onPress={() => setModelModalVisible(true)}
              >
                <Text style={styles.dropdownText}>{model}</Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#aa8a7d" />
              </TouchableOpacity>
            </View>

            {/* ZenBox Serial */}
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <View style={styles.labelSquare} />
                <Text style={styles.label}>ZENBOX SERIAL</Text>
              </View>
              <TextInput
                style={styles.input}
                value={zenBoxSerial}
                onChangeText={setZenBoxSerial}
                placeholder="e.g. ZBX-00301"
                placeholderTextColor="#5a4136"
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            {/* Payment Type */}
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabelMain}>PAYMENT TYPE</Text>
                <Text style={styles.toggleLabelSub}>SETTLEMENT PROTOCOL</Text>
              </View>
              <View style={styles.segmentControl}>
                <TouchableOpacity 
                  style={[styles.segmentButton, paymentType === 'DIGITAL' && styles.segmentButtonActive]}
                  onPress={() => setPaymentType('DIGITAL')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.segmentButtonText, paymentType === 'DIGITAL' && styles.segmentButtonTextActive]}>DIGITAL</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.segmentButton, paymentType === 'CASH' && styles.segmentButtonActive]}
                  onPress={() => setPaymentType('CASH')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.segmentButtonText, paymentType === 'CASH' && styles.segmentButtonTextActive]}>CASH</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Daily Rent (Visible only if CASH) */}
            {paymentType === 'CASH' && (
              <View style={[styles.inputContainer, { marginTop: 16 }]}>
                <View style={styles.labelRow}>
                  <View style={styles.labelSquare} />
                  <Text style={styles.label}>DAILY RENT (৳)</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={dailyRent}
                  onChangeText={setDailyRent}
                  placeholder="e.g. 400"
                  placeholderTextColor="#5a4136"
                  keyboardType="numeric"
                />
              </View>
            )}

            {/* Owner Type */}
            <View style={[styles.toggleRow, { marginTop: 24 }]}>
              <View>
                <Text style={styles.toggleLabelMain}>OWNER TYPE</Text>
                <Text style={styles.toggleLabelSub}>ASSET MANAGEMENT</Text>
              </View>
              <View style={styles.segmentControl}>
                <TouchableOpacity 
                  style={[styles.segmentButton, ownerType === 'GARAGE OWNER' && styles.segmentButtonActiveAlt]}
                  onPress={() => setOwnerType('GARAGE OWNER')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.segmentButtonText, ownerType === 'GARAGE OWNER' && styles.segmentButtonTextActiveAlt]}>GARAGE OWNER</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.segmentButton, ownerType === 'ZEROOZEN' && styles.segmentButtonActiveAlt]}
                  onPress={() => setOwnerType('ZEROOZEN')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.segmentButtonText, ownerType === 'ZEROOZEN' && styles.segmentButtonTextActiveAlt]}>ZEROOZEN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Actions */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
              <Text style={styles.submitButtonText}>ADD VEHICLE</Text>
            </TouchableOpacity>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="information-outline" size={16} color="#888888" style={{ marginTop: 2 }} />
              <Text style={styles.infoText}>
                Vehicle will show as Pending Activation until ZenBox syncs with the central telemetry gateway. This may take up to 300 seconds.
              </Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Model Selection Modal */}
      <Modal visible={isModelModalVisible} transparent={true} animationType="fade" onRequestClose={() => setModelModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModelModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Model</Text>
            {models.map((m, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setModel(m);
                  setModelModalVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, model === m && { color: '#FF6600', fontWeight: 'bold' }]}>{m}</Text>
                {model === m && <MaterialCommunityIcons name="check" size={20} color="#FF6600" />}
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
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  formGroup: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelSquare: {
    width: 6,
    height: 6,
    backgroundColor: '#FF6600',
    marginRight: 8,
  },
  label: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    height: 52,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    height: 52,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E1E1E',
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabelMain: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  toggleLabelSub: {
    color: '#5a4136',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginTop: 4,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    padding: 4,
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#FF6600',
  },
  segmentButtonActiveAlt: {
    backgroundColor: '#42312a', // surface-variant
    borderWidth: 1,
    borderColor: 'rgba(255, 102, 0, 0.3)',
  },
  segmentButtonText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
  },
  segmentButtonTextActive: {
    color: '#000000',
  },
  segmentButtonTextActiveAlt: {
    color: '#FFFFFF',
  },
  actionSection: {
    marginTop: 16,
  },
  submitButton: {
    backgroundColor: '#FF6600',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  infoText: {
    color: '#888888',
    fontSize: 11,
    marginLeft: 12,
    flex: 1,
    lineHeight: 16,
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
