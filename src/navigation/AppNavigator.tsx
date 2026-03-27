import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreen } from '../screens/HomeScreen';
import { BrandDetailScreen } from '../screens/BrandDetailScreen';
import { VehicleDetailScreen } from '../screens/VehicleDetailScreen';
import { PostventaScreen } from '../screens/PostventaScreen';
import { AgendamientoScreen } from '../screens/AgendamientoScreen';
import { TalleresScreen } from '../screens/TalleresScreen';
import { TarifarioScreen } from '../screens/TarifarioScreen';
import { NotificacionesScreen } from '../screens/NotificacionesScreen';
import { UrgenciasScreen } from '../screens/UrgenciasScreen';

import { SRLogo } from '../components/SRLogo';
import Colors from '../theme/colors';

import type { HomeStackParamList, PostventaStackParamList, MainTabParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const PostventaStack = createNativeStackNavigator<PostventaStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.78;

// ─── Drawer Context ──────────────────────────────────────────────────────────
export const DrawerContext = React.createContext<{
  openDrawer: () => void;
  closeDrawer: () => void;
}>({
  openDrawer: () => {},
  closeDrawer: () => {},
});

// ─── Drawer Menu Component ───────────────────────────────────────────────────
interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

const DrawerMenuOverlay: React.FC<DrawerMenuProps> = ({ visible, onClose, onNavigate }) => {
  const insets = useSafeAreaInsets();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -DRAWER_WIDTH, duration: 240, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 0, duration: 240, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, slideAnim, backdropAnim]);

  const handleItemPress = (screen: string) => {
    onClose();
    setTimeout(() => onNavigate(screen), 260);
  };

  const menuItems = [
    { label: 'Inicio', screen: 'Home', iconName: 'home-outline' as const },
    { label: 'Tipo de Cambio', screen: 'Home', iconName: 'swap-horizontal-outline' as const },
    { label: 'Reclamos', screen: 'Home', iconName: 'megaphone-outline' as const },
    { label: 'Urgencias', screen: 'Urgencias', iconName: 'warning-outline' as const },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={drawerStyles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[drawerStyles.backdrop, { opacity: backdropAnim }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            drawerStyles.drawer,
            { width: DRAWER_WIDTH, paddingTop: insets.top, paddingBottom: insets.bottom, transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={drawerStyles.drawerHeader}>
            <SRLogo size={52} color={Colors.white} />
            <Text style={drawerStyles.drawerBrandText}>SANTA ROSA</Text>
          </View>

          {/* Divider */}
          <View style={drawerStyles.divider} />

          {/* Items */}
          <View style={drawerStyles.menuList}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={drawerStyles.menuItem}
                onPress={() => handleItemPress(item.screen)}
                activeOpacity={0.6}
              >
                <View style={drawerStyles.iconWrapper}>
                  <Ionicons name={item.iconName} size={20} color={Colors.primaryBlue} />
                </View>
                <Text style={drawerStyles.menuItemText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={drawerStyles.drawerFooter}>
            <Text style={drawerStyles.footerText}>Versión 2.4.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const drawerStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.55)' },
  drawer: {
    backgroundColor: '#4A5568',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 16,
  },
  drawerHeader: {
    backgroundColor: '#4A5568',
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  drawerBrandText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 20,
  },
  menuList: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EBF0FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuItemText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  drawerFooter: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.separator,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});

// ─── Home Stack ──────────────────────────────────────────────────────────────
const HomeStackNavigator: React.FC = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="BrandDetail" component={BrandDetailScreen} />
    <HomeStack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
  </HomeStack.Navigator>
);

// ─── Postventa Stack ─────────────────────────────────────────────────────────
const PostventaStackNavigator: React.FC = () => (
  <PostventaStack.Navigator screenOptions={{ headerShown: false }}>
    <PostventaStack.Screen name="PostventaMain" component={PostventaScreen} />
    <PostventaStack.Screen name="Agendamiento" component={AgendamientoScreen} />
    <PostventaStack.Screen name="Talleres" component={TalleresScreen} />
    <PostventaStack.Screen name="Tarifario" component={TarifarioScreen} />
  </PostventaStack.Navigator>
);

// ─── Root App Navigator ──────────────────────────────────────────────────────
const AppNavigator: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [urgenciasVisible, setUrgenciasVisible] = useState(false);

  const openDrawer = useCallback(() => setDrawerVisible(true), []);
  const closeDrawer = useCallback(() => setDrawerVisible(false), []);

  const handleDrawerNavigate = useCallback((screen: string) => {
    if (screen === 'Urgencias') {
      setUrgenciasVisible(true);
    }
  }, []);

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: tabStyles.tabBar,
          tabBarActiveTintColor: Colors.primaryBlue,
          tabBarInactiveTintColor: Colors.tabBarInactive,
          tabBarLabelStyle: tabStyles.tabLabel,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PostventaTab"
          component={PostventaStackNavigator}
          options={{
            tabBarLabel: 'Postventa',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="construct-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="NotificacionesTab"
          component={NotificacionesScreen}
          options={{
            tabBarLabel: 'Notificaciones',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      <DrawerMenuOverlay
        visible={drawerVisible}
        onClose={closeDrawer}
        onNavigate={handleDrawerNavigate}
      />

      <Modal visible={urgenciasVisible} animationType="slide" onRequestClose={() => setUrgenciasVisible(false)}>
        <UrgenciasScreen onClose={() => setUrgenciasVisible(false)} />
      </Modal>
    </DrawerContext.Provider>
  );
};

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.tabBarBorder,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default AppNavigator;
