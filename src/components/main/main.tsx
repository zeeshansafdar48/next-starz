
"use client"

import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  useFocusable,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  init
} from '@noriginmedia/norigin-spatial-navigation';
import '../../app/styles/main.css'

init()

const rows = [
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
];

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


function MenuItem() {
  const { ref, focused } = useFocusable();

  return <div ref={ref} className={`menu-item-box ${focused ? 'border-[6px]' : 'border-[0px]'}`} />;
}

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
      <div ref={ref} className={`${hasFocusedChild ? "bg-[#4e4181]" : "bg-[#362C56]"} menu-wrapper`}>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </FocusContext.Provider>
  );
}


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

  const bgColorClass = `bg-[${color}]`;
  return (
    <div className='asset-wrapper' ref={ref}>
      <div className={`${bgColorClass} asset-box ${focused ? 'border-[6px]' : 'border-[0px]'}`} />
      <div className='asset-title'>{title}</div>
    </div>
  );
}

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
      <div className='content-row-wrapper' ref={ref}>
        <div className='content-row-title'>{rowTitle}</div>
        <div className='content-row-scrolling-wrapper' ref={scrollingRef}>
          <div className='content-row-scrolling-content'>
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
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

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
      <div className='content-wrapper'>
        <div className='content-title'>Norigin Spatial Navigation</div>
        <div className='selected-item-wrapper'>
          <div className={`selected-item-box ${selectedAsset ? `bg-[${selectedAsset.color}]` : 'bg-[#565b6b]'}`} />
          <div className='selected-item-title'>
            {selectedAsset
              ? selectedAsset.title
              : 'Press "Enter" to select an asset'}
          </div>
        </div>
        <div className='scrolling-rows' ref={ref}>
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
        </div>
      </div>
    </FocusContext.Provider>
  );
}

function Main() {
  return (
    <div className='app-container'>
      <Menu focusKey="MENU" />
      <Content />
    </div>
  );
}


export default Main