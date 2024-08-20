import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const StockDataScreen = () => {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchStockData = useCallback(async () => {
        try {
             const response = await axios.get('https://api.collectapi.com/economy/hisseSenedi', {
                 headers: {
                   'Content-Type': 'application/json',
                  'Authorization': 'apikey 0psalCxs5WdmtZDtWY1nuj:4zTzO1yxmp2gQfrKFsZMRM'
                 },
                 params: {
                     page: page,
                     limit: 20
                 }
             });

            if (response.data && response.data.result && Array.isArray(response.data.result)) {
                if (response.data.result.length > 0) {
                    setStockData(prevData => [...prevData, ...response.data.result]);
                } else {
                    setHasMore(false);
                }
            } else {
                setError('Veri alınamadı veya beklenmeyen veri formatı.');
            }
        } catch (err) {
            setError('API Hatası: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchStockData();
    }, [fetchStockData]);

    const loadMoreData = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const renderStockItem = ({ item }) => (
        <View style={styles.stockItem}>
            <Text style={styles.stockName}>{item.text || 'Bilinmiyor'}</Text>
            <Text style={styles.stockPrice}>Son Fiyat: {item.lastpricestr || 'Bilinmiyor'}</Text>
            <Text style={styles.stockVolume}>Hacim: {item.hacimstr || 'Bilinmiyor'}</Text>
            <Text style={styles.stockDate}>Zaman: {item.time || 'Bilinmiyor'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                data={stockData}
                renderItem={renderStockItem}
                keyExtractor={(item, index) => item.code + index}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                contentContainerStyle={styles.stockList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    stockList: {
        flexGrow: 1,
    },
    stockItem: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    stockName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stockPrice: {
        fontSize: 16,
        color: '#333',
    },
    stockVolume: {
        fontSize: 16,
        color: '#555',
    },
    stockDate: {
        fontSize: 14,
        color: '#777',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StockDataScreen;
