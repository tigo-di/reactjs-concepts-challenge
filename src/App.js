import React, { useState, useEffect } from "react";
import api from "./services/api";
import LiRepository from "./components/LiRepository";

import "./styles.css";

export default function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(
    ()=>{
      api
      .get('repositories')
      .then(
        response => {
        setRepositories(response.data);
        },
        error => {
          return false;
        });
      },
    []
  );
  
  async function handleAddRepository() {

    const response = await api.post('repositories',
      {
        title: "Imersao CSS",
        url: "https://github.com/tigo-di/imersaocss",
        techs: "['HTML', 'CSS']"
      });

    if(response.status!==200) {
      return false;
    }  

    const respository = response.data;

    setRepositories([...repositories, respository]);

  }



  async function handleRemoveRepository(event) {

    const id = event.target.value;
    
    const response = await api.delete(`repositories/${id}`);
    
      if(response.status===204) {
        setRepositories(
          repositories.filter(
            item => item.id !== id
          )
        );
      };

  }

  return (
  
    <div>
      <ul data-testid="repository-list">

        {repositories.map(
          repository =>
          <LiRepository
            key={repository.id}
            id={repository.id}
            onClick={handleRemoveRepository}          
            title={repository.title}
          />)
        }
      
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  
  );

}

