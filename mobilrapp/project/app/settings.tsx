import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Bell, Shield, Globe, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Ride updates and promotions',
      icon: <Bell size={20} color="#2563EB" />,
      bgColor: '#EBF8FF',
      type: 'toggle',
      value: notifications,
      onToggle: setNotifications
    },
    {
      id: 'location',
      title: 'Location Services',
      description: 'Allow location access for rides',
      icon: <Globe size={20} color="#059669" />,
      bgColor: '#F0FDF4',
      type: 'toggle',
      value: locationServices,
      onToggle: setLocationServices
    },
    {
      id: 'emergency',
      title: 'Emergency Alerts',
      description: 'Safety notifications and alerts',
      icon: <Shield size={20} color="#DC2626" />,
      bgColor: '#FEF2F2',
      type: 'toggle',
      value: emergencyAlerts,
      onToggle: setEmergencyAlerts
    },
    {
      id: 'darkmode',
      title: 'Dark Mode',
      description: 'Switch to dark theme',
      icon: <Moon size={20} color="#7C3AED" />,
      bgColor: '#F3E8FF',
      type: 'toggle',
      value: darkMode,
      onToggle: setDarkMode
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help with your account',
      icon: <HelpCircle size={20} color="#F59E0B" />,
      bgColor: '#FFFBEB',
      type: 'navigation'
    },
    {
      id: 'logout',
      title: 'Sign Out',
      description: 'Sign out of your account',
      icon: <LogOut size={20} color="#6B7280" />,
      bgColor: '#F9FAFB',
      type: 'action'
    }
  ];

  const handleItemPress = (item) => {
    if (item.type === 'action' && item.id === 'logout') {
      // Handle logout
      router.push('/welcome');
    } else if (item.type === 'navigation') {
      // Handle navigation to other screens
      console.log(`Navigate to ${item.title}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#374151']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={() => handleItemPress(item)}
              disabled={item.type === 'toggle'}
            >
              <View style={styles.settingItemContent}>
                <View style={[styles.settingItemIcon, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>
                <View style={styles.settingItemDetails}>
                  <Text style={styles.settingItemTitle}>{item.title}</Text>
                  <Text style={styles.settingItemDescription}>{item.description}</Text>
                </View>
              </View>
              <View style={styles.settingItemRight}>
                {item.type === 'toggle' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#D1D5DB', true: '#059669' }}
                    thumbColor={item.value ? '#FFFFFF' : '#F3F4F6'}
                  />
                ) : (
                  <ChevronRight size={20} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Text style={styles.appInfoTitle}>About</Text>
          <View style={styles.appInfoCard}>
            <Text style={styles.appVersion}>VAR LIFE v1.0.0</Text>
            <Text style={styles.appDescription}>
              Student ride-hailing app for safe and affordable transportation
            </Text>
            <Text style={styles.appCopyright}>
              © 2024 VAR LIFE. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  settingsContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingItemDetails: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  settingItemDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingItemRight: {
    marginLeft: 16,
  },
  appInfoContainer: {
    padding: 24,
  },
  appInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  appInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appVersion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});