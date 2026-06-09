import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Switch, Platform, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen({ route, navigation }: any) {
  const isAdmin = route.params?.isAdmin || false;
  const adminName = route.params?.adminName || '';
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isSupportModalVisible, setSupportModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f111a" />
      <LinearGradient
        colors={['#0f111a', '#080808']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
          {isAdmin && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <Text style={[styles.headerTitle, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">Settings</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
          {isAdmin && (
            <Text style={{ color: '#888888', fontSize: 12, fontWeight: '700', marginRight: 16, letterSpacing: 0.5 }} numberOfLines={1}>
              {adminName}
            </Text>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Section */}
        <View style={styles.card}>
          <View style={styles.profileContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MG</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileTitle}>Mirpur Garage</Text>
              <Text style={styles.profileSubtitle}>Owner: Abdul Karim</Text>
              <Text style={styles.profilePhone}>+8801XXXXXXXXX</Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.listRow} activeOpacity={0.8} onPress={() => setPasswordModalVisible(true)}>
            <Text style={styles.listRowText}>Change Password</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#888888" />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.listRow} activeOpacity={0.8} onPress={() => setSupportModalVisible(true)}>
            <Text style={styles.listRowText}>Help & Support</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#888888" />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <View style={[styles.listRow, { paddingVertical: 12 }]}>
            <Text style={styles.listRowText}>Notifications</Text>
            <Switch
              trackColor={{ false: '#362620', true: '#FF6600' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#362620"
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={[styles.card, styles.dangerCard]}>
          <TouchableOpacity style={styles.logoutRow} activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
            <MaterialCommunityIcons name="logout" size={24} color="#FFB4AB" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>ZEROOZEN v1.0</Text>
          <View style={styles.footerDash} />
        </View>

      </ScrollView>


      {/* Sliding Drawer Menu */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.drawerOverlay}>
          <View style={styles.drawerContent}>
            <View style={styles.drawerHeader}>
              <MaterialCommunityIcons name="lightning-bolt" size={32} color="#FF6600" />
              <Text style={styles.drawerLogoText}>ZEROOZEN</Text>
            </View>

            <View style={styles.drawerDivider} />

            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { setMenuVisible(false); navigation.navigate('Fleet'); }}
            >
              <MaterialCommunityIcons name="truck-outline" size={24} color="#888888" style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Fleet Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { setMenuVisible(false); navigation.navigate('LiveMap'); }}
            >
              <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#888888" style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Live Map</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { setMenuVisible(false); navigation.navigate('People'); }}
            >
              <MaterialCommunityIcons name="account-group-outline" size={24} color="#888888" style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>People / Drivers</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { setMenuVisible(false); navigation.navigate('Revenue'); }}
            >
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#888888" style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Revenue Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => { setMenuVisible(false); navigation.navigate('AdminGarageGrid'); }}
            >
              <MaterialCommunityIcons name="grid" size={24} color="#888888" style={styles.drawerItemIcon} />
              <Text style={styles.drawerItemText}>Switch Garage</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <View style={styles.drawerDivider} />

            <TouchableOpacity 
              style={[styles.drawerItem, { marginBottom: 24 }]} 
              onPress={() => { setMenuVisible(false); navigation.navigate('Login'); }}
            >
              <MaterialCommunityIcons name="logout" size={24} color="#FFB4AB" style={styles.drawerItemIcon} />
              <Text style={[styles.drawerItemText, { color: '#FFB4AB' }]}>Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={() => setMenuVisible(false)} 
          />
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        visible={isPasswordModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setPasswordModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>
              
              <View style={styles.modalInputGroup}>
                <Text style={styles.modalInputLabel}>OLD PASSWORD</Text>
                <TextInput
                  style={styles.modalInput}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  placeholderTextColor="#444444"
                />
              </View>

              <View style={styles.modalInputGroup}>
                <Text style={styles.modalInputLabel}>NEW PASSWORD</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  placeholderTextColor="#444444"
                />
              </View>

              <View style={styles.modalInputGroup}>
                <Text style={styles.modalInputLabel}>CONFIRM NEW PASSWORD</Text>
                <TextInput
                  style={styles.modalInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  placeholderTextColor="#444444"
                />
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity 
                  style={styles.modalCancelButton} 
                  onPress={() => setPasswordModalVisible(false)}
                >
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalConfirmButton} 
                  onPress={() => {
                    setPasswordModalVisible(false);
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                >
                  <Text style={styles.modalConfirmButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        visible={isSupportModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSupportModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setSupportModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Help & Support</Text>
              <Text style={styles.supportBodyText}>
                For any system issues, billing inquiries, or ZenBox hardware diagnostics, please contact the ZEROOZEN central support team:
              </Text>
              
              <View style={styles.supportInfoItem}>
                <MaterialCommunityIcons name="phone" size={20} color="#FF6600" />
                <Text style={styles.supportInfoText}>+880 9612 000 000</Text>
              </View>

              <View style={styles.supportInfoItem}>
                <MaterialCommunityIcons name="email" size={20} color="#FF6600" />
                <Text style={styles.supportInfoText}>support@zeroozen.com</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCancelButton, { width: '100%', marginTop: 8 }]} 
                onPress={() => setSupportModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080808', // fallback
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    backgroundColor: 'rgba(20, 20, 20, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 102, 0, 0.1)',
    paddingHorizontal: 16,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    color: '#FFb596', // text-primary from HTML
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // For bottom nav
  },
  card: {
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#561d00', // on-primary-container
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 1,
  },
  profileTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileSubtitle: {
    color: '#e3bfb1',
    fontSize: 14,
  },
  profilePhone: {
    color: '#e3bfb1',
    fontSize: 14,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  listRowText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dangerCard: {
    marginTop: 8,
    borderColor: 'rgba(147, 0, 10, 0.3)', // error-container/30
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logoutText: {
    color: '#FFB4AB', // text-error
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  versionText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    opacity: 0.5,
  },
  footerDash: {
    width: 32,
    height: 2,
    backgroundColor: '#333333',
    borderRadius: 1,
    marginTop: 8,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
  },
  drawerContent: {
    width: '75%',
    height: '100%',
    backgroundColor: '#141414',
    borderRightWidth: 1,
    borderRightColor: '#1E1E1E',
    paddingTop: Platform.OS === 'android' ? 48 : 64,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  drawerLogoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginLeft: 12,
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#1E1E1E',
    marginVertical: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  drawerItemIcon: {
    marginRight: 16,
  },
  drawerItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    padding: 24,
    width: '100%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInputGroup: {
    marginBottom: 16,
  },
  modalInputLabel: {
    color: '#888888',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  modalCancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalCancelButtonText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
  },
  modalConfirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#FF6600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  supportBodyText: {
    color: '#888888',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  supportInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  supportInfoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
});
