import React, { useCallback, useContext } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Header, Title, Wrapper } from './styles';
import { Button, Table } from 'antd';
import { Steps } from '../../../../../store/AppointmentModal';
import { StoreContext } from '../../../../../store/context';

type Props = {
	title: string;

	step: Steps;

	columns: Array<{ title: string; dataIndex: string; }>;

	data: object[];

	summary?: (data: readonly object[]) => React.ReactNode;
}

const InfoBlock: React.FC<Props> = ({ title, columns, data, summary, step }) => {
	const { appointmentCreationStore } = useContext(StoreContext);

	const onBtnClick = useCallback(() => {
		appointmentCreationStore.currentStep = step;
	}, [appointmentCreationStore, step]);

	return (
		<Wrapper>
			<Header>
				<Button icon={ <EditOutlined /> } shape="circle" type="link" onClick={ onBtnClick } />
				<Title level={ 5 }>{ title }</Title>
			</Header>
			<Table
				columns={ columns }
				dataSource={ data }
				pagination={ false }
				summary={ summary }
			/>
		</Wrapper>
	);
};

export default InfoBlock;