import React, { Component } from 'react'
import { Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { PENDING, SUCCESS } from '../constants/status'
import {
	FREE,
	SECUENTIAL,
	CUSTOMIZED,
} from '../constants/workflows'
import {
	getTasks,
} from '../actions/tasks'
import Workflow from '../components/Workflow'


class ActivitySummaryContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			order: FREE,
			edges: []
		}
	}

	componentDidMount() {
		const {
			actions: {
				getTasks,
			},
			match: {
				params: {
					id,
				}
			}
		} = this.props
		getTasks(id)
	}

	changeDropdownValue = (e,{value}) => this.setState(() => ({order:value}))

	setEdges = (edges) => {
		this.setState(() => ({edges}))
	}

	render() {

		const {
			history,
			status,
			index,
		} = this.props

		const orderOptions = [
			{ key: 0, value: FREE, text: 'Libre' },
			{ key: 1, value: SECUENTIAL, text: 'Secuencial' },
			{ key: 2, value: CUSTOMIZED, text: 'Personalizada' }
		]

		return status === SUCCESS ? (
			<div className="background">
				<div className="container">
					<header>Ordenando actividad title : description</header>
					<p>Sellecione el orden de las tareas:</p>
					<Dropdown
						selection
						placeholder=''
						defaultValue={FREE}
						options={orderOptions}
						onChange={this.changeDropdownValue.bind(this)}
					/>
					<div id='graph' style={{ margin: 30 }}>
						<Workflow tasks={index} order={this.state.order} edges={this.state.edges} setEdges={this.setEdges.bind(this)}/>
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
		actions: bindActionCreators({
			getTasks,
		}, dispatch)
	}
}

function mapStateToProps({ tasks }) {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivitySummaryContainer))