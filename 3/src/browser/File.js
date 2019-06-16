import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons'

const File = props => {
    return props.level === 1 || props.isExpanded ? (
        <div style={{ marginLeft: 5 * props.level, display: "flex", flexDirection: "row" }}>
            <FontAwesomeIcon icon={faFile} />
            {props.name}
        </div>
    ) : null;
};

export default File;
