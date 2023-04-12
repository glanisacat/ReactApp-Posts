import React, {useMemo, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";

import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "222 1",
      body: "333 - это язык программирования",
    },
    {
      id: 2,
      title: "333 2",
      body: "222 - это язык программирования",
    },
    {
      id: 3,
      title: "111 3",
      body: "555 - это язык программирования",
    },
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(()=> {
    console.log('Function getSortedPosts was called');
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
          filter={filter} 
          setFilter={setFilter} 
      />
      {sortedAndSearchedPosts.length !== 0
        ? 
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
        : 
        <h1 style={{testAlign: 'center'}}>
          Посты не найдены
        </h1>
      }
      
    
      
    </div>
  );
}

export default App;

