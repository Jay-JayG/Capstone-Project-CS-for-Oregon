import React from 'react';
import PropTypes from 'prop-types';
import './Policy.css';

function PolicySection({ headerText, footerText, imageSrc, imageAlt }) {
  return (
    <div className="policy-container">
      <div className="text-content">
        <div className="header-textbox">{headerText}</div>
        <div className="footer-textbox">{footerText}</div>
      </div>
      <div className="image-container">
      <div className="image-wrapper">
        <img src={imageSrc} alt={imageAlt} className="image" />
        <div className="download-text">Download</div>
        </div>
     </div>
    </div>
  );
}

PolicySection.propTypes = {
  headerText: PropTypes.string.isRequired,
  footerText: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default PolicySection;