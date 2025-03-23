import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";
import Title from "../components/ui/Title";

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
  const { width } = useWindowDimensions();

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
      maxBoundary = currentGuesse;
      // setMaxBoundary(currentGuesse);
    } else {
      minBoundary = currentGuesse;
      // setMinBoundary(currentGuesse);
    }

    const newRandom = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuesse
    );
    setCurrentGuesse(newRandom);
    setGuessRounds((prevGuessRounds) => [newRandom, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
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
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWidth500}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuesseHandler("lower")}>
              -
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuesse}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuesseHandler("greater")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title> Opponent's guess </Title>
      {content}
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
  buttonsContainerWidth500: {
    flexDirection: "row",
    alignItems: "center",
  },
});
