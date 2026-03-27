import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import { brands } from '../data/brands';
import Colors from '../theme/colors';

interface FormState {
  marca: string;
  nombre: string;
  telefono: string;
  email: string;
  comentarios: string;
}

const brandOptions = brands.map((b) => b.name);

export const AgendamientoServiceScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    marca: '',
    nombre: '',
    telefono: '',
    email: '',
    comentarios: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const insets = useSafeAreaInsets();

  const updateField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.marca) {
      Alert.alert('Atención', 'Por favor seleccione su marca de vehículo.');
      return;
    }
    if (!form.nombre.trim()) {
      Alert.alert('Atención', 'Por favor ingrese su nombre y apellido.');
      return;
    }
    if (!form.telefono.trim()) {
      Alert.alert('Atención', 'Por favor ingrese su número de teléfono.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      Alert.alert('Atención', 'Por favor ingrese un email válido.');
      return;
    }

    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);

    Alert.alert(
      'Solicitud Enviada',
      'Su solicitud de agendamiento ha sido recibida. Nos comunicaremos con usted a la brevedad para confirmar su cita.',
      [
        {
          text: 'Aceptar',
          onPress: () => setForm({ marca: '', nombre: '', telefono: '', email: '', comentarios: '' }),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.screenTitle}>AGENDAMIENTO - SERVICE</Text>

        {/* Marca */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Marca</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setBrandDropdownOpen(true)}
            accessibilityLabel="Seleccionar marca"
            accessibilityRole="button"
          >
            <Text style={form.marca ? styles.dropdownSelected : styles.dropdownPlaceholder}>
              {form.marca || 'Selecciona su Marca ▼'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nombre y Apellido */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Nombre y Apellido</Text>
          <TextInput
            style={styles.input}
            value={form.nombre}
            onChangeText={updateField('nombre')}
            placeholder="Ingrese su nombre completo"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Nombre y apellido"
          />
        </View>

        {/* Telefono */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={form.telefono}
            onChangeText={updateField('telefono')}
            placeholder="09**xxxxxx"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            returnKeyType="next"
            accessibilityLabel="Teléfono"
          />
        </View>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={updateField('email')}
            placeholder="email"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            accessibilityLabel="Email"
          />
        </View>

        {/* Comentarios */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Comentarios</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.comentarios}
            onChangeText={updateField('comentarios')}
            placeholder="Ingrese el modelo de su vehículo, color, km"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            returnKeyType="done"
            blurOnSubmit
            accessibilityLabel="Comentarios"
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.8}
          accessibilityLabel="Enviar formulario"
          accessibilityRole="button"
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'Enviando...' : 'Enviar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Brand picker modal */}
      <Modal
        visible={brandDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setBrandDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setBrandDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona tu Marca</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {brandOptions.map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={[
                    styles.modalOption,
                    form.marca === brand && styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    updateField('marca')(brand);
                    setBrandDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      form.marca === brand && styles.modalOptionTextSelected,
                    ]}
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={() => {}}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    gap: 4,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.redLabel,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  dropdownPlaceholder: {
    color: Colors.textMuted,
    fontSize: 15,
  },
  dropdownSelected: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
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
    maxHeight: 400,
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

export default AgendamientoServiceScreen;
