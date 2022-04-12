import { h } from 'preact';
import { cssValue, LayoutDirection } from '@irojs/iro-core';
import { useCallback, useState } from 'preact/hooks';
import {
  IroColor,
  SliderType,
  getSliderValueFromInputField,
  getSliderValueFromClipboard
} from '@irojs/iro-core';

interface IroInputProps {
  sliderType: SliderType;
  activeColor: IroColor;
  layoutDirection: LayoutDirection;
  handleRadius: number;
  disabled: boolean;
  // minTemperature: number;
  // maxTemperature: number;
}

export function IroInput(props: IroInputProps) {
  const disabled = props.disabled;
  const type = props.sliderType;
  const name = type[0].toUpperCase();
  const activeColor = props.activeColor;
  const [sliderValue, setSliderValue] = useState(activeColor[props.sliderType]);
  const val = (type === 'alpha') ? activeColor[props.sliderType].toFixed(2) : Math.round(activeColor[props.sliderType]);
  setSliderValue(val);

  const onKeypress = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const value = getSliderValueFromInputField(props, e);
    activeColor[props.sliderType] = value;
    return value;
  }, [setSliderValue, props.sliderType]);

  const onPaste = useCallback((e: ClipboardEvent) => {
    e.preventDefault();
    const value = getSliderValueFromClipboard(props, e);
    activeColor[props.sliderType] = value;
    return value;
  }, [setSliderValue, props.sliderType]);

  return (
    <div className="IroSliderValue">
      <span
        className="IroSliderLabel"
        style={{
          display: 'inline-block',
          marginLeft: props.layoutDirection === 'vertical' ?
                      cssValue(props.handleRadius) : cssValue(0),
          width: cssValue(10)
        }}
      >
        {name}
      </span>
      <input
        onKeyPress={ onKeypress }
        onPaste={ onPaste }
        className="IroSliderInput"
        style={{
          display: 'inline-block',
          width: cssValue(33),
          height: cssValue(18),
          fontSize: '12px',
          marginLeft: props.layoutDirection === 'vertical' ?
                      cssValue(5) : cssValue(0)
        }}
        type="text"
        disabled={ disabled }
        value={ sliderValue }
      >
      </input>
    </div>
  );
}

IroInput.defaultProps = {
  disabled: false
};