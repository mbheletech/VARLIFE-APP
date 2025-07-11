import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

export default function MatchingScreen() {
  const { rideData } = useLocalSearchParams();
  const [selectedRide, setSelectedRide] = useState(null);
  const [progress, setProgress] = useState(0);

  const spinValue = React.useRef(new Animated.Value(0)).current;
  const progressSteps = [
    { text: 'Locating drivers...', color: '#10B981' },
    { text: 'Verifying credentials...', color: '#9CA3AF' },
    { text: 'Confirming match...', color: '#9CA3AF' },
  ];

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
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 2) {
          clearInterval(progressInterval);
          setTimeout(() => {
            router.push({
              pathname: '/tracking',
              params: { rideData: JSON.stringify(selectedRide) }
            });
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      spinAnimation.stop();
    };
  }, [selectedRide]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#374151', '#000000']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
          
          <Text style={styles.title}>Finding your ride...</Text>
          <Text style={styles.subtitle}>
            {selectedRide ? `Looking for ${selectedRide.name}` : 'Matching with nearby drivers'}
          </Text>
          <Text style={styles.description}>
            Searching verified student drivers in your area
          </Text>
          
          <View style={styles.progressContainer}>
            {progressSteps.map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <Animated.View 
                  style={[
                    styles.progressDot,
                    { 
                      backgroundColor: index <= progress ? step.color : '#6B7280',
                      transform: [{ 
                        scale: index === progress ? 1.2 : 1 
                      }]
                    }
                  ]} 
                />
                <Text style={[
                  styles.progressText,
                  { color: index <= progress ? '#FFFFFF' : '#9CA3AF' }
                ]}>
                  {step.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  spinner: {
    width: 128,
    height: 128,
    borderWidth: 4,
    borderColor: '#4B5563',
    borderTopColor: '#FFFFFF',
    borderRadius: 64,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressContainer: {
    gap: 12,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
  },
});