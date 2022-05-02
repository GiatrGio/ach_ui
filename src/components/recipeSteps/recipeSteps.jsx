import React from 'react';

function RecipeSteps(props) {
    return (
        <div>
            {props.recipeSteps.map((recipeStep, index) => (
                <div key={index}>
                    <span>{recipeStep.text}</span>
                    <img src={recipeStep.image} width="50" height="60" alt={"Image cannot be displayed"}/>
                </div>
            ))}v
        </div>
    );
}

export default RecipeSteps;