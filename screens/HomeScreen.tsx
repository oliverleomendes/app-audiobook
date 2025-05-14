import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { audiobooks } from '../data/audiobooks';
import { getFavorites, toggleFavorite } from '../utils/favorites';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleToggleFavorite = async (id: string) => {
    const updated = await toggleFavorite(id);
    setFavorites(updated);
  };

  const renderItem = ({ item }: any) => {
    const isFav = favorites.includes(item.id);

    return (
      <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', flex: 1 }}
          onPress={() => navigation.navigate('Player', { id: item.id })}
        >
          <Image source={{ uri: item.cover }} style={{ width: 60, height: 90, marginRight: 10 }} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.author}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
          <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color="tomato" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        🎧 AudiobookApp
      </Text>
      <FlatList
        data={audiobooks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
