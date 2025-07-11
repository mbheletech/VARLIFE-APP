import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Settings, 
  CreditCard, 
  Clock, 
  GraduationCap, 
  Users, 
  Heart, 
  Shield, 
  Star, 
  ChevronRight,
  Check,
  DollarSign,
  Gift
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [favorites] = useState(['University of Mpumalanga', 'Riverside Mall', 'Nelspruit CBD']);
  
  const userStats = {
    totalRides: 47,
    rating: 4.8,
    totalSaved: 342.75
  };

  const handleMenuPress = (item: string) => {
    Alert.alert(item, `This would navigate to ${item} screen`);
  };

  const menuItems = [
    {
      id: 'payment',
      title: 'Payment Methods',
      description: 'Manage cards & wallets',
      icon: <CreditCard size={20} color="#2563EB" />,
      bgColor: '#EBF8FF'
    },
    {
      id: 'history',
      title: 'Ride History',
      description: 'View past trips',
      icon: <Clock size={20} color="#7C3AED" />,
      bgColor: '#F3E8FF'
    },
    {
      id: 'verification',
      title: 'Student Verification',
      description: 'University of Mpumalanga',
      icon: <GraduationCap size={20} color="#059669" />,
      bgColor: '#F0FDF4',
      verified: true
    },
    {
      id: 'referral',
      title: 'Refer Friends',
      description: 'Earn R50 credit per referral',
      icon: <Users size={20} color="#EA580C" />,
      bgColor: '#FFF7ED'
    },
    {
      id: 'favorites',
      title: 'Favorite Places',
      description: `${favorites.length} saved locations`,
      icon: <Heart size={20} color="#DC2626" />,
      bgColor: '#FEF2F2'
    },
    {
      id: 'safety',
      title: 'Safety Center',
      description: 'Emergency contacts & features',
      icon: <Shield size={20} color="#6B7280" />,
      bgColor: '#F9FAFB'
    },
    {
      id: 'rating',
      title: 'Rate Your Experience',
      description: 'Help us improve VAR LIFE',
      icon: <Star size={20} color="#F59E0B" />,
      bgColor: '#FFFBEB'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#374151']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => router.push('/settings')}
            >
              <Settings size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <LinearGradient
                colors={['#D1D5DB', '#9CA3AF']}
                style={styles.profileImage}
              >
                <User size={40} color="#6B7280" />
              </LinearGradient>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@ump.ac.za</Text>
                <View style={styles.verificationBadge}>
                  <View style={styles.verificationDot} />
                  <Text style={styles.verificationText}>Verified Institution Student</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.totalRides}</Text>
                <Text style={styles.statLabel}>Rides</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userStats.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#059669' }]}>R{userStats.totalSaved}</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.title)}
            >
              <View style={styles.menuItemContent}>
                <View style={[styles.menuItemIcon, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>
                <View style={styles.menuItemDetails}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
              </View>
              <View style={styles.menuItemRight}>
                {item.verified && (
                  <View style={styles.verifiedBadge}>
                    <Check size={16} color="#059669" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
                <ChevronRight size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Student Perks */}
        <View style={styles.perksContainer}>
          <LinearGradient
            colors={['#EBF8FF', '#F0F9FF']}
            style={styles.perksCard}
          >
            <Text style={styles.perksTitle}>Student Perks</Text>
            <Text style={styles.perksDescription}>
              Enjoy exclusive benefits as a verified student
            </Text>
            <View style={styles.perksGrid}>
              <View style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <DollarSign size={24} color="#059669" />
                </View>
                <Text style={styles.perkTitle}>15% Discount</Text>
                <Text style={styles.perkDescription}>On all rides</Text>
              </View>
              <View style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <Users size={24} color="#2563EB" />
                </View>
                <Text style={styles.perkTitle}>Group Rides</Text>
                <Text style={styles.perkDescription}>Split with friends</Text>
              </View>
              <View style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <Shield size={24} color="#7C3AED" />
                </View>
                <Text style={styles.perkTitle}>Priority Support</Text>
                <Text style={styles.perkDescription}>24/7 student help</Text>
              </View>
              <View style={styles.perkItem}>
                <View style={styles.perkIcon}>
                  <Gift size={24} color="#EA580C" />
                </View>
                <Text style={styles.perkTitle}>Referral Bonus</Text>
                <Text style={styles.perkDescription}>R50 per friend</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>VAR LIFE v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made for students in Mpumalanga</Text>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  profileInfoContainer: {
    padding: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationDot: {
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    marginRight: 8,
  },
  verificationText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  verifiedText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
    marginLeft: 4,
  },
  perksContainer: {
    margin: 24,
  },
  perksCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  perksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  perksDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  perksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  perkItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  perkIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  perkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  perkDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    padding: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#D1D5DB',
  },
});