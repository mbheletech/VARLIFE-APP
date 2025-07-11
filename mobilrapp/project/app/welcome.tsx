import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GraduationCap } from 'lucide-react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    bounce.start();
  }, [bounceAnim]);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#374151', '#000000']}
        style={styles.gradient}
      >
        {/* Animated background elements */}
        <View style={styles.backgroundElements}>
          <Animated.View style={[styles.bgCircle1, { opacity: bounceAnim }]} />
          <Animated.View style={[styles.bgCircle2, { opacity: bounceAnim }]} />
          <Animated.View style={[styles.bgCircle3, { opacity: bounceAnim }]} />
        </View>
        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Animated.View style={[styles.logoCircle, { transform: [{ translateY }] }]}>
              <LinearGradient
                colors={['#FFFFFF', '#E5E7EB']}
                style={styles.logoGradient}
              >
                <GraduationCap size={56} color="#000000" />
              </LinearGradient>
            </Animated.View>
            <Text style={styles.title}>VAR LIFE</Text>
            <Text style={styles.subtitle}>Student rides, verified and safe</Text>
            <Text style={styles.location}>Nelspruit • White River • Mpumalanga</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/signup')}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F3F4F6']}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
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
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgCircle1: {
    position: 'absolute',
    top: 80,
    left: 40,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 40,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: 128,
    right: 32,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 64,
  },
  bgCircle3: {
    position: 'absolute',
    top: '50%',
    right: 80,
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleGradient: {
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'transparent',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#6B7280',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});