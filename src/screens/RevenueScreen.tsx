import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RevenueScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>REVENUE · MAY 2026</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.monthButton}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#FF6600" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.monthButton}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#FF6600" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.sectionLabel}>TOTAL THIS MONTH</Text>
              <Text style={styles.totalAmount}>৳ 4,57,800</Text>
            </View>
            <MaterialCommunityIcons name="cash-multiple" size={32} color="#FF6600" />
          </View>
          
          <View style={styles.summaryBottom}>
            <View style={styles.summaryBottomBox}>
              <Text style={styles.sectionLabel}>PAID</Text>
              <Text style={styles.paidAmount}>৳ 3,00,000</Text>
            </View>
            <View style={styles.summaryBottomBox}>
              <Text style={styles.sectionLabel}>PENDING</Text>
              <Text style={styles.pendingAmount}>৳ 1,57,800</Text>
            </View>
          </View>
        </View>

        {/* Section A: Your Digital Vehicles */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>YOUR DIGITAL VEHICLES (15)</Text>
              <Text style={styles.cardSubtitle}>KMs Run: 4,200 km</Text>
            </View>
            <MaterialCommunityIcons name="antenna" size={24} color="#FF6600" />
          </View>
          <View style={styles.cardBody}>
            <View>
              <Text style={styles.sectionLabel}>Earnings</Text>
              <Text style={styles.earningsAmount}>৳ 37,800</Text>
            </View>
            <Text style={styles.cutText}>90% cut applied</Text>
          </View>
        </View>

        {/* Section B: ZEROOZEN Digital */}
        <View style={[styles.card, styles.cardDimmed]}>
          <View style={styles.cardHeaderSmall}>
            <Text style={styles.cardTitleDimmed}>ZEROOZEN DIGITAL (0)</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.cardTitleDimmed}>৳ 0</Text>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Hosting Fee</Text>
          </View>
        </View>

        {/* Section C: Cash Vehicles */}
        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Text style={styles.cardTitle}>CASH VEHICLES (35)</Text>
            <View style={styles.errorBadge}>
              <MaterialCommunityIcons name="alert-outline" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.errorBadgeText}>8 DAYS MISSED</Text>
            </View>
          </View>
          <View style={[styles.cardBody, styles.cardBodyBordered]}>
            <View>
              <Text style={styles.sectionLabel}>Manually Logged</Text>
              <Text style={styles.earningsAmountWhite}>৳ 4,20,000</Text>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="square-edit-outline" size={24} color="#888888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity List */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="filter-variant" size={20} color="#888888" />
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {/* VH-001 */}
            <TouchableOpacity style={styles.activityRow} activeOpacity={0.8}>
              <View style={styles.activityRowLeft}>
                <View style={styles.activityIconBox}>
                  <MaterialCommunityIcons name="truck-outline" size={16} color="#FF6600" />
                </View>
                <View>
                  <Text style={styles.activityVehicle}>VH-001</Text>
                  <Text style={styles.activityDriver}>Rahman • Digital</Text>
                </View>
              </View>
              <Text style={styles.activityAmount}>৳ 12,000</Text>
            </TouchableOpacity>

            {/* VH-018 */}
            <TouchableOpacity style={styles.activityRow} activeOpacity={0.8}>
              <View style={styles.activityRowLeft}>
                <View style={styles.activityIconBox}>
                  <MaterialCommunityIcons name="truck-outline" size={16} color="#888888" />
                </View>
                <View>
                  <Text style={styles.activityVehicle}>VH-018</Text>
                  <Text style={styles.activityDriver}>Jamal • Cash</Text>
                </View>
              </View>
              <Text style={styles.activityAmount}>৳ 15,500</Text>
            </TouchableOpacity>

            {/* VH-005 */}
            <TouchableOpacity style={[styles.activityRow, { borderBottomWidth: 0 }]} activeOpacity={0.8}>
              <View style={styles.activityRowLeft}>
                <View style={styles.activityIconBox}>
                  <MaterialCommunityIcons name="truck-outline" size={16} color="#FF6600" />
                </View>
                <View>
                  <Text style={styles.activityVehicle}>VH-005</Text>
                  <Text style={styles.activityDriver}>Karim • Digital</Text>
                </View>
              </View>
              <Text style={styles.activityAmount}>৳ 10,300</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.8}>
            <Text style={styles.viewAllText}>VIEW ALL VEHICLES</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Fleet')}>
          <MaterialCommunityIcons name="truck-outline" size={24} color="#888888" />
          <Text style={styles.navText}>FLEET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="#888888" />
          <Text style={styles.navText}>ENERGY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <MaterialCommunityIcons name="cash-multiple" size={24} color="#FFFFFF" />
          <Text style={[styles.navText, styles.navTextActive]}>REVENUE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="chart-box-outline" size={24} color="#888888" />
          <Text style={styles.navText}>REPORTS</Text>
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
    justifyContent: 'space-between',
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
  backButton: {
    padding: 8,
    marginRight: 4,
    marginLeft: -8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
  },
  monthButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Space for bottom nav
  },
  summaryCard: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6600',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  summaryBottom: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
    paddingTop: 16,
  },
  summaryBottomBox: {
    flex: 1,
  },
  paidAmount: {
    color: '#22C55E',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  pendingAmount: {
    color: '#FF6600',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  card: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardDimmed: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardTitleDimmed: {
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#888888',
    fontSize: 12,
  },
  cardBody: {
    backgroundColor: '#080808',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBodyBordered: {
    borderLeftWidth: 2,
    borderLeftColor: '#FF6600',
  },
  earningsAmount: {
    color: '#FF6600',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  earningsAmountWhite: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  cutText: {
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  badgeContainer: {
    backgroundColor: '#080808',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#888888',
    fontSize: 10,
    fontWeight: 'bold',
  },
  errorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#93000a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  errorBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  activitySection: {
    marginTop: 8,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityList: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 8,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  activityRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconBox: {
    width: 32,
    height: 32,
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityVehicle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityDriver: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  activityAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
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
    backgroundColor: '#FF6600',
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  navText: {
    color: '#888888',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: '#FFFFFF',
  },
});
