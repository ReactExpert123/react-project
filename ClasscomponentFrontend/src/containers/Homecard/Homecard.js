import React , {Component} from 'react'
import { Card, Icon } from 'semantic-ui-react'

// const extra = (
//   <a>
//     <Icon name='user' />
//     16 Friends
//   </a>
// )

class Homecard extends Component {

    constructor (props){
        super(props);
        this.state = {
            // img_url : this.props.img_url
        }
    }
render(props){
    return(
        <Card
        image= {this.props.img_url}
        header={this.props.header}
        meta= {this.props.meta}
        description={this.props.description}
        // extra={this.props.extra}
      />
    )

  
}
}

export default Homecard
