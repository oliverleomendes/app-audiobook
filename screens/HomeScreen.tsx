
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { audiobooks } from '../data/audiobooks';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <FlatList
      data={audiobooks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Player', { id: item.id })} style={{ flexDirection: 'row', padding: 10 }}>
          <Image source={{ uri: item.cover }} style={{ width: 60, height: 90, marginRight: 10 }} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.author}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
