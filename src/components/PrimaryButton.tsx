import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  children: string;
  onPress?: () => void;
}

export default function PrimaryButton({ children, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={(varStyle) =>
          varStyle.pressed
            ? [styles.buttonContainer, styles.buttonContainerPressedIOS]
            : styles.buttonContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonContainerPressedIOS: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
