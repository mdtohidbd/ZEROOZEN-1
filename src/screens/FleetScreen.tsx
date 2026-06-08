import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock Data
const MOCK_VEHICLES = [
  {
    id: 'VH-001',
    model: 'ZenGo Alfa',
    driver: 'Rahman',
    status: 'ACTIVE',
    paymentType: 'DIGITAL',
    battery: 82,
    revenue: 670,
    dailyRent: null,
    paymentStatus: null,
  },
  {
    id: 'VH-002',
    model: 'ZenGo Alfa',
    driver: 'Ahmed',
    status: 'CHARGING',
    paymentType: 'DIGITAL',
    battery: 24,
    revenue: 350,
    dailyRent: null,
    paymentStatus: null,
  },
  {
    id: 'VH-022',
    model: 'Kargo Alfa',
    driver: 'Karim',
    status: 'ACTIVE',
    paymentType: 'CASH',
    battery: 45,
    revenue: null,
    dailyRent: 400,
    paymentStatus: 'UNPAID',
  },
  {
    id: 'VH-031',
    model: 'Kargo Alfa',
    driver: null, // Unassigned
    status: 'IDLE',
    paymentType: 'CASH',
    battery: 12,
    revenue: null,
    dailyRent: 400,
    paymentStatus: 'PAID',
  }
];

const FILTERS = ['ALL', 'ACTIVE', 'CHARGING', 'IDLE', 'OFFLINE', 'PENDING'];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#22C55E',
  CHARGING: '#3B82F6',
  IDLE: '#9CA3AF',
  OFFLINE: '#EF4444',
  PENDING: '#F59E0B',
};

export default function FleetScreen({ route, navigation }: any) {
  const isAdmin = route.params?.isAdmin || false;
  const adminName = route.params?.adminName || '';
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredVehicles = MOCK_VEHICLES.filter(v => 
    activeFilter === 'ALL' ? true : v.status === activeFilter
  );

  const renderFilterChip = ({ item }: { item: string }) => {
    const isActive = item === activeFilter;
    return (
      <TouchableOpacity
        style={[styles.filterChip, isActive && styles.filterChipActive]}
        onPress={() => setActiveFilter(item)}
        activeOpacity={0.8}
      >
        <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVehicleCard = ({ item }: { item: typeof MOCK_VEHICLES[0] }) => {
    const statusColor = STATUS_COLORS[item.status] || '#9CA3AF';
    
    return (
      <TouchableOpacity 
        style={[styles.card, { borderLeftColor: statusColor }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('VehicleDetail', { id: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.statusBadgeText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardModel}>{item.model}</Text>
          {item.driver ? (
            <Text style={styles.cardDriver}>{item.driver}</Text>
          ) : (
            <View style={styles.unassignedBadge}>
              <Text style={styles.unassignedText}>Unassigned</Text>
            </View>
          )}
        </View>

        <View style={styles.cardFooter}>
          {item.paymentType === 'DIGITAL' ? (
            <View style={styles.footerRow}>
              <View>
                <Text style={styles.revenueAmount}>৳{item.revenue}</Text>
                <Text style={styles.revenueLabel}>TODAY</Text>
              </View>
              <View style={styles.batteryContainer}>
                <MaterialCommunityIcons name="battery-charging-80" size={14} color={statusColor} />
                <Text style={[styles.batteryText, { color: statusColor }]}>{item.battery}%</Text>
              </View>
            </View>
          ) : (
            <View style={styles.footerRow}>
              <View>
                {item.paymentStatus === 'UNPAID' ? (
                  <View style={[styles.paymentBadge, { backgroundColor: '#EF444430' }]}>
                    <Text style={[styles.paymentBadgeText, { color: '#EF4444' }]}>UNPAID</Text>
                  </View>
                ) : (
                  <View style={[styles.paymentBadge, { backgroundColor: '#22C55E30' }]}>
                    <Text style={[styles.paymentBadgeText, { color: '#22C55E' }]}>PAID</Text>
                  </View>
                )}
                <Text style={styles.rentText}>৳{item.dailyRent}/day</Text>
              </View>
              {!item.driver && (
                <MaterialCommunityIcons name="account-off-outline" size={16} color="#888888" />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={[styles.headerLeft, { flex: 1, marginRight: 12 }]}>
          {isAdmin && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons name="map-marker" size={24} color="#FF6600" />
          <Text style={[styles.headerTitle, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">MIRPUR GARAGE</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
          {isAdmin && (
            <Text style={{ color: '#888888', fontSize: 12, fontWeight: '700', marginRight: 16, letterSpacing: 0.5 }}>
              {adminName}
            </Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsLabel}>FLEET OVERVIEW</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsNumber}>50</Text>
          <Text style={styles.statsText}>VEHICLES</Text>
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          renderItem={renderFilterChip}
          keyExtractor={item => item}
          contentContainerStyle={styles.filtersListContent}
        />
      </View>

      {/* Vehicle List */}
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicleCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.cardRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AddVehicle')}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialCommunityIcons name="truck" size={24} color="#FF6600" />
          <Text style={[styles.navText, styles.navTextActive]}>FLEET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LiveMap', { isAdmin, adminName })}>
          <MaterialCommunityIcons name="map-outline" size={24} color="#888888" />
          <Text style={styles.navText}>LIVE</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
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
  statsContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  statsLabel: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statsNumber: {
    color: '#FF6600',
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statsText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersListContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    height: 34,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  filterChipActive: {
    backgroundColor: '#FF6600',
    borderColor: '#FF6600',
  },
  filterChipText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // padding for FAB and bottom nav
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 12,
    marginHorizontal: 4,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
  },
  cardModel: {
    color: '#888888',
    fontSize: 13,
  },
  cardDriver: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 2,
  },
  unassignedBadge: {
    backgroundColor: '#1E1E1E',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  unassignedText: {
    color: '#888888',
    fontSize: 12,
  },
  cardFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  revenueAmount: {
    color: '#FF6600',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  revenueLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginLeft: 2,
  },
  paymentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  paymentBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  rentText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'monospace',
  },
  fab: {
    position: 'absolute',
    bottom: 80, // Above bottom nav
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
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
