const { request, response } = require('express');
const express = require('express');
const app = express();

const { uuid } = require('uuidv4');

app.use(express.json());

const projects =[];

app.get('/projects', (request, response)=>{
  const { title } = request.query;

  const result = title
  ? projects.filter( project => project.title.includes(title))
  : projects;

  return response.json(result);
});

app.post('/projects', (request, response)=>{
   const {title, owner} = request.body;
 const project = { id: uuid(), title, owner};

  projects.push(project);
 return response.json(project);
});

app.put('/projects/:id', (request, response)=>{
  const {id} = request.params;
  const {title, owner} = request.body;

  const projectIndex = projects.findIndex( project => id == project.id);
  if(projectIndex < 0 ){
    return response.status(404).json('Project not')
  }

  const project = {
    id,
    title,
    owner
  }
  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response)=>{
    const { id } = request.params;

    const projectIndex = projects.findIndex( project => project.id == id );

    if(projectIndex < 0){
      return response.status(404).json({Error:"Project not found!"})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).json({Success: "Project removed!"})
});

app.listen(3333, ()=>{
  console.log(`Back-end started! 🚀`);
});