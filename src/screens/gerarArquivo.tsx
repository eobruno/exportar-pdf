import React, { useRef, useState } from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";

export default function GerarArquivo() {
  const viewShotRef = useRef<ViewShot>(null);
  const [qrCodeUri, setQrCodeUri] = useState<string | null>(null);

  const dadosParaQRCode =
    "Isso é um teste para gerar um qr code com várias informações relevantes";

  const salvarComoImagem = async () => {
    try {
      if (viewShotRef.current) {
        const uri = await (viewShotRef.current as any).capture();
        console.log("Imagem salva com sucesso:", uri);
        setQrCodeUri(uri);
      } else {
        console.warn(
          "A referência viewShotRef não foi inicializada corretamente."
        );
      }
    } catch (error) {
      console.error("Erro ao salvar a imagem:", error);
      setQrCodeUri(null);
    }
  };

  const print = async () => {
    await salvarComoImagem();
    console.log(qrCodeUri);

    if (qrCodeUri) {
      try {
        await Print.printAsync({
          html: `
            <html>
              <body>
                <h1>Sua View React Native</h1>
                <p>Aqui está o conteúdo da sua view.</p>
                <!-- Adicione mais HTML conforme necessário -->
                <img src="data:image/png;base64,${await encodeImageToBase64(
                    qrCodeUri
                  )}" />
                <p>TESTE</p>
              </body>
            </html>
          `,
        });
      } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
      }
    } else {
      console.warn(
        "A URI do QR Code está vazia. A imagem pode não ter sido capturada corretamente."
      );
    }
  };

  const printToFile = async () => {
    await salvarComoImagem();

    if (qrCodeUri) {
      try {
        const { uri } = await Print.printToFileAsync({
          html: `
            <html>
              <body>
                <h1>Sua View React Native</h1>
                <p>Aqui está o conteúdo da sua view.</p>
                <!-- Adicione mais HTML conforme necessário -->
                <img src="data:image/png;base64,${await encodeImageToBase64(
                  qrCodeUri
                )}" />
                <p>TESTE</p>
              </body>
            </html>
          `,
        });

        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
      } catch (error) {
        console.error("Erro ao salvar o arquivo PDF:", error);
      }
    } else {
      console.warn(
        "A URI do QR Code está vazia. A imagem pode não ter sido capturada corretamente."
      );
    }
  };

  async function encodeImageToBase64(imageUri: any) {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Erro ao codificar a imagem para base64:", error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
        <View style={styles.contentPrint}>
          <View style={styles.contentTest}>
            <Text>Teste 123</Text>
          </View>
          <QRCode value={dadosParaQRCode} size={200} />
          <Image
            style={{
              width: 60,
              height: 240,
            }}
            resizeMode="contain"
            source={{ uri: `file://${qrCodeUri}` }}
          />
        </View>
      </ViewShot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  contentTest: {
    backgroundColor: "#5f5f5f60",
    height: 50,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
    borderRadius: 10,
  },
  contentPrint: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
