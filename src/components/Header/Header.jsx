import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
  console.log(user, "<-- user in header");
  return (
    <>
      <Header as="h2">
        <nav class="navbar navbar-lg">
        <Link to={`/${user?.username}`}>
          <Image
            width="100px"
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
          ></Image>
        </Link> 
        <Link to="/"> 
          <img class="mx-auto d-block" width="600px" src="https://catcollector-ry.s3.amazonaws.com/photo-viber-logo-wh-2.png" alt="https://catcollector-ry.s3.amazonaws.com/photo-viber-logo-wh-2.png"/>
        </Link>   
          <div> 
          {/* <Link to="/">
            Home
            <Icon name="home"></Icon>
          </Link> */}

          <Link to="" onClick={handleLogout}>
            Logout
          </Link>
        </div>
        </nav>
      </Header>
    </>
  );
}
