import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";

interface Props {
  children: string;
  onPress?: (value: any) => void;
}

export default function PrimaryButton({ children, onPress }: Props) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={(varStyle) =>
          varStyle.pressed
            ? [styles.buttonInnerContainer, styles.buttonContainerPressedIOS]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonContainerPressedIOS: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
