import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Plus, Wallet, Gift, DollarSign, Shield, Check } from 'lucide-react-native';

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card1');
  const [walletBalance] = useState(127.50);
  const [promoCode, setPromoCode] = useState('');

  const paymentMethods = [
    {
      id: 'card1',
      type: 'Credit Card',
      name: 'Visa ending in 4242',
      icon: <CreditCard size={24} color="#FFFFFF" />,
      primary: true
    },
    {
      id: 'card2',
      type: 'Debit Card',
      name: 'Mastercard ending in 8888',
      icon: <CreditCard size={24} color="#FFFFFF" />,
      primary: false
    },
    {
      id: 'wallet',
      type: 'VAR LIFE Wallet',
      name: `Balance: R${walletBalance.toFixed(2)}`,
      icon: <Wallet size={24} color="#FFFFFF" />,
      primary: false
    }
  ];

  const transactions = [
    { id: 1, type: 'Ride Payment', amount: -25.50, date: '2024-01-15', description: 'UMP to Riverside Mall' },
    { id: 2, type: 'Wallet Top-up', amount: 100.00, date: '2024-01-14', description: 'Bank transfer' },
    { id: 3, type: 'Ride Payment', amount: -12.75, date: '2024-01-14', description: 'Campus Shuttle' },
    { id: 4, type: 'Student Discount', amount: 3.85, date: '2024-01-13', description: 'Applied to Night Ride' }
  ];

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      Alert.alert('Promo Code', 'Promo code applied successfully!');
      setPromoCode('');
    }
  };

  const handleAddPayment = () => {
    Alert.alert('Add Payment Method', 'This feature would open payment method setup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#000000', '#374151']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerSubtitle}>Manage your payment methods</Text>
        </LinearGradient>
        
        {/* Wallet Balance */}
        <View style={styles.walletContainer}>
          <LinearGradient
            colors={['#059669', '#047857']}
            style={styles.walletCard}
          >
            <View style={styles.walletHeader}>
              <Wallet size={32} color="#FFFFFF" />
              <Text style={styles.walletTitle}>VAR LIFE Wallet</Text>
            </View>
            <Text style={styles.walletBalance}>R{walletBalance.toFixed(2)}</Text>
            <Text style={styles.walletSubtext}>Available balance</Text>
            <TouchableOpacity style={styles.topUpButton}>
              <Plus size={20} color="#059669" />
              <Text style={styles.topUpText}>Top Up</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        
        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPayment}>
              <Plus size={20} color="#059669" />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                selectedPayment === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentMethodContent}>
                <LinearGradient
                  colors={['#374151', '#4B5563']}
                  style={styles.paymentMethodIcon}
                >
                  {method.icon}
                </LinearGradient>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <Text style={styles.paymentMethodType}>{method.type}</Text>
                  {method.primary && (
                    <Text style={styles.primaryBadge}>Primary</Text>
                  )}
                </View>
              </View>
              {selectedPayment === method.id && (
                <View style={styles.checkIcon}>
                  <Check size={20} color="#059669" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Promo Code */}
        <View style={styles.promoContainer}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoInputContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor="#9CA3AF"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.promoButton} onPress={handleApplyPromo}>
              <Gift size={20} color="#FFFFFF" />
              <Text style={styles.promoButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Student Savings */}
        <View style={styles.savingsContainer}>
          <LinearGradient
            colors={['#EBF8FF', '#DBEAFE']}
            style={styles.savingsCard}
          >
            <View style={styles.savingsHeader}>
              <DollarSign size={24} color="#2563EB" />
              <Text style={styles.savingsTitle}>Student Savings</Text>
            </View>
            <Text style={styles.savingsAmount}>R342.75</Text>
            <Text style={styles.savingsDescription}>Total saved with student discounts</Text>
            <View style={styles.savingsDetails}>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsLabel}>This month</Text>
                <Text style={styles.savingsValue}>R45.20</Text>
              </View>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsLabel}>Average per ride</Text>
                <Text style={styles.savingsValue}>R7.30</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionContent}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#059669' : '#DC2626' }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Security Notice */}
        <View style={styles.securityContainer}>
          <LinearGradient
            colors={['#F3F4F6', '#E5E7EB']}
            style={styles.securityCard}
          >
            <Shield size={24} color="#374151" />
            <Text style={styles.securityTitle}>Secure Payments</Text>
            <Text style={styles.securityDescription}>
              All transactions are encrypted and protected with bank-level security
            </Text>
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
  walletContainer: {
    padding: 24,
  },
  walletCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  walletBalance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  walletSubtext: {
    fontSize: 16,
    color: '#D1FAE5',
    marginBottom: 20,
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  topUpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 8,
  },
  paymentMethodsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#059669',
    marginLeft: 6,
  },
  paymentMethodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPaymentMethod: {
    borderColor: '#059669',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  paymentMethodType: {
    fontSize: 14,
    color: '#6B7280',
  },
  primaryBadge: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
    marginTop: 4,
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  promoInputContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#374151',
    marginRight: 12,
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  savingsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  savingsCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
    marginLeft: 12,
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  savingsDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  savingsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  savingsItem: {
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  savingsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  transactionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  securityCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 12,
    marginBottom: 8,
  },
  securityDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});