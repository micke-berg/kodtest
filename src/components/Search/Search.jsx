import React, { useState } from 'react';
import styles from './search.module.scss';
import { MdClear, MdOutlineSearch } from 'react-icons/md';

const Search = ({
	filterGamesByCurrency,
	dataToSearchByName,
	data,
	placeholder,
	style,
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (searchText) => {
		// Searh item by name
		filterGamesByCurrency(data);
		setSearchTerm(searchText);

		const searchResult = dataToSearchByName.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);

		if (searchText.length > 1) {
			filterGamesByCurrency(searchResult);
		} else if (searchText === '') {
			filterGamesByCurrency(data);
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
