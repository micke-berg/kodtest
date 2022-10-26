import React from 'react';
import styles from './card.module.scss';

const Card = ({ title, subTitle, imageUrl, style, onClick }) => {
	return (
		<li className={styles.card} style={{ ...style }} onClick={onClick}>
			<img className={styles.img} src={imageUrl} alt={title}></img>
			<div className={styles.info}>
				<div className={styles.title}>{title}</div>
				<div className={styles.subTitle}>{subTitle}</div>
			</div>
		</li>
	);
};

export default Card;
