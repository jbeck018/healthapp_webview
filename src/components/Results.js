import React from 'react';
import RecipeCard from './RecipeCard'



export default function Results(props) {

  return(
    <div>
      {
        props.searchResults.map(recipe => {
          return (
            <RecipeCard 
              recipe={recipe} 
              handleClick = {props.handleClick}
              key={recipe.id}
            />
          );
        })
      }
    </div>
  );
}
