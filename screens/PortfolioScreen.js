import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const COINS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 5800000 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 320000 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 12000 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 14 },
];

export default function PortfolioScreen() {
  const [holdings, setHoldings] = useState({ bitcoin: '0.001', ethereum: '0.5' });
  const [editing, setEditing] = useState(null);

  const total = COINS.reduce((sum, coin) => {
    return sum + (parseFloat(holdings[coin.id] || 0) * coin.price);
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Portfolio Value</Text>
        <Text style={styles.totalValue}>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Text>
      </View>
      <FlatList
        data={COINS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const qty = parseFloat(holdings[item.id] || 0);
          const value = qty * item.price;
          return (
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TextInput
                  style={styles.input}
                  value={holdings[item.id] || '0'}
                  onChangeText={text => setHoldings(prev => ({ ...prev, [item.id]: text }))}
                  keyboardType="decimal-pad"
                  placeholder="qty"
                  placeholderTextColor="#555"
                />
                <Text style={styles.qtyLabel}>quantity</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.value}>₹{value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
                <Text style={styles.price}>@ ₹{item.price.toLocaleString('en-IN')}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 8 },
  totalCard: { backgroundColor: '#00d4ff22', borderColor: '#00d4ff', borderWidth: 1, borderRadius: 16, padding: 20, margin: 8, alignItems: 'center' },
  totalLabel: { color: '#00d4ff', fontSize: 14 },
  totalValue: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a2540', margin: 6, padding: 16, borderRadius: 12 },
  name: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  symbol: { color: '#888', fontSize: 12, marginTop: 2 },
  input: { color: '#fff', backgroundColor: '#0a0f1e', borderRadius: 8, padding: 6, width: 70, textAlign: 'center', borderColor: '#00d4ff', borderWidth: 1 },
  qtyLabel: { color: '#555', fontSize: 10, marginTop: 2 },
  value: { color: '#00e676', fontSize: 15, fontWeight: 'bold' },
  price: { color: '#888', fontSize: 11, marginTop: 2 },
});