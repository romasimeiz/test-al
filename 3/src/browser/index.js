import React, { PureComponent } from "react";
import Folder from "./Folder";
import File from "./File";
import data from "../data.json";
import uuidv1 from "uuid/v1";
import find from 'lodash/find'

class Browser extends PureComponent {
    bootstrapState = state => {
        let level = 0;
        let parent = null;
        const makeData = (data, level, parent) => {
            const result = [];
            level++;
            data.forEach(item => {
                const id = uuidv1();
                result.push({ id, parent, level: level, ...item, isExpanded: false, children: item.children && makeData(item.children, level, id )})
            });
            return result;
        };
        return { folders: makeData(state, level, parent) };
    };

    renderTree = () => {
        const output = [];
        const render = folders => {
            return folders.forEach(item => {
                output.push(item.type === "FOLDER" ?
                <Folder onClick={this.onClick} key={item.id} {...item} />
                 :
                <File key={item.id} {...item} />
                );
                item.children && render(item.children);
            })
        };
        render(this.state.folders);
        return output;
    };

    onClick = id => {
        console.log(" AAAAA ", id);
        const makeData = (data, id) => {
            const result = [];
            data.forEach(item => {
                console.log("hmmm", id === item.id);
                result.push({ ...item, isExpanded: id === item.id ? !item.isExpanded : item.isExpanded, children: item.children && makeData(item.children, id)})
            });
            return result;
        };
        console.log(" AAAAA ", "works");
        // const object = find(this.state.folders, ["id", id]);
        this.setState({ folders: makeData(this.state.folders, id) });
    };

    state = this.bootstrapState(data);

    render() {
        console.log("AAAAA", this.state);
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                {
                this.state.folders ? this.renderTree() : <div></div>
                }
            </div>
        )
    }
}

export default Browser;
