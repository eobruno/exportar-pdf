import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GerarPdf from './src/screens/gerarPdf';
import GerarArquivo from './src/screens/gerarArquivo';

export default function App() {
  return (
    <GerarArquivo/>
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
