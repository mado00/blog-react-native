import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ]    
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;
      });
    default:
      return state;
  }  
}

const addBlogPost = dispatch => {
  return (title, content, callback) => {
    dispatch({
      type: 'add_blogpost',
      payload: { title, content }
    });
    if (callback) {
      callback();
    }
  } 
};

const deleteBlogPost = dispatch => {
  return (id) => {
    dispatch({
      type: 'delete_blogpost',
      payload: id
    });
  }
};

const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({
      type: 'edit_blogpost',
      payload: { id, title, content }
    });
    if (callback) {
      callback();
    }    
  }
}
  // const addBlogPost = () => {
  //   // Update state variable then re-render component
  //   // create new blogPosts with exisiting blog posts ...blogPosts and add new blog title
  //   setBlogPosts([
  //     ...blogPosts,
  //     { title: `Blog Post #${blogPosts.length + 1}` }
  //   ]);
  // };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  // [],
  // Usually initial state is [] but for testing purpose we can put initial data then we don't need type every time
  [{ title: 'TEST POST', content: 'TEST CONTENT', id: 1}]
);
