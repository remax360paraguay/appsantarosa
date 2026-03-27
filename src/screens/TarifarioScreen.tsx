import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import Colors from '../theme/colors';
import { brands, Brand, Vehicle } from '../data/brands';

export const TarifarioScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [brandPickerOpen, setBrandPickerOpen] = useState(false);
  const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);
  const [selectedVersionByVehicle, setSelectedVersionByVehicle] = useState<Record<string, string>>({});
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const selectedBrand = useMemo(
    () => brands.find((b) => b.id === selectedBrandId),
    [selectedBrandId]
  );

  const selectedVehicleForMaintenance = useMemo(() => {
    if (!selectedBrand || !expandedVehicleId) return null;
    return selectedBrand.vehicles.find((v) => v.id === expandedVehicleId) ?? null;
  }, [selectedBrand, expandedVehicleId]);

  const selectedVersionForMaintenance = expandedVehicleId
    ? selectedVersionByVehicle[expandedVehicleId]
    : undefined;

  const toggleVehicle = (vehicleId: string) => {
    setExpandedVehicleId((prev) => (prev === vehicleId ? null : vehicleId));
  };

  const selectVersion = (vehicleId: string, version: string) => {
    setSelectedVersionByVehicle((prev) => ({ ...prev, [vehicleId]: version }));
  };

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} showBack onBackPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>TARIFARIO - SERVICE</Text>

        {/* Brand picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Elija una marca</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setBrandPickerOpen(!brandPickerOpen)}
            activeOpacity={0.8}
            accessibilityLabel="Seleccionar marca"
            accessibilityRole="button"
          >
            <Text style={selectedBrandId ? styles.pickerValueSelected : styles.pickerPlaceholder}>
              {selectedBrand?.name || 'Seleccionar Marca'}
            </Text>
            <Ionicons name={brandPickerOpen ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          {brandPickerOpen && (
            <View style={styles.pickerOptions}>
              {brands.map((brand) => (
                <TouchableOpacity
                  key={brand.id}
                  style={[styles.pickerOption, selectedBrandId === brand.id && styles.pickerOptionSelected]}
                  onPress={() => {
                    setSelectedBrandId(brand.id);
                    setBrandPickerOpen(false);
                    setExpandedVehicleId(null);
                    setSelectedVersionByVehicle({});
                  }}
                >
                  <Text style={[styles.pickerOptionText, selectedBrandId === brand.id && styles.pickerOptionTextSelected]}>
                    {brand.name}
                  </Text>
                  {selectedBrandId === brand.id && <Ionicons name="checkmark" size={16} color={Colors.primaryBlue} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Vehicle list */}
        {selectedBrand ? (
          <>
            <Text style={styles.sectionHeader}>MODELOS DISPONIBLES</Text>
            <Text style={styles.sectionHint}>SELECCIONE UN VEHÍCULO PARA VER SUS MANTENIMIENTOS</Text>

            {selectedBrand.vehicles.map((vehicle) => {
              const isExpanded = expandedVehicleId === vehicle.id;
              const selectedVersion = selectedVersionByVehicle[vehicle.id];

              return (
                <View key={vehicle.id} style={styles.vehicleItem}>
                  {/* Vehicle row header */}
                  <TouchableOpacity
                    style={styles.vehicleRow}
                    onPress={() => toggleVehicle(vehicle.id)}
                    activeOpacity={0.8}
                    accessibilityLabel={`${vehicle.name} ${isExpanded ? 'colapsar' : 'expandir'}`}
                    accessibilityRole="button"
                  >
                    <View style={styles.vehicleRowLeft}>
                      <View style={styles.vehicleIconWrap}>
                        <Ionicons name="car-outline" size={20} color={Colors.primaryBlue} />
                      </View>
                      <View>
                        <Text style={styles.vehicleRowName}>{vehicle.name}</Text>
                        <Text style={styles.vehicleRowCategory}>{vehicle.category}</Text>
                      </View>
                    </View>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={Colors.textMuted}
                    />
                  </TouchableOpacity>

                  {/* Expanded versions */}
                  {isExpanded && (
                    <View style={styles.versionsContainer}>
                      <Text style={styles.versionsLabel}>SELECCIONE VERSIÓN</Text>
                      {vehicle.versions.map((version) => {
                        const isSelected = selectedVersion === version;
                        return (
                          <TouchableOpacity
                            key={version}
                            style={[styles.versionOption, isSelected && styles.versionOptionSelected]}
                            onPress={() => selectVersion(vehicle.id, version)}
                            activeOpacity={0.8}
                            accessibilityLabel={`Versión ${version}`}
                            accessibilityRole="radio"
                          >
                            <Text style={[styles.versionOptionText, isSelected && styles.versionOptionTextSelected]}>
                              {version}
                            </Text>
                            {isSelected && (
                              <Ionicons name="checkmark-circle" size={18} color={Colors.primaryBlue} />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}

            {/* Maintenance costs */}
            {selectedVehicleForMaintenance && selectedVersionForMaintenance && (
              <View style={styles.maintenanceSection}>
                <Text style={styles.maintenanceTitle}>COSTOS DE MANTENIMIENTO</Text>
                <Text style={styles.maintenanceSubtitle}>
                  {selectedVehicleForMaintenance.name} — {selectedVersionForMaintenance}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.maintenanceScroll}
                >
                  {selectedVehicleForMaintenance.maintenance.map((item, index) => (
                    <View key={index} style={styles.maintenanceCard}>
                      <Text style={styles.maintenanceCardKm}>
                        RECORRIDO: {item.km.toLocaleString('es-PY')} km
                      </Text>
                      <View style={styles.maintenanceDivider} />
                      <Text style={styles.maintenanceCardLabel}>Precio</Text>
                      <Text style={styles.maintenanceCardPrice}>
                        Gs. {item.priceGs.toLocaleString('es-PY')}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
                <Text style={styles.maintenanceDisclaimer}>
                  * Precios estimativos. Pueden variar según disponibilidad y configuración del vehículo.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="car-sport-outline" size={64} color="#CCCCCC" />
            <Text style={styles.emptyStateTitle}>Seleccione una marca</Text>
            <Text style={styles.emptyStateText}>
              Elija una marca para ver los modelos y costos de mantenimiento disponibles.
            </Text>
          </View>
        )}
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
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.redLabel,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  pickerButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerPlaceholder: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  pickerValueSelected: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  pickerOptions: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    marginTop: 4,
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  pickerOptionSelected: {
    backgroundColor: '#EEF3FB',
  },
  pickerOptionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  pickerOptionTextSelected: {
    color: Colors.primaryBlue,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  vehicleItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  vehicleRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vehicleIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleRowName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  vehicleRowCategory: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  versionsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    padding: 14,
    backgroundColor: '#FAFAFA',
  },
  versionsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  versionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    marginBottom: 8,
    backgroundColor: Colors.white,
  },
  versionOptionSelected: {
    borderColor: Colors.primaryBlue,
    backgroundColor: '#EEF3FB',
  },
  versionOptionText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  versionOptionTextSelected: {
    color: Colors.primaryBlue,
    fontWeight: '700',
  },
  maintenanceSection: {
    marginTop: 20,
  },
  maintenanceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.redLabel,
    letterSpacing: 1,
    marginBottom: 4,
  },
  maintenanceSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 14,
  },
  maintenanceScroll: {
    gap: 12,
    paddingBottom: 4,
  },
  maintenanceCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.redLabel,
    padding: 14,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 3,
  },
  maintenanceCardKm: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  maintenanceDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 8,
  },
  maintenanceCardLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  maintenanceCardPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryBlue,
  },
  maintenanceDisclaimer: {
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  emptyStateText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default TarifarioScreen;
