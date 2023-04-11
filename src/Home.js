import React, { useState, useEffect } from 'react';


function Home() {
  const [projects, setProjects] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      let url = '/api/projects/';
      if (activeOnly) {
        url += '?active=true';
      }
      const response = await fetch(url);
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, [activeOnly]);

  const handleChange = (event) => {
    setActiveOnly(event.target.checked);
  };

  return (
    <div>
      <h1>Project Portal</h1>
      <form>
        <label>
          Show active projects only:
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={handleChange}
          />
        </label>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
