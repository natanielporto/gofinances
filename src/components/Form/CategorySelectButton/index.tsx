import React from "react";
import * as S from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress, ...rest }: Props) {
  return (
    <S.Container onPress={onPress}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
}
