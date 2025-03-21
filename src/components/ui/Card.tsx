import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";

interface Props {
  children: any;
}

export default function Card({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
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
});
