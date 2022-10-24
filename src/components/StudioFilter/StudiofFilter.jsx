import React from 'react';
import styles from './studioFilter.module.scss';

const StudioFilter = ({ style, studios, games, filterGamesByCurrency }) => {
	const handleFilterStudio = (e) => {
		const gamesFilteredByStudio = games?.filter((item) => item.studioId === e);
		filterGamesByCurrency(gamesFilteredByStudio);
	};

	return (
		<div className={styles.container}>
			{studios?.map((studio) => (
				<div
					key={studio.id}
					className={styles.item}
					style={{ ...style }}
					onClick={() => handleFilterStudio(studio.id)}
				>
					<img className={styles.img} src={studio.imageUrl} alt={studio.name} />
				</div>
			))}
		</div>
	);
};

export default StudioFilter;
