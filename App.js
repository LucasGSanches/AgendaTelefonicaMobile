import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [textName, setTextName] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  // 1. ADICIONAR NOVO CONTATO
  const handleAddItem = () => {
    if (!textName.trim()) {
      Alert.alert('Atenção', 'Digite um nome para adicionar!');
      return;
    }

    const id = Date.now().toString();
    const newItem = { id, name: textName, phone: textPhone };

    setItems((prevItems) => [...prevItems, newItem]);

    // Reseta o ComboBox para o valor vazio e limpa os campos de texto
    setSelectedValue('');
    setTextName('');
    setTextPhone('');
  };

  // 2. SELECIONAR UM CONTATO NO COMBOBOX
  const handleSelectChange = (itemValue) => {
    setSelectedValue(itemValue);

    if (itemValue === '') {
      // Se selecionou a opção padrão "Selecione um contato...", limpa os campos
      setTextName('');
      setTextPhone('');
    } else {
      // Procura o contato correspondente e preenche os TextInput
      const selectedContact = items.find((item) => item.id === itemValue);
      if (selectedContact) {
        setTextName(selectedContact.name);
        setTextPhone(selectedContact.phone);
      }
    }
  };

  // 3. ATUALIZAR/EDITAR O CONTATO SELECIONADO
  const handleSaveItem = () => {
    if (!selectedValue) {
      Alert.alert('Atenção', 'Selecione um contato na lista para editar e salvar!');
      return;
    }

    if (!textName.trim()) {
      Alert.alert('Atenção', 'O nome não pode ficar vazio!');
      return;
    }

    // Atualiza apenas o contato que possui o id igual ao selecionado
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedValue
          ? { ...item, name: textName, phone: textPhone }
          : item
      )
    );

    Alert.alert('Sucesso', 'Contato atualizado!');
  };

  // 4. REMOVER CONTATO
  const handleRemoveItem = () => {
    if (!selectedValue) {
      Alert.alert('Atenção', 'Nenhum item selecionado para remover!');
      return;
    }

    setItems((prevItems) => prevItems.filter((item) => item.id !== selectedValue));
    
    // Reseta o ComboBox e os campos
    setSelectedValue('');
    setTextName('');
    setTextPhone('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda telefônica</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={textName}
        onChangeText={setTextName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={textPhone}
        onChangeText={setTextPhone}
      />

      <View style={styles.buttonContainer}>
        <Button title="Adicionar" onPress={handleAddItem} />
        <Button title="Remover" onPress={handleRemoveItem} color="red" />
        <Button title="Salvar" onPress={handleSaveItem} color="green" />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleSelectChange}
        >
          {/* Opção padrão com valor vazio */}
          <Picker.Item label="Selecione um contato..." value="" />
          
          {items.map((item) => (
            <Picker.Item 
              key={item.id} 
              label={`${item.name} (${item.phone})`} 
              value={item.id} 
            />
          ))}
        </Picker>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  pickerContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 15,
  }
});
