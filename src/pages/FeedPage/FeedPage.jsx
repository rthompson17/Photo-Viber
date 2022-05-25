import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import Switch from 'react-ios-switch'
import Advanced from '../../components/examples/Advanced'
import showAdvanced from '../../components/examples/Advanced'
import setShowAdvanced from '../../components/examples/Advanced'
import Simple from '../../components/examples/Simple'
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi"

import { Grid } from "semantic-ui-react"

export default function Feed({user, handleLogout}) {
    console.log(postsAPI, " <-- this is the postsAPI")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function addLike(postId){
        try {
            const data = await likesAPI.create(postId)
            console.log(data, ' <--- the server response when we make a like');
            getPosts();
        }   catch(err){
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likeId){
        try {
            const data = await likesAPI.removeLike(likeId);
            console.log(data, '<-- server response when we remove a like')
            getPosts()

        }   catch(err){
            console.log(err);
            setError(err.message);
        }
    }

    async function handleAddPost(post) {
        try {
            setLoading(true);
            const data = await postsAPI.create(post);

            console.log(data, " this is response from the server, in handleAddpost");
            setPosts([data.post, ...posts]);
            setLoading(false);
        }   catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

   // R read in crud
   async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

    useEffect(() => {
        getPosts();
    }, []);

    if (error) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} user={user}/>
                <ErrorMessage error={error} />;
            </>
        );
    }

    if (loading) {
        return (
            <>
                <PageHeader handleLogout={handleLogout} user={user}/>
                <Loading />
            </>
        );
    }

return (
    <Grid centered>
        <Grid.Row>
            <Grid.Column>
                <PageHeader handleLogout={handleLogout} user={user}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            {/* TINDER EXAMPLE START */}
             <div className='app'>
             {showAdvanced ? <Advanced /> : <Simple />}
             <div className='row'>
              <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
             </div>
            </div>
                    {/* TINDER EXAMPLE END */}
        </Grid.Row>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
                <PostFeed
                  posts={posts}
                  numPhotosCol={1}
                  isProfile={false}
                  loading={loading}
                  addLike={addLike}
                  removeLike={removeLike}
                  user={user}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
  );
}