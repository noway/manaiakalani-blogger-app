import React, { Component } from 'react';
import Block from './Block';

export default function Home({posts}) {
    console.log(posts);
    const component = posts ? posts.map(block => (
        <Block key={block.content} {...block} />)
    ) : 'Loading';
    
    return (
        <div>
            {component}
        </div>
    );
}