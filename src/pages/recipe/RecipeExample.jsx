import React from 'react';
import main from "./ExampleRecipe/main.jpeg"
import box1 from "./ExampleRecipe/box1.jpeg"
import box2 from "./ExampleRecipe/box2.jpeg"
import image1 from "./ExampleRecipe/image1.jpeg"
import image2 from "./ExampleRecipe/image2.jpeg"
import image3 from "./ExampleRecipe/image3.jpeg"
import image4 from "./ExampleRecipe/image4.jpeg"
import image5 from "./ExampleRecipe/image5.jpeg"


const RecipeExample = {
    name: "Dakos or Koukouvagia",
    mainImage: main,
    boxImage1: box1,
    boxImage2: box2,
    categories: ["Vegan", "Vegeterian"],
    recipeSteps: [
        {
            text: "Wet the rusks in water (shaking off any excess water) and cover it with a towel for 5 minutes.",
            image: image1
        },
        {
            text: "Put it on a plate, pour it olive oil and little salt. Rub origano in your hands and sprinkle it on the rusk.",
            image: image2
        },
        {
            text: "Carefully lay out the tomatoes on the rusks.",
            image: image3
        },
        {
            text: "Then add mizithra above. ",
            image: image4
        },
        {
            text: "Lastly add the black olive oil above in the center, like the eye of an owl.",
        },
        {
            text: "Sprinkle with olive oil."
        },
        // {
        //     image: image5
        // },
    ],
    ingredientParts: [
        {
            name: "Ingredient for the base",
            ingredients: [
                {
                    name: "Local rusks",
                    amount: "2",
                    type: ""
                }
            ]
        },
        {
            name: "Ingredient for the main dish",
            ingredients: [
                {
                    name: "Olive oil",
                    amount: "50",
                    type: "ml"
                },
                {
                    name: "tomato",
                    amount: "2",
                    type: ""
                },
                {
                    name: "Oregano",
                    amount: "",
                    type: ""
                },
                {
                    name: "Homemade cheese",
                    amount: "100",
                    type: "gr"
                },
                {
                    name: "Black olive",
                    amount: "1",
                    type: ""
                },
            ]
        },
    ],
    tipsAndTricks: [
        {
            tip: "You can add more olives or kapari or kritamo for more bitterness and saltiness  "
        },
        {
            tip: "With the years, the presentation of “koukouvagia” has been evolved so as to look more with the eye of the animal owl (koukouvagia in Greek). This is why the ingredients are placed with care in circle over the “paximadi”. First the tomato, next the local cheese (mizithra) and a black olive in the middle."
        }
    ]
};

export default RecipeExample;