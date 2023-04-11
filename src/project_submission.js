import React, { useState } from 'react';
import axios from 'axios';

const ProjectSubmission = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    disease_area: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/projects/', projectData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Submit a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Disease Area:</label>
          <input type="text" name="disease_area" onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProjectSubmission;
