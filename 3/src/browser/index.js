import React, { PureComponent } from "react";
import Folder from "./Folder";
import File from "./File";
import data from "../data.json";

const FOLDER = "FOLDER";
const FILE   = "FILE";

class Browser extends PureComponent {

    bootstrapState = state => {
        const newState = {};
        const path = "";
        const makeData = (data, filePath) => {
            data.forEach((item, key) => {
                const path = `${filePath}/${item.name}`;
                newState[path] = { ...item, isExpanded: false, visible: false, path, level: path.split("/").length - 1, children: null};
                item.children && makeData(item.children, path);
            });
        };
        makeData(state, path);
        return newState;
    };

    state = {
        folders: this.bootstrapState(data),
        searchInput: "",
    };

    getNodeStyle = level => ({ marginLeft: 8 * level, display: "flex", flexDirection: "row" });

    getNode = (path, props = {}) => {
        const { folders } = this.state;

        const node = folders[path].type === FOLDER ?
            <Folder onClick={this.onClick} {...folders[path]} {...props} />
            :
            <File {...folders[path]} {...props} />;
        return <div key={path} style={this.getNodeStyle(folders[path].level)}>{node}</div>;
    };

    renderTree = () => {
        const output = [];
        const render = folders => {
            return Object.keys(folders).forEach(key => {
                output.push(this.getNode(key));
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
        Object.keys(folders).forEach(key => {
            const splitsKey = key.split("/");
            if (folders[key].type === FILE && splitsKey[splitsKey.length-1].includes(searchInput)) {
                key.split("/").reduce((previousValue, currentValue) => {
                    const peaceOfPath = `${previousValue}/${currentValue}`;
                    matches.push(peaceOfPath);
                    return peaceOfPath;
                })
            }
        });
        const output = [];
        new Set(matches).forEach(path => {
            output.push(this.getNode(path, {visible: true, isExpanded: true}));
        });
        return output.length ? output : <p>{`No results by "${searchInput}"`}</p>;
    };

    onChange = e => {
        e.preventDefault();
        this.setState({ searchInput: e.target.value });
    };

    render() {
        const { searchInput, folders } = this.state;
        return (
            <div className="flex column wrapper">
                <div>
                    <input type="text" placeholder="Search..." onChange={this.onChange} id="searchInput" value={searchInput} />
                </div>
                {
                    Object.keys(folders).length ?
                    (searchInput.length >= 3 ? this.renderSearch() : this.renderTree()) : <div/>
                }
            </div>
        )
    }
}

export default Browser;
