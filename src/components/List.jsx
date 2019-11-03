import React, { Component } from 'react'
import { List, Pagination, Container } from 'semantic-ui-react'

import {
  InfoMessage,
} from './Messages'

class ItemsList extends Component {

  constructor() {
    super()
    this.state = {
      itemsOnPage:3,
      activePage:1,
    }
  }

  cutItems = items => items.length/this.state.itemsOnPage

  itemsForPage = (items, activePage) => (items.slice((activePage-1) *this.state.itemsOnPage, activePage*this.state.itemsOnPage))

  handleInputChange = (e, { value }) => this.setState({ activePage: value })

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  
  render() {

    const {
      items,
      render_item
    } = this.props

    const { activePage } = this.state

    return (
      items.length > 0 ? (
        <div style={{alignContent:'center'}}>
          <List>
            {
              this.itemsForPage(items,activePage).map(render_item)
            }
          </List>
          <Container textAlign='center'>
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={this.cutItems(items)}
              firstItem={null}
              lastItem={null}
              prevItem={null}
              nextItem={null}
            />
          </Container>
        </div>
      ) : <InfoMessage title='Aun no hay elementos' description='Parece que la lista esta vacia' />
    )
  }
}

export default ItemsList