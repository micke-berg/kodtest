import React from 'react';
import styles from './select.module.scss';

const Select = ({ setSelectedValue, options, value, style }) => {
	const handleSelect = (e) => {
		setSelectedValue(e);
	};
	return (
		<select
			className={styles.select}
			style={style}
			value={value || ''}
			onChange={(e) => handleSelect(e.target.value)}
		>
			{options.map((option) => (
				<option value={option.value}>{option.name}</option>
			))}
		</select>
	);
};

export default Select;
