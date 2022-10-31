import React, { useCallback, useContext } from 'react';
import { Button, Form, Select, Slider } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/context';
import { Scales, ScheduleViews, VIEWS } from '../../../store/ScheduleHelper';
import { observer } from 'mobx-react-lite';
import { Inputs, Wrapper } from './styles';
import DateNavigation from './DateNavigation';
import AppointmentModal from '../AppointmentModal';

const Toolbar: React.FC = () => {
	const { scheduleHelper, modalsStore } = useContext(StoreContext);

	const onViewSelect = useCallback((view: ScheduleViews): void => {
		scheduleHelper.currentView = view;
	}, [scheduleHelper]);

	const onSliderChange = useCallback((value: Scales): void => {
		scheduleHelper.scale = value;
	}, [scheduleHelper]);

	const onAppointmentAddBtnClick = useCallback(() => {
		modalsStore.show(<AppointmentModal />);
	}, [modalsStore]);

	return (
		<Wrapper>
			<Button
				type="primary"
				icon={ <PlusSquareOutlined /> }
				onClick={ onAppointmentAddBtnClick }
			>
				Добавить запись
			</Button>

			<DateNavigation />

			<Inputs>
				{
					scheduleHelper.currentView !== VIEWS.month.key && (
						<Form.Item label="Масштаб">
							<Slider
								style={ { width: 120 } }
								tooltipVisible={ false }
								min={ Scales.QUARTER_HOUR }
								max={ Scales.TWO_HOURS }
								value={ scheduleHelper.scale }
								onChange={ onSliderChange }
							/>
						</Form.Item>
					)
				}

				<Form.Item label="Вид">
					<Select value={ scheduleHelper.currentView } style={ { width: 120 } }
						onSelect={ onViewSelect }>
						<Select.Option value={ VIEWS.day.key }>День</Select.Option>
						<Select.Option value={ VIEWS.week.key }>Неделя</Select.Option>
						<Select.Option value={ VIEWS.month.key }>Месяц</Select.Option>
					</Select>
				</Form.Item>
			</Inputs>
		</Wrapper>
	);
};

export default observer(Toolbar);