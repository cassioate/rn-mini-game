import { StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/colors";

interface Props {
  children?: any;
  style?: any;
}

export default function InstructionText({ children, style }: Props) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
