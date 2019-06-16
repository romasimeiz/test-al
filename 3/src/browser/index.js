import React, { PureComponent } from "react";
import Folder from "./Folder";
import File from "./File";
import data from "../data.json";
import uuidv1 from "uuid/v1";

class Browser extends PureComponent {
    bootstrapState = state => {
        const newState = {};
        const path = "";
        const makeData = (data, filePath) => {
            data.forEach((item, key) => {
                const path = `${filePath}/${item.name}`;
                const id = uuidv1();
                newState[path] = { ...item, id, isExpanded: false, visible: false, path, level: path.split("/").length - 1, children: null};
                item.children && makeData(item.children, path);
            });
        };
        makeData(state, path);
        return newState;
    };

    renderTree = () => {
        const output = [];
        const render = folders => {
            return Object.keys(folders).forEach(key => {
                const node = folders[key].type === "FOLDER" ?
                <Folder onClick={this.onClick} {...folders[key]} />
                 :
                <File {...folders[key]} />;
                output.push(<div key={key} style={{ marginLeft: 5 * folders[key].level, display: "flex", flexDirection: "row" }}>{node}</div>);
            });
        };
        render(this.state.folders);
        return output;
    };

    onClick = path => {
        const selectedPath = this.state.folders[path];
        Object.keys(this.state.folders).forEach(key => {
            const pathObject = this.state.folders[key];
            if (!selectedPath.isExpanded && Math.abs(pathObject.level - selectedPath.level) > 1) {
                return;
            }
            pathObject.path.includes(path) && this.setState( prevState => ({
                folders: {
                    ...prevState.folders,
                    [key]: { ...pathObject, visible: !selectedPath.isExpanded }
                }
            }))
        });
        this.setState(prevState => ({ folders: {
            ...prevState.folders,
            [path]: {...selectedPath, isExpanded: !selectedPath.isExpanded},
        }}))
    };

    startSearch = e => {
        e.preventDefault();
        const {searchInput} = this.state;
        const matches = Object.keys(this.state.folders).filter(key => this.state.folders[key].type === "FILE" && key.includes(searchInput));
        console.log("MATCHES", matches);
    };

    onChange = e => {
        e.preventDefault();
        this.setState({ searchInput: e.target.value });
    };

    state = {
        folders: this.bootstrapState(data),
        searchInput: "",
    };

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <input type="text" onChange={this.onChange} id="searchInput" value={this.state.searchInput} />
                    <button onClick={this.startSearch}>Search</button>
                </div>
                {
                    Object.keys(this.state.folders).length ?
                    this.renderTree() : <div></div>
                }
            </div>
        )
    }
}

export default Browser;
