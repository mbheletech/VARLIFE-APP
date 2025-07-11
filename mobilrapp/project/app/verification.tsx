import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Upload, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

export default function VerificationScreen() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    institution: '',
  });

  const spinValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVerifying) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
    } else {
      spinValue.setValue(0);
    }
  }, [isVerifying]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        setSelectedDocument(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        router.push('/(tabs)');
      }, 2000);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isVerifying) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#000000', '#374151', '#000000']}
          style={styles.gradient}
        >
          <View style={styles.loadingContainer}>
            <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
            <Text style={styles.loadingTitle}>Verifying your status...</Text>
            <Text style={styles.loadingSubtitle}>This may take a moment</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (isVerified) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#000000', '#374151', '#000000']}
          style={styles.gradient}
        >
          <View style={styles.successContainer}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.successIcon}
            >
              <Check size={40} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.successTitle}>Verification Complete!</Text>
            <Text style={styles.successSubtitle}>Welcome to VAR LIFE Mpumalanga</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#374151', '#000000']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Text style={styles.title}>Verify your student status</Text>
            <Text style={styles.subtitle}>
              We use SheerID to verify your enrollment at your institution
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Student email (.ac.za, .edu, or institution email)"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
              
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Select your institution</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your institution name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.institution}
                  onChangeText={(text) => handleInputChange('institution', text)}
                />
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.uploadContainer}
              onPress={handleDocumentPick}
            >
              <Upload size={48} color="#9CA3AF" />
              <Text style={styles.uploadTitle}>Upload Student ID or Enrollment Letter</Text>
              <Text style={styles.uploadSubtitle}>JPG, PNG, or PDF up to 10MB</Text>
              {selectedDocument && (
                <View style={styles.selectedDocument}>
                  <Text style={styles.selectedDocumentText}>{selectedDocument.name}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerification}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.verifyButtonGradient}
              >
                <Text style={styles.verifyButtonText}>Verify Student Status</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    gap: 24,
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
  pickerContainer: {
    gap: 8,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#D1D5DB',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  pickerText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  pickerPlaceholder: {
    color: '#9CA3AF',
  },
  institutionOptions: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden',
  },
  institutionOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  institutionOptionText: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  uploadTitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedDocument: {
    marginTop: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedDocumentText: {
    fontSize: 14,
    color: '#10B981',
    textAlign: 'center',
  },
  verifyButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  verifyButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  spinner: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: '#4B5563',
    borderTopColor: '#FFFFFF',
    borderRadius: 32,
    marginBottom: 32,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});