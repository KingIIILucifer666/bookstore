import React from 'react';
import BookList from './BookList';

const Home = () => {
  return (
    <div>
      <h1
        style={{
          background:
            'radial-gradient(circle,rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)',
        }}
        className="text-center h-40 align-middle text-white font-bold text-3xl pt-14"
      >
        Welcome to <span className="text-black">The Book Store.</span>
      </h1>
      <BookList />
    </div>
  );
};

export default Home;
