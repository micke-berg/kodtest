import React from 'react';
import styles from './button.module.scss';

const Button = ({
	type = 'button',
	style,
	onClick = () => {},
	children,
	title,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={styles.button}
			style={{ ...style }}
		>
			{children ? children : title}
		</button>
	);
};

export default Button;
