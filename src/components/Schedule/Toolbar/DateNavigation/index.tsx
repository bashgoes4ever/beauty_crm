import React, { useCallback, useContext, useState } from 'react';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { Button, DatePicker } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ButtonsWrapper, Wrapper } from './styles';
import { StoreContext } from '../../../../store/context';
import { observer } from 'mobx-react-lite';
import { Moment } from 'moment';

const DateNavigation: React.FC = () => {
	const { scheduleHelper } = useContext(StoreContext);
	const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);

	const onOpenChange = useCallback((isOpen: boolean): void => {
		setIsDatePickerOpened(isOpen);
	}, []);

	const onDateBtnClick = useCallback(() => {
		setIsDatePickerOpened(!isDatePickerOpened);
	}, [isDatePickerOpened]);

	const onDateSelect = useCallback((value: Moment) => {
		scheduleHelper.currentDate = value;
	}, [scheduleHelper]);

	const onNextBtnClick = useCallback((): void => {
		scheduleHelper.navigate();
	}, [scheduleHelper]);

	const onPrevBtnClick = useCallback((): void => {
		scheduleHelper.navigate('backward');
	}, [scheduleHelper]);

	return (
		<Wrapper>
			<ButtonsWrapper>
				<Button icon={ <LeftOutlined /> } shape="circle" onClick={ onPrevBtnClick } />
				<Button icon={ <RightOutlined /> } shape="circle" onClick={ onNextBtnClick } />
			</ButtonsWrapper>
			<DatePicker
				locale={ locale }
				picker={ scheduleHelper.pickerMode }
				value={ scheduleHelper.currentDate }
				open={ isDatePickerOpened }
				style={ { visibility: 'hidden', width: 0 } }
				onOpenChange={ onOpenChange }
				onSelect={ onDateSelect }
			/>
			<Button type="link" onClick={ onDateBtnClick }>{ scheduleHelper.currentDateString }</Button>
		</Wrapper>
	);
};

export default observer(DateNavigation);