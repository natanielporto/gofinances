import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: 70%;

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  text-align: center;
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)};
  margin-top: 45px;
`;

export const SignInTitle = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)};
  margin-top: 80px;
  margin-bottom: 67px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  height: 30%;
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  justify-content: space-between;
`;
