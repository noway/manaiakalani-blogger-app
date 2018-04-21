import React from 'react';

export default function Circle({color}) {
	return (
		<div className={`circle circle-${color}`}></div>
	);
}

