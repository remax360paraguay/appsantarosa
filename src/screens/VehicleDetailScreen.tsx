import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import { brands } from '../data/brands';
import Colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type HomeStackParamList = {
  HomeMain: undefined;
  BrandDetail: { brandId: string };
  VehicleDetail: { brandId: string; vehicleId: string };
};

type VehicleDetailRouteProp = RouteProp<HomeStackParamList, 'VehicleDetail'>;

const CAROUSEL_SLIDES = ['Vista Lateral', 'Vista Frontal', 'Vista Interior'];

export const VehicleDetailScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const route = useRoute<VehicleDetailRouteProp>();
  const navigation = useNavigation();
  const carouselRef = useRef<FlatList>(null);

  const brand = useMemo(
    () => brands.find((b) => b.id === route.params.brandId),
    [route.params.brandId]
  );

  const vehicle = useMemo(
    () => brand?.vehicles.find((v) => v.id === route.params.vehicleId),
    [brand, route.params.vehicleId]
  );

  const bono = 0;
  const displayPrice = selectedVersion ? vehicle?.priceContado ?? 0 : 0;
  const displayCuota = selectedPlan && selectedVersion ? vehicle?.priceCuota ?? 0 : 0;

  if (!vehicle || !brand) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Vehículo no encontrado</Text>
      </View>
    );
  }

  const handleSolicitar = () => {
    if (!selectedVersion) {
      Alert.alert('Atención', 'Por favor seleccione una versión primero.');
      return;
    }
    Alert.alert(
      'Cotización Solicitada',
      `Su solicitud de cotización para el ${vehicle.name} ${selectedVersion} ha sido enviada. Un asesor se comunicará con usted a la brevedad.`,
      [{ text: 'Aceptar', style: 'default' }]
    );
  };

  return (
    <View style={styles.screen}>
      <AppHeader
        onMenuPress={() => setDrawerOpen(true)}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Image carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={CAROUSEL_SLIDES}
            renderItem={({ item }) => (
              <View style={styles.carouselSlide}>
                <Text style={styles.carouselEmoji}>🚙</Text>
                <Text style={styles.carouselSlideLabel}>{item}</Text>
              </View>
            )}
            keyExtractor={(_, index) => String(index)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SCREEN_WIDTH
              );
              setActiveCarouselIndex(index);
            }}
          />

          {/* Dot indicators */}
          <View style={styles.dotsContainer}>
            {CAROUSEL_SLIDES.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, index === activeCarouselIndex && styles.dotActive]}
                onPress={() => {
                  carouselRef.current?.scrollToIndex({ index, animated: true });
                  setActiveCarouselIndex(index);
                }}
              />
            ))}
          </View>

          <Text style={styles.referenceText}>*Imagen Referencial.</Text>
        </View>

        {/* Vehicle title */}
        <View style={styles.titleSection}>
          <Text style={styles.brandName}>{brand.name}</Text>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
        </View>

        {/* Cotizador section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cotizador</Text>

          {/* Version dropdown */}
          <Text style={styles.fieldLabel}>Seleccione la Versión</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setVersionDropdownOpen(true)}
            accessibilityLabel="Seleccionar versión"
            accessibilityRole="button"
          >
            <Text style={selectedVersion ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>
              {selectedVersion || 'Seleccione una versión ▼'}
            </Text>
          </TouchableOpacity>

          {/* Bono row */}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Bono</Text>
            <Text style={styles.priceValue}>USD {bono.toLocaleString('es-PY')}</Text>
          </View>

          {/* Contado row */}
          <View style={[styles.priceRow, styles.priceRowBorder]}>
            <Text style={styles.priceLabel}>Contado</Text>
            <Text style={styles.priceValueBold}>
              USD {displayPrice.toLocaleString('es-PY')}
            </Text>
          </View>

          {/* Planes row */}
          <View style={styles.planesRow}>
            <Text style={styles.priceLabel}>Planes</Text>
            <TouchableOpacity
              style={styles.planDropdown}
              onPress={() => setPlanDropdownOpen(true)}
              accessibilityLabel="Seleccionar plan"
              accessibilityRole="button"
            >
              <Text style={selectedPlan ? styles.dropdownValueSelected : styles.dropdownPlaceholder}>
                {selectedPlan || 'Elija un Plan ▼'}
              </Text>
            </TouchableOpacity>
          </View>

          {selectedPlan && selectedVersion && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Cuota estimada</Text>
              <Text style={styles.priceValueBold}>USD {displayCuota}</Text>
            </View>
          )}

          <Text style={styles.estimativeText}>*Monto estimativo.</Text>
        </View>

        {/* Solicitar section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solicitar</Text>
          <TouchableOpacity
            style={styles.cotizacionButton}
            onPress={handleSolicitar}
            activeOpacity={0.8}
            accessibilityLabel="Solicitar cotización"
            accessibilityRole="button"
          >
            <Text style={styles.cotizacionButtonText}>Cotización</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Version picker modal */}
      <Modal
        visible={versionDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setVersionDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setVersionDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccione la Versión</Text>
            {vehicle.versions.map((version) => (
              <TouchableOpacity
                key={version}
                style={[
                  styles.modalOption,
                  selectedVersion === version && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setSelectedVersion(version);
                  setVersionDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedVersion === version && styles.modalOptionTextSelected,
                  ]}
                >
                  {version}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Plan picker modal */}
      <Modal
        visible={planDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPlanDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setPlanDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Elija un Plan</Text>
            {vehicle.plans.map((plan) => (
              <TouchableOpacity
                key={plan}
                style={[
                  styles.modalOption,
                  selectedPlan === plan && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setSelectedPlan(plan);
                  setPlanDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedPlan === plan && styles.modalOptionTextSelected,
                  ]}
                >
                  {plan}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

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
  carouselContainer: {
    backgroundColor: Colors.white,
    paddingBottom: 12,
  },
  carouselSlide: {
    width: SCREEN_WIDTH,
    height: 220,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  carouselSlideLabel: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#CCCCCC',
  },
  dotActive: {
    backgroundColor: Colors.primaryBlue,
    width: 18,
    borderRadius: 3.5,
  },
  referenceText: {
    textAlign: 'right',
    color: Colors.textMuted,
    fontSize: 10,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  titleSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  brandName: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  section: {
    backgroundColor: Colors.white,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.primaryBlue,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  fieldLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: '500',
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  dropdownPlaceholder: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  dropdownValueSelected: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  priceRowBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  priceValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  priceValueBold: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  planesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
  },
  planDropdown: {
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 160,
    alignItems: 'flex-end',
  },
  estimativeText: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 8,
    fontStyle: 'italic',
  },
  cotizacionButton: {
    backgroundColor: '#5B8DEA',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cotizacionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 360,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryBlue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  modalOption: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  modalOptionSelected: {
    backgroundColor: '#EEF3FB',
  },
  modalOptionText: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  modalOptionTextSelected: {
    color: Colors.primaryBlue,
    fontWeight: '600',
  },
});

export default VehicleDetailScreen;
