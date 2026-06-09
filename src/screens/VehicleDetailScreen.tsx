import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Modal, Platform, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGarageContext } from '../context/GarageContext';

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#22C55E',
  CHARGING: '#3B82F6',
  IDLE: '#9CA3AF',
  OFFLINE: '#EF4444',
  PENDING: '#F59E0B',
};

export default function VehicleDetailScreen({ navigation, route }: any) {
  const { vehicles, drivers } = useGarageContext();
  const vehicleId = route?.params?.id || 'VH-001';
  const vehicle = vehicles.find(v => v.id === vehicleId) || vehicles[0];
  const driver = vehicle?.driverId ? drivers.find(d => d.id === vehicle.driverId) : null;
  const statusColor = STATUS_COLORS[vehicle?.status || 'IDLE'] || '#9CA3AF';
  const [engineOn, setEngineOn] = useState(true);
  const [isKillSwitchModalVisible, setKillSwitchModalVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<'enable' | 'disable' | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    visible: false,
    message: '',
    type: 'info'
  });
  const [logs, setLogs] = useState([
    { id: '1', time: '10:45 AM', user: 'Rahman', action: 'ENGINE ON', color: '#FF6600' },
    { id: '2', time: '09:12 AM', user: 'Rahman', action: 'ENGINE OFF', color: '#888888' },
  ]);

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const hoursStr = hours < 10 ? '0' + hours : hours;
    return `${hoursStr}:${minutesStr} ${ampm}`;
  };

  const triggerToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const handleConfirm = () => {
    const timeStr = getFormattedTime();
    if (pendingAction === 'disable') {
      setEngineOn(false);
      setLogs(prev => [
        { id: String(Date.now()), time: timeStr, user: 'Abdul Karim', action: 'ENGINE OFF', color: '#888888' },
        ...prev
      ]);
      triggerToast('Engine disabled successfully', 'error');
    } else if (pendingAction === 'enable') {
      setEngineOn(true);
      setLogs(prev => [
        { id: String(Date.now()), time: timeStr, user: 'Abdul Karim', action: 'ENGINE ON', color: '#FF6600' },
        ...prev
      ]);
      triggerToast('Engine enabled successfully', 'success');
    }
    setKillSwitchModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{vehicle?.id || 'Unknown'}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusBadgeText, { color: statusColor }]}>{vehicle?.status || 'UNKNOWN'}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: vehicle?.paymentType === 'DIGITAL' ? 120 : 32 }]} showsVerticalScrollIndicator={false}>
        
        {/* Driver Section */}
        <View style={styles.driverSection}>
          <Text style={styles.sectionLabel}>DRIVER</Text>
          <Text style={styles.driverName}>{driver ? driver.name : 'Unassigned'}</Text>
          <Text style={styles.driverPhone}>{driver ? driver.phone : '--'}</Text>
        </View>

        {/* Map Section */}
        <View style={styles.mapWrapper}>
          <View style={styles.mapContainer}>
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAua9KWg8fAUCRYG906P90NvFjtAdemW_MPqrW_HJIAFuEqhVYiImXFKy25lfX-YL3FqYlkHkrdyX4I7EqdyebWuaqnU6MGtXh5e5MYMbc6BsS-jzIWCF7KFOm3vG0pAw4jJukzan6sYIIfHEiB7ir8BqAOzn705UxFCmog7N3W3WOSdJdK4rfapF7CpVlAAQEc8hz3iRLayfL9QcOluCz-TYzDN1h0g2IRFvMX8TwfwhxyWeezjBNdTCAtGFFr1RqV59b3wBOc7I_T' }}
              style={styles.mapImage}
              resizeMode="cover"
            >
              {/* Dynamic Vehicle Pin */}
              {vehicle?.location && (
                <View style={[
                  styles.pin,
                  { top: vehicle.location.top as any, left: vehicle.location.left as any },
                  { width: 32, height: 32, backgroundColor: statusColor, borderRadius: 16 }
                ]}>
                  <MaterialCommunityIcons name="truck" size={16} color={statusColor === '#22C55E' ? '#000000' : '#FFFFFF'} />
                </View>
              )}

              <View style={styles.liveGpsBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
                <Text style={styles.liveGpsText}>LIVE GPS</Text>
              </View>
            </ImageBackground>
          </View>
          <Text style={styles.lastSeenText}>Last seen: Just now</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>BATTERY</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>{vehicle?.battery || 0}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${vehicle?.battery || 0}%`, backgroundColor: statusColor }]} />
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TODAY'S KM</Text>
            <Text style={styles.statValue}>{vehicle?.todayKm || 0}</Text>
            <Text style={styles.statSubLabel}>KILOMETERS</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>SPEED</Text>
            <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{vehicle?.speed || 0}</Text>
            <Text style={styles.statSubLabel}>KM/H</Text>
          </View>
        </View>

        {/* Revenue Section */}
        {vehicle?.paymentType === 'DIGITAL' && vehicle?.revenue !== null ? (
          <View style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueLabel}>TODAY'S EARNINGS</Text>
              <MaterialCommunityIcons name="cash-multiple" size={20} color="#888888" />
            </View>
            <Text style={styles.revenueAmount}>৳{vehicle?.revenue || 0}</Text>
            <View style={styles.revenueDivider} />
            <View style={styles.cutRow}>
              <Text style={styles.cutLabel}>Your cut (90%)</Text>
              <Text style={styles.cutAmount}>৳{Math.round((vehicle?.revenue || 0) * 0.9)}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueLabel}>DAILY RENT</Text>
              <MaterialCommunityIcons name="cash" size={20} color="#888888" />
            </View>
            <Text style={styles.revenueAmount}>৳{vehicle?.dailyRent || 0}</Text>
            <View style={styles.revenueDivider} />
            <View style={styles.cutRow}>
              <Text style={styles.cutLabel}>Status</Text>
              <Text style={[styles.cutAmount, { color: vehicle?.paymentStatus === 'PAID' ? '#22C55E' : '#EF4444' }]}>
                {vehicle?.paymentStatus || 'UNPAID'}
              </Text>
            </View>
          </View>
        )}

        {/* Kill Switch Card */}
        <View style={[styles.killSwitchCard, !engineOn && styles.killSwitchCardOff]}>
          <View style={styles.killSwitchLeft}>
            <Text style={styles.killSwitchTitle}>Engine Kill Switch</Text>
            <Text style={styles.killSwitchDesc}>Disabling will stop the vehicle remotely</Text>
          </View>
          <View style={styles.killSwitchRight}>
            {!engineOn && <Text style={styles.killSwitchOffText}>OFF</Text>}
            <TouchableOpacity 
              style={[styles.toggleTrack, engineOn ? styles.toggleTrackOn : styles.toggleTrackOff]}
              activeOpacity={0.8}
              onPress={() => {
                if (engineOn) {
                  setPendingAction('disable');
                  setKillSwitchModalVisible(true);
                } else {
                  setPendingAction('enable');
                  setKillSwitchModalVisible(true);
                }
              }}
            >
              <View style={[styles.toggleThumb, engineOn ? styles.toggleThumbOn : styles.toggleThumbOff]} />
            </TouchableOpacity>
            {engineOn && <Text style={styles.killSwitchOnText}>ON</Text>}
          </View>
        </View>

        {/* Action Log Section */}
        <View style={styles.logSection}>
          <View style={styles.logHeader}>
            <Text style={styles.logHeaderTitle}>ACTION LOG</Text>
          </View>
          
          {logs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <View>
                <Text style={styles.logTime}>{log.time}</Text>
                <Text style={styles.logUser}>{log.user}</Text>
              </View>
              <View style={styles.logAction}>
                <View style={[styles.logDot, { backgroundColor: log.color }]} />
                <Text style={[styles.logActionText, { color: log.color }]}>{log.action}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Sticky Bottom Button */}
      {vehicle?.paymentType === 'DIGITAL' && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.topUpButton}>
            <MaterialCommunityIcons name="wallet-outline" size={20} color="#FF6600" />
            <Text style={styles.topUpButtonText}>TOP UP DRIVER WALLET</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <View style={styles.toastContainer}>
          <View style={[
            styles.toastCard,
            toast.type === 'success' ? styles.toastSuccess : toast.type === 'error' ? styles.toastError : styles.toastInfo
          ]}>
            <MaterialCommunityIcons 
              name={toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'alert-circle' : 'information'} 
              size={20} 
              color={toast.type === 'success' ? '#22C55E' : toast.type === 'error' ? '#EF4444' : '#FF6600'} 
            />
            <Text style={styles.toastText}>{toast.message}</Text>
            <TouchableOpacity onPress={() => setToast(prev => ({ ...prev, visible: false }))}>
              <MaterialCommunityIcons name="close" size={16} color="#888888" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal Overlay */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isKillSwitchModalVisible}
        onRequestClose={() => setKillSwitchModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            
            <View style={styles.sheetContent}>
              <MaterialCommunityIcons 
                name={pendingAction === 'disable' ? "alert" : "check-circle"} 
                size={48} 
                color={pendingAction === 'disable' ? "#FF6600" : "#22C55E"} 
                style={styles.warningIcon} 
              />
              
              <Text style={styles.sheetTitle}>Confirm Action</Text>
              
              <Text style={styles.sheetBody}>
                You are remotely {pendingAction === 'disable' ? 'disabling' : 'enabling'}{'\n'}
                <Text style={styles.sheetBodyBold}>{vehicle?.id}</Text> — {driver ? `${driver.name}'s vehicle.` : 'Unassigned vehicle.'}{'\n'}
                The engine will {pendingAction === 'disable' ? 'stop' : 'start'}.
              </Text>
              
              <View style={styles.sheetSpacer} />
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  activeOpacity={0.8}
                  onPress={() => setKillSwitchModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.confirmButton, 
                    pendingAction === 'enable' && { backgroundColor: '#22C55E' }
                  ]} 
                  activeOpacity={0.8}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>
                    {pendingAction === 'disable' ? 'Yes, Disable' : 'Yes, Enable'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.sheetFooter}>THIS ACTION WILL BE LOGGED</Text>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: '#080808',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },
  statusBadgeText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // For bottom button
  },
  driverSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  driverPhone: {
    color: '#888888',
    fontSize: 14,
    marginTop: 2,
  },
  mapWrapper: {
    marginBottom: 24,
  },
  mapContainer: {
    height: 180,
    backgroundColor: '#141414',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pin: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  liveGpsBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333333',
  },
  liveGpsText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  lastSeenText: {
    color: '#888888',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#141414',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    justifyContent: 'space-between',
    minHeight: 90,
  },
  statLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statValue: {
    color: '#FF6600',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginTop: 8,
  },
  statSubLabel: {
    color: '#888888',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#1E1E1E',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF6600',
  },
  revenueCard: {
    backgroundColor: '#141414',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    marginBottom: 24,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  revenueLabel: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  revenueAmount: {
    color: '#FF6600',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  revenueDivider: {
    height: 1,
    backgroundColor: '#1E1E1E',
    marginVertical: 12,
  },
  cutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cutLabel: {
    color: '#888888',
    fontSize: 14,
  },
  cutAmount: {
    color: '#22C55E', // Green as requested in text prompt
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  killSwitchCard: {
    backgroundColor: '#141414',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  killSwitchCardOff: {
    borderColor: 'rgba(239,68,68,0.4)',
  },
  killSwitchLeft: {
    flex: 1,
    paddingRight: 16,
  },
  killSwitchTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  killSwitchDesc: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  killSwitchRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  killSwitchOnText: {
    color: '#22C55E',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  killSwitchOffText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  toggleTrack: {
    width: 60,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackOn: {
    backgroundColor: '#FF6600',
  },
  toggleTrackOff: {
    backgroundColor: '#333333',
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  toggleThumbOff: {
    alignSelf: 'flex-start',
  },
  logSection: {
    backgroundColor: '#141414',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    overflow: 'hidden',
  },
  logHeader: {
    backgroundColor: '#1E1E1E',
    padding: 12,
  },
  logHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
  },
  logTime: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  logUser: {
    color: '#888888',
    fontSize: 14,
    marginTop: 2,
  },
  logAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  logActionText: {
    color: '#FF6600',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bottomContainer: {
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
  topUpButton: {
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topUpButtonText: {
    color: '#FF6600',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  modalOverlay: {
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
  sheetFooter: {
    color: '#444444',
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: 1,
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
  toastInfo: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6600',
  },
  toastText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 12,
    marginRight: 8,
  },
});
