import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Perfil do Usuário</Text>
      <Button title="Sair" onPress={() => alert('Logout simulado')} />
    </View>
  );
}
