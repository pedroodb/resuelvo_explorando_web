import React, { Component } from 'react'
import { GraphView } from 'react-digraph'
import { Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { PENDING, SUCCESS } from '../constants/status'
import {
	getTasks,
} from '../actions/tasks'

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
        this.state = {
          edges: [],
					selected: 0,
					orderOption: 0,					
      }
		}
		
		componentDidMount() {
			const {
				actions:{
					getTasks,
				},
				match:{
					params:{
						id,
					}
				}
			} = this.props
			getTasks(id)
		}

    convertTasksToNodes = tasks => {
        const nodes = []
        var cont = 0
        tasks.forEach(task => {
            var xValue = cont * 150
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
			if(this.state.orderOption === 2) {
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
		
		changeDropdownValue(data) {
			switch(data.value) {
				case 1:
					const secuencialEdges = this.edgesSecuencial(this.convertTasksToNodes(this.props.index))
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
			var edges = []
			for(var i=0; i<numberOfNodes-1; i++) {
				edges.push({
					"source": nodes[i].id,
      		"target": nodes[i+1].id,
      		"type": "emptyEdge",
				})
			}
			console.log(edges)
			return edges
		}

    render() {

			const {
				history,
				index,
				status,
			} = this.props

			const orderOptions = [
				{ key: 0, value: 0,  text: 'Libre' },
				{ key: 1, value: 1, text: 'Secuencial' },
				{ key: 2, value: 2,  text: 'Personalizada' }
			]
      return status === SUCCESS ? (
				<div className="background">
					<div className="container">
						<header>Ordenando actividad title : description</header>
						<p>Sellecione el orden de las tareas:</p>
						<Dropdown placeholder='' defaultValue={0} selection options={orderOptions} onChange={(event, data) => this.changeDropdownValue(data)} />
						<div id='graph' style={{margin:30}}>
						<GraphView  ref='panToNode'
												nodeKey={NODE_KEY}
												nodes={this.convertTasksToNodes(index)}
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
						<Button onClick={() => history.push('/')}>Finalizar</Button>
          	<Button onClick={() => history.push('/Activity/' + this.props.match.params.id)}>Volver</Button>
					</div>
      	</div>
        ) : null
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      getTasks,
    }, dispatch)
  }
}

function mapStateToProps({tasks}) {
	const {
		index: {
			tasks: index,
			status,
		}
	} = tasks
	return {
		index,
		status,
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySummaryContainer))