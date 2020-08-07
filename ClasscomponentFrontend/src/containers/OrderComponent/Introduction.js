import React, { Component } from 'react';
import doctor from "../../assets/img/brand/doctor.png"
class Introduction extends Component {

    render() {
        return (
            <div className = "doctorpup row">
                <div className = "col-md-1">
                    <input type = "checkbox" className = "form-control"/>
                </div>
                <div className = "col-md-11">
                    <div className = "row">
                        <div className = "col-md-8">
                            <div className = "row intro-title">
                                
                                    <a href = "">Panacur Dewormer (required for warranty)</a>
                                    <label>$19.95</label>
                            </div>
                            <div className = "row">
                                <label>
                                    I have sketch for my website and it needs to be converted to PSD or Figma design.
                                    After that, I'm gonna build the website according to the design.
                                    Except European, it will be ignored.
                                    You should write this text, 'European', on the top of your proposal.
                                </label>
                            </div>
                            <div className = "row intro-name">
                                <p>Panacur Dewormer : </p>&nbsp;<label> I have sketch for my website and it </label>
                            </div>
                            <div className = "row intro-info">
                                <label> I have sketch for my website and it according to the design.</label>
                                <p>Panacur Dewormer : </p>&nbsp;<label> I have sketch for my website and it react js</label>
                                <p>Marquiz : </p>&nbsp;<label> I have sketch for my website and it </label>
                            </div>
                        </div>
                        <div className = "col-md-4 intro-img">
                            <img src = {doctor} className = "vertical-center"/>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Introduction;
