import React from "react";
import { Button } from "../../components/Form/Button";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import * as S from "./styles";
import { createGlobalStyle } from "styled-components";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: Props) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
    closeSelectCategory();
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categorias</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            isActive={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Divider />}
      />

      {/* <S.Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </S.Footer> */}
    </S.Container>
  );
}
