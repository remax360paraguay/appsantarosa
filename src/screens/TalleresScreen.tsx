import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import Colors from '../theme/colors';
import { brandNames } from '../data/brands';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Conditionally import MapView to avoid crashes when maps module isn't available
let MapView: any = null;
let Marker: any = null;
try {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
} catch {
  // Maps not available
}

const BRANCH_OPTIONS = ['Oficial', 'Autorizado'];

const MARKERS = [
  { id: 'asuncion', title: 'Asunción', description: 'Av. Artigas 1234', coordinate: { latitude: -25.2867, longitude: -57.647 } },
  { id: 'cde', title: 'Ciudad del Este', description: 'Supercarretera Km 4', coordinate: { latitude: -25.5092, longitude: -54.6044 } },
  { id: 'encarnacion', title: 'Encarnación', description: 'Ruta 6, Km 2.5', coordinate: { latitude: -27.3328, longitude: -55.8659 } },
];

export const TalleresScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [brandPickerOpen, setBrandPickerOpen] = useState(false);
  const [tipoPickerOpen, setTipoPickerOpen] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const MapPlaceholder = () => (
    <View style={styles.mapPlaceholder}>
      <Ionicons name="map-outline" size={48} color={Colors.primaryBlue} />
      <Text style={styles.mapPlaceholderTitle}>Mapa de Talleres</Text>
      <Text style={styles.mapPlaceholderText}>Paraguay</Text>
      <View style={styles.mapMarkersList}>
        {MARKERS.map((m) => (
          <View key={m.id} style={styles.mapMarkerItem}>
            <Ionicons name="location" size={16} color={Colors.redLabel} />
            <View>
              <Text style={styles.mapMarkerName}>{m.title}</Text>
              <Text style={styles.mapMarkerDesc}>{m.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} showBack onBackPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>TALLERES</Text>

        {/* Marca picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Elija una marca</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => { setBrandPickerOpen(!brandPickerOpen); setTipoPickerOpen(false); }}
            activeOpacity={0.8}
            accessibilityLabel="Seleccionar marca"
            accessibilityRole="button"
          >
            <Text style={selectedBrand ? styles.pickerValueSelected : styles.pickerPlaceholder}>
              {selectedBrand || 'Marcas'}
            </Text>
            <Ionicons name={brandPickerOpen ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          {brandPickerOpen && (
            <View style={styles.pickerOptions}>
              {brandNames.map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={[styles.pickerOption, selectedBrand === brand && styles.pickerOptionSelected]}
                  onPress={() => { setSelectedBrand(brand); setBrandPickerOpen(false); }}
                >
                  <Text style={[styles.pickerOptionText, selectedBrand === brand && styles.pickerOptionTextSelected]}>
                    {brand}
                  </Text>
                  {selectedBrand === brand && <Ionicons name="checkmark" size={16} color={Colors.primaryBlue} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Tipo de Taller picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Tipo de Taller</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => { setTipoPickerOpen(!tipoPickerOpen); setBrandPickerOpen(false); }}
            activeOpacity={0.8}
            accessibilityLabel="Seleccionar tipo de taller"
            accessibilityRole="button"
          >
            <Text style={selectedTipo ? styles.pickerValueSelected : styles.pickerPlaceholder}>
              {selectedTipo || 'Oficial o Autorizado?'}
            </Text>
            <Ionicons name={tipoPickerOpen ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          {tipoPickerOpen && (
            <View style={styles.pickerOptions}>
              {BRANCH_OPTIONS.map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[styles.pickerOption, selectedTipo === tipo && styles.pickerOptionSelected]}
                  onPress={() => { setSelectedTipo(tipo); setTipoPickerOpen(false); }}
                >
                  <Text style={[styles.pickerOptionText, selectedTipo === tipo && styles.pickerOptionTextSelected]}>
                    {tipo}
                  </Text>
                  {selectedTipo === tipo && <Ionicons name="checkmark" size={16} color={Colors.primaryBlue} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          {MapView ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -23.4,
                longitude: -58.4,
                latitudeDelta: 5,
                longitudeDelta: 5,
              }}
              showsUserLocation={false}
              showsMyLocationButton={false}
            >
              {MARKERS.map((marker) => (
                <Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                  pinColor={Colors.primaryBlue}
                />
              ))}
            </MapView>
          ) : (
            <MapPlaceholder />
          )}
        </View>

        {/* Branch list */}
        <View style={styles.branchList}>
          <Text style={styles.branchListTitle}>Sucursales</Text>
          {MARKERS.map((marker) => (
            <View key={marker.id} style={styles.branchCard}>
              <View style={styles.branchIconWrap}>
                <Ionicons name="location" size={22} color={Colors.white} />
              </View>
              <View style={styles.branchInfo}>
                <Text style={styles.branchName}>{marker.title}</Text>
                <Text style={styles.branchAddress}>{marker.description}</Text>
              </View>
              <TouchableOpacity style={styles.branchAction} activeOpacity={0.8}>
                <Ionicons name="navigate-outline" size={18} color={Colors.primaryBlue} />
              </TouchableOpacity>
            </View>
          ))}
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryBlue,
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
  mapContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 20,
    height: 300,
    backgroundColor: '#E8ECF4',
  },
  map: {
    width: '100%',
    height: 300,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  mapPlaceholderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryBlue,
  },
  mapPlaceholderText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  mapMarkersList: {
    width: '100%',
    marginTop: 12,
    gap: 8,
  },
  mapMarkerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 10,
  },
  mapMarkerName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  mapMarkerDesc: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  branchList: {
    gap: 10,
  },
  branchListTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryBlue,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  branchCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
    gap: 12,
  },
  branchIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  branchAddress: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  branchAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TalleresScreen;
