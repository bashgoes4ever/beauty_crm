import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Column } from '@antv/g2plot';
import { getClientStatisticsApi, getTotalsApi, StatisticsScale } from '../../../../utils/api';
import { ControlsWrapper, TotalSuffix, TotalsWrapper } from './styles';
import { DatePicker, Form, Select, Statistic } from 'antd';
import _ from 'lodash';
import Loader from '../../../../components/Loader';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment, { Moment } from 'moment';

const defaultConfig = {
	xField: 'date',
	yField: 'value',
	seriesField: 'service',
	isStack: true
};

const Statistics: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const columnsRef = useRef<Column>(null);
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totals, setTotals] = useState([]);

	const loadData = useCallback((scale: StatisticsScale = 'month', date: Moment = moment()) => {
		setIsLoading(true);
		const requests = [];
		if (!columnsRef.current) {
			columnsRef.current = new Column(ref.current, { ...defaultConfig, data: [] });
		}

		requests.push(getClientStatisticsApi(scale, date).then((data) => {
			columnsRef.current.update({
				data,
				tooltip: {
					title: (title, datum) => {
						let date = form.getFieldValue('date');
						if (form.getFieldValue('scale') === 'month') {
							date = moment(date).set('date', datum.date).format('DD MMMM YYYY');
						} else {
							date = moment(date).set('month', datum.date).format('MMMM YYYY');
						}
						return date;
					},
					formatter: (datum) => ({ name: datum.service, value: datum.value + ' руб.' })
				}
			});
		}));

		requests.push(getTotalsApi().then((data) => {
			setTotals(data);
		}));

		Promise.all(requests).then(() => {
			setIsLoading(false);
			columnsRef.current.render();
		});
	}, []);

	const onValuesChange = useCallback((_: any, { scale, date }: any) => {
		loadData(scale, date);
	}, [loadData]);

	useLayoutEffect(() => {
		if (ref.current) {
			loadData();
		}
	}, [loadData]);

	return (
		<>
			<ControlsWrapper
				name="basic"
				initialValues={ { scale: 'month', date: moment() } }
				layout="vertical"
				autoComplete="off"
				form={ form }
				onValuesChange={ onValuesChange }
			>
				<Form.Item label="Масштаб" name="scale">
					<Select style={ { width: 120 } }>
						<Select.Option value="month">Месяц</Select.Option>
						<Select.Option value="year">Год</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label={ form.getFieldValue('scale') === 'month' ? 'Месяц' : 'Год' } name="date">
					<DatePicker
						clearIcon={ false }
						picker={ form.getFieldValue('scale') }
						locale={ locale }
					/>
				</Form.Item>
			</ControlsWrapper>
			{
				isLoading
					? <Loader />
					: (
						<TotalsWrapper>
							{
								_.map(totals, ({ title, value }, i) => (
									<Statistic title={ title } value={ value } suffix={ <TotalSuffix>руб.</TotalSuffix> }
										key={ i } />
								))
							}
						</TotalsWrapper>
					)
			}

			<div ref={ ref } />
		</>
	);
};

export default Statistics;