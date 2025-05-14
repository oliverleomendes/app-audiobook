import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { audiobooks } from '../data/audiobooks';
import AudioPlayer from '../components/AudioPlayer';

export default function PlayerScreen({ route }: any) {
  const { id } = route.params;
  const book = audiobooks.find(a => a.id === id);
  const [selectedChapter, setSelectedChapter] = useState(book?.chapters[0]);

  if (!book) return <Text>Audiobook não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      <Text style={styles.sectionTitle}>Capítulos</Text>

      <FlatList
        data={book.chapters}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedChapter(item)}
            style={[
              styles.chapterItem,
              selectedChapter?.id === item.id && styles.chapterSelected
            ]}
          >
            <Text style={selectedChapter?.id === item.id ? styles.chapterTextSelected : styles.chapterText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />

      <View style={styles.playerWrapper}>
        {selectedChapter && <AudioPlayer audioId={selectedChapter.id} uri={selectedChapter.file} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    padding: 20,
  },
  cover: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  author: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  chapterItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
  },
  chapterSelected: {
    backgroundColor: '#7C3AED',
  },
  chapterText: {
    color: '#1F2937',
    fontSize: 15,
  },
  chapterTextSelected: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  playerWrapper: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
});
