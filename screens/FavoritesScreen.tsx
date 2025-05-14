import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
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

  const favoriteBooks = audiobooks.filter((book) => favorites.includes(book.id));

  const renderItem = ({ item }: any) => {
    const isFav = favorites.includes(item.id);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => navigation.navigate('Player', { id: item.id })}
        >
          <Image
            source={{ uri: item.cover }}
            style={styles.cover}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={28}
            color="#7C3AED"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>❤️ Meus Favoritos</Text>
      {favoriteBooks.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
      ) : (
        <FlatList
          data={favoriteBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
