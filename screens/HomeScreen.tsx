import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { fetchAudiobooks } from '../data/audiobooks';
import { getFavorites, toggleFavorite } from '../utils/favorites';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [audiobooks, setAudiobooks] = useState([]);

  useEffect(() => { 
    loadFavorites();
    fetchAudiobooks().then(setAudiobooks);
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
    const isFav = favorites.includes(item.id_livro);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => navigation.navigate('Player', { id: item.id_livro })}
        >
          <Image
            source={{ uri: item.capa_url }}
            style={styles.cover}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.author}>{item.autor}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleToggleFavorite(item.id_livro)}>
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
      <Text style={styles.appTitle}>🎧 AudiobookApp</Text>
      <FlatList
        data={audiobooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_livro}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
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
