
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function AuthScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput placeholder="Usuário" onChangeText={setUser} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setPass} style={{ borderBottomWidth: 1, marginBottom: 20 }} />
      <Button title="Entrar" onPress={() => navigation.replace('Tabs')} />
    </View>
  );
}
