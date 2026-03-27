import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import Colors from '../theme/colors';

type PostventaStackParamList = {
  PostventaMain: undefined;
  Agendamiento: undefined;
  Talleres: undefined;
  Tarifario: undefined;
};

type PostventaNavProp = NativeStackNavigationProp<PostventaStackParamList>;

interface PostventaMenuItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const PostventaMenuItem: React.FC<PostventaMenuItemProps> = ({ iconName, title, subtitle, onPress }) => (
  <TouchableOpacity
    style={styles.menuCard}
    onPress={onPress}
    activeOpacity={0.8}
    accessibilityLabel={title}
    accessibilityRole="button"
  >
    <View style={styles.menuIconSquare}>
      <Ionicons name={iconName} size={24} color={Colors.white} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
  </TouchableOpacity>
);

export const PostventaScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation<PostventaNavProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Postventa</Text>
        <Text style={styles.screenSubtitle}>Gestione sus servicios y consultas</Text>

        <View style={styles.menuList}>
          <PostventaMenuItem
            iconName="calendar-outline"
            title="Agendamiento"
            subtitle="Reserve su turno para el servicio tecnico."
            onPress={() => navigation.navigate('Agendamiento')}
          />
          <PostventaMenuItem
            iconName="car-outline"
            title="Talleres Oficiales"
            subtitle="Encuentre la sucursal mas cercana."
            onPress={() => navigation.navigate('Talleres')}
          />
          <PostventaMenuItem
            iconName="pricetag-outline"
            title="Tarifario"
            subtitle="Consulte los costos de mantenimiento."
            onPress={() => navigation.navigate('Tarifario')}
          />
        </View>
      </ScrollView>

      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  menuList: {
    gap: 14,
  },
  menuCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    gap: 14,
  },
  menuIconSquare: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 17,
  },
});

export default PostventaScreen;
