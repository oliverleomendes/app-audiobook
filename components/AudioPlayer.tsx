
import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  audioId: string;
  uri: string;
}

export default function AudioPlayer({ audioId, uri }: Props) {
  const sound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound.current) sound.current.unloadAsync();
    };
  }, [uri]);

  const loadAudio = async () => {
    const saved = await AsyncStorage.getItem(`progress-${audioId}`);
    const initial = saved ? parseInt(saved) : 0;

    const { sound: s } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false, positionMillis: initial },
      onPlaybackStatusUpdate
    );
    sound.current = s;
    setPosition(initial);
  };

  const onPlaybackStatusUpdate = async (status: any) => {
    if (status.isLoaded && status.positionMillis !== undefined) {
      setPosition(status.positionMillis);
      await AsyncStorage.setItem(`progress-${audioId}`, status.positionMillis.toString());
    }
  };

  const togglePlay = async () => {
    if (!sound.current) return;
    if (isPlaying) await sound.current.pauseAsync();
    else await sound.current.playAsync();
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <Button title={isPlaying ? 'Pausar' : 'Reproduzir'} onPress={togglePlay} />
      <Text>Progresso: {Math.floor(position / 1000)}s</Text>
    </View>
  );
}
