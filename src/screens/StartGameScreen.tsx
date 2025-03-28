import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Title from "../components/ui/Title";

interface Props {
  pickedNumberHandler: (value: number) => void;
}

export default function StartGameScreen({ pickedNumberHandler }: Props) {
  const [textInputValue, setTextInputValue] = useState("");

  const { width, height } = useWindowDimensions();

  function textInputValueChange(value: string) {
    setTextInputValue(value);
  }

  function confirmButton() {
    const choosenNumber = parseInt(textInputValue);

    if (isNaN(choosenNumber) || choosenNumber < 0 || choosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive" }]
      );
    }
    pickedNumberHandler(choosenNumber);
    resetButton();
  }

  function resetButton() {
    setTextInputValue("");
  }

  const marginTopDistance = height < 400 ? 42 : 100;
  const rootContainerStyle = [
    styles.rootContainer,
    { marginTop: marginTopDistance },
  ];

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={rootContainerStyle}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={textInputValue}
              onChangeText={textInputValueChange}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainerOnly}>
                <PrimaryButton onPress={resetButton}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainerOnly}>
                <PrimaryButton onPress={confirmButton}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 24,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainerOnly: {
    flex: 1,
  },
});
