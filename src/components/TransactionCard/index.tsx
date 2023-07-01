import React from "react";
import * as S from "./styles";
import { categories } from "../../utils/categories";

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  const { type, name, amount, date } = data;
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      <S.Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
