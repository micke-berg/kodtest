import React, { useEffect, useState } from 'react';
import Button from './Button/Button';
import Card from './Card/Card';
import Search from './Search/Search';
import Select from './Select/Select';
import StudioFilter from './StudioFilter/StudiofFilter';

const Main = () => {
	const [data, setData] = useState([]);
	const [tagsInFilteredGames, setTagsInFilteredGames] = useState([]);
	const [filteredGames, setFilteredGames] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCurrency, setSelectedCurrency] = useState('EUR');

	const { currencies, games, studios, tags } = data;

	const options = [
		{ values: 'EUR', name: 'EUR' },
		{ values: 'USD', name: 'USD' },
		{ values: 'mBTC', name: 'mBTC' },
	];

	const endpoint =
		'https://cubeia-code-tests.s3.eu-west-1.amazonaws.com/lobby.json';

	useEffect(() => {
		fetch(endpoint, {})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setData(myJson);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const filterGamesByCurrency = (gamesToFilter) => {
		const currencyFilteredGames = gamesToFilter?.filter((game) => {
			const currenciesForStudio = currencies.filter(
				(cur) => cur.studioId === game.studioId
			);
			return currenciesForStudio[0].currencies.includes(selectedCurrency);
		});
		setFilteredGames(currencyFilteredGames);
	};

	useEffect(() => {
		filterGamesByCurrency(games);
	}, [selectedCurrency, games]);

	const defaultGames = () => {
		filterGamesByCurrency(games);
	};

	const handleSearch = (text) => {
		// Searh games by name
		filterGamesByCurrency(games);
		setSearchQuery(text);

		const searchResult = filteredGames.filter((game) =>
			game.name.toLowerCase().includes(text)
		);
		if (text.length > 2) {
			filterGamesByCurrency(searchResult);
		} else if (text === '') {
			filterGamesByCurrency(games);
		}
	};

	const handleTags = () => {
		// Filter only tags used in games
		const temp = games?.map((g) => g.gameTags).map((x) => x) || [];
		const toOneArray = [].concat(...temp);
		const allGameTagsUsed = toOneArray.filter(
			(el, i) => toOneArray.indexOf(el) === i
		);

		const gameTags = [];

		for (let key of tags || []) {
			allGameTagsUsed.map((x) => {
				if (x === key.id) {
					gameTags.push({ ...key });
				}
			});
		}
		setTagsInFilteredGames(gameTags);
	};

	useEffect(() => {
		handleTags();
	}, [games, tags]);

	const handleFilterCategories = (e) => {
		// Filter games based on category
		const gamesFilteredByTags = games.filter((game) =>
			game.gameTags.includes(e)
		);
		setFilteredGames(gamesFilteredByTags);
	};

	return (
		<div className="wrapper">
			<h1
				style={{
					marginBottom: 40,
				}}
			>
				Casino
			</h1>
			<div
				className=""
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Search
					placeholder="Search games..."
					value={searchQuery}
					onChange={(e) => handleSearch(e.target.value)}
				/>
				<Select
					options={options}
					value={selectedCurrency || ''}
					setSelectedValue={setSelectedCurrency}
				/>
			</div>
			<div>
				<h2 className="header">Categories</h2>
				<div className="grid">
					{tagsInFilteredGames?.map((tag) => (
						<Button key={tag.id} onClick={() => handleFilterCategories(tag.id)}>
							{tag.name}
						</Button>
					))}
					<Button
						title="All games"
						style={{
							backgroundColor: 'orange',
						}}
						onClick={() => defaultGames()}
					/>
				</div>
			</div>
			<div>
				<h2 className="header">Studios</h2>
				{studios ? (
					<StudioFilter
						studios={studios}
						games={games}
						filteredGames={filteredGames}
						filterGamesByCurrency={filterGamesByCurrency}
					/>
				) : null}
			</div>
			<div>
				<h2 className="header">Games</h2>
				<div className="grid">
					{filteredGames?.map((game) => (
						<Card
							key={game.id}
							title={game.name}
							subTitle={
								studios.filter((studio) => studio.id === game.studioId)[0].name
							}
							imageUrl={game.imageUrl}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Main;