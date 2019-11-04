import React, { Component } from 'react'
import { GraphView } from 'react-digraph';
import { Button, Dropdown } from 'semantic-ui-react'
  
    const GraphConfig =  {
        NodeTypes: {
        empty: { // required to show empty nodes
            typeText: "Tarea",
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
            </symbol>
            )
        }
        }
    }
    
    const NODE_KEY = "id" 

class ActivitySummaryContainer extends Component {

    constructor(props){
        super(props);
        //tasks = this.convertTasksToNodes(props.tasks)
        this.state = {
            nodes: [
							{
								"id": 1,
								"title": "Node A",
								"x": 0,
								"y": 0,
								"type": "empty"
							},
							{
								"id": 2,
								"title": "Node B",
								"x": 150,
								"y": 0,
								"type": "empty"
							},
							{
								"id": 3,
								"title": "Node C",
								"x": 300,
								"y": 0,
								"type": "empty"
							},
						],  //tasks,
            edges: [],
						selected: 0,
						orderOption: 0,					
        }
    }

    /*convertTasksToNodes = (tasks) => {
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
		}*/
		
    onSelectNode = () => null
    onCreateNode = () => null
    onUpdateNode = () => null
    onSelectEdge = () => null
    onCreateEdge = (source, target) => {
			if(this.state.orderOption == 2) {
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
    }
    onSwapEdge = () => null
		onDeleteEdge = () => null
		
		changeDropdownValue = (data) => {
			switch(data.value) {
				case 1:
					const secuencialEdges = this.edgesSecuencial(this.state.nodes)
					this.setState({
						...this.state,
						orderOption: data.value,
						edges: secuencialEdges,
					})
					return
				default:
					this.setState({
						...this.state,
						orderOption: data.value,
						edges: [],
					})
			}
		}

		edgesSecuencial = (nodes) => {
			const numberOfNodes = nodes.length
			console.log(nodes.length)
			var edges = []
			for(var i=0; i<numberOfNodes-1; i++) {
				edges.push({
					"source": nodes[i].id,
      		"target": nodes[i+1].id,
      		"type": "emptyEdge",
				})
			}
			return edges
		}

    render() {

			const orderOptions = [
				{ key: 0, value: 0,  text: 'Libre' },
				{ key: 1, value: 1, text: 'Secuencial' },
				{ key: 2, value: 2,  text: 'Personalizada' }
			]
      return(
				<div className="background">
					<div className="container">
						<header>Ordenando actividad title : description</header>
						<p>Sellecione el orden de las tareas:</p>
						<Dropdown placeholder='' defaultValue={0} selection options={orderOptions} onChange={(event, data) => this.changeDropdownValue(data)} />
						<div id='graph' style={{margin:30}}>
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
						<Button>Finalizar</Button>
          	<Button>Volver</Button>
					</div>
      	</div>
        );
    }
}
export default ActivitySummaryContainer