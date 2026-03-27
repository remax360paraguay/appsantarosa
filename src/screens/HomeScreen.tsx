import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import { BrandLogo } from '../components/SRLogo';
import { brands, Brand } from '../data/brands';
import Colors from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_SIZE = (SCREEN_WIDTH - CARD_MARGIN * 3) / 2;

type HomeStackParamList = {
  HomeMain: undefined;
  BrandDetail: { brandId: string };
};

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList>;

const BrandCard: React.FC<{ brand: Brand; onPress: () => void }> = ({ brand, onPress }) => {
  const bgColor = brand.darkBackground ? Colors.darkCard : Colors.white;
  const shadowStyle = brand.darkBackground
    ? {}
    : {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bgColor, width: CARD_SIZE, height: CARD_SIZE }, shadowStyle]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityLabel={`Ver vehículos ${brand.name}`}
      accessibilityRole="button"
    >
      <BrandLogo logoType={brand.logoType} darkBackground={brand.darkBackground} size={56} />
      {brand.darkBackground ? null : (
        <Text style={styles.cardNameLight}>{brand.name}</Text>
      )}
    </TouchableOpacity>
  );
};

export const HomeScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation<HomeNavProp>();
  const insets = useSafeAreaInsets();

  const handleBrandPress = useCallback((brandId: string) => {
    navigation.navigate('BrandDetail', { brandId });
  }, [navigation]);

  const handleNavigate = useCallback((screen: string) => {
    // Handled by bottom tabs / navigator
  }, []);

  const renderBrand = useCallback(
    ({ item }: { item: Brand }) => (
      <BrandCard
        brand={item}
        onPress={() => handleBrandPress(item.id)}
      />
    ),
    [handleBrandPress]
  );

  const keyExtractor = useCallback((item: Brand) => item.id, []);

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} />

      <FlatList
        data={brands}
        renderItem={renderBrand}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: insets.bottom + 16 },
        ]}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={8}
        windowSize={10}
      />

      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  grid: {
    padding: CARD_MARGIN,
    gap: CARD_MARGIN,
  },
  row: {
    gap: CARD_MARGIN,
  },
  card: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 12,
  },
  cardNameLight: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
