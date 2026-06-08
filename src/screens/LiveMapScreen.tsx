import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock pin data
const PINS = [
  { id: '1', top: '30%', left: '40%', status: 'ACTIVE', color: '#22C55E', icon: 'truck', vehicleId: 'VH-001', driver: 'Rahman', battery: 82, speed: 42, todayKm: 67 },
  { id: '2', top: '32%', left: '42%', status: 'ACTIVE', color: '#22C55E', icon: 'truck', vehicleId: 'VH-002', driver: 'Ahmed', battery: 75, speed: 38, todayKm: 80 },
  { id: '3', top: '28%', left: '45%', status: 'ACTIVE', color: '#22C55E', icon: 'truck', vehicleId: 'VH-003', driver: 'Kamal', battery: 60, speed: 45, todayKm: 110 },
  { id: '4', top: '50%', left: '55%', status: 'CHARGING', color: '#3B82F6', icon: 'ev-station', vehicleId: 'VH-004', driver: 'Jalal', battery: 24, speed: 0, todayKm: 40 },
  { id: '5', top: '65%', left: '30%', status: 'IDLE', color: '#9CA3AF', icon: 'pause', vehicleId: 'VH-005', driver: null, battery: 45, speed: 0, todayKm: 12 },
  { id: '6', top: '20%', left: '70%', status: 'OFFLINE', color: '#EF4444', icon: 'wifi-off', vehicleId: 'VH-006', driver: 'Hasan', battery: 10, speed: 0, todayKm: 0 },
];

export default function LiveMapScreen({ route, navigation }: any) {
  const isAdmin = route.params?.isAdmin || false;
  const adminName = route.params?.adminName || '';
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const selectedPin = PINS.find(p => p.id === selectedPinId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerLeft, { flex: 1, marginRight: 12 }]}>
          {isAdmin && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons name="lightning-bolt" size={24} color="#FF6600" />
          <Text style={[styles.headerTitle, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">LIVE FLEET MONITOR</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
          {isAdmin && (
            <Text style={{ color: '#888888', fontSize: 12, fontWeight: '700', marginRight: 16, letterSpacing: 0.5 }} numberOfLines={1}>
              {adminName}
            </Text>
          )}
          <TouchableOpacity style={styles.searchButton}>
            <MaterialCommunityIcons name="magnify" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Map View */}
      <View style={styles.mapContainer}>
        <ImageBackground 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAua9KWg8fAUCRYG906P90NvFjtAdemW_MPqrW_HJIAFuEqhVYiImXFKy25lfX-YL3FqYlkHkrdyX4I7EqdyebWuaqnU6MGtXh5e5MYMbc6BsS-jzIWCF7KFOm3vG0pAw4jJukzan6sYIIfHEiB7ir8BqAOzn705UxFCmog7N3W3WOSdJdK4rfapF7CpVlAAQEc8hz3iRLayfL9QcOluCz-TYzDN1h0g2IRFvMX8TwfwhxyWeezjBNdTCAtGFFr1RqV59b3wBOc7I_T' }}
          style={styles.mapImage}
          resizeMode="cover"
        >
          {/* Zoom Controls Overlay */}
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomButton}>
              <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.zoomButton, { borderTopWidth: 0 }]}>
              <MaterialCommunityIcons name="minus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.zoomButton, { marginTop: 8 }]}>
              <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Vehicle Pins */}
          {PINS.map(pin => {
            const isSelected = selectedPinId === pin.id;
            const size = isSelected ? 40 : 32;
            const bgColor = isSelected ? '#FF6600' : pin.color;
            const iconColor = (isSelected || pin.status === 'ACTIVE') ? '#000000' : '#FFFFFF';

            return (
              <TouchableOpacity
                key={pin.id}
                style={[
                  styles.pin,
                  { top: pin.top as any, left: pin.left as any },
                  { width: size, height: size, backgroundColor: bgColor, borderRadius: size / 2 },
                  isSelected && styles.pinSelected
                ]}
                activeOpacity={0.9}
                onPress={() => setSelectedPinId(isSelected ? null : pin.id)}
              >
                <MaterialCommunityIcons name={pin.icon as any} size={size * 0.5} color={iconColor} />
              </TouchableOpacity>
            );
          })}

          {/* Floating Pill - Always visible unless a pin is selected and covering it, but we'll put it above the bottom nav */}
          {!selectedPinId && (
            <View style={styles.floatingPillContainer}>
              <View style={styles.floatingPill}>
                <View style={styles.pillActiveSection}>
                  <View style={styles.pulseDot} />
                  <Text style={styles.pillActiveText}>11 Active Now</Text>
                </View>
                <View style={styles.pillDivider} />
                <View style={styles.pillStatsSection}>
                  <View style={styles.pillStat}>
                    <MaterialCommunityIcons name="trending-up" size={16} color="#888888" />
                    <Text style={[styles.pillStatNumber, { color: '#888888' }]}>6</Text>
                  </View>
                  <View style={styles.pillStat}>
                    <MaterialCommunityIcons name="lightning-bolt" size={16} color="#3B82F6" />
                    <Text style={[styles.pillStatNumber, { color: '#3B82F6' }]}>2</Text>
                  </View>
                  <View style={styles.pillStat}>
                    <MaterialCommunityIcons name="pause" size={16} color="#9CA3AF" />
                    <Text style={[styles.pillStatNumber, { color: '#9CA3AF' }]}>2</Text>
                  </View>
                  <View style={styles.pillStat}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#EF4444" />
                    <Text style={[styles.pillStatNumber, { color: '#EF4444' }]}>1</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Mini Detail Card */}
          {selectedPin && (
            <View style={styles.miniCardContainer}>
              <View style={styles.miniCard}>
                <View style={styles.miniCardTop}>
                  <View style={styles.miniCardInfo}>
                    <Text style={styles.miniCardTitle}>{selectedPin?.vehicleId} · {selectedPin?.driver || 'Unassigned'}</Text>
                    <View style={styles.miniCardMetaRow}>
                      <View style={styles.miniCardStatusBadge}>
                        <View style={[styles.statusDot, { backgroundColor: selectedPin?.color }]} />
                        <Text style={[styles.miniCardStatusText, { color: selectedPin?.color }]}>{selectedPin?.status}</Text>
                      </View>
                      <Text style={styles.miniCardMetaDot}>•</Text>
                      <Text style={styles.miniCardMetaText}>{selectedPin?.battery}% 🔋</Text>
                      <Text style={styles.miniCardMetaDot}>•</Text>
                      <Text style={styles.miniCardMetaText}>{selectedPin?.todayKm} km today</Text>
                    </View>
                  </View>
                  <View style={styles.speedBox}>
                    <MaterialCommunityIcons name="speedometer" size={20} color="#FF6600" />
                    <Text style={styles.speedText}>{selectedPin?.speed} km/h</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('VehicleDetail', { id: selectedPin?.vehicleId })}
                >
                  <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
      </View>

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Fleet', { isAdmin, adminName })}>
          <MaterialCommunityIcons name="truck-outline" size={24} color="#888888" />
          <Text style={styles.navText}>FLEET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialCommunityIcons name="map" size={24} color="#FF6600" />
          <Text style={[styles.navText, styles.navTextActive]}>LIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('People', { isAdmin, adminName })}>
          <MaterialCommunityIcons name="account-group-outline" size={24} color="#888888" />
          <Text style={styles.navText}>PEOPLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings', { isAdmin, adminName })}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333333',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  zoomControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  zoomButton: {
    width: 40,
    height: 40,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
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
    zIndex: 20,
  },
  pinSelected: {
    borderColor: '#FFFFFF',
    zIndex: 30,
    shadowColor: '#FF6600',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  floatingPillContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  floatingPill: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  pillActiveSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  pillActiveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pillDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#333333',
    marginHorizontal: 12,
  },
  pillStatsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pillStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillStatNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginLeft: 4,
  },
  miniCardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 40,
  },
  miniCard: {
    backgroundColor: '#141414',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF6600',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  miniCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  miniCardInfo: {
    flex: 1,
  },
  miniCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  miniCardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniCardStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  miniCardStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  miniCardMetaDot: {
    color: '#888888',
    marginHorizontal: 6,
    fontSize: 12,
  },
  miniCardMetaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  speedBox: {
    backgroundColor: '#080808',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  speedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginTop: 4,
  },
  viewDetailsButton: {
    backgroundColor: '#FF6600',
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginRight: 8,
  },
  bottomNav: {
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
});
