import styled from "styled-components";

interface MenuItemBoxProps {
  $focused: boolean;
}

interface MenuWrapperProps {
  $hasFocusedChild: boolean;
}

export const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ $focused }) => ($focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
`;

export const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ $hasFocusedChild }) => ($hasFocusedChild ? "#4e4181" : "#362C56")};
  padding-top: 37px;
`;
