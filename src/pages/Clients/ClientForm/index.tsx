import React, { useCallback, useContext } from 'react';
import { Button, DatePicker, Form as AntdForm, Input, InputNumber, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import locale from 'antd/es/date-picker/locale/ru_RU';
import SelectWithApi, { SelectOption } from '../../../components/SelectWithApi';
import { getAvailableSexApi, getClientCategoriesApi } from '../../../utils/api';
import { StoreContext } from '../../../store/context';
import { observer } from 'mobx-react-lite';
import { ButtonWrapper, Form } from './styles';

type Props = {
	shouldShowSaveButton?: boolean;

	columnsCount?: number
}

const categoryTagRender = (props: CustomTagProps, data: SelectOption<any>['data']) => {
	const { label, value, closable, onClose } = props;

	if (!value || !data) {
		return null;
	}

	const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};
	return (
		<Tag
			color={ data.color }
			onMouseDown={ onPreventMouseDown }
			closable={ closable }
			onClose={ onClose }
			style={ { marginRight: 3 } }
		>
			{ label }
		</Tag>
	);
};

const ClientForm: React.FC<Props> = ({ shouldShowSaveButton, columnsCount = 1 }) => {
	const { clientStore } = useContext(StoreContext);
	const [form] = AntdForm.useForm();

	const onValuesChange = useCallback((changedValues: any, values: any) => {
		clientStore.data = {
			...clientStore.data,
			...values
		};

		form.validateFields()
			.then((res) => {
				clientStore.isValid = res.errorFields ? res.errorFields.length === 0 : true;
			})
			.catch((res) => {
				clientStore.isValid = res.errorFields ? res.errorFields.length === 0 : true;
			});
	}, [clientStore, form]);

	return (
		<>
			<Form
				name="basic"
				initialValues={ clientStore.data }
				layout="vertical"
				autoComplete="off"
				form={ form }
				onValuesChange={ onValuesChange }
				columnsCount={ columnsCount }
			>
				<AntdForm.Item
					label="Имя"
					name="name"
					rules={ [{ required: true, message: 'Введите имя' }] }
				>
					<Input />
				</AntdForm.Item>
				<AntdForm.Item
					label="Телефон"
					name="phone"
				>
					<Input />
				</AntdForm.Item>
				<AntdForm.Item
					label="Почта"
					name="email"
					rules={ [{ type: 'email', message: 'Введите корректное  значение' }] }
				>
					<Input />
				</AntdForm.Item>
				<AntdForm.Item
					label="День рождения"
					name="birthDate"
				>
					<DatePicker
						locale={ locale }
						style={ { width: '100%' } }
						placeholder={ '' }
						suffixIcon={ false }
					/>
				</AntdForm.Item>
				<AntdForm.Item
					label="Пол"
					name="sex"
				>
					<SelectWithApi
						fetchOptions={ {
							fetch: getAvailableSexApi,
							map: ['id', 'title']
						} }
					/>
				</AntdForm.Item>
				<AntdForm.Item
					label="Категории"
					name="categories"
				>
					<SelectWithApi
						mode="multiple"
						allowClear
						customTag={ categoryTagRender }
						fetchOptions={ {
							fetch: getClientCategoriesApi,
							map: ['id', 'title']
						} }
						shouldTransformValue
					/>
				</AntdForm.Item>
				<AntdForm.Item
					label="Скидка, %"
					name="discount"
				>
					<InputNumber style={ { width: '100%' } } />
				</AntdForm.Item>
			</Form>

			{
				shouldShowSaveButton &&
				<ButtonWrapper>
					<Button type="primary" disabled={ !clientStore.isValid }>Сохранить</Button>
				</ButtonWrapper>
			}
		</>
	);
};

export default observer(ClientForm);