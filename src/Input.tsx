import { h } from 'preact';
import { cssValue, LayoutDirection } from '@irojs/iro-core';
import { useCallback, useState } from 'preact/hooks';
import {
  IroColor,
  SliderType,
  getSliderValueFromInputField,
  getSliderValueFromClipboard,
  getInputDimensions,
  clampSliderValue
} from '@irojs/iro-core';

interface IroInputProps {
  sliderType: SliderType;
  sliderSize: number;
  activeColor: IroColor;
  layoutDirection: LayoutDirection;
  handleRadius: number;
  disabled: boolean;
  minTemperature: number;
  maxTemperature: number;
}

export function IroInput(props: IroInputProps) {
  const disabled = props.disabled;
  const type = props.sliderType;
  const {inputWidth, fontSize} = getInputDimensions(props);
  const activeColor = props.activeColor;
  const [sliderValue, setSliderValue] = useState(activeColor[props.sliderType]);
  const val = (type === 'alpha') ? activeColor[props.sliderType].toFixed(2) : Math.round(activeColor[props.sliderType]);
  setSliderValue(val);

  const onKeypress = useCallback((e: KeyboardEvent) => {
    const value = getSliderValueFromInputField(e);

    if (type === 'kelvin') {
      let strlen = value.toString().length,
        minlen = props.minTemperature.toString().length,
        maxlen = props.maxTemperature.toString().length;

      if (strlen > maxlen) {
        e.preventDefault();
        activeColor[props.sliderType] = props.maxTemperature;
      } else if (strlen >= minlen) {
        if (value < props.minTemperature) {
          if (maxlen === minlen) {
            e.preventDefault();
            activeColor[props.sliderType] = props.minTemperature;
          }
        } else if (value > props.maxTemperature) {
          e.preventDefault();
          activeColor[props.sliderType] = props.maxTemperature;
        } else {
          e.preventDefault();
          activeColor[props.sliderType] = value;
        }
      }
    } else {
      e.preventDefault();
      activeColor[props.sliderType] = clampSliderValue(props, value);
    }
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
      <input
        onKeyPress={ onKeypress }
        onPaste={ onPaste }
        className="IroSliderInput"
        style={{
          display: 'inline-block',
          width: type === 'kelvin' ? cssValue(40) : inputWidth,
          height: cssValue(18),
          fontSize: fontSize,
          padding: cssValue(2)
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