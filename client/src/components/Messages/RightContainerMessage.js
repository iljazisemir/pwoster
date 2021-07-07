import { PromiseProvider } from 'mongoose';
import React from 'react';

const RightContainerMessage = (props) => {
    return (
        <div className="right-messages-container">
            {props.children }
        </div>
    )
}

export default RightContainerMessage;