import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';

const COINS = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'ripple', 'cardano', 'polkadot', 'litecoin'];

export default function HomeScreen() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrices = async () => {
    try {
      const ids = COINS.join(',');
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${ids}&order=market_cap_desc`);
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchPrices(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchPrices(); };

  if (loading) return <ActivityIndicator style={{ flex: 1, backgroundColor: '#0a0f1e' }} color="#00d4ff" size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00d4ff" />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>₹{item.current_price.toLocaleString('en-IN')}</Text>
              <Text style={[styles.change, { color: item.price_change_percentage_24h >= 0 ? '#00e676' : '#ff5252' }]}>
                {item.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1e' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a2540', margin: 8, padding: 16, borderRadius: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  symbol: { color: '#888', fontSize: 12, marginTop: 2 },
  price: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  change: { fontSize: 13, marginTop: 2 },
});