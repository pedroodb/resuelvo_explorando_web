import React, {Component} from 'react'
import { GraphView } from 'react-digraph'
import { SECUENTIAL } from '../constants/workflows';

const NODE_KEY = "id"

const GraphConfig = {
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

class Workflow extends Component {
  
  convertTasksToNodes = tasks => {
    const nodes = []
    var cont = 0
    tasks.forEach(task => {
      var xValue = cont * 150
      nodes.push({
        "id": task.id,
        "title": task.name,
        "x": xValue,
        "y": 0,
        "type": "empty"
      })
      cont += 1
    });
    return nodes
  }

  edgesSecuencial = (nodes) => {
		const numberOfNodes = nodes.length
		var edges = []
		for (var i = 0; i < numberOfNodes - 1; i++) {
			edges.push({
        "source": nodes[i].id,
				"target": nodes[i + 1].id,
				"type": "emptyEdge",
			})
		}
		return edges
  }
  
  onCreateEdge = (source, target) => {
    if (this.state.orderOption === 2) {
      this.setState({
        ...this.state,
        edges: [
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
  
  constructor(props) {
    super(props)
    this.state = ({
      nodes:this.convertTasksToNodes(props.tasks),
      edges:[],
    })
  }

  componentDidMount() {
    const {
      order,
    } = this.props

    switch (order) {
			case SECUENTIAL:
				const secuencialEdges = this.edgesSecuencial(this.state.nodes)
				this.setState(() => ({edges: secuencialEdges}))
				break
			default:
				this.setState(() => ({edges: []}))
		}
  }

  render() {

    const {
      edges,
      selected,
    } = this.state

    return (
      <GraphView ref='panToNode'
        nodeKey={NODE_KEY}
        nodes={this.state.nodes}
        edges={edges}
        selected={selected}
        nodeTypes={GraphConfig.NodeTypes}
        nodeSubtypes={GraphConfig.NodeSubtypes}
        edgeTypes={GraphConfig.EdgeTypes}
        onSelectNode={() => null}
        onCreateNode={() => null}
        onUpdateNode={() => null}
        onDeleteNode={() => null}
        onSelectEdge={() => null}
        onCreateEdge={() => null}
        onSwapEdge={() => null}
        onDeleteEdge={() => null}
      />
    )
  }
}

export default Workflow