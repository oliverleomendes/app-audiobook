
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { audiobooks } from '../data/audiobooks';
import AudioPlayer from '../components/AudioPlayer';

export default function PlayerScreen({ route }: any) {
  const { id } = route.params;
  const book = audiobooks.find(a => a.id === id);
  const [selectedChapter, setSelectedChapter] = useState(book?.chapters[0]);

  if (!book) return <Text>Audiobook não encontrado</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image source={{ uri: book.cover }} style={{ width: '100%', height: 300, borderRadius: 10 }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{book.title}</Text>
      <Text>{book.author}</Text>

      <Text style={{ marginTop: 20, fontSize: 16 }}>Capítulos</Text>
      <FlatList
        data={book.chapters}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedChapter(item)} style={{ paddingVertical: 5 }}>
            <Text style={{ color: selectedChapter?.id === item.id ? 'blue' : 'black' }}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {selectedChapter && <AudioPlayer audioId={selectedChapter.id} uri={selectedChapter.file} />}
    </View>
  );
}
