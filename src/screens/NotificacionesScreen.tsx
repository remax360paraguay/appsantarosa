import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppHeader } from '../components/AppHeader';
import { DrawerMenu } from '../components/DrawerMenu';
import { notifications, Notification } from '../data/notifications';
import Colors from '../theme/colors';

const brandColors: Record<string, string> = {
  renault: '#FFCC00',
  jetour: '#1B3A7A',
  gwm: '#CC0000',
  jac: '#E31E24',
  leapmotor: '#00D4FF',
  dfsk: '#0066CC',
  byd: '#1DB954',
  sepy: '#FF6B00',
};

const NotificationItem: React.FC<{
  item: Notification;
  onPress: () => void;
}> = ({ item, onPress }) => {
  const accentColor = item.brandId ? brandColors[item.brandId] ?? Colors.primaryBlue : Colors.primaryBlue;

  return (
    <TouchableOpacity
      style={[styles.notifCard, !item.read && styles.notifCardUnread]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: `${accentColor}18` }]}>
        <Ionicons
          name={item.brandId ? 'car-outline' : 'notifications-outline'}
          size={20}
          color={accentColor}
        />
      </View>

      {/* Content */}
      <View style={styles.notifContent}>
        <View style={styles.notifTitleRow}>
          <Text style={styles.notifTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notifBody} numberOfLines={2}>
          {item.body}
        </Text>
        <Text style={styles.notifDate}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;

  return date.toLocaleDateString('es-PY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const NotificacionesScreen: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(notifications);
  const insets = useSafeAreaInsets();

  const unreadCount = items.filter((n) => !n.read).length;

  const handlePress = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Notification }) => (
      <NotificationItem item={item} onPress={() => handlePress(item.id)} />
    ),
    [handlePress]
  );

  const keyExtractor = useCallback((item: Notification) => item.id, []);

  return (
    <View style={styles.screen}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View>
              <Text style={styles.screenTitle}>Notificaciones</Text>
              {unreadCount > 0 && (
                <Text style={styles.unreadLabel}>
                  {unreadCount} sin leer
                </Text>
              )}
            </View>
            {unreadCount > 0 && (
              <TouchableOpacity
                onPress={handleMarkAllRead}
                style={styles.markAllBtn}
                accessibilityRole="button"
                accessibilityLabel="Marcar todas como leídas"
              >
                <Text style={styles.markAllText}>Marcar todas</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={48} color={Colors.tabBarInactive} />
            <Text style={styles.emptyTitle}>Sin notificaciones</Text>
            <Text style={styles.emptySubtitle}>
              Te avisaremos cuando haya novedades
            </Text>
          </View>
        }
      />

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
  listContent: {
    padding: 12,
    gap: 8,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  unreadLabel: {
    fontSize: 12,
    color: Colors.primaryBlue,
    fontWeight: '500',
    marginTop: 2,
  },
  markAllBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EEF3FB',
    borderRadius: 16,
  },
  markAllText: {
    fontSize: 12,
    color: Colors.primaryBlue,
    fontWeight: '600',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  notifCardUnread: {
    backgroundColor: '#F7F9FF',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
      },
      android: { elevation: 3 },
    }),
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginVertical: 14,
    flexShrink: 0,
  },
  notifContent: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  notifTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notifTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryBlue,
    flexShrink: 0,
  },
  notifBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 6,
  },
  notifDate: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '400',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default NotificacionesScreen;
