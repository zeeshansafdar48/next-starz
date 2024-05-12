
"use client"

import React, { useEffect } from 'react';
import {
  useFocusable,
  FocusContext,
  init
} from '@noriginmedia/norigin-spatial-navigation';
import { MenuItemBox, MenuWrapper } from './styles/styles'

init()


interface MenuProps {
  focusKey: string;
}


function MenuItem() {
  const { ref, focused } = useFocusable();

  return <MenuItemBox ref={ref} $focused={focused} />;
}


function Menu({ focusKey: focusKeyParam }: MenuProps) {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey
    // setFocus, -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts, -- to force update all layouts when needed
    // getCurrentFocusKey -- to get the current focus key
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onEnterPress: () => { },
    onEnterRelease: () => { },
    onArrowPress: () => true,
    onFocus: () => { },
    onBlur: () => { },
    extraProps: { foo: 'bar' }
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref} $hasFocusedChild={hasFocusedChild}>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

export default Menu