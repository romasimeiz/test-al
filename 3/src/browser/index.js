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

    getNode = (path, props = {}) => {
        const { folders } = this.state;

        const node = folders[path].type === "FOLDER" ?
            <Folder onClick={this.onClick} {...folders[path]} {...props} />
            :
            <File {...folders[path]} {...props} />;
        return <div key={path} style={{ marginLeft: 5 * folders[path].level, display: "flex", flexDirection: "row" }}>{node}</div>;
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

    renderSearch = () => {
        const { searchInput, folders } = this.state;
        const matches = [];
        Object.keys(folders).filter(key => {
            const splittedKey = key.split("/");
            if (folders[key].type === "FILE" && splittedKey[splittedKey.length-1].includes(searchInput)) {
                key.split("/").reduce((previousValue, currentValue) => {
                    const peaceOfPath = `${previousValue}/${currentValue}`;
                    matches.push(peaceOfPath);
                    return peaceOfPath;
                })
            }
        });
        const output = [];
        console.log("matches", matches);
        new Set(matches).forEach(path => {
            const pathObject = folders[path];
            const node = pathObject.type === "FOLDER" ?
                <Folder onClick={this.onClick} {...pathObject} visible isExpanded />
                :
                <File {...pathObject} visible isExpanded />;
            output.push(<div key={path} style={{ marginLeft: 5 * pathObject.level, display: "flex", flexDirection: "row" }}>{node}</div>);
        });
        return output;
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
        const { searchInput, folders } = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <input type="text" placeholder="Search..." onChange={this.onChange} id="searchInput" value={searchInput} />
                </div>
                {
                    Object.keys(folders).length ?
                    (searchInput.length >= 3 ? this.renderSearch() : this.renderTree()) : <div></div>
                }
            </div>
        )
    }
}

export default Browser;
