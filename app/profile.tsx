@@ .. @@
 import React, { useState } from 'react';
 import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
 import { LinearGradient } from 'expo-linear-gradient';
+import { router } from 'expo-router';
 import { 
   User, 
   Settings, 
 }
@@ .. @@
           <View style={styles.headerContent}>
             <Text style={styles.headerTitle}>Profile</Text>
             <TouchableOpacity 
               style={styles.settingsButton}
-              onPress={() => router.push('/settings')}
+              onPress={() => router.push('/settings')}
             >
               <Settings size={24} color="#FFFFFF" />
             </TouchableOpacity>