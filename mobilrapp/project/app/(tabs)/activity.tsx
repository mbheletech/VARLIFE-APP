import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, MapPin, Star, Car, Users, Moon } from 'lucide-react-native';

export default function ActivityScreen() {
  const mockRides = [
    {
      id: 1,
      type: 'Standard Ride',
      icon: <Car size={20} color="#FFFFFF" />,
      from: 'University of Mpumalanga',
      to: 'Riverside Mall',
      date: '2024-01-15',
      time: '14:30',
      price: 'R25.50',
      driver: 'Sarah Johnson',
      rating: 4.9,
      status: 'completed'
    },
    {
      id: 2,
      type: 'Campus Shuttle',
      icon: <Users size={20} color="#FFFFFF" />,
      from: 'UMP Main Campus',
      to: 'Student Residence',
      date: '2024-01-14',
      time: '18:15',
      price: 'R12.75',
      driver: 'Mike Chen',
      rating: 4.8,
      status: 'completed'
    },
    {
      id: 3,
      type: 'Safe Night Ride',
      icon: <Moon size={20} color="#FFFFFF" />,
      from: 'Nelspruit CBD',
      to: 'White River',
      date: '2024-01-13',
      time: '22:45',
      price: 'R28.50',
      driver: 'Lisa Adams',
      rating: 5.0,
      status: 'completed'
    }
  ];

  const stats = {
    totalRides: 47,
    totalSaved: 'R342',
    averageRating: 4.8,
    thisMonth: 12
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#374151']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Ride Activity</Text>
          <Text style={styles.headerSubtitle}>Your ride history and stats</Text>
        </LinearGradient>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNumber, { color: '#059669' }]}>{stats.totalSaved}</Text>
              <Text style={styles.statLabel}>Total Saved</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.averageRating}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.thisMonth}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </View>
        </View>
        
        {/* Recent Rides */}
        <View style={styles.ridesContainer}>
          <Text style={styles.ridesTitle}>Recent Rides</Text>
          
          {mockRides.map((ride) => (
            <TouchableOpacity key={ride.id} style={styles.rideCard}>
              <View style={styles.rideHeader}>
                <View style={styles.rideTypeContainer}>
                  <LinearGradient
                    colors={['#000000', '#374151']}
                    style={styles.rideTypeIcon}
                  >
                    {ride.icon}
                  </LinearGradient>
                  <View style={styles.rideTypeDetails}>
                    <Text style={styles.rideType}>{ride.type}</Text>
                    <Text style={styles.rideDate}>{ride.date} • {ride.time}</Text>
                  </View>
                </View>
                <View style={styles.ridePriceContainer}>
                  <Text style={styles.ridePrice}>{ride.price}</Text>
                  <View style={styles.rideStatus}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Completed</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.rideRoute}>
                <View style={styles.routeItem}>
                  <View style={styles.routeFromDot} />
                  <Text style={styles.routeText}>{ride.from}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeItem}>
                  <View style={styles.routeToDot} />
                  <Text style={styles.routeText}>{ride.to}</Text>
                </View>
              </View>
              
              <View style={styles.rideFooter}>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>Driver: {ride.driver}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{ride.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.rideAgainButton}>
                  <Text style={styles.rideAgainText}>Ride Again</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#3B82F6', '#1D4ED8']}
                style={styles.quickActionIcon}
              >
                <MapPin size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Book Ride</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.quickActionIcon}
              >
                <Clock size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
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
    padding: 24,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  statsContainer: {
    padding: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  ridesContainer: {
    padding: 24,
  },
  ridesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rideTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rideTypeDetails: {
    flex: 1,
  },
  rideType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  rideDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  ridePriceContainer: {
    alignItems: 'flex-end',
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  rideStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  rideRoute: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeFromDot: {
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    marginRight: 12,
  },
  routeToDot: {
    width: 12,
    height: 12,
    backgroundColor: '#374151',
    borderRadius: 6,
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#D1D5DB',
    marginLeft: 5,
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  rideAgainButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rideAgainText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  quickActionsContainer: {
    padding: 24,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});