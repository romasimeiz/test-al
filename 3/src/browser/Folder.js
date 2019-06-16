import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

const Folder = props => {
    return props.level === 1 || props.isExpanded ? (
            <div style={{ marginLeft: 5 * props.level, display: "flex", flexDirection: "row" }}>
                <span onClick={() => props.onClick(props.id)}>
                    <FontAwesomeIcon icon={props.isExpanded ? faFolderOpen : faFolder} />
                </span>
                {props.name}
            </div>
    ): null
};

export default Folder;