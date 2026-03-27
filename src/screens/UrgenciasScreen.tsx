import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SRLogo } from '../components/SRLogo';
import Colors from '../theme/colors';

interface UrgenciasScreenProps {
  onClose: () => void;
}

interface ContactCard {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  actionBgColor: string;
  phone: string;
  actionType: 'call' | 'whatsapp';
  subtitleRed?: boolean;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
}

const CONTACT_CARDS: ContactCard[] = [
  {
    id: 'ventas',
    iconName: 'call-outline',
    iconBgColor: Colors.primaryBlue,
    title: 'Ventas',
    subtitle: 'Casa Central',
    actionLabel: 'Llamar',
    actionBgColor: Colors.primaryBlue,
    phone: '+595211000001',
    actionType: 'call',
  },
  {
    id: 'postventa',
    iconName: 'chatbubble-outline',
    iconBgColor: '#25D366',
    title: 'Postventa',
    subtitle: 'Repuestos y Servicios',
    actionLabel: 'Escribir',
    actionBgColor: Colors.primaryBlue,
    phone: '+595981000002',
    actionType: 'whatsapp',
  },
  {
    id: 'asistencia',
    iconName: 'alert-circle-outline',
    iconBgColor: Colors.redLabel,
    title: 'Asistencia 24hs',
    subtitle: 'Ayuda en ruta',
    actionLabel: 'Llamar',
    actionBgColor: Colors.redLabel,
    phone: '+595211000003',
    actionType: 'call',
    subtitleRed: true,
  },
];

const BRANCHES: Branch[] = [
  {
    id: 'asuncion',
    name: 'Casa Central',
    address: 'Av. Artigas 1234, Asuncion',
    phone: '+595211000001',
    whatsapp: '+595991000001',
  },
  {
    id: 'cde',
    name: 'Ciudad del Este',
    address: 'Supercarretera Km 4',
    phone: '+595611000001',
    whatsapp: '+595991000002',
  },
  {
    id: 'encarnacion',
    name: 'Encarnacion',
    address: 'Ruta 6, Km 2.5',
    phone: '+595711000001',
    whatsapp: '+595991000003',
  },
];

export const UrgenciasScreen: React.FC<UrgenciasScreenProps> = ({ onClose }) => {
  const insets = useSafeAreaInsets();

  const handleAction = useCallback((card: ContactCard) => {
    if (card.actionType === 'call') {
      const url = `tel:${card.phone}`;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('No disponible', 'No es posible realizar la llamada desde este dispositivo.');
        }
      });
    } else {
      const cleaned = card.phone.replace(/\D/g, '');
      const url = `https://wa.me/${cleaned}`;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('No disponible', 'WhatsApp no esta instalado en este dispositivo.');
        }
      });
    }
  }, []);

  const handleCall = useCallback((phone: string) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  }, []);

  const handleWhatsApp = useCallback((phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const url = `https://wa.me/${cleaned}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  }, []);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Cerrar"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <SRLogo size={32} color={Colors.white} />
          <Text style={styles.headerTitle}>SANTA ROSA</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Contacto</Text>
        <Text style={styles.pageSubtitle}>
          Seleccione una opcion para comunicarse con nosotros.
        </Text>

        {/* Contact cards */}
        <View style={styles.contactsContainer}>
          {CONTACT_CARDS.map((card) => (
            <View key={card.id} style={styles.contactCard}>
              <View style={[styles.contactIconCircle, { backgroundColor: card.iconBgColor }]}>
                <Ionicons name={card.iconName} size={24} color={Colors.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{card.title}</Text>
                <Text style={[styles.contactSubtitle, card.subtitleRed && styles.contactSubtitleRed]}>
                  {card.subtitle}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: card.actionBgColor }]}
                onPress={() => handleAction(card)}
                activeOpacity={0.85}
                accessibilityLabel={`${card.actionLabel} ${card.title}`}
                accessibilityRole="button"
              >
                <Text style={styles.actionBtnText}>{card.actionLabel}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Branches */}
        <Text style={styles.branchesTitle}>Nuestras Sucursales</Text>
        <View style={styles.branchesList}>
          {BRANCHES.map((branch) => (
            <View key={branch.id} style={styles.branchCard}>
              <View style={styles.branchInfo}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <View style={styles.branchAddressRow}>
                  <Ionicons name="location-outline" size={13} color={Colors.textMuted} />
                  <Text style={styles.branchAddress}>{branch.address}</Text>
                </View>
              </View>
              <View style={styles.branchActions}>
                <TouchableOpacity
                  style={styles.branchActionBtn}
                  onPress={() => handleCall(branch.phone)}
                  activeOpacity={0.8}
                  accessibilityLabel={`Llamar a ${branch.name}`}
                  accessibilityRole="button"
                >
                  <Ionicons name="call-outline" size={18} color={Colors.primaryBlue} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.branchActionBtn}
                  onPress={() => handleWhatsApp(branch.whatsapp)}
                  activeOpacity={0.8}
                  accessibilityLabel={`WhatsApp ${branch.name}`}
                  accessibilityRole="button"
                >
                  <Ionicons name="chatbubble-outline" size={18} color={Colors.primaryBlue} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 3,
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 24,
    lineHeight: 18,
  },
  contactsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  contactCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  contactIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  contactSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  contactSubtitleRed: {
    color: Colors.redLabel,
    fontWeight: '500',
  },
  actionBtn: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexShrink: 0,
  },
  actionBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  branchesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  branchesList: {
    gap: 10,
  },
  branchCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  branchAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  branchAddress: {
    fontSize: 12,
    color: Colors.textMuted,
    flex: 1,
  },
  branchActions: {
    flexDirection: 'row',
    gap: 8,
    flexShrink: 0,
  },
  branchActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UrgenciasScreen;
