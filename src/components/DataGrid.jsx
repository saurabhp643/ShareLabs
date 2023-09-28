import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../store/actions';
import axios from 'axios';
import './datagrid.css';

const DataGrid = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchDataRequest());
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        dispatch(fetchDataSuccess(response.data));
        console.log('Data fetched successfully');
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        dispatch(fetchDataFailure(err.message));
      });
  }, [dispatch]);

  // Function to remove a post by objectID (you need to implement this)
  const removePost = (objectID) => {
    // Implement logic to remove the post
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if data is defined before mapping
  if (!data) {
    return null; // or any other fallback content
  }

  return (
    <>
      <div className="stories-div">
        {data.map((curPost) => (
          <div className="card" key={curPost.id}>
            <h2>{curPost.userId}</h2>
            <p>
              By <span>{curPost.id}</span>
              <span>{curPost.id} comments</span>
            </p>
            <div className="card-button">
              <a href={curPost.title} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
              <a href="#" onClick={() => removePost(curPost.id)}>
                Remove
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataGrid;
