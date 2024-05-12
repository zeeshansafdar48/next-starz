
"use client"

import {
  init
} from '@noriginmedia/norigin-spatial-navigation';
import { GlobalStyle, AppContainer } from './styles/styles'
import Menu from '@/components/menu/menu';
import Content from '@/components/content/content';

init()

function Main() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" />
      <Content />
    </AppContainer>
  );
}

export default Main