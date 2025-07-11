import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignIn = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#374151', '#000000']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.keyboardAvoid}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <LinearGradient
                colors={['#FFFFFF', '#D1D5DB']}
                style={styles.titleGradient}
              >
                <Text style={styles.title}>Welcome back</Text>
              </LinearGradient>
              <Text style={styles.subtitle}>Sign in to your VAR LIFE account</Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                />
              </View>
              
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignIn}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#F3F4F6']}
                  style={styles.signInButtonGradient}
                >
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.forgotContainer}>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleGradient: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'transparent',
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    lineHeight: 24,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputGroup: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  signInButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  signInButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  forgotContainer: {
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});