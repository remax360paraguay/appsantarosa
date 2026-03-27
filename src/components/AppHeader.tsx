import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SRLogo } from './SRLogo';
import Colors from '../theme/colors';

interface AppHeaderProps {
  onMenuPress: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onMenuPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={onMenuPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel="Abrir menu"
        accessibilityRole="button"
      >
        <Text style={styles.hamburgerIcon}>≡</Text>
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <SRLogo size={36} color={Colors.white} />
        <Text style={styles.brandText}>SANTA ROSA</Text>
      </View>

      {/* Spacer to center the logo */}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  menuButton: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  hamburgerIcon: {
    color: Colors.white,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '300',
  },
  centerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  brandText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 3,
  },
  spacer: {
    width: 40,
  },
});

export default AppHeader;
