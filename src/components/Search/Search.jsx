import React, { useState } from 'react';
import styles from './search.module.scss';
import { MdClear, MdOutlineSearch } from 'react-icons/md';

const Search = ({ filterGamesByCurrency, data, placeholder, style }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState(0);

	const handleSearch = (searchText) => {
		// Searh item by name
		setSearchTerm(searchText);

		const searchResult = data.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);

		if (searchText.length > 0) {
			filterGamesByCurrency(searchResult);
			setSearchResults(searchResult.length);
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
				width: '100%',
				maxWidth: '400px',
			}}
		>
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
			<div style={{ position: 'absolute', top: 47, left: 0, color: 'pink' }}>
				{!searchResults && searchTerm ? (
					'No games found'
				) : searchTerm !== '' ? (
					<span>
						<span style={{ fontWeight: '700' }}>{searchResults}</span>
						{` Game${searchResults > 1 ? 's' : ''} found`}
					</span>
				) : null}
			</div>
		</div>
	);
};

export default Search;
