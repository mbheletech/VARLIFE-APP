import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Search, Clock, Users, Star, Car, Shield, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import MapViewComponent from '@/components/MapView';

export default function HomeScreen() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, []);

  const rideOptions = [
    {
      id: 'standard',
      name: 'Standard Ride',
      description: 'Affordable rides with verified student drivers',
      price: 'R25.50',
      eta: '3-5 min',
      icon: <Car size={24} color="#FFFFFF" />,
      gradient: ['#374151', '#4B5563'],
      savings: 'Save 15%'
    },
    {
      id: 'campus',
      name: 'Campus Shuttle',
      description: 'Shared rides between campus locations',
      price: 'R12.75',
      eta: '5-8 min',
      icon: <Users size={24} color="#FFFFFF" />,
      gradient: ['#2563EB', '#1D4ED8'],
      savings: 'Save 40%'
    },
    {
      id: 'express',
      name: 'Express',
      description: 'Faster rides with priority matching',
      price: 'R32.00',
      eta: '2-4 min',
      icon: <Zap size={24} color="#FFFFFF" />,
      gradient: ['#7C3AED', '#5B21B6'],
      savings: 'Save 10%'
    }
  ];

  const quickDestinations = [
    { name: 'University of Mpumalanga', distance: '2.1 km' },
    { name: 'Riverside Mall', distance: '4.3 km' },
    { name: 'Nelspruit CBD', distance: '6.8 km' },
    { name: 'White River', distance: '12.5 km' }
  ];

  const handleRideSelect = (ride) => {
    setSelectedRide(ride);
    router.push({
      pathname: '/matching',
      params: { rideData: JSON.stringify(ride) }
    });
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
            <View>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.userName}>John</Text>
            </View>
            <Animated.View style={[styles.locationIndicator, { transform: [{ scale: pulseAnim }] }]}>
              <MapPin size={20} color="#10B981" />
            </Animated.View>
          </View>
          <Text style={styles.headerSubtitle}>Where would you like to go?</Text>
        </LinearGradient>
        
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchCard}>
            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <View style={styles.locationDot} />
                <TextInput
                  style={styles.input}
                  placeholder="Pickup location"
                  placeholderTextColor="#9CA3AF"
                  value={pickup}
                  onChangeText={setPickup}
                />
              </View>
              <View style={styles.inputSeparator} />
              <View style={styles.inputRow}>
                <View style={[styles.locationDot, { backgroundColor: '#374151' }]} />
                <TextInput
                  style={styles.input}
                  placeholder="Where to?"
                  placeholderTextColor="#9CA3AF"
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.searchButton}>
              <LinearGradient
                colors={['#000000', '#374151']}
                style={styles.searchButtonGradient}
              >
                <Search size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Quick Destinations */}
        <View style={styles.quickDestinationsContainer}>
          <Text style={styles.sectionTitle}>Quick destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickDestinationsScroll}>
            {quickDestinations.map((dest, index) => (
              <TouchableOpacity key={index} style={styles.quickDestinationCard}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.quickDestinationName}>{dest.name}</Text>
                <Text style={styles.quickDestinationDistance}>{dest.distance}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Map Preview */}
        <View style={styles.mapPreviewContainer}>
          <Text style={styles.sectionTitle}>Nearby drivers</Text>
          <View style={styles.mapContainer}>
            <MapViewComponent 
              style={styles.mapPreview}
              driverLocation={{
                latitude: -25.4753,
                longitude: 30.9694
              }}
            />
          </View>
        </View>
        
        {/* Ride Options */}
        <View style={styles.rideOptionsContainer}>
          <Text style={styles.sectionTitle}>Choose your ride</Text>
          {rideOptions.map((ride) => (
            <TouchableOpacity
              key={ride.id}
              style={styles.rideOptionCard}
              onPress={() => handleRideSelect(ride)}
            >
              <View style={styles.rideOptionContent}>
                <LinearGradient
                  colors={ride.gradient}
                  style={styles.rideOptionIcon}
                >
                  {ride.icon}
                </LinearGradient>
                <View style={styles.rideOptionDetails}>
                  <View style={styles.rideOptionHeader}>
                    <Text style={styles.rideOptionName}>{ride.name}</Text>
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>{ride.savings}</Text>
                    </View>
                  </View>
                  <Text style={styles.rideOptionDescription}>{ride.description}</Text>
                  <View style={styles.rideOptionMeta}>
                    <View style={styles.rideOptionMetaItem}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.rideOptionMetaText}>{ride.eta}</Text>
                    </View>
                    <View style={styles.rideOptionMetaItem}>
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.rideOptionMetaText}>4.8</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rideOptionPrice}>
                  <Text style={styles.priceText}>{ride.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Safety Banner */}
        <View style={styles.safetyContainer}>
          <LinearGradient
            colors={['#EBF8FF', '#F0F9FF']}
            style={styles.safetyBanner}
          >
            <Shield size={32} color="#2563EB" />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Your safety is our priority</Text>
              <Text style={styles.safetyDescription}>
                All drivers are verified students with background checks
              </Text>
            </View>
          </LinearGradient>
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
    padding: 24,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationIndicator: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  searchContainer: {
    padding: 24,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 12,
  },
  inputSeparator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 28,
    marginVertical: 8,
  },
  searchButton: {
    marginLeft: 16,
  },
  searchButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickDestinationsContainer: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  quickDestinationsScroll: {
    paddingRight: 24,
  },
  quickDestinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickDestinationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  quickDestinationDistance: {
    fontSize: 12,
    color: '#6B7280',
  },
  mapPreviewContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mapPreview: {
    flex: 1,
  },
  rideOptionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  rideOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  rideOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideOptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rideOptionDetails: {
    flex: 1,
  },
  rideOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rideOptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginRight: 12,
  },
  savingsBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  savingsText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  rideOptionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  rideOptionMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  rideOptionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rideOptionMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  rideOptionPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  safetyContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  safetyContent: {
    flex: 1,
    marginLeft: 16,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  safetyDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});