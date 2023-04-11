import React, { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [capabilities_needed, setCapabilitiesNeeded] = useState('');
  const [disease_area, setDiseaseArea] = useState('');
  const [study_type, setStudyType] = useState('');
  const [submitted_by, setSubmittedBy] = useState('');

  useEffect(() => {
    // fetch projects from Django backend when component mounts
    api.get('/projects/')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    // prevent default form submission behavior
    event.preventDefault();
    // post project data to Django backend
    api.post('/projects/', {
      title,
      details,
      start_date,
      end_date,
      capabilities_needed,
      disease_area,
      study_type,
      submitted_by
    })
      .then(response => {
        // update projects state with new project
        setProjects([...projects, response.data]);
        // clear form fields
        setTitle('');
        setDetails('');
        setStartDate('');
        setEndDate('');
        setCapabilitiesNeeded('');
        setDiseaseArea('');
        setStudyType('');
        setSubmittedBy('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Project Portal</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Details:</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} required />
        <label>Start Date:</label>
        <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} required />
        <label>End Date:</label>
        <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
        <label>Capabilities Needed:</label>
        <input type="text" value={capabilities_needed} onChange={(e) => setCapabilitiesNeeded(e.target.value)} required />
        <label>Disease Area:</label>
        <input type="text" value={disease_area} onChange={(e) => setDiseaseArea(e.target.value)} required />
        <label>Study Type:</label>
        <input type="text" value={study_type} onChange={(e) => setStudyType(e.target.value)} required />
        <label>Submitted By:</label>
        <input type="text" value={submitted_by} onChange={(e) => setSubmittedBy(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;