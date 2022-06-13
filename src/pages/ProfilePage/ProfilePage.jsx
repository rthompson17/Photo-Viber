import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { Button } from 'react-bootstrap';
import * as postsAPI from "../../utils/postApi";


import userService from "../../utils/userService";
import * as likesAPI from '../../utils/likeApi';

import { useParams } from "react-router-dom";
// import user from "../../../models/user";

export default function ProfilePage(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    async function addLike(postId){
        try {
            const data = await likesAPI.create(postId)
            console.log(data, ' <--- the server response when we make a like');
            getProfile();
        }   catch(err){
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likeId){
        try {
            const data = await likesAPI.removeLike(likeId);
            console.log(data, '<-- server response when we remove a like')
            getProfile()

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

    async function getProfile() {
        try {
            const data = await userService.getProfile(username);
            console.log(data, " <--- here is the data ");
            setLoading(() => false);
            setUser(() => data.user);
            setPosts(() => data.posts);
        }   catch (err) {
            setError("Profile doesn't exist --- check terminal for express")
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    if (error) {
        return (
          <>
            <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            <ErrorMessage error={error} />;
          </>
        );
      }
    
      if (loading) {
        return (
          <>
            <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            <Loading />
          </>
        );
      }
    
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          {/* <Grid.Column>
              <ProfileBio user={user} />
            </Grid.Column> */}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
                <AddPostForm handleAddPost={handleAddPost} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h1>YOUR PHOTOS</h1>
           </Grid.Column>
        </Grid.Row >
          <Grid.Row centered >
            <Grid.Column style={{ maxWidth: 750 }}>
            <PostFeed
                isProfile={true}
                posts={posts}
                numPhotosCol={7}
                user={props.user}
                addLike={addLike}
                removeLike={removeLike}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row><br></br></Grid.Row>
        <Grid.Row><br></br></Grid.Row>
        <h1>POSTS YOU'VE LIKED</h1>
         <Grid.Row>
            <Grid.Column>
                <PostFeed
                  posts={posts}
                  numPhotosCol={4}
                  isProfile={false}
                  loading={loading}
                  addLike={addLike}
                  removeLike={removeLike}
                  user={user}
                />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row><br></br></Grid.Row>
        <Grid.Row><br></br></Grid.Row>
      </Grid>
      );
}

