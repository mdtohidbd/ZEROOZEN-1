import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type TabName = 'Fleet' | 'LiveMap' | 'People' | 'Settings';

interface NavItem {
  name: TabName;
  label: string;
  icon: string;
  iconActive: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Fleet', label: 'FLEET', icon: 'truck-outline', iconActive: 'truck' },
  { name: 'LiveMap', label: 'LIVE', icon: 'map-outline', iconActive: 'map' },
  { name: 'People', label: 'PEOPLE', icon: 'account-group-outline', iconActive: 'account-group' },
  { name: 'Settings', label: 'SETTINGS', icon: 'cog-outline', iconActive: 'cog' },
];

interface BottomNavProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

export default function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const activeIndex = NAV_ITEMS.findIndex(item => item.name === activeTab);
  // Animated value tracks the active indicator position (index 0–3)
  const indicatorAnim = useRef(new Animated.Value(activeIndex)).current;
  const { width } = Dimensions.get('window');
  const tabWidth = width / NAV_ITEMS.length;

  useEffect(() => {
    Animated.spring(indicatorAnim, {
      toValue: activeIndex,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      {/* Sliding active indicator bar */}
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: indicatorAnim.interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: [0, tabWidth, tabWidth * 2, tabWidth * 3],
                }),
              },
            ],
            width: tabWidth,
          },
        ]}
      />

      {NAV_ITEMS.map((item) => {
        const isActive = item.name === activeTab;
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => onTabPress(item.name)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={(isActive ? item.iconActive : item.icon) as any}
              size={24}
              color={isActive ? '#FF6600' : '#888888'}
            />
            <Text style={[styles.navText, isActive && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    height: 64,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 2,
    backgroundColor: '#FF6600',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
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
