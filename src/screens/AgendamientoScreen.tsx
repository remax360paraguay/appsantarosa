import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import Colors from '../theme/colors';
import { brandNames } from '../data/brands';

const BRAND_OPTIONS = brandNames;

export const AgendamientoScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brandPickerOpen, setBrandPickerOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [comentarios, setComentarios] = useState('');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleEnviar = () => {
    if (!selectedBrand || !nombre.trim() || !telefono.trim()) {
      Alert.alert('Campos requeridos', 'Por favor complete los campos obligatorios: Marca, Nombre y Teléfono.');
      return;
    }
    Alert.alert(
      'Solicitud Enviada',
      'Su solicitud de agendamiento ha sido enviada. Un asesor se comunicará con usted a la brevedad.',
      [{ text: 'Aceptar', style: 'default', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} showBack onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>AGENDAMIENTO - SERVICE</Text>
          <Text style={styles.subtitle}>Complete el formulario para reservar su turno</Text>

          {/* Marca */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Marca *</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setBrandPickerOpen(true)}
              activeOpacity={0.8}
              accessibilityLabel="Seleccionar marca"
              accessibilityRole="button"
            >
              <Text style={selectedBrand ? styles.pickerValueSelected : styles.pickerPlaceholder}>
                {selectedBrand || 'Selecciona su Marca'}
              </Text>
              <Ionicons name="chevron-down" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Brand picker inline */}
          {brandPickerOpen && (
            <View style={styles.pickerOptions}>
              {BRAND_OPTIONS.map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={[
                    styles.pickerOption,
                    selectedBrand === brand && styles.pickerOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedBrand(brand);
                    setBrandPickerOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      selectedBrand === brand && styles.pickerOptionTextSelected,
                    ]}
                  >
                    {brand}
                  </Text>
                  {selectedBrand === brand && (
                    <Ionicons name="checkmark" size={16} color={Colors.primaryBlue} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Nombre y Apellido */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nombre y Apellido *</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ingrese su nombre completo"
              placeholderTextColor={Colors.textMuted}
              returnKeyType="next"
              autoCapitalize="words"
            />
          </View>

          {/* Teléfono */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="09**xxxxxx"
              placeholderTextColor={Colors.textMuted}
              keyboardType="phone-pad"
              returnKeyType="next"
            />
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="email@ejemplo.com"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          {/* Comentarios */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Comentarios</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={comentarios}
              onChangeText={setComentarios}
              placeholder="Ingrese el modelo de su vehículo, color, km"
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleEnviar}
            activeOpacity={0.85}
            accessibilityLabel="Enviar formulario"
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.redLabel,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 12,
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
    marginTop: -10,
    marginBottom: 16,
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
  submitButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default AgendamientoScreen;
