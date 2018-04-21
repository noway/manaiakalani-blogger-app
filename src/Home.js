import React, { Component } from 'react';
import Block from './Block';

const blocks = [
    {
        title: 'Demo 1',
        status: 'Published',
        content: 'abcd'
    }, {
        title: 'Demo 2',
        status: 'Scheduled',
        content: 'qwerty'
    }
];

export default function Home() {
    return (
        <div>
            {blocks.map(block => (<Block key={block.content} {...block} />))}
        </div>
    );
}