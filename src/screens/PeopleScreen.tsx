import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MOCK_DRIVERS = [
  { id: '1', name: 'Rahman', phone: '+880 1711-223344', nid: '1234567890123', assignedVehicle: 'VH-001 · ZenGo Alfa', avatar: 'R', image: null, status: 'ASSIGNED' },
  { id: '2', name: 'Karim', phone: '+880 1712-345678', nid: '1234567890124', assignedVehicle: 'VH-003 · Kargo Alfa', avatar: null, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Afnx3bCijJVZeqK7ljp7tWCnHNxowHSewSy_e5SOCNpqCMlDGnmS8KVSIYLtwMe9VOGYmk5Gm2UI3lbzWtGu6B8M_Ey3CmWHWHOBjIaL9jMIpYTUIpC7oyHCkNgzVA5xtEUEiC9zEFoI7HctUWdIg_qZKdYlffFB8T1zvpjSJCnYU3cLwk_YJLuba7rE_e4-H91ouNxDAxBSU0MxktKSi17vUXY9buNtBNqUWQxn0LkY6q-eAfA5VudbT4LB-0z0yG9mitfRfZ0k', status: 'ASSIGNED' },
  { id: '3', name: 'Hossain', phone: '+880 1713-456789', nid: '1234567890125', assignedVehicle: 'No vehicle', avatar: null, image: null, status: 'UNASSIGNED' },
  { id: '4', name: 'Jamal', phone: '+880 1714-567890', nid: '1234567890126', assignedVehicle: 'VH-007 · ZenGo Alfa', avatar: null, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJxGrssOZ_Eh94UdN-DEG-qEy9J-uSW-Eep47910nXF_cbWQY7JOi_TV-97_g0We_E3O41VQXGnr0txCpKg_4_CEsRXjnzOnfSFmaxFHcmm7Mr-T8vtlV3RrfjTuUtxG0_bi0WVKRqD0CkKPGOqKdqJPwqYapzoDp1Bgso85tyX1cLDo4mdUVbR1_NADthoQLiwZ3eIiHO3Qs1we58YqrS2FeeFJvtVfzdgYvH7Wmc-yVRviu-1cG-oenj7OzLYBOmZLQwOZcCCG6t', status: 'ASSIGNED' }
];

export default function PeopleScreen({ route, navigation }: any) {
  const isAdmin = route.params?.isAdmin || false;
  const adminName = route.params?.adminName || '';
  const [searchText, setSearchText] = useState('');

  const filteredDrivers = MOCK_DRIVERS.filter(driver =>
    driver.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
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
                      <Text style={[styles.driverInfo, isUnassigned && { fontStyle: 'italic' }]}>{item.assignedVehicle}</Text>
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

        {/* Secondary Info Cards (Bento Style) */}
        <View style={styles.bentoGrid}>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>ACTIVE DRIVERS</Text>
            <Text style={styles.bentoNumberOrange}>08</Text>
          </View>
          <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>PENDING INVITES</Text>
            <Text style={styles.bentoNumberWhite}>02</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Fleet', { isAdmin, adminName })}>
          <MaterialCommunityIcons name="truck-outline" size={24} color="#888888" />
          <Text style={styles.navText}>FLEET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LiveMap', { isAdmin, adminName })}>
          <MaterialCommunityIcons name="map-outline" size={24} color="#888888" />
          <Text style={styles.navText}>LIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialCommunityIcons name="account-group" size={24} color="#FF6600" />
          <Text style={[styles.navText, styles.navTextActive]}>PEOPLE</Text>
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
    height: 64,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
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
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
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
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#141414',
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
    backgroundColor: '#1E1E1E',
  },
  bentoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  bentoCard: {
    flex: 1,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
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
});
