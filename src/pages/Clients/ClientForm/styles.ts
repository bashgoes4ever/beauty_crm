import styled from '@emotion/styled/macro';
import { Form as AntdForm } from 'antd';
import { paddings } from '../../../styles/constants';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

type FormProps = {
	columnsCount: number;
}

const setColumnsCount = ({ columnsCount }: FormProps) => css`
	grid-template-columns: repeat(${ columnsCount }, 1fr);
`;

export const ButtonWrapper = styled.div`

	& > button {
		display: block;
		margin: 0 0 0 auto;
	}
`;

export const Form = styled(AntdForm, { shouldForwardProp: prop => isPropValid(prop) || prop !== 'columnsCount' })`
	display: grid;
	grid-gap: 0 ${ paddings.vertical };

	${ setColumnsCount }
`;