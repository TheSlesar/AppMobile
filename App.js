import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');

  const addEntry = () => {
    if (text.trim() === '') return;
    const newEntry = {
      id: Date.now().toString(),
      content: text.trim(),
      timestamp: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
    setText('');
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Дневник благодарностей</Text>

        <TextInput
          style={styles.input}
          placeholder="Напишите, за что вы благодарны сегодня..."
          placeholderTextColor="#A0A0A0"
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.addButton} onPress={addEntry}>
          <Text style={styles.addButtonText}>Добавить запись</Text>
        </TouchableOpacity>

        {entries.map((item) => (
          <View key={item.id} style={styles.entryCard}>
            <Text style={styles.entryText}>{item.content}</Text>
            <Text style={styles.entryDate}>{item.timestamp}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteEntry(item.id)}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#8C6D5E',
  },
  input: {
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    borderColor: '#D4C1B0',
    borderWidth: 1,
    minHeight: 80,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#B8D9C8',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  addButtonText: {
    color: '#5D7A6F',
    fontSize: 16,
    fontWeight: '600',
  },
  entryCard: {
    backgroundColor: '#F0E6D2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    width: '100%',
    position: 'relative',
  },
  entryText: {
    fontSize: 16,
    color: '#5D5D5D',
    marginBottom: 6,
  },
  entryDate: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F4B3C2',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#9E4E61',
    fontSize: 14,
    fontWeight: 'bold',
  },
});