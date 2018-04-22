import React from 'react';
import Block from './Block';
import InfiniteScroll from 'react-infinite-scroller';

export default function Home({ posts, postsCount, loadPostsNext }) {
    const component = posts ? posts.map(block => (
        <Block key={block.id} {...block} />)
    ) : 'Loading';
    
    return (
        <div>
            <header className="post-header">
                <img src="/logo-horizontal.png" className="post-header-logo" alt="" />
            </header>
            <h2 className="post-page-title">All posts</h2>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadPostsNext}
                hasMore={posts ? posts.length < postsCount : false}
                loader={<div className="loader" key={0}>Loading ...</div>}>
                {component}
            </InfiniteScroll>
        </div>
    );
}