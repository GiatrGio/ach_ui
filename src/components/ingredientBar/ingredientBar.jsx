import { useState } from "react";
import "./ingredientBar.css";
import Checkbox from "../../tools/checkbox";
import Steps from 'rsuite/Steps';
import 'rsuite/styles/index.less';

export default function IngredientBar(props) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

  return (
      <div>
          {/*<Steps current={1} vertical style={styles}>*/}
          {/*    <Steps.Item title="Finished" />*/}
          {/*    <Steps.Item title="In progress" />*/}
          {/*    <Steps.Item title="Waiting" />*/}
          {/*    <Steps.Item title="Waiting" />*/}
          {/*</Steps>*/}
          {/*<Steps current={1} currentStatus="error">*/}
          {/*    <Steps.Item title="Finished" />*/}
          {/*    <Steps.Item title="In progress" />*/}
          {/*    <Steps.Item title="Waiting" />*/}
          {/*    <Steps.Item title="Waiting" />*/}
          {/*</Steps>*/}

          <div className="ingredientBar">
              <div className="indredientBarItem">
                  {props.ingredientParts.map((ingredientPart, index) => (
                      <div>
                          <span className="ingredientPartName" key={index}>{ingredientPart.name}</span>
                          <div className="ingredientPart">
                              {
                                  ingredientPart.ingredients.map((ingredient, index) => (
                                      <div className="ingredient">
                                          <Checkbox name={ingredient.name}/>
                                      </div>
                                  ))
                              }
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

  );
}

const styles = {
    // width: '200px',
    // display: 'inline-table',
    // verticalAlign: 'top'
};
