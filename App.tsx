import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import StartGameScreen from "./src/screens/StartGameScreen";

// npx expo install expo-linear-gradient -> Usar o npx para executar o comando sem instalação global do expo CLI que poderia ser  feito usando o comando -> npm install -g expo-cli
// Outra observação, foi necessario desligar e ligar o app novamente para que refletisse a utilização do LinearGradient
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./src/screens/GameScreen";
import { useState } from "react";
import { Colors } from "./constants/colors";
import GameOverScreen from "./src/screens/GameOverScreen";

export default function App() {
  const [userNummer, setUserNumber] = useState<number>();
  const [gameIsOver, setGameIsOver] = useState(false);

  let screen = <StartGameScreen setUserNumber={setUserNumber} />;

  if (userNummer) {
    screen = (
      <GameScreen userNumber={userNummer} setGameIsOver={setGameIsOver} />
    );
  }

  if (gameIsOver) {
    screen = <GameOverScreen />;
    setGameIsOver(false);
    setUserNumber(undefined);
  }

  return (
    <>
      <StatusBar style="light"></StatusBar>
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.imageStyle}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
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
