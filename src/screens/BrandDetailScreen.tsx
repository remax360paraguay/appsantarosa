import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import { brands, Vehicle } from '../data/brands';
import Colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_MARGIN * 3) / 2;

type HomeStackParamList = {
  HomeMain: undefined;
  BrandDetail: { brandId: string };
  VehicleDetail: { brandId: string; vehicleId: string };
};

type BrandDetailRouteProp = RouteProp<HomeStackParamList, 'BrandDetail'>;
type BrandDetailNavProp = NativeStackNavigationProp<HomeStackParamList>;

const VehicleCard: React.FC<{
  vehicle: Vehicle;
  onPress: () => void;
}> = ({ vehicle, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.vehicleCard}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel={`Ver detalles ${vehicle.name}`}
      accessibilityRole="button"
    >
      {/* Image placeholder area */}
      <View style={styles.imageContainer}>
        <View style={styles.vehicleImagePlaceholder}>
          <Text style={styles.vehiclePlaceholderEmoji}>🚗</Text>
          <Text style={styles.vehicleCategoryText}>{vehicle.category}</Text>
        </View>
        {vehicle.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NUEVO</Text>
          </View>
        )}
        <View style={styles.greenDot} />
      </View>

      {/* Info */}
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName} numberOfLines={1}>
          {vehicle.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Contado</Text>
          <Text style={styles.priceValue}>
            USD {vehicle.priceContado.toLocaleString('es-PY')}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Cuota</Text>
          <Text style={styles.priceValue}>USD {vehicle.priceCuota}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const BrandDetailScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<BrandDetailNavProp>();
  const route = useRoute<BrandDetailRouteProp>();
  const insets = useSafeAreaInsets();

  const brand = useMemo(
    () => brands.find((b) => b.id === route.params.brandId),
    [route.params.brandId]
  );

  const filteredVehicles = useMemo(() => {
    if (!brand) return [];
    if (!searchText.trim()) return brand.vehicles;
    return brand.vehicles.filter((v) =>
      v.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [brand, searchText]);

  const handleVehiclePress = useCallback(
    (vehicleId: string) => {
      navigation.navigate('VehicleDetail', {
        brandId: route.params.brandId,
        vehicleId,
      });
    },
    [navigation, route.params.brandId]
  );

  const renderVehicle = useCallback(
    ({ item }: { item: Vehicle }) => (
      <VehicleCard
        vehicle={item}
        onPress={() => handleVehiclePress(item.id)}
      />
    ),
    [handleVehiclePress]
  );

  if (!brand) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Marca no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por modelo"
          placeholderTextColor={Colors.textMuted}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Buscar modelo"
        />
      </View>

      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicle}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: insets.bottom + 80 },
        ]}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No se encontraron modelos</Text>
          </View>
        }
      />

      {/* Novedades button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity
          style={styles.novedadesButton}
          activeOpacity={0.8}
          accessibilityLabel="Ver novedades"
          accessibilityRole="button"
        >
          <Text style={styles.novedadesText}>Novedades</Text>
        </TouchableOpacity>
      </View>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  grid: {
    padding: CARD_MARGIN,
    gap: CARD_MARGIN,
  },
  row: {
    gap: CARD_MARGIN,
  },
  vehicleCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#F8F8F8',
    position: 'relative',
  },
  vehicleImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  vehiclePlaceholderEmoji: {
    fontSize: 36,
  },
  vehicleCategoryText: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.darkCard,
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  newBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  greenDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.greenBadge,
  },
  vehicleInfo: {
    padding: 10,
  },
  vehicleName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '400',
  },
  priceValue: {
    fontSize: 11,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 8,
  },
  novedadesButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  novedadesText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 15,
  },
});

export default BrandDetailScreen;
