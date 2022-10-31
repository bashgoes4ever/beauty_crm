import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { CheckboxOptionType, Form, Input, RadioChangeEvent, Typography } from 'antd';
import { getAppointmentStatusesApi } from '../../../../utils/api';
import _ from 'lodash';
import { AppointmentStatus } from '../../../../store/AppointmentModal';
import { StoreContext } from '../../../../store/context';
import { observer } from 'mobx-react-lite';
import Loader from '../../../Loader';
import { RadioGroup, RadioWrapper } from './styles';

const AdditionalInfo: React.FC = () => {
	const { appointmentCreationStore } = useContext(StoreContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [statuses, setStatuses] = useState<Array<CheckboxOptionType & { data: AppointmentStatus }>>([]);

	useEffect(() => {
		setIsLoading(true);
		getAppointmentStatusesApi().then((res) => {
			setStatuses(_.map(res, (status) => ({
				label: status.title,
				value: status.id,
				data: status
			})));
			if (!appointmentCreationStore.appointment.status?.id) {
				appointmentCreationStore.appointment.status = _.minBy(res, (status) => status.priority);
			}
			setIsLoading(false);
		});
	}, [appointmentCreationStore.appointment]);

	const onStatusChange = useCallback(({ target }: RadioChangeEvent) => {
		appointmentCreationStore.appointment.status = _.find(statuses, (status) => status.value === target.value).data;
	}, [appointmentCreationStore.appointment, statuses]);

	const onCommentChange = useCallback(({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
		appointmentCreationStore.appointment.description = value;
	}, [appointmentCreationStore.appointment]);

	return (
		<>
			<Typography.Title level={ 4 }>Дополнительная информация</Typography.Title>
			<RadioWrapper>
				{ isLoading ? <Loader /> : (
					<Form.Item label="Статус" labelCol={ { span: 24 } }>
						<RadioGroup
							value={ appointmentCreationStore.appointment.status?.id }
							options={ statuses }
							onChange={ onStatusChange }
						/>
					</Form.Item>
				) }
			</RadioWrapper>

			<Form.Item label="Комментарий" labelCol={ { span: 24 } }>
				<Input.TextArea
					onChange={ onCommentChange }
					rows={ 4 }
					value={ appointmentCreationStore.appointment.description }
				/>
			</Form.Item>

		</>
	);
};

export default observer(AdditionalInfo);