import {useContext, useEffect, useState} from "react";
import "./Recipe.css";
import axios from "axios";
import { Context } from "../../context/Context";
import configData from "../../conf.json"
import RecipeExample from "./RecipeExample"
import IngredientBar from "../../components/ingredientBar/ingredientBar";
import RecipeSteps from "../../components/recipeSteps/recipeSteps";


export default function Editor() {
    const PF = configData.API_URL + "/recipe/"
    const { user } = useContext(Context);
    const [name, setName] = useState(RecipeExample.name)
    const [mainImage, setMainImage] = useState(RecipeExample.mainImage)
    const [boxImage1, setBoxImage1] = useState(RecipeExample.boxImage1)
    const [boxImage2, setBoxImage2] = useState(RecipeExample.boxImage2)
    const [categories, setCategories] = useState([])
    const [ingredientParts, setIngredientParts] = useState(RecipeExample.ingredientParts)
    const [recipeSteps, setRecipeSteps] = useState(RecipeExample.recipeSteps)
    const [tipsAndTricks, setTipsAndTricks] = useState(RecipeExample.tipsAndTricks)

    const handleUploadImage = async(e) => {
        const filename = Date.now() + e.target.files[0].name;
        const data = new FormData();
        data.append("name", filename);
        data.append("file", e.target.files[0]);
        try {
          await axios.post(configData.API_URL + "/upload", data);
        } catch (err) {
          console.log(err)
        }
      }

      const animals = ["Dog", "Bird", "Cat", "Mouse", "Horse"];

    useEffect(() => {
        console.log("RecipeExample ", RecipeExample)
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(PF + "620bf00b5a2c30d287334f6d");
                console.log(res)
                // setName(res.data.name)
                // setMainImage(res.data.mainImage)
                // setBoxImage1(res.data.boxImage1)
                // setBoxImage2(res.data.boxImage2)
                // setCategories(res.data.categories)
                // setIngredientParts(res.data.ingredientParts)
                // setRecipeSteps(res.data.recipeSteps)
            } catch (err) {
                console.log("error ", err)
            }
        };
        fetchRecipe();
    }, []);


    return (
        <div className="wrapper">
          <div className="mainPhoto">
            <img src={mainImage}></img>
          </div>
          <div className="recipeStepDiv">
              <RecipeSteps recipeSteps={recipeSteps}/>
          </div>
          <div className="ingredients">
            <IngredientBar ingredientParts={RecipeExample.ingredientParts} />
          </div>
          <div className="otherRecipes">Other Recipes</div>
        </div>
    );
}
