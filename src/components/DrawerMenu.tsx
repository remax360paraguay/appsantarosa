import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SRLogo } from './SRLogo';
import Colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.78;

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { label: 'Inicio', screen: 'Home', icon: '⊞' },
  { label: 'Tipo de Cambio', screen: 'Home', icon: '💱' },
  { label: 'Reclamos', screen: 'Home', icon: '📢' },
  { label: 'Urgencias', screen: 'Urgencias', icon: '⚠️' },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose, onNavigate }) => {
  const insets = useSafeAreaInsets();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 240,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleItemPress = (screen: string) => {
    onClose();
    setTimeout(() => onNavigate(screen), 260);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]} />
        </TouchableWithoutFeedback>

        {/* Drawer panel */}
        <Animated.View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Header with logo */}
          <View style={styles.drawerHeader}>
            <SRLogo size={52} color={Colors.white} />
            <Text style={styles.drawerBrandText}>SANTA ROSA</Text>
            <Text style={styles.drawerSubText}>Concesionaria Oficial</Text>
          </View>

          <View style={styles.divider} />

          {/* Menu items */}
          <ScrollView
            style={styles.menuList}
            showsVerticalScrollIndicator={false}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleItemPress(item.screen)}
                activeOpacity={0.6}
              >
                <Text style={styles.menuItemIcon}>{item.icon}</Text>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.footerText}>Santa Rosa S.A. © 2026</Text>
            <Text style={styles.footerText}>Asunción, Paraguay</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  drawer: {
    backgroundColor: Colors.drawerBackground,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 16,
  },
  drawerHeader: {
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
  drawerSubText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  menuItemIcon: {
    fontSize: 18,
    marginRight: 14,
    width: 24,
    textAlign: 'center',
  },
  menuItemText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
});

export default DrawerMenu;
