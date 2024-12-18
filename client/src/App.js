import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './Components/Header';
import FooterComp from './Components/FooterComp';
import PrivateRoute from './Components/PrivateRoute';
import React, { useEffect, useState } from 'react';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage'
import Search from './pages/Search';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterComp />
    </div>
  );
}

export default App;
