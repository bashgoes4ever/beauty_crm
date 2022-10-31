import React, { useCallback, useState } from 'react';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Select, SelectProps } from 'antd';
import _ from 'lodash';
import Loader from '../Loader';
import { observer } from 'mobx-react-lite';

export type SelectOption<T> = {
	value: number;
	disp: string;
	data: T;
}

type FetchOptions = {
	fetch: () => Promise<unknown>;

	map: [string, string];
}

type Props = SelectProps & {
	fetchOptions: FetchOptions;

	onOptionSelect?: (data: SelectOption<any>) => void;

	shouldTransformValue?: boolean;

	optionComponent?: (props: any) => React.ReactNode;

	customTag?: (props: CustomTagProps, data: SelectOption<any>['data']) => JSX.Element;
}

const SelectWithApi: React.FC<Props> = (componentProps) => {
	const {
		optionComponent,
		fetchOptions: { fetch, map },
		onOptionSelect,
		shouldTransformValue,
		customTag,
		...props
	} = componentProps;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [options, setOptions] = useState<SelectOption<unknown>[]>([]);

	if (shouldTransformValue) {
		if (_.isArray(props.value)) {
			if (_.every(props.value, value => _.isObject(value))) {
				props.value = _.map(props.value, (option) => ({
					value: option[map[0]],
					label: option[map[1]],
					data: option
				}));
			}
		} else {
			props.value = {
				value: props.value && props.value[map[0]],
				label: props.value && props.value[map[1]]
			};
		}
	}

	const onDropdownVisibleChange = useCallback((open: boolean): void => {
		if (!open) {
			return;
		}

		setIsLoading(true);
		fetch().then((res: {}) => {
			setOptions(
				_.map(
					res,
					(item) => ({ value: item[map[0]], disp: item[map[1]], data: item })
				)
			);
			setIsLoading(false);
		});
	}, [fetch, map]);

	const onSelect = useCallback((val: number) => {
		onOptionSelect && onOptionSelect(_.find(options, (option) => option.value === val));
	}, [onOptionSelect, options]);

	const tagRender = useCallback((tagProps: CustomTagProps) => {
		const { data } =
		_.find(options, (option) => option?.value === tagProps.value) ||
		_.find(props.value, (option) => option?.value === tagProps.value) ||
		{};

		return customTag(tagProps, data);
	}, [customTag, options, props.value]);

	return (
		<Select
			{ ...props }
			onDropdownVisibleChange={ onDropdownVisibleChange }
			onSelect={ onSelect }
			loading={ isLoading }
			dropdownRender={ (menu) =>
				isLoading ? <Loader /> : menu
			}
			notFoundContent={ <span>Ничего не найдено</span> }
			tagRender={ customTag && tagRender }
		>
			{
				_.map(options, ({ value, disp }, i) => (
					optionComponent
						? optionComponent({ value, disp, key: i })
						: <Select.Option key={ i } value={ value }>{ disp }</Select.Option>
				))
			}
		</Select>
	);
};

export default observer(SelectWithApi);