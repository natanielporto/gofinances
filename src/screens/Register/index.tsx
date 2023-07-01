import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { CategorySelect } from "../CategorySelect";
import { useForm } from "react-hook-form";
import { InputForm } from "../../components/Form/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import * as S from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleSelectTransaction(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação.");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria.");

    const newTransaction = {
      id: form.name,
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = "@gofinances:transactions";

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível salvar.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name ? String(errors.name.message) : null}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount ? String(errors.amount.message) : null}
            />

            <S.TransactionTypes>
              <TransactionTypeButton
                isActive={transactionType === "positive"}
                name="Income"
                type="up"
                onPress={() => handleSelectTransaction("positive")}
              />
              <TransactionTypeButton
                isActive={transactionType === "negative"}
                name="Outcome"
                type="down"
                onPress={() => handleSelectTransaction("negative")}
              />
            </S.TransactionTypes>

            <CategorySelectButton
              onPress={handleOpenModal}
              title={category.name}
            />
          </S.Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
