import { ArrowLeft, Share2, Shield, MessageCircle, Navigation, Phone, Star, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import MapViewComponent from '@/components/MapView';

export default function TrackingScreen() {
        {/* Map */}
        <View style={styles.mapContainer}>
          <MapViewComponent 
            pickup={{
              latitude: -25.4753,
              longitude: 30.9694,
              title: "University of Mpumalanga - Main Campus"
            }}
            destination={{
              latitude: -25.4647,
              longitude: 30.9886,
              title: "Riverside Mall - Nelspruit"
            }}
            driverLocation={{
              latitude: -25.4700,
              longitude: 30.9750
            }}
            style={styles.map}
          />
        </View>
}