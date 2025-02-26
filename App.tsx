import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, TextInput, View } from "react-native";
import StartGameScreen from "./src/screens/StartGameScreen";

// npx expo install expo-linear-gradient -> Usar o npx para executar o comando sem instalação global do expo CLI que poderia ser  feito usando o comando -> npm install -g expo-cli
// Outra observação, foi necessario desligar e ligar o app novamente para que refletisse a utilização do LinearGradient
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <>
      <StatusBar style="light"></StatusBar>
      <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.imageStyle}
        >
          <StartGameScreen></StartGameScreen>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    opacity: 0.25,
  },
});
