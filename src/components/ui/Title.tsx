import { Platform } from "react-native";
import TitleAndroid from "./Title.android";
import TitleIos from "./Title.ios";

interface Props {
  children: string;
}

export default function Title({ children }: Props) {
  return Platform.OS === "android" ? (
    <TitleAndroid>{children}</TitleAndroid>
  ) : (
    <TitleIos>{children}</TitleIos>
  );
}
