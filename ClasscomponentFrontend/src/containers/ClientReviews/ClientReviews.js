import React , {Component} from 'react';
import reviews  from '../../assets/img/background/review.jpg';

class ClientReviews extends Component {

    constructor (props){
        super(props);
        this.state = {
            // img_url : this.props.img_url
        }
    }

    ongoReview = () =>{
        window.location.href = "/reviews";
    }

    render(){
        return(
            <div className = "row review-item">
                <div className = "col-md-4">
                    <img src = { this.props.img_url } alt = "Dogs" onClick = {this.ongoReview}/>
                </div>
                <div className = "col-md-8">
                    <div>
                        <label>Name:</label>&nbsp;&nbsp;
                        <span>{this.props.name}</span>
                    </div>
                    <div>
                        <label>Breed:</label>&nbsp;&nbsp;
                        <span>{this.props.breed_name}</span>
                    </div>
                    <div>
                        <label>Customer:</label>&nbsp;&nbsp;
                        <span>{this.props.customer_name}</span>
                    </div>
                    <div>
                        <label>Date:</label>&nbsp;&nbsp;
                        <span>{this.props.date}</span>
                    </div>
                    <div>
                        {this.props.content}
                    </div>
                </div>
            </div>
        )

    
    }
}

export default ClientReviews
