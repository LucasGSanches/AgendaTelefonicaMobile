import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';
import { useState } from "react";

export default function App() {
	const [variable, useVariable] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30}}>Contador</Text>
      <Text style={{ fontSize: 30}}>{variable}</Text>
      <Button title="Incrementar" onPress={() => useVariable(variable + 1)}/>
      <Button title="Decrementar" onPress={() => useVariable(variable - 1)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
