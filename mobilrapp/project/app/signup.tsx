import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    router.push('/verification');
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
                <Text style={styles.title}>Create your account</Text>
              </LinearGradient>
              <Text style={styles.subtitle}>Join the verified student community in Mpumalanga</Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange('firstName', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange('lastName', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email (e.g., student@ump.ac.za)"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone number (+27)"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
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
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#F3F4F6']}
                  style={styles.continueButtonGradient}
                >
                  <Text style={styles.continueButtonText}>Continue to Student Verification</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
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
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});