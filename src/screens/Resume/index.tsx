import React, { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { HistoryCard } from "../../components/HistoryCard";
import { VictoryPie } from "victory-native";

import * as S from "./styles";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  id: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentage: string;
}

export function Resume() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setLoading(true);
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (expense: TransactionData) =>
        expense.type === "negative" &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

    const totalExpenses: number = expenses.reduce(
      (acc: number, expense: TransactionData) => {
        return acc + Number(expense.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percentage = `${((categorySum / totalExpenses) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          totalFormatted,
          total: categorySum,
          percentage,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  const renderCategoriesAndTotals = useMemo(
    () =>
      totalByCategories?.map(
        ({ id, name, totalFormatted, color }: CategoryData) => (
          <HistoryCard
            key={id}
            title={name}
            amount={totalFormatted}
            color={color}
          />
        )
      ),
    [totalByCategories]
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo Por Categoria</S.Title>
      </S.Header>

      {loading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <S.Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <S.MonthSelect>
            <S.MonthSelectButon onPress={() => handleChangeDate("prev")}>
              <S.MonthSelectIcon name="chevron-left" />
            </S.MonthSelectButon>

            <S.Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </S.Month>

            <S.MonthSelectButon onPress={() => handleChangeDate("next")}>
              <S.MonthSelectIcon name="chevron-right" />
            </S.MonthSelectButon>
          </S.MonthSelect>

          <S.ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={85}
              x="percentage"
              y="total"
            />
          </S.ChartContainer>
          {renderCategoriesAndTotals}
        </S.Content>
      )}
    </S.Container>
  );
}
