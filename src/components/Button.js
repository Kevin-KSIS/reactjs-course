import React from 'react';
import PropTypes from "prop-types";

const Button = ({text, color, onClick}) => {
    return <div>
        <button
            style={{ backgroundColor: color}}
            className='btn'
            onClick={onClick}
        >{text}</button>
    </div>;
};

Button.defaultProps = {
    text: "Button",
    color: 'black'
};

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
};


export default Button;
