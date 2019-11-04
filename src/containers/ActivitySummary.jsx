import React, { Component } from 'react'
import { GraphView } from 'react-digraph';
  
    const GraphConfig =  {
        NodeTypes: {
        empty: { // required to show empty nodes
            typeText: "None",
            shapeId: "#empty", // relates to the type property of a node
            shape: (
            <symbol viewBox="0 0 100 100" id="empty" key="0">
                <circle cx="50" cy="50" r="30"></circle>
            </symbol>
            )
        },
        },
        NodeSubtypes: {},
        EdgeTypes: {
        emptyEdge: {  // required to show empty edges
            shapeId: "#emptyEdge",
            shape: (
            <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
                <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
            </symbol>
            )
        }
        }
    }
    
    const NODE_KEY = "id" 

class ActivitySummaryContainer extends Component {

    constructor(props){
        super(props);
        tasks = this.convertTasksToNodes(props.tasks)
        this.state = {
            nodes: tasks,
            edges: [],
            selected: 0,
        }
    }

    convertTasksToNodes = (tasks) => {
        nodes = []
        cont = 0
        tasks.forEach(task => {
            xValue = cont * 150
            nodes.push({
                "id": task.id,
                "title": task.title,
                "x": xValue,
                "y": 0,
                "type": "empty"
            })
            cont+=1
        });
        return nodes
    }
    
    onSelectNode = () => null
    onCreateNode = () => null
    onUpdateNode = () => null
    onSelectEdge = () => null
    onCreateEdge = (source, target) => {
        this.setState({
            ...this.state,
            edges:[
                ...this.state.edges,
                {
                    "source": source.id,
                    "target": target.id,
                    "type": "emptyEdge"
                }
            ]
        })
    }
    onSwapEdge = () => null
    onDeleteEdge = () => null

    render() {
        return(
            <div id='graph' style={{margin:30, weight:200, height:400}}>
            <GraphView  ref='panToNode'
                        nodeKey={NODE_KEY}
                        nodes={this.state.nodes}
                        edges={this.state.edges}
                        selected={this.state.selected}
                        nodeTypes={GraphConfig.NodeTypes}
                        nodeSubtypes={GraphConfig.NodeSubtypes}
                        edgeTypes={GraphConfig.EdgeTypes}
                        onSelectNode={this.onSelectNode}
                        onCreateNode={this.onCreateNode}
                        onUpdateNode={this.onUpdateNode}
                        onDeleteNode={this.onDeleteNode}
                        onSelectEdge={this.onSelectEdge}
                        onCreateEdge={this.onCreateEdge}
                        onSwapEdge={this.onSwapEdge}
                        onDeleteEdge={this.onDeleteEdge}
                        />      
            </div>
        );
    }
}
export default ActivitySummaryContainer