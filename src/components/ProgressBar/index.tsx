import React from 'react';
import { Line, Step, Wrapper } from './styles';
import _ from 'lodash';

type Props = {
	stepsCount: number;
	currentStep: number;
}

const ProgressBar: React.FC<Props> = ({ stepsCount, currentStep }) => {
	return (
		<Wrapper>
			<Line>
				{ _.map(_.range(0, stepsCount), (i) => <Step key={ i } isActive={ currentStep >= i + 1 } />) }
			</Line>
		</Wrapper>
	);
};

export default ProgressBar;