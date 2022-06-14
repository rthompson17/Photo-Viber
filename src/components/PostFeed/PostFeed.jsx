import React from 'react';
import { Card, Dimmer, Segment, Image } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';

export default function PostFeed({posts, numPhotosCol, isProfile, loading, addLike, removeLike, user }){
console.log(posts, '<-- this is posts')

// for each post's total number of likes -- {post.likes.length}
// find the total of all post likes for a user (to get their total number of likes) --- HINT: use reduce method??
// display "total likes" in the PostFeed which is part of the ProfilePage
// then lift state to display "new likes" it in the NAVBAR of each user

    // const initialValue = 0;
    // const sumLikes = posts[post.likes.length].reduce(
    //     (previousValue, currentValue) => previousValue + currentValue,
    //     initialValue
    // )


    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="small">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : null}
            {posts.map((post) => {
                return (
                  <PostCard
                    post={post}
                    key={post._id}
                    isProfile={isProfile}
                    addLike={addLike}
                    removeLike={removeLike}
                    user={user}
                  />
                );
            })}
        </Card.Group>
    )
}