
"use client"

import React, { useCallback, useState, useRef } from 'react';
import {
  useFocusable,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  init
} from '@noriginmedia/norigin-spatial-navigation';
import { assets, rows } from '@/constants/main'
import { ContentWrapper, ContentTitle, ScrollingRows, SelectedItemTitle, SelectedItemWrapper, SelectedItemBox, ContentRowWrapper, ContentRowTitle, ContentRowScrollingWrapper, ContentRowScrollingContent } from './styles/styles'
import Asset, { AssetProps } from '@/components/asset/asset'

init()

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


export default Content