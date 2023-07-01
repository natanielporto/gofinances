import React from "react";
import * as S from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  name: string;
  type: "up" | "down";
  isActive: boolean;
}

export function TransactionTypeButton({
  name,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <S.Container isActive={isActive} type={type}>
      <S.Button {...rest}>
        <S.Icon name={icons[type]} type={type} />
        <S.Title>{name}</S.Title>
      </S.Button>
    </S.Container>
  );
}
