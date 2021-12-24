import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {

    return <header className='header'>
            <h1>{title}</h1>
            <Button
                text={ showAdd ? 'Close' : 'Add' }
                color={ showAdd ? 'black' : 'green'}
                onClick={onAdd}>
            </Button>
        </header>
    ;
};

// Nếu không nhận được Props truyền vào thì sẽ nhận default
Header.defaultProps = {
    title: 'Task Tracker'
};
Header.propTypes = {
    // Nếu không có isRequired chỉ là optional
    // Khi sử dụng isRequired thì chắc chắn sẽ hiện warning
    title: PropTypes.string.isRequired
};


export default Header;
