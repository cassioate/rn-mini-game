import { StyleSheet, Text, View } from "react-native";

interface Props {
  children?: string;
}

export default function GameOverScreen({ children }: Props) {
  return <Text>{children}</Text>;
}

const styles = StyleSheet.create({});
