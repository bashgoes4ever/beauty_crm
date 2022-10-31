import React from 'react';
import { Spinner, Text, Wrapper } from './styles';
import _ from 'lodash';

const Loader: React.FC = () => (
	<Wrapper>
		<Spinner>{ _.map(_.range(0, 3), (i) => <div key={ i } />) }</Spinner>
		<Text>Загрузка...</Text>
	</Wrapper>
);

export default Loader;