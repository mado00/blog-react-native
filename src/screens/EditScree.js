import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {
  // console.log(navigation)
  const id = navigation.getParam('id');
  // iterate thought all blog post and find id to match
  const { state, editBlogPost } = useContext(Context);

  const blogPost = state.find(
    blogPost => blogPost.id === id
  );


  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        // use navigation.pop() is go back to previous screen
        editBlogPost(id, title, content, () => navigation.pop())
      }}
    />
  ) 
};

const style = StyleSheet.create({})

export default EditScreen;