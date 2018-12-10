import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';


export default class ClickPic extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    clicked: false
  }

  render() {
    return (
      <div   className="col-12 col-sm-6 col-md-4 col-lg-3">
    
  <div>
    <Card className="mt-2 mb-2">
      <CardImg top width="100%" onClick={this.props.onClick} data-name={this.props.children.src} src={require(`../assets/${this.props.children.src}`)} alt="Card image cap" />
      {/* <CardBody>
        <CardTitle>{this.props.children.name}</CardTitle>
      </CardBody> */}
    </Card>
  </div>
      </div>
    )
  }
}