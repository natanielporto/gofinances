import React from "react";
import * as S from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
