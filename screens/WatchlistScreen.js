import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const AVAILABLE = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
];

export default function WatchlistScreen() {
  const [watchlist, setWatchlist] = useState(['bitcoin', 'ethereum']);

  const toggle = (id) => {
    setWatchlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Watchlist</Text>
      <FlatList
        data={AVAILABLE}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const watching = watchlist.includes(item.id);
          return (
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol}</Text>
              </View>
              <TouchableOpacity onPress={() => toggle(item.id)} style={[styles.btn, { backgroundColor: watching ? '#ff5252' : '#00d4ff' }]}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{watching ? 'Remove' : '+ Add'}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e', padding: 8 },
  heading: { color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 12 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a2540', margin: 6, padding: 16, borderRadius: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  symbol: { color: '#888', fontSize: 12, marginTop: 2 },
  btn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
});