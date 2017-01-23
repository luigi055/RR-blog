import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

  componentWillMount() {
    const postId = this.props.params.id;
    this.props.fetchPost(postId);
    this.onDelete = this.onDelete.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onDelete() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/'); // => redirect to our path="/"
      });
  }

  render() {
    const { post } = this.props;
    if (!post) return <div>Loading...</div>;
    console.log(this.props); // Since network connect take time to fecth data this first log when receive the first state which is post = null then it log again once the new value was fetch from server post = { items... }
    return (
      <div>
        <div className="text-right">
          <Link to="/" className="btn btn-primary">Back to Index</Link>
          <button 
            onClick={this.onDelete} 
            className="btn btn-danger">
              Delete Post
          </button>
        </div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>
          {post.content}
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({ post: state.posts.post });

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
