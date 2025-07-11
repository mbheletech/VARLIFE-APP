import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Shield, MessageCircle, Navigation, Phone, Star, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function TrackingScreen() {
  const { rideData } = useLocalSearchParams();
  const [selectedRide, setSelectedRide] = useState(null);
  const [eta, setEta] = useState(3);

  const mockDriver = {
    name: "Sarah Johnson",
    rating: 4.9,
    car: "Toyota Camry",
    plate: "MHL-123-GP",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=150&h=150&fit=crop&crop=face",
    studentId: "UMP2024",
    verified: true
  };

  useEffect(() => {
    if (rideData) {
      try {
        setSelectedRide(JSON.parse(rideData as string));
      } catch (error) {
        console.error('Failed to parse ride data:', error);
      }
    }
  }, [rideData]);

  useEffect(() => {
    const etaInterval = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          clearInterval(etaInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(etaInterval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#DC2626' }]}>
              <Shield size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2563EB' }]}>
              <MessageCircle size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Map */}
        <View style={styles.mapContainer}>
          <LinearGradient
            colors={['#374151', '#4B5563', '#374151']}
            style={styles.mapGradient}
          >
            <View style={styles.mapContent}>
              <Navigation size={64} color="#9CA3AF" />
              <Text style={styles.mapTitle}>Live tracking map</Text>
              <Text style={styles.mapSubtitle}>Real-time location updates</Text>
            </View>
          </LinearGradient>
        </View>
        
        {/* Driver Info */}
        <View style={styles.driverInfoContainer}>
          <View style={styles.driverHeader}>
            <Text style={styles.driverHeaderTitle}>Your driver is on the way</Text>
            <LinearGradient
              colors={['#DCFCE7', '#BBF7D0']}
              style={styles.etaBadge}
            >
              <Text style={styles.etaBadgeText}>{eta} min</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.driverCard}>
            <View style={styles.driverInfo}>
              <Image 
                source={{ uri: mockDriver.photo }}
                style={styles.driverImage}
              />
              <View style={styles.driverDetails}>
                <View style={styles.driverNameRow}>
                  <Text style={styles.driverName}>{mockDriver.name}</Text>
                  {mockDriver.verified && (
                    <View style={styles.verifiedBadge}>
                      <Check size={12} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <View style={styles.driverRating}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{mockDriver.rating}</Text>
                  <Text style={styles.studentId}>• Student ID: {mockDriver.studentId}</Text>
                </View>
                <Text style={styles.carInfo}>{mockDriver.car} • {mockDriver.plate}</Text>
              </View>
            </View>
            <View style={styles.driverActions}>
              <TouchableOpacity style={styles.callButton}>
                <Phone size={20} color="#059669" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <MessageCircle size={20} color="#2563EB" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Route */}
          <View style={styles.routeContainer}>
            <View style={styles.routeItem}>
              <View style={styles.routeFromDot} />
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeLocation}>University of Mpumalanga - Main Campus</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeItem}>
              <View style={styles.routeToDot} />
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>Drop-off</Text>
                <Text style={styles.routeLocation}>Riverside Mall - Nelspruit</Text>
              </View>
            </View>
          </View>
          
          {/* Trip Details */}
          <View style={styles.tripDetailsContainer}>
            <View style={styles.tripDetailRow}>
              <Text style={styles.tripDetailLabel}>Trip fare</Text>
              <Text style={styles.tripDetailValue}>{selectedRide?.price || 'R25.50'}</Text>
            </View>
            <View style={styles.tripDetailRow}>
              <Text style={styles.tripDetailLabel}>Student discount</Text>
              <Text style={styles.tripDetailDiscount}>-R3.75</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 200,
    marginBottom: 0,
  },
  mapGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContent: {
    alignItems: 'center',
  },
  mapTitle: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 4,
  },
  mapSubtitle: {
    color: '#6B7280',
    fontSize: 14,
  },
  driverInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  driverHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  etaBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  etaBadgeText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: 'bold',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  studentId: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  carInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  driverActions: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF8FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeContainer: {
    marginBottom: 24,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeFromDot: {
    width: 16,
    height: 16,
    backgroundColor: '#10B981',
    borderRadius: 8,
    marginRight: 16,
  },
  routeToDot: {
    width: 16,
    height: 16,
    backgroundColor: '#374151',
    borderRadius: 8,
    marginRight: 16,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#D1D5DB',
    marginLeft: 7,
    marginBottom: 8,
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  routeLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  tripDetailsContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  tripDetailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  tripDetailDiscount: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
});