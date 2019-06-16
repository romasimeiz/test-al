import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

const Folder = props => {
    return props.level === 1 || props.visible ? (
            <>
                <span onClick={() => props.onClick(props.path)}>
                    <FontAwesomeIcon icon={props.isExpanded ? faFolderOpen : faFolder} />
                </span>
                {props.name}
            </>
    ): null
};

export default Folder;