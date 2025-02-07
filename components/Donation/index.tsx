"use client"
import { Input, Select } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";

const { Option } = Select;

type Price = string;
type Currency = "$" | "￥";

interface Value {
	price: Price;
	currency: Currency;
}

interface IProps {
	value?: Value;
	onChange?: (value?: Value) => void;
}

const Donation: React.FC<IProps> = ({ value, onChange }) => {
	// 初始化数据
	const [price, setPrice] = useState<Price>(value?.price ?? "");
	const [currency, setCurrency] = useState<Currency>(value?.currency ?? "￥");

	// 第一次进来不进行rule校验提示
	const [flag, setFlag] = useState<boolean>(false);

	// 在输入变化时进行onChange()传输
	useEffect(() => {
		console.log(price);
		console.log(currency);
		if (typeof onChange === "function" && flag) {
			if (price != null && price !== "" && currency != null) {
				onChange({ price, currency });
			} else {
				onChange();
			}
		}
		if (!flag) {
			setFlag(true);
		}
	}, [price, currency, onChange, flag]);

	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	const onSelect = (value: "$" | "￥") => {
		setCurrency(value);
	};

	// 选择币制
	const selectAfter = (
		<Select
			style={{ width: 60 }}
			onChange={(value) => onSelect(value)}
			value={currency}
		>
			<Option value="￥">￥</Option>
			<Option value="$">$</Option>
		</Select>
	);

	return (
		<Input
			onChange={(e) => inputChange(e)}
			addonAfter={selectAfter}
			value={price}
		/>
	);
};
export default Donation;
