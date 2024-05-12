import {
  useFocusable,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails
} from '@noriginmedia/norigin-spatial-navigation';

import { AssetWrapper, AssetTitle, AssetBox } from './styles/styles'

export interface AssetProps {
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
      <AssetBox $color={color} $focused={focused} />
      <AssetTitle>{title}</AssetTitle>
    </AssetWrapper>
  );
}

export default Asset;