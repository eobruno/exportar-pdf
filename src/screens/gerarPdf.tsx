import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Print from 'expo-print';

export default function GerarPdf() {
  const generatePDF = async () => {
    try {
      await Print.printAsync({
        html: `
          <html>
            <body>
              <h1>Sua View React Native</h1>
              <p>Aqui está o conteúdo da sua view.</p>
              <!-- Adicione mais HTML conforme necessário -->
            </body>
          </html>
        `,
      });
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  };

  return (
    <View>
      {/* Seu conteúdo React Native aqui */}
      <Text>Sua View React Native</Text>
      <Text>Aqui está o conteúdo da sua view.</Text>
      {/* Adicione mais componentes conforme necessário */}
      
      {/* Botão para gerar o PDF */}
      <Button title="Gerar PDF" onPress={generatePDF} />
    </View>
  );
}
