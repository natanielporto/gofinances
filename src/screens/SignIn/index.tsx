import React from "react";
import AppleSVG from "../../assets/apple.svg";
import GoogleSVG from "../../assets/google.svg";
import LogoSVG from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import * as S from "./styles";
import { Alert } from "react-native";

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

export function SignIn() {
  const { googleSignIn } = useAuth();

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar à conta Google.");
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
          <S.Title>Controle suas finanças de forma muito simples</S.Title>
          <S.SignInTitle>
            Faça seu login com uma das contas abaixo
          </S.SignInTitle>
        </S.TitleWrapper>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleGoogleSignIn}
          />
          <SignInSocialButton title="Entrar com apple" svg={AppleSVG} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}
