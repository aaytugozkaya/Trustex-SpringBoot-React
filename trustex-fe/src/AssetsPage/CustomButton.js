import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ text, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={styles.button}
    >
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = {
  button: {
    backgroundColor: '#031a55',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '25px',
    border: '1px solid #d3d3d3',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    outline: 'none',
    minWidth: '120px',
    transition: 'background-color 0.3s',
  },
};

export default CustomButton;