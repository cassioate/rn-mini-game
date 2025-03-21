import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

interface Props {
  userNumber: number;
  gameOverHandler: (numberOfRounds: number) => void;
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

export default function GameScreen({ userNumber, gameOverHandler }: Props) {
  // Essa seria uma fora de usar useState para controlar os limites, mas isso causaria mais renderizações na tela toda vez que eles fossem alterados
  // const [minBoundary, setMinBoundary] = useState(1);
  // const [maxBoundary, setMaxBoundary] = useState(100);

  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuesse, setCurrentGuesse] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (userNumber === currentGuesse) {
      minBoundary = 1;
      maxBoundary = 100;
      gameOverHandler(guessRounds.length);
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
    setGuessRounds((prevGuessRounds) => [newRandom, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title> Opponent's guess </Title>
      <NumberContainer>{currentGuesse}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuesseHandler("lower")}>
              -
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuesseHandler("greater")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 50,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
