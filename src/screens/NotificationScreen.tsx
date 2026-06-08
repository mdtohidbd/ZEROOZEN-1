import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Low Battery Alert',
    message: 'Vehicle VH-002 is at 24% battery. Suggest returning to base.',
    time: '10 mins ago',
    type: 'warning',
    isRead: false,
  },
  {
    id: '2',
    title: 'Payment Received',
    message: '৳670 received for VH-001 digital trip completion.',
    time: '1 hour ago',
    type: 'success',
    isRead: false,
  },
  {
    id: '3',
    title: 'Vehicle Offline',
    message: 'Connection lost with VH-031 for over 30 minutes.',
    time: '2 hours ago',
    type: 'error',
    isRead: true,
  },
  {
    id: '4',
    title: 'Maintenance Due',
    message: 'VH-022 requires scheduled maintenance check tomorrow.',
    time: '1 day ago',
    type: 'info',
    isRead: true,
  },
  {
    id: '5',
    title: 'System Update',
    message: 'ZEROOZEN V1.2 update completed successfully.',
    time: '2 days ago',
    type: 'system',
    isRead: true,
  }
];

const getIconData = (type: string) => {
  switch (type) {
    case 'warning': return { name: 'alert-circle-outline', color: '#F59E0B' };
    case 'success': return { name: 'check-circle-outline', color: '#22C55E' };
    case 'error': return { name: 'close-circle-outline', color: '#EF4444' };
    case 'system': return { name: 'cog-outline', color: '#888888' };
    case 'info':
    default: return { name: 'information-outline', color: '#3B82F6' };
  }
};

export default function NotificationScreen({ navigation }: any) {
  
  const renderNotificationCard = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => {
    const iconData = getIconData(item.type);
    
    return (
      <TouchableOpacity style={[styles.card, !item.isRead && styles.unreadCard]} activeOpacity={0.8}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={iconData.name as any} size={28} color={iconData.color} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, !item.isRead && styles.unreadText]}>{item.title}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
        {!item.isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <MaterialCommunityIcons name="check-all" size={24} color="#FF6600" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        renderItem={renderNotificationCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  markAllButton: {
    padding: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    alignItems: 'flex-start',
  },
  unreadCard: {
    borderColor: '#FF660040',
    backgroundColor: '#FF660010',
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timeText: {
    color: '#888888',
    fontSize: 12,
  },
  messageText: {
    color: '#888888',
    fontSize: 14,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6600',
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
