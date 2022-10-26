import React, { useState } from 'react';
import styles from './search.module.scss';
import { MdClear, MdOutlineSearch } from 'react-icons/md';

const Search = ({ filterGamesByCurrency, data, placeholder, style }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (searchText) => {
		// Searh item by name
		setSearchTerm(searchText);

		const searchResult = data.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);

		if (searchText.length > 0) {
			filterGamesByCurrency(searchResult);
		}
	};

	const handelClearInput = () => {
		setSearchTerm('');
		filterGamesByCurrency(data);
	};

	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				width: '100%',
				maxWidth: '400px',
			}}
		>
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => handleSearch(e.target.value)}
				value={searchTerm}
				className={styles.search}
				style={{
					...style,
				}}
			/>
			{searchTerm ? (
				<span className={styles.icon} style={{ cursor: 'pointer' }}>
					<MdClear onClick={handelClearInput} />
				</span>
			) : (
				<span className={styles.icon}>
					<MdOutlineSearch />
				</span>
			)}
		</div>
	);
};

export default Search;
