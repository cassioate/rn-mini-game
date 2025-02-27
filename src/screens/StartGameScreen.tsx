import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import { Colors } from "../../constants/colors";

interface Props {
  setUserNumber: (value: number) => void;
}

export default function StartGameScreen({ setUserNumber }: Props) {
  const [textInputValue, setTextInputValue] = useState("");

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
    setUserNumber(choosenNumber);
    resetButton();
  }

  function resetButton() {
    setTextInputValue("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary600,
    borderRadius: 8,

    //Sombras no android
    elevation: 4,

    //Sombras no IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
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
