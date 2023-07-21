import React from 'react';

const Quote = ({ quote, author }) => {
    return (
        <div className="quote-box">
            <p className="quote-text">"{quote}"</p>
            <p className="quote-author">- {author || "Unknown"}</p>
        </div>
    );
};

export default Quote;

