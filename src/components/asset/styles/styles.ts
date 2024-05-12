import styled from "styled-components";

interface AssetBoxProps {
  $focused: boolean;
  $color: string;
}

export const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

export const AssetBox = styled.div<AssetBoxProps>`
  width: 225px;
  height: 127px;
  background-color: ${({ $color }) => $color};
  border-color: white;
  border-style: solid;
  border-width: ${({ $focused }) => ($focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

export const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: "Segoe UI";
  font-size: 24px;
  font-weight: 400;
`;
