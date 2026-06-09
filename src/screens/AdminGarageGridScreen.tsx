import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useGarageContext, GARAGES } from '../context/GarageContext';

export default function AdminGarageGridScreen({ navigation }: any) {
  const { allVehicles, setCurrentGarageId } = useGarageContext();

  const garagesWithStats = GARAGES.map(g => {
    const garageVehicles = allVehicles.filter(v => v.garageId === g.id);
    return {
      ...g,
      total: garageVehicles.length,
      active: garageVehicles.filter(v => v.status === 'ACTIVE').length
    };
  });

  const renderGarageCard = ({ item }: { item: typeof garagesWithStats[0] }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => {
        setCurrentGarageId(item.id);
        navigation.navigate('MainTabs', { isAdmin: true, adminName: 'ZEROOZEN Admin' });
      }}
    >
      <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.cardTotal}>{item.total} vehicles total</Text>
      <View style={styles.activeContainer}>
        <View style={styles.statusDot} />
        <Text style={styles.cardActive}>{item.active} active</Text>
      </View>
      <MaterialCommunityIcons 
        name="chevron-right" 
        size={20} 
        color="#FF6600" 
        style={styles.chevron} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0b02" />
      <LinearGradient
        colors={['#1a0b02', '#080808']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Top App Bar */}
      <View style={styles.topAppBar}>
        <View style={[styles.topAppBarLeft, { flex: 1, marginRight: 12 }]}>
          <MaterialCommunityIcons name="lightning-bolt" size={24} color="#FF6600" />
          <Text style={[styles.topAppBarTitle, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">ZEROOZEN ADMIN</Text>
        </View>
        <View style={{ flexShrink: 0 }}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>All Garages</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Garage Grid */}
        <FlatList
          data={garagesWithStats}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={renderGarageCard}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View style={styles.atmosphericImageContainer}>
              <View style={styles.atmosphericOverlay} />
              <View style={styles.atmosphericTextContainer}>
                <Text style={styles.networkStatusLabel}>Network Status</Text>
                <Text style={styles.networkStatusValue}>Grid Load: Nominal</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080808', // Fallback
  },
  topAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.4)', // transparent for gradient
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 102, 0, 0.1)', // subtle brand colored border
  },
  topAppBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topAppBarTitle: {
    color: '#FF6600',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  iconButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleUnderline: {
    width: 32,
    height: 4,
    backgroundColor: '#FF6600',
    marginTop: 8,
    borderRadius: 2,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'rgba(20, 20, 20, 0.6)', // Glassmorphism-ish
    borderWidth: 1,
    borderColor: 'rgba(255, 102, 0, 0.15)', // brand hint
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6600',
    flex: 1,
    marginHorizontal: 4,
    position: 'relative',
    minHeight: 110,
    shadowColor: '#FF6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    paddingRight: 20, // space for chevron
  },
  cardTotal: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 8,
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#22C55E',
    borderRadius: 2,
    marginRight: 6,
  },
  cardActive: {
    color: '#22C55E',
    fontSize: 13,
    fontWeight: 'bold',
  },
  chevron: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10, // Center vertically
  },
  atmosphericImageContainer: {
    marginTop: 24,
    height: 160,
    backgroundColor: '#141414',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    overflow: 'hidden',
    position: 'relative',
  },
  atmosphericOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 8, 8, 0.6)', // Simulating the dark atmospheric gradient
  },
  atmosphericTextContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  networkStatusLabel: {
    color: '#FF6600',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  networkStatusValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
