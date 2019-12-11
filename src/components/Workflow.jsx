import React, {Component} from 'react'
import { GraphView } from 'react-digraph'
import { SECUENTIAL, CUSTOMIZED } from '../constants/workflows'

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
        id: task.id,
        title: task.name,
        task: task,
        x: xValue,
        y: 0,
        type: "empty"
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
        source: nodes[i].id,
        sourceTask: nodes[i].task,
				target: nodes[i + 1].id,
        targetTask: nodes[i + 1].task,
				type: "emptyEdge",
			})
		}
		return edges
  }
  
  onCreateEdge = order => (source, target) => {
    if (order === CUSTOMIZED) {
      this.props.setEdges(
        [
          ...this.props.edges,
          {
            source: source.id,
            sourceTask: source.task,
            target: target.id,
            targetTask: target.task,
            type: "emptyEdge"
          }
        ]
      )
    }
  }
  
  constructor(props) {
    super(props)
    this.state = ({
      nodes:this.convertTasksToNodes(props.tasks),
    })
  }

  shouldComponentUpdate(nextProps) {
    
    const {
      order,
      setEdges,
    } = this.props

    if(order !== nextProps.order) {
      switch (nextProps.order) {
        case SECUENTIAL:
          setEdges(this.edgesSecuencial(this.state.nodes))
          break
        default:
          setEdges([])
      }
    }
    return true
  }

  componentS

  render() {

    const {
      selected,
      nodes,
    } = this.state

    const {
      edges,
    } = this.props

    return (
      <div>
        <GraphView ref='panToNode'
          nodeKey={NODE_KEY}
          nodes={nodes}
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
          onCreateEdge={this.onCreateEdge.bind(this)(this.props.order)}
          onSwapEdge={() => null}
          onDeleteEdge={() => null}
        />
      </div>
    )
  }
}

export default Workflow