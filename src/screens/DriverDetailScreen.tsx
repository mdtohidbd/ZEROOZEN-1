import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DriverDetailScreen({ navigation, route }: any) {
  const defaultDriver = {
    name: 'Rahman',
    phone: '+880 1711-223344',
    nid: '1234567890123',
    assignedVehicle: 'VH-001 · ZenGo Alfa',
    image: null,
    status: 'ASSIGNED'
  };
  const initialDriver = route.params?.driver || defaultDriver;
  const [localDriver, setLocalDriver] = useState(initialDriver);

  const [isReassignModalVisible, setReassignModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const availableVehicles = [
    'VH-002 · ZenGo Alfa',
    'VH-005 · Kargo Alfa',
    'VH-009 · Kargo Alfa MAX',
    'VH-012 · ZenGo Alfa'
  ];

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleUnassign = () => {
    setLocalDriver((prev: any) => ({
      ...prev,
      assignedVehicle: 'No vehicle',
      status: 'UNASSIGNED'
    }));
    triggerToast('Vehicle unassigned successfully', 'success');
  };

  const handleReassign = (selectedVehicle: string) => {
    setLocalDriver((prev: any) => ({
      ...prev,
      assignedVehicle: selectedVehicle,
      status: 'ASSIGNED'
    }));
    setReassignModalVisible(false);
    triggerToast(`Vehicle ${selectedVehicle.split(' ')[0]} assigned successfully`, 'success');
  };

  const handleRemoveConfirm = () => {
    setRemoveModalVisible(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Detail</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarBox}>
            {localDriver.image ? (
              <Image source={{ uri: localDriver.image }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{localDriver.name.charAt(0)}</Text>
            )}
          </View>
          <Text style={styles.profileName}>{localDriver.name}</Text>
          <Text style={styles.profileRole}>DRIVER</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>PHONE</Text>
            <Text style={styles.infoValue}>{localDriver.phone}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NID</Text>
            <Text style={styles.infoValue}>{localDriver.nid}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.infoRowTouchable}
            activeOpacity={0.8}
            onPress={() => {
              if (localDriver.assignedVehicle !== 'No vehicle') {
                const vId = localDriver.assignedVehicle.split(' ')[0];
                navigation.navigate('VehicleDetail', { id: vId });
              }
            }}
          >
            <View>
              <Text style={styles.infoLabel}>ASSIGNED VEHICLE</Text>
              <Text style={styles.infoValue}>{localDriver.assignedVehicle}</Text>
            </View>
            {localDriver.assignedVehicle !== 'No vehicle' && (
              <MaterialCommunityIcons name="chevron-right" size={24} color="#FF6600" />
            )}
          </TouchableOpacity>
        </View>

        {/* Actions Section */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.8}
            onPress={() => setReassignModalVisible(true)}
          >
            <Text style={styles.actionButtonTextOrange}>Reassign Vehicle</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#FF6600" />
          </TouchableOpacity>
          
          {localDriver.assignedVehicle !== 'No vehicle' && (
            <TouchableOpacity 
              style={styles.actionButton} 
              activeOpacity={0.8}
              onPress={handleUnassign}
            >
              <Text style={styles.actionButtonTextNeutral}>Unassign Vehicle</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#E3BFB1" />
            </TouchableOpacity>
          )}
        </View>

        {/* Destructive Zone */}
        <View style={styles.destructiveZone}>
          <TouchableOpacity 
            style={styles.destructiveButton} 
            activeOpacity={0.8}
            onPress={() => setRemoveModalVisible(true)}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#FFB4AB" />
            <Text style={styles.destructiveButtonText}>Remove Driver</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Toast Notification */}
      {toast.visible && (
        <View style={styles.toastContainer}>
          <View style={[
            styles.toastCard,
            toast.type === 'success' ? styles.toastSuccess : styles.toastError
          ]}>
            <MaterialCommunityIcons 
              name={toast.type === 'success' ? 'check-circle' : 'alert-circle'} 
              size={20} 
              color={toast.type === 'success' ? '#22C55E' : '#EF4444'} 
            />
            <Text style={styles.toastText}>{toast.message}</Text>
            <TouchableOpacity onPress={() => setToast(prev => ({ ...prev, visible: false }))}>
              <MaterialCommunityIcons name="close" size={16} color="#888888" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Reassign Vehicle Modal */}
      <Modal
        visible={isReassignModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReassignModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setReassignModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign Vehicle</Text>
            {availableVehicles.map((v, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.modalOption}
                onPress={() => handleReassign(v)}
              >
                <Text style={[
                  styles.modalOptionText, 
                  localDriver.assignedVehicle === v && { color: '#FF6600', fontWeight: 'bold' }
                ]}>{v}</Text>
                {localDriver.assignedVehicle === v && <MaterialCommunityIcons name="check" size={20} color="#FF6600" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Remove Confirmation Sheet Modal */}
      <Modal
        visible={isRemoveModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRemoveModalVisible(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetContent}>
              <MaterialCommunityIcons name="alert" size={48} color="#EF4444" style={styles.warningIcon} />
              <Text style={styles.sheetTitle}>Remove Operator</Text>
              <Text style={styles.sheetBody}>
                Are you sure you want to remove {'\n'}
                <Text style={styles.sheetBodyBold}>{localDriver.name}</Text> from the active operator roster?{'\n'}
                This action cannot be undone.
              </Text>
              <View style={styles.sheetSpacer} />
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setRemoveModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.confirmButton} 
                  onPress={handleRemoveConfirm}
                >
                  <Text style={styles.confirmButtonText}>Yes, Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Fleet')}>
          <MaterialCommunityIcons name="truck-outline" size={24} color="#888888" />
          <Text style={styles.navText}>FLEET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LiveMap')}>
          <MaterialCommunityIcons name="map-outline" size={24} color="#888888" />
          <Text style={styles.navText}>LIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => navigation.navigate('People')}>
          <MaterialCommunityIcons name="account-group" size={24} color="#FF6600" />
          <Text style={[styles.navText, styles.navTextActive]}>PEOPLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#888888" />
          <Text style={styles.navText}>SETTINGS</Text>
        </TouchableOpacity>
      </View>

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
    height: 56,
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
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 80, // For bottom nav
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  avatarBox: {
    width: 80,
    height: 80,
    backgroundColor: '#FF6600',
    borderRadius: 16, // Rounded square from screenshot
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  avatarText: {
    color: '#080808',
    fontSize: 32,
    fontWeight: '900',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoCard: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 24,
  },
  infoRow: {
    padding: 16,
  },
  infoRowTouchable: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: '#1E1E1E',
  },
  actionsSection: {
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
  },
  actionButtonTextOrange: {
    color: '#FF6600',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonTextNeutral: {
    color: '#E3BFB1',
    fontSize: 16,
    fontWeight: '600',
  },
  destructiveZone: {
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
    paddingTop: 24,
  },
  destructiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  destructiveButtonText: {
    color: '#FFB4AB',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
    height: 64,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#FF6600',
    marginTop: -2,
  },
  navText: {
    color: '#888888',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: '#FF6600',
  },
  toastContainer: {
    position: 'absolute',
    top: 76,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  toastSuccess: {
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  toastError: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  toastText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 12,
    marginRight: 8,
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
  modalOverlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    height: '55%',
    backgroundColor: '#1C1C1C',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#444444',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
  },
  warningIcon: {
    marginBottom: 16,
  },
  sheetTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sheetBody: {
    color: '#888888',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  sheetBodyBold: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sheetSpacer: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#FF6600',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#CC2222',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
