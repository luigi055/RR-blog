import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // console.log('this would be a good time to call an action creator to fetch posts!');
    this.props.fetchPosts();
  }
  renderPosts() {
    console.log(this.props.posts)
    return this.props.posts.map(post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`post${post.id}`}>
            <strong>{post.title}</strong>
            <span className="pull-xs-right">{post.categories}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-right">
          <Link to="new-post" className="btn btn-primary">Add Post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// } //you can use { fetchPosts: fetchPosts } in connect as shortcut. same as mapDispatchToProps

function mapStateToProps(state) {
  return {
    posts: state.posts.all
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
