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
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import Colors from '../theme/colors';

type PostventaStackParamList = {
  PostventaMain: undefined;
  AgendamientoService: undefined;
  Talleres: undefined;
};

type PostventaNavProp = NativeStackNavigationProp<PostventaStackParamList>;

interface PostventaOptionProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const PostventaOption: React.FC<PostventaOptionProps> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity
    style={styles.optionCard}
    onPress={onPress}
    activeOpacity={0.8}
    accessibilityLabel={title}
    accessibilityRole="button"
  >
    <View style={styles.optionIconContainer}>
      <Text style={styles.optionIcon}>{icon}</Text>
    </View>
    <View style={styles.optionTextContainer}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionSubtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.optionArrow}>›</Text>
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
        <Text style={styles.screenTitle}>POSTVENTA</Text>
        <Text style={styles.screenSubtitle}>
          Servicios de atención al cliente y asistencia técnica
        </Text>

        <View style={styles.optionsContainer}>
          <PostventaOption
            icon="🔧"
            title="Agendamiento Service"
            subtitle="Solicite un turno para el servicio técnico de su vehículo"
            onPress={() => navigation.navigate('AgendamientoService')}
          />
          <PostventaOption
            icon="📍"
            title="Talleres"
            subtitle="Encuentre talleres oficiales y autorizados cerca de usted"
            onPress={() => navigation.navigate('Talleres')}
          />
        </View>

        {/* Info cards */}
        <View style={styles.infoSection}>
          <Text style={styles.infoSectionTitle}>Información de Contacto</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📞</Text>
            <View>
              <Text style={styles.infoLabel}>Teléfono Central</Text>
              <Text style={styles.infoValue}>021-000-0000</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>✉️</Text>
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>servicio@santarosa.com.py</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🕐</Text>
            <View>
              <Text style={styles.infoLabel}>Horario de Atención</Text>
              <Text style={styles.infoValue}>Lunes a Viernes: 8:00 - 17:30</Text>
              <Text style={styles.infoValue}>Sábados: 8:00 - 12:00</Text>
            </View>
          </View>
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
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 24,
    lineHeight: 18,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 28,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 17,
  },
  optionArrow: {
    fontSize: 28,
    color: Colors.textMuted,
    fontWeight: '300',
    marginLeft: 8,
  },
  infoSection: {
    gap: 10,
  },
  infoSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryBlue,
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});

export default PostventaScreen;
