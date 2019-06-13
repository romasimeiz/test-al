import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const File = props => {
    return(
        <div style={{ marginLeft: 5 * props.level, display: "flex", flexDirection: "row" }}>
            <FontAwesomeIcon icon="fa-file-pdf" prefix="fal" />
            {props.name}
        </div>
    )
};

export default File;
