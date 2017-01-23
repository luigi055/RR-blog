import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from 'Main';
import PostsIndex from 'PostsIndex';
import PostsNew from 'PostsNew';
import PostsShow from 'PostsShow';


export default (
  <Route path="/" component={Main} >
    <IndexRoute component={PostsIndex} />
    <Route path="/new-post" component={PostsNew} />
    <Route path="post:id" component={PostsShow} />
  </Route>
);
// How to access to the id parameter
//this.props.params.id
