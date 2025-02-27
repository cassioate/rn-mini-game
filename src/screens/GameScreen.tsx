import { Alert, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";

interface Props {
  children?: string;
  userNumber: number;
  setGameIsOver: (game: boolean) => void;
}

function generateRandomBetween(min: number, max: number, exclude: number) {
  const random = Math.floor(Math.random() * (max - min)) + min;

  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return random;
}

// Essa forma é feita para não ficar renderizando via useState quando esses dois valroes mudarem, pois eles não são relevante para a tela ter q renderizar, são usado apenas na hora do calculo
// Dessa forma essas variaveis são globais e não afetam o estado do componente GameScreen
let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({
  children,
  userNumber,
  setGameIsOver,
}: Props) {
  // Essa seria uma fora de usar useState para controlar os limites, mas isso causaria mais renderizações na tela toda vez que eles fossem alterados
  // const [minBoundary, setMinBoundary] = useState(1);
  // const [maxBoundary, setMaxBoundary] = useState(100);

  const initialGuesse = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuesse, setCurrentGuesse] = useState<number>(initialGuesse);

  useEffect(() => {
    if (userNumber === currentGuesse) {
      minBoundary = 1;
      maxBoundary = 100;
      setGameIsOver(true);
    }
  }, [currentGuesse]);

  function nextGuesseHandler(direction: string) {
    if (
      (direction === "lower" && currentGuesse < userNumber) ||
      (direction === "greater" && currentGuesse > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong....", [
        { text: "Sorry", style: "cancel" },
      ]);

      return;
    }

    if (direction === "lower") {
      console.log("LOWER");
      maxBoundary = currentGuesse;
      // setMaxBoundary(currentGuesse);
    } else {
      console.log("GREATER");
      minBoundary = currentGuesse;
      // setMinBoundary(currentGuesse);
    }

    console.log(minBoundary, maxBoundary, userNumber, currentGuesse, direction);
    const newRandom = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuesse
    );
    setCurrentGuesse(newRandom);
  }

  return (
    <View style={styles.screenContainer}>
      <Title> Opponent's guess </Title>
      <NumberContainer>{currentGuesse}</NumberContainer>
      <PrimaryButton onPress={() => nextGuesseHandler("lower")}>
        -
      </PrimaryButton>
      <PrimaryButton onPress={() => nextGuesseHandler("greater")}>
        +
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 12,
  },
});
