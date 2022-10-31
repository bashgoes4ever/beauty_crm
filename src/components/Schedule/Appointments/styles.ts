import styled from '@emotion/styled/macro';
import { cellSizes, colors } from '../../../styles/constants';
import { css } from '@emotion/react';
import { Typography } from 'antd';
import { AppointmentService } from '../../../store/AppointmentModal';
import _ from 'lodash';

type AppointmentParams = {
	top: number;
	left: number;
	height: number;
	width: number;
	services: AppointmentService[];
}

type Sizes = 'm' | 's' | 'xs'

const getSize = (height: number): Sizes => {
	const sHeight = 40;
	const xsHeight = 24;

	if (height > sHeight) return 'm';
	if (height >= xsHeight && height <= sHeight) return 's';
	return 'xs';
};

const cardPaddings: { [key in Sizes]: string } = {
	m: '8px',
	s: '4px 8px',
	xs: 'none'
};

const getColor = (color: string[]) => {
	if (_.size(color) === 0) {
		return colors.service1;
	}

	const colorsUnique = Array.from(new Set(color));

	if (_.size(colorsUnique) <= 1 && _.size(colorsUnique) > 0) {
		return color[0];
	}

	return `linear-gradient(to bottom, ${ colorsUnique.join(', ') })`;
};

const appointmentOffset = ({ top, left, height, width, services }: AppointmentParams) => css`
	top: ${ top }px;
	left: ${ left }px;
	height: ${ height }px;
	width: ${ width }px;

	${ Card } {
		background: ${ getColor(_.map(services, service => service.service.color)) };
		padding: ${ cardPaddings[getSize(height)] };
	}

	${ Title } {
		display: ${ height < 24 || width <= 90 ? 'none' : 'block' };
	}

	${ Text } {
		display: ${ height <= 40 || width <= 90 ? 'none' : 'block' };
	}
`;

export const Wrapper = styled.div`
	position: relative;
	z-index: 2;
	width: calc(100% - ${ cellSizes.width });
	margin-left: ${ cellSizes.width };
`;

export const Appointment = styled.div`
	position: absolute;
	padding: 4px;
	${ appointmentOffset }
`;

export const Card = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 2px;
	transition: all .3s;
	cursor: pointer;
	overflow: hidden;

	&:hover {
		filter: brightness(1.1);
	}
`;

export const Text = styled(Typography.Text)`
	margin: 0;
	color: ${ colors.light } !important;
`;

export const Title = styled(Text)`
	font-weight: 600;
`;