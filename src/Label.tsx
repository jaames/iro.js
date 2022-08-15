import { h } from 'preact';
import { cssValue, LayoutDirection } from '@irojs/iro-core';
import { SliderType } from '@irojs/iro-core';

interface IroLabelProps {
	sliderType: SliderType;
	layoutDirection: LayoutDirection;
	handleRadius: number;
}

export function IroLabel(props: IroLabelProps) {
	const name = props.sliderType[0].toUpperCase();

	return (
		<div
			className="IroSliderLabel"
			style={{
				display: 'inline-block',
				width: cssValue(10),
				height: cssValue(12),
				lineHeight: cssValue(12),
				fontSize: props.layoutDirection === 'horizontal' ? cssValue(12) : cssValue(14)
			}}
		>
			{name}
		</div>
	);
}
