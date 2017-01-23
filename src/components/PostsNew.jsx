import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; //this works almost identical to connect() it also inject our action creators to the component
import { createPost } from '../actions';
import { Link } from 'react-router';

class PostsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
// Avoid using react context in your project just use it specifically for use with react-router push method   
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    console.log('hi hi~~');
  }
  componentWillUnmount() {
    console.log('bye bye~~');
  }

  onSubmit(props) {
    this.props.createPost(props) //createPost is a actionCreator that returns a promise
      .then(() => {
        // Blog post has been created, navigate the user to the index
        // Navigate by calling this.context.router.push with the
        // new path to navigate to
        this.context.router.push('/'); // => redirect to our path="/"
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    console.log(title);
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create a new Post</h3>
        <div className={`form-control ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" name='title' {...title} />
          <div className="text-help text-danger">
            {title.touched ? title.error : '' } 
            {/*touched property is proporcionated by reduxform it is activated when someone touche a form*/}
          </div>
        </div>
        <div className={`form-control ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label htmlFor="categories">Categories</label>
          <input type="text" className="form-control" name='categories' {...categories} />
          <div className="text-help text-danger">
            {categories.touched ? categories.error : '' } 
          </div>
        </div>
        <div className={`form-control ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label htmlFor="content">Content</label>
          <textarea className="form-control" name='content' {...content} />
          <div className="text-help text-danger">
            {content.touched ? content.error : '' } 
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) errors.title = 'Enter a username';
  if (!values.categories) errors.categories = 'Enter a at least one category';
  if (!values.content) errors.content = 'don\'t forget to write your content. it is required';
  
  return errors;
}

// connect(): 1st. mapStateToProps 2nd. mapDispatchToProps
// reduxForm(): 1st. form configuration, 2nd. mapStateToProps, 3rd. mapDispatchToProps

 export default reduxForm({
   form: 'PostsNewForm',
   fields: ['title', 'categories', 'content'],
   validate
 }, 
 null, 
 { createPost })(PostsNew);

//user types something in ... record it on application stat
// This is what reduxForm does behind the scene:
// state === {
//   form: {
//     PostsNewForm: {
//       title: '...',
//       categories: '...',
//       content: '...'
//     }
//   }
// }