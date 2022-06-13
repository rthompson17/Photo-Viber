import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
  console.log(user, "<-- user in header");
  return (
    <>
      <Header>
        <nav class="navbar navbar-expand-md">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                    <Link to="/"> 
                    <img width="400px" src="https://catcollector-ry.s3.amazonaws.com/photo-viber-logo-wh-2.png" alt="https://catcollector-ry.s3.amazonaws.com/photo-viber-logo-wh-2.png"/>
                    </Link>
                    </div>
                     </div>
                </div>
                    <div class="col-sm-1">
                        <Link to={`/${user?.username}`}>
                            <Image
                                width="70px" height="70px" float="right"
                                src={
                                user?.photoUrl
                                    ? user?.photoUrl
                                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                }
                            ></Image>
                        </Link>    
                        </div>
                    <div>
                        <Link to="" onClick={handleLogout} style={{ textDecoration: 'none', color: 'whitesmoke'}}>
                            <h4>Logout</h4>
                        </Link>
                </div>
        </nav>
      </Header>
    </>
  );
}
