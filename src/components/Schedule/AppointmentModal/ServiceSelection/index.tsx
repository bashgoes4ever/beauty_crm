import React, { useCallback, useContext, useEffect } from 'react';
import { Button, Form, InputNumber, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../../store/context';
import { getServicesApi } from '../../../../utils/api';
import SelectWithApi, { SelectOption } from '../../../SelectWithApi';
import { Service } from '../../../../store/Services';
import { observer } from 'mobx-react-lite';

const getTotalPrice = (quantity: number, price: number, discount: number) => quantity *
	(price - (price * (discount / 100)));

const ServiceSelection: React.FC = () => {
	const { appointmentCreationStore } = useContext(StoreContext);
	const [form] = Form.useForm();

	useEffect(() => () => {
		appointmentCreationStore.appointment.duration = appointmentCreationStore.durationFromServices;
	}, [appointmentCreationStore.appointment, appointmentCreationStore.durationFromServices]);

	const withFormUpdate = useCallback((updateMethod: (services: any) => any) => {
		const services = form.getFieldValue('services');
		const updated = updateMethod(services);
		form.setFieldsValue({ services: updated });
		appointmentCreationStore.appointment.services = updated;
	}, [appointmentCreationStore.appointment, form]);

	return (
		<>
			<Typography.Title level={ 4 }>Услуги</Typography.Title>

			<Form
				name="appointment_services"
				autoComplete="off" form={ form }
				layout="vertical"
				initialValues={ { services: appointmentCreationStore.appointment.services } }
				onValuesChange={ () => {
					appointmentCreationStore.appointment.services = form.getFieldValue('services');
				} }
			>
				<Form.List name="services">
					{ (fields, { add, remove }) => (
						<>
							{ fields.map(({ key, name, ...restField }) => {
								const canEdit = !form.getFieldValue('services')[name]?.service;

								const onServiceSelection = (option: SelectOption<Service>) => {
									withFormUpdate((services) => {
										services[name].service = option.data;
										services[name].quantity = 1;
										services[name].discount = appointmentCreationStore.appointment.client.discount ||
											0;
										services[name].totalPrice = getTotalPrice(services[name].quantity,
											option.data.price, services[name].discount);
										return services;
									});
								};

								const onQuantityUpdate = (value: number) => {
									withFormUpdate((services) => {
										services[name].totalPrice = value * (services[name].service.price -
											(services[name].service.price * (services[name].discount / 100)));
										return services;
									});
								};

								const onDiscountUpdate = (value: number) => {
									withFormUpdate((services) => {
										services[name].totalPrice = getTotalPrice(services[name].quantity,
											services[name].service.price, value);
										return services;
									});
								};

								const onPriceUpdate = (value: number) => {
									withFormUpdate((services) => {
										services[name].discount = Math.round(
											100 - (value / (services[name].service.price *
													services[name].quantity)
											) * 100);
										return services;
									});
								};

								return (
									<Space key={ key } style={ { display: 'flex' } } align="center">
										<Form.Item
											{ ...restField }
											name={ [name, 'service'] }
											rules={ [{ required: true, message: 'Выберите услугу' }] }
											label="Услуга"
											style={ { width: 150 } }
										>
											<SelectWithApi
												fetchOptions={ {
													fetch: getServicesApi,
													map: ['id', 'name']
												} }
												showSearch
												shouldTransformValue
												onOptionSelect={ onServiceSelection }
											/>
										</Form.Item>
										<Form.Item
											{ ...restField }
											name={ [name, 'quantity'] }
											label="Количество"
										>
											<InputNumber onChange={ onQuantityUpdate } disabled={ canEdit } />
										</Form.Item>
										<Form.Item
											{ ...restField }
											name={ [name, 'discount'] }
											label="Скидка, %"
										>
											<InputNumber onChange={ onDiscountUpdate } disabled={ canEdit } />
										</Form.Item>
										<Form.Item
											{ ...restField }
											name={ [name, 'totalPrice'] }
											label="Стоимость"
										>
											<InputNumber onChange={ onPriceUpdate } disabled={ canEdit } />
										</Form.Item>
										<MinusCircleOutlined style={ { position: 'relative', top: 4 } }
											onClick={ () => remove(name) } />
									</Space>
								);
							}) }
							<Form.Item>
								<Button type="dashed" onClick={ () => add() } block icon={ <PlusOutlined /> }>
									Добавить услугу
								</Button>
							</Form.Item>
						</>
					) }
				</Form.List>

				{
					appointmentCreationStore.totalPrice > 0 &&
					<div style={ { textAlign: 'right' } }>
						<Typography.Text><b>Итоговая стоимость:</b> { new Intl.NumberFormat(
							'ru-RU').format(
							appointmentCreationStore.totalPrice) } руб.</Typography.Text>
					</div>
				}

			</Form>
		</>
	);
};

export default observer(ServiceSelection);