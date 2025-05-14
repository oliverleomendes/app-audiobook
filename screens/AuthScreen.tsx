
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function AuthScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (user.trim() && pass.trim()) {
      navigation.replace('Tabs');
    } else {
      alert('Preencha todos os campos.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={80} color="#7C3AED" style={{ marginBottom: 20 }} />

        <Text style={styles.title}>Entrar</Text>

        <TextInput
          placeholder="Usuário"
          value={user}
          onChangeText={setUser}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={pass}
          onChangeText={setPass}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput placeholder="Usuário" onChangeText={setUser} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setPass} style={{ borderBottomWidth: 1, marginBottom: 20 }} />
      <Button title="Entrar" onPress={() => navigation.replace('Tabs')} />
    </View>
  );
}
