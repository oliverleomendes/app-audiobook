import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const handleLogout = () => {
    alert('Logout simulado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Meu Perfil</Text>

      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={80} color="#7C3AED" style={{ marginBottom: 10 }} />
        <Text style={styles.name}>Usuário Exemplo</Text>
        <Text style={styles.email}>usuario@email.com</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
