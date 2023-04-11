import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDetails = ({ match }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`/api/projects/${match.params.id}/`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [match.params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p><strong>Disease Area:</strong> {project.disease_area}</p>
    </div>
  );
};

export default ProjectDetails;
