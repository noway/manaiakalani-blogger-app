import React from 'react';
import Circle from './Circle';

const statusToColor = {
    'SCHEDULED': 'yellow',
    'DRAFT': 'red',
    'LIVE': 'green'
};

export default function Block({title, status, content}) {
    const color = statusToColor[status];
    return (
        <div className="block">
            <div className="block-header">
                <Circle color={color} />
                <h2 className="block-title">{title}</h2>
                <span className={`block-status color-${color}`}>{status}</span>
            </div>
            <div className="block-content" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    );
}