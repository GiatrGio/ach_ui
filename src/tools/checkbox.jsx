import React, {useState} from 'react';

function Checkbox(props) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                {props.name}
            </label>
        </div>
    );
}

export default Checkbox;