import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons'

const File = props => {
    return props.level === 1 || props.visible ? (
        <>
            <FontAwesomeIcon icon={faFile} />
            {props.name}
        </>
    ) : null;
};

export default File;
