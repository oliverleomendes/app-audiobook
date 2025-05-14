import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { audiobooks } from '../data/audiobooks';
import { getFavorites, toggleFavorite } from '../utils/favorites';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigation = useNavigation<any>();

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleToggleFavorite = async (id: string) => {
    const updated = await toggleFavorite(id);
    setFavorites(updated);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const favoriteBooks = audiobooks.filter(book => favorites.includes(book.id));

  const renderItem = ({ item }: any) => (
    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Player', { id: item.id })}
        style={{ flexDirection: 'row', flex: 1 }}
      >
        <Image source={{ uri: item.cover }} style={{ width: 60, height: 90, marginRight: 10 }} />
        <View>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.author}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
        <Ionicons name="heart" size={24} color="tomato" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Text style={{ fontSize: 22, textAlign: 'center' }}>Favoritos</Text>
      {favoriteBooks.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum favorito ainda.</Text>
      ) : (
        <FlatList
          data={favoriteBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}
