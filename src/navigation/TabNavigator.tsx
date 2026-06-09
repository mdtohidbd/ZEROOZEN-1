import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';

import BottomNav, { TabName } from '../components/BottomNav';
import FleetScreen from '../screens/FleetScreen';
import LiveMapScreen from '../screens/LiveMapScreen';
import PeopleScreen from '../screens/PeopleScreen';
import SettingsScreen from '../screens/SettingsScreen';

const TABS: TabName[] = ['Fleet', 'LiveMap', 'People', 'Settings'];

interface TabNavigatorProps {
  /** Forwarded from the stack navigator */
  navigation: any;
  route: any;
}

/**
 * Custom horizontal-sliding tab navigator.
 * The BottomNav lives OUTSIDE the animated content area so it never moves
 * during tab transitions.
 */
export default function TabNavigator({ navigation, route }: TabNavigatorProps) {
  const isAdmin: boolean = route.params?.isAdmin ?? false;
  const adminName: string = route.params?.adminName ?? '';

  const [activeTab, setActiveTab] = useState<TabName>('Fleet');
  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get('window').width,
  );

  // Tracks which index is displayed
  const activeIndex = TABS.indexOf(activeTab);

  // Animated x-offset for the sliding content strip
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = useCallback(
    (tab: TabName) => {
      if (tab === activeTab) return;
      const toIndex = TABS.indexOf(tab);
      setActiveTab(tab);
      Animated.spring(slideAnim, {
        toValue: -toIndex * containerWidth,
        useNativeDriver: true,
        tension: 60,
        friction: 12,
        // Overshoot damped — feels natural, not bouncy
        restDisplacementThreshold: 0.5,
        restSpeedThreshold: 0.5,
      }).start();
    },
    [activeTab, containerWidth, slideAnim],
  );

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width;
      if (width !== containerWidth) {
        setContainerWidth(width);
        // Snap to current tab immediately when layout changes (e.g. orientation)
        slideAnim.setValue(-activeIndex * width);
      }
    },
    [activeIndex, containerWidth, slideAnim],
  );

  // Shared props passed to each tab screen
  const sharedScreenProps = {
    navigation,
    route: { ...route, params: { isAdmin, adminName } },
  };

  return (
    <View style={styles.root}>
      {/* Sliding content area */}
      <View style={styles.contentArea} onLayout={onLayout}>
        <Animated.View
          style={[
            styles.strip,
            {
              width: containerWidth * TABS.length,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Fleet */}
          <View style={[styles.page, { width: containerWidth }]}>
            <FleetScreen
              navigation={navigation}
              route={{ ...route, params: { isAdmin, adminName } }}
            />
          </View>

          {/* LiveMap */}
          <View style={[styles.page, { width: containerWidth }]}>
            <LiveMapScreen
              navigation={navigation}
              route={{ ...route, params: { isAdmin, adminName } }}
            />
          </View>

          {/* People */}
          <View style={[styles.page, { width: containerWidth }]}>
            <PeopleScreen
              navigation={navigation}
              route={{ ...route, params: { isAdmin, adminName } }}
            />
          </View>

          {/* Settings */}
          <View style={[styles.page, { width: containerWidth }]}>
            <SettingsScreen
              navigation={navigation}
              route={{ ...route, params: { isAdmin, adminName } }}
            />
          </View>
        </Animated.View>
      </View>

      {/* Bottom nav is OUTSIDE the animated strip — it never moves */}
      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#080808',
  },
  contentArea: {
    flex: 1,
    overflow: 'hidden',
  },
  strip: {
    flexDirection: 'row',
    flex: 1,
  },
  page: {
    overflow: 'hidden',
  },
});
