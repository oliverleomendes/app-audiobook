import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AudioPlayer from '../components/AudioPlayer';

export async function fecthCapitulos(id: number) {
  const res = await fetch(`http://localhost/api-audiobook/capitulos/listar.php?id_livro=${id}`);
  const data = await res.json();
  return data.capitulos;
}

export async function fetchAudiobook(id: number) {
  const res = await fetch(`http://localhost/api-audiobook/livros/listar.php?id=${id}`);
  const data = await res.json();
  return data.livros;
}

export default function PlayerScreen({ route }: any) {
  const { id } = route.params;
  const [audiobook, setAudiobook] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetchAudiobook(id).then(setAudiobook);
    fecthCapitulos(id).then(setSelectedChapter);
  }, [id]);

  if (!audiobook) return <Text>Audiobook não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: audiobook.capa_url }} style={styles.cover} />
      <Text style={styles.title}>{audiobook.titulo}</Text>
      <Text style={styles.author}>{audiobook.autor}</Text>

      <Text style={styles.sectionTitle}>Capítulos</Text>

      <FlatList
        data={selectedChapter}
        keyExtractor={item => item.id_capitulo}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedChapter(item)}
            style={[
              styles.chapterItem,
              selectedChapter?.id_capitulo === item.id_capitulo && styles.chapterSelected
            ]}
          >
            <Text style={selectedChapter?.id_capitulo === item.id_capitulo ? styles.chapterTextSelected : styles.chapterText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />

      <View style={styles.playerWrapper}>
        {selectedChapter && <AudioPlayer audioId={selectedChapter.id_capitulo} uri={selectedChapter.audio_url} />}
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
