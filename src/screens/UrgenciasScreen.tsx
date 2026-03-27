import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';

interface UrgenciasScreenProps {
  onClose: () => void;
}

const URGENCIAS_CONTACTS = [
  {
    id: '1',
    title: 'Asistencia en Ruta',
    description: 'Auxilio mecánico 24/7',
    phone: '021-000-0001',
    icon: '🚗',
  },
  {
    id: '2',
    title: 'Grúa de Emergencia',
    description: 'Remolque y traslado de vehículo',
    phone: '021-000-0002',
    icon: '🚚',
  },
  {
    id: '3',
    title: 'Central de Urgencias',
    description: 'Atención de reclamos urgentes',
    phone: '021-000-0000',
    icon: '📞',
  },
];

export const UrgenciasScreen: React.FC<UrgenciasScreenProps> = ({ onClose }) => {
  const insets = useSafeAreaInsets();

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/-/g, '')}`);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>URGENCIAS</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Cerrar"
          accessibilityRole="button"
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          En caso de emergencia con su vehículo, contacte a los siguientes números:
        </Text>

        {URGENCIAS_CONTACTS.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactIconContainer}>
              <Text style={styles.contactIcon}>{contact.icon}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{contact.title}</Text>
              <Text style={styles.contactDescription}>{contact.description}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => handleCall(contact.phone)}
              accessibilityLabel={`Llamar ${contact.title}`}
              accessibilityRole="button"
            >
              <Text style={styles.callButtonText}>Llamar</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Horario de Atención</Text>
          <Text style={styles.infoBoxText}>
            Asistencia en Ruta: 24 horas / 7 días{'\n'}
            Grúa y Central: Lunes a Sábado 7:00 - 20:00
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  contactCard: {
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
    gap: 12,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 3,
  },
  contactPhone: {
    fontSize: 13,
    color: Colors.primaryBlue,
    fontWeight: '600',
  },
  callButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  callButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#EEF3FB',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryBlue,
    marginTop: 4,
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryBlue,
    marginBottom: 6,
  },
  infoBoxText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default UrgenciasScreen;
