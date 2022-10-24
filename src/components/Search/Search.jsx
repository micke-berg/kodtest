import React from 'react';
import styles from './search.module.scss';

const Search = ({ onChange, value, placeholder, style }) => {
	return (
		<div style={{ position: 'relative' }}>
			<input
				type="text"
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className={styles.search}
				style={{
					...style,
				}}
			/>
		</div>
	);
};

export default Search;
