import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import usePosts from './hooks/usePosts';

const PostList = () => {
  const [userID, setUserID] = useState<number>();
  const { data: posts, error } = usePosts(userID);


  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(e) => setUserID(parseInt(e.target.value))}
        value={userID}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
