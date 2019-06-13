import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Folder = props => {
    return props.level === 1 || props.isExpanded ? (
            <div style={{ marginLeft: 5 * props.level, display: "flex", flexDirection: "row" }}>
                <FontAwesomeIcon icon={props.isExpanded ? "fa-folder-open" : "fa-folder"} />
                {props.name}
            </div>
    ): null
};

export default Folder;