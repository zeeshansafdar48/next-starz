
"use client"

import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import shuffle from 'lodash/shuffle';
import {
  useFocusable,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  init
} from '@noriginmedia/norigin-spatial-navigation';

// import {
//   useFocusable,
//   init,
//   FocusContext,
//   FocusDetails,
//   FocusableComponentLayout,
//   KeyPressDetails
// } from './index';

init()
const logo = 'https://noriginmedia.com/wp-content/uploads/2020/06/norigin-logo.svg';

const rows = shuffle([
  {
    title: 'Recommended'
  },
  {
    title: 'Movies'
  },
  {
    title: 'Series'
  },
  {
    title: 'TV Channels'
  },
  {
    title: 'Sport'
  }
]);

const assets = [
  {
    title: 'Asset 1',
    color: '#714ADD'
  },
  {
    title: 'Asset 2',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 3',
    color: '#512EB0'
  },
  {
    title: 'Asset 4',
    color: '#714ADD'
  },
  {
    title: 'Asset 5',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 6',
    color: '#512EB0'
  },
  {
    title: 'Asset 7',
    color: '#714ADD'
  },
  {
    title: 'Asset 8',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 9',
    color: '#512EB0'
  }
];

interface MenuItemBoxProps {
  focused: boolean;
}

const MenuItemBox = styled.div<MenuItemBoxProps>`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
`;

function MenuItem() {
  const { ref, focused } = useFocusable();

  return <MenuItemBox ref={ref} focused={focused} />;
}

interface MenuWrapperProps {
  hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? '#4e4181' : '#362C56'};
  padding-top: 37px;
`;

const NmLogo = styled.img`
  height: 57px;
  width: 175px;
  margin-bottom: 51px;
`;

interface MenuProps {
  focusKey: string;
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
      <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

const AssetWrapper = styled.div`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
`;

interface AssetBoxProps {
  focused: boolean;
  color: string;
}

const AssetBox = styled.div<AssetBoxProps>`
  width: 225px;
  height: 127px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? '6px' : 0)};
  box-sizing: border-box;
  border-radius: 7px;
`;

const AssetTitle = styled.div`
  color: white;
  margin-top: 10px;
  font-family: 'Segoe UI';
  font-size: 24px;
  font-weight: 400;
`;

interface AssetProps {
  title: string;
  color: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function Asset({ title, color, onEnterPress, onFocus }: AssetProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      color
    }
  });

  return (
    <AssetWrapper ref={ref}>
      <AssetBox color={color} focused={focused} />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ContentRowProps {
  title: string;
  onAssetPress: (asset: AssetProps) => void
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function ContentRow({
  title: rowTitle,
  onAssetPress,
  onFocus
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus
  });

  const scrollingRef = useRef<HTMLDivElement>(null);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      scrollingRef.current?.scrollTo?.({
        left: x,
        behavior: 'smooth'
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {assets.map(({ title, color }) => (
              <Asset
                key={title}
                title={title}
                color={color}
                onEnterPress={(props, details) => onAssetPress({
                  ...props,
                  ...details,
                  title,
                  color,
                  onEnterPress: () => { },
                  onFocus
                })}
                onFocus={onAssetFocus}
              />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Segoe UI';
  text-align: center;
  margin-top: 52px;
  margin-bottom: 37px;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedItemBox = styled.div`
  height: 282px;
  width: 1074px;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  bottom: 4.685rem;
  left: 20rem;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

function Content() {
  const { ref, focusKey } = useFocusable();

  const [selectedAsset, setSelectedAsset] = useState<AssetProps | null>(null);

  const onAssetPress = useCallback((asset: AssetProps) => {
    setSelectedAsset(asset);
  }, []);

  const onRowFocus = useCallback(
    ({ y }: { y: number }) => {
      ref.current.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );


  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        <ContentTitle>Norigin Spatial Navigation</ContentTitle>
        <SelectedItemWrapper>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : '#565b6b'}
          />
          <SelectedItemTitle>
            {selectedAsset
              ? selectedAsset.title
              : 'Press "Enter" to select an asset'}
          </SelectedItemTitle>
        </SelectedItemWrapper>
        <ScrollingRows ref={ref}>
          <div>
            {rows.map(({ title }) => (
              <ContentRow
                key={title}
                title={title}
                onAssetPress={onAssetPress}
                onFocus={onRowFocus}
              />
            ))}
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}

const AppContainer = styled.div`
  background-color: #221c35;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function PrimaryButton() {
  const { ref, focused } = useFocusable()
  return <button ref={ref} className={`py-6 px-10 text-3xl border-4 rounded-full bg-slate-200 text-black ${focused ? "border-green-400" : "border-red-500"}`}>Primary Button</button>
}
function SecondaryButton() {
  const { ref, focused } = useFocusable();
  return <button ref={ref} className={`py-6 px-10 text-3xl border-4 rounded-full bg-slate-200 text-black ${focused ? "border-green-400" : "border-red-500"}`}>Secondary Button</button>
}

function Main() {
  const { ref, focusKey, focusSelf } = useFocusable()


  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    // <AppContainer>
    //   <GlobalStyle />
    //   <Menu focusKey="MENU" />
    //   <Content />


    // </AppContainer>

    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className='flex my-10 mx-10 gap-4'>
        <PrimaryButton />
        <SecondaryButton />
      </div>
      <div ref={ref} className='flex my-10 mx-10 gap-4'>
        <PrimaryButton />
        <SecondaryButton />
      </div>
    </FocusContext.Provider>

  );
}


export default Main