import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useGarageContext, Driver } from '../context/GarageContext';

export default function PeopleScreen({ route, navigation }: any) {
  const isAdmin = route.params?.isAdmin || false;
  const adminName = route.params?.adminName || '';
  const { drivers, vehicles } = useGarageContext();
  const [searchText, setSearchText] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const getAssignedVehicleText = (item: Driver) => {
    if (!item.assignedVehicleId) return 'No vehicle';
    const v = vehicles.find(v => v.id === item.assignedVehicleId);
    return v ? `${v.id} · ${v.model}` : 'Unknown vehicle';
  };

  const activeDriversCount = drivers.filter(d => d.status === 'ASSIGNED').length;
  const unassignedCount = drivers.filter(d => d.status === 'UNASSIGNED').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f111a" />
      <LinearGradient
        colors={['#0f111a', '#080808']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={[styles.headerLeft, { flex: 1, marginRight: 12 }]}>
          {isAdmin && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons name="account-group" size={24} color="#FF6600" />
          <Text style={[styles.headerTitle, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">People</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
          {isAdmin && (
            <Text style={{ color: '#888888', fontSize: 12, fontWeight: '700', marginRight: 16, letterSpacing: 0.5 }} numberOfLines={1}>
              {adminName}
            </Text>
          )}
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AddDriver')}>
            <Text style={styles.addButton}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
 
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#888888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search drivers..."
            placeholderTextColor="#888888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Driver List */}
        <View style={styles.listContainer}>
          {filteredDrivers.map((item, index) => {
            const isUnassigned = item.status === 'UNASSIGNED';
            return (
              <React.Fragment key={item.id}>
                {index > 0 && <View style={styles.divider} />}
                <TouchableOpacity 
                  style={[styles.row, isUnassigned && styles.rowUnassigned]} 
                  activeOpacity={0.8} 
                  onPress={() => navigation.navigate('DriverDetail', { driver: item })}
                >
                  <View style={styles.rowLeft}>
                    {item.image ? (
                      <Image source={{ uri: item.image }} style={styles.avatarImage} />
                    ) : item.avatar ? (
                      <View style={[styles.avatar, { backgroundColor: '#FF6600' }]}>
                        <Text style={styles.avatarText}>{item.avatar}</Text>
                      </View>
                    ) : (
                      <View style={styles.avatarGeneric}>
                        <MaterialCommunityIcons name="account" size={24} color="#888888" />
                      </View>
                    )}
                    <View>
                      <Text style={styles.driverName}>{item.name}</Text>
                      <Text style={[styles.driverInfo, isUnassigned && { fontStyle: 'italic' }]}>{getAssignedVehicleText(item)}</Text>
                    </View>
                  </View>
                  {isUnassigned ? (
                    <View style={styles.unassignedBadge}>
                      <View style={[styles.statusDot, { backgroundColor: '#FF6600' }]} />
                      <Text style={styles.unassignedText}>UNASSIGNED</Text>
                    </View>
                  ) : (
                    <View style={styles.assignedBadge}>
                      <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
                      <Text style={styles.assignedText}>ASSIGNED</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.bentoGrid}>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>ACTIVE DRIVERS</Text>
            <Text style={styles.bentoNumberOrange}>{activeDriversCount < 10 ? `0${activeDriversCount}` : activeDriversCount}</Text>
          </View>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>UNASSIGNED DRIVERS</Text>
            <Text style={styles.bentoNumberWhite}>{unassignedCount < 10 ? `0${unassignedCount}` : unassignedCount}</Text>
          </View>
        </View>

      </ScrollView>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    backgroundColor: 'rgba(20, 20, 20, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 102, 0, 0.1)',
    paddingHorizontal: 16,
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
  addButton: {
    color: '#FF6600',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // For bottom nav
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  listContainer: {
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'transparent',
  },
  rowUnassigned: {
    backgroundColor: 'rgba(255,102,0,0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6600',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#080808',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  avatarGeneric: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  driverInfo: {
    color: '#888888',
    fontSize: 14,
    marginTop: 2,
  },
  assignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  unassignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,102,0,0.1)',
    borderWidth: 1,
    borderColor: '#FF6600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  assignedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  unassignedText: {
    color: '#FF6600',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  bentoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  bentoCard: {
    flex: 1,
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  bentoLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  bentoNumberOrange: {
    color: '#FF6600',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  bentoNumberWhite: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});
