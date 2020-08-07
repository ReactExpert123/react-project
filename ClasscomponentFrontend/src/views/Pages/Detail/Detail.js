import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
import { Player } from 'video-react';
import './style.css';

import { db } from "../../config/config";
import { signup } from "../../config/auth";

import ClientReviews from '../../../containers/ClientReviews/ClientReviews'
import Tab from '../../../containers/Tab/Tablist';

import {IMAGE_PATH_UPLOAD} from '../../../Reduxstate/Admin/action/type'

import { connect } from "react-redux";
import { getPupDetailData } from "../../../Reduxstate/Client/action/home";
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";
import 'react-chat-widget/lib/styles.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      // user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false,
      response : "this",
      hidden : true,
      start : true,
      username : "",
      buyer_email : "",
      password : "test123",
      clientUID : "",
      roomKey : "",
      pupData : {},
      sellerUID : ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlefirebaseSubmit = this.handlefirebaseSubmit.bind(this);
    this.firebaseSign = this.firebaseSign.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.props.getPupDetailData(id);

    this.setState({ readError: null, loadingChats: true });
    try {
      console.log(this.state.roomKey);
      db.ref("chats").child(this.state.roomKey).on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats : chats });
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  startChatting = () => {
    this.setState({
      hidden : !this.state.hidden,
      // start : !this.state.start
    })
  }
  ongoing = (id) =>{
    this.props.history.push('/shipping/' + id);
  }
  

  firebaseSign = (e) => {
    this.setState({[e.target.id]:e.target.value})
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handlefirebaseSubmit = (e) =>{
    e.preventDefault();
    try {
      // let data = signup();
      this.props.signup(this.state.buyer_email, this.state.password);
      
      setTimeout(() => {
        let defineRoom = this.state.clientUID+this.state.sellerUID;
        var push = db.ref('chats/' + defineRoom);
        var msgInfo = {
          username : this.state.username,
        }
        var key = push.key;
        db.ref('chats').child(key).set(msgInfo);
        this.setState({
          roomKey : key
        })

        try {
          db.ref("chats").child(key).on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            chats.sort(function (a, b) { return a.timestamp - b.timestamp })
            this.setState({ chats : chats });
            this.setState({ loadingChats: false });
          });
        } catch (error) {
          this.setState({ readError: error.message, loadingChats: false });
        }
      }, 2000);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      var msgInfo = {
        username : this.state.username,
        content: this.state.content,
        timestamp: Date.now(),
        senderId : this.state.clientUID,
        receiverId : this.state.sellerUID,
      }
      db.ref('chats').child(this.state.roomKey).push(msgInfo);
      this.setState({ content: '' });
      // chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
      this.setState({
        content : ""
      })
  }
  closeMessage = () =>{
    // db.ref("chats").child(this.state.roomKey).remove();
    this.setState({
      hidden : true,
      start : true,
    })
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.userUID !== "") {
      this.setState({
        clientUID : nextProps.userUID,
        start : !this.state.start,
        hidden : !this.state.hidden
      })
    }
    if(nextProps.clientdetaildata.length !== undefined){
      this.setState({
        pupData : nextProps.clientdetaildata,
        sellerUID : nextProps.clientdetaildata[0].users.chatUid
      })
    }
  }

  
  render() {
    return (
      <div className = "home-width">
        <Header />
          {
            this.state.pupData.length === undefined ?
            <FadeLoader
              css={override}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            /> : this.state.pupData.map((item,i)=>{
              return (
                <Container key = {i}>
                  <div className = "row card-total">
                    <Player
                      poster={IMAGE_PATH_UPLOAD + item.photo_url}
                      src={IMAGE_PATH_UPLOAD + item.video_url}>
                      
                    </Player>
                    
                    <div className = "card-body">
                      <div className = "row card-header-title">
                        <div className = "card-name">{item.pup_name}</div>
                        <div className = "card-price">${item.price}</div>
                      </div>
                      <div className = "row card-content">
                        <label className = "card-name">{item.breed_name}</label>
                        <label className = "card-price">Available {item.created_at.toString().substring(0,10)}</label>
                      </div>
                    </div>
                  </div>
                  <div className = "row tab-style">
                    <Tab
                      birth = {item.created_at.toString().substring(0,10)}
                      gender = {item.gender}
                      current_weight = {item.current_weight}
                      adult_weight = {item.adult_weight}
                      pup_id = {item.pup_id}
                      breed_name = {item.breed_name}
                    />
                    <hr />
                    <div className="rcw-widget-container" hidden = {this.state.start}>
                      <div className="rcw-conversation-container active" aria-live="polite">
                          <div className="rcw-header">
                            <div className = "message-close">
                              <label onClick = {()=>this.closeMessage()}>X</label>
                            </div>
                              <h4 className="rcw-title">Welcome to our site</h4>
                              <span>Please ask us if any questions</span>
                          </div>
                          <div id="messages" className="rcw-messages-container">
                          
                            { this.state.chats.map(chat => {
                              return (
                                <div className="rcw-message" key={chat.timestamp}>
                                  <div className={ this.state.clientUID === chat.senderId ? "rcw-client" : "rcw-response"}>
                                    <div className="rcw-message-text">
                                      <label>{chat.content}</label>
                                    </div>
                                  </div>
                                </div>
                            )}
                          )}
                          </div>
                          <form className="rcw-sender" onSubmit={this.handleSubmit}>
                            <input type="text" className="rcw-new-message" name="message" placeholder="Type a message..." value = {this.state.content} onChange = {this.handleChange} data-autoresize/>
                            <button type="submit" className="rcw-send">Send</button>
                          </form>
                      </div>
                    </div>
                    <div className="rcw-widget-container" hidden = {this.state.hidden}>
                      <div className="rcw-conversation-container active" aria-live="polite">
                          <div className="rcw-header">
                            <div className = "message-close">
                              <label onClick = {()=>this.closeMessage()}>X</label>
                            </div>
                         
                            <h4 className="rcw-title">Welcome to our site</h4>
                            <span>Please ask us if any questions</span>
                              
                          </div>
                          
                          <form className = "rcw-messages-container start-chatting"  onSubmit={this.handlefirebaseSubmit}>
                            <label>UserName</label> <br />
                            <input type = "text" className = "form-control" placeholder = "please enter your username" id = "username" onChange = {this.firebaseSign}/>
                            <label>email</label> <br />
                            <input type = "email" className = "form-control" placeholder = "please enter your email" id = "buyer_email" onChange = {this.firebaseSign}/>
                            <button type="submit" className = "btn btn-success">Start</button>
                          </form>
                      </div>
                    </div>
                    <div className = "row">
                      <div className = "col-md-3 offset-md-6" style ={{padding:20}}>
                        <button className = "btn make-offer" onClick = {()=>this.ongoing(item.pup_id)}>Make offer</button>
                      </div>
                      <div className = "col-md-2" style ={{padding:20}}>
                        
                        <button className = "btn make-offer" onClick = {this.startChatting}>Message</button>
                        {/* <Widget 
                          handleNewUserMessage={this.handleNewUserMessage}
                          // profileAvatar={logo}
                          title="Welcome to our site"
                          subtitle="Please ask us if any questions"
                        /> */}
                        
                      </div>
                    </div>
                  </div>
                  <div className="row font-style">
                    <font>Reviews</font>
                  </div>
                  
                  <div className = "row reviews-state">
                    <ClientReviews 
                      img_url = "http://212.129.7.174/uploads/users/boxer.jpg"
                      content = "The loss of someone dear to us is never easy. ."
                    />
                    <ClientReviews 
                      img_url = "http://212.129.7.174/uploads/users/boxer.jpg"
                      content = "The loss of someone dear to us is never easy. I hope all the cherished memories that you have of Hero name brings you some light during this dark time. Our deepest condolences. We hope that the love of family and friends will comfort and strengthen you in the days ahead."
                    />
                    <ClientReviews 
                      img_url = "http://212.129.7.174/uploads/users/boxer.jpg"
                      content = "I hope all the cherished memories that you have of Hero name brings you some light during this dark time. Our deepest condolences. We hope that the love of family and friends will comfort and strengthen you in the days ahead."
                    />
                  </div>
                </Container>
              )
            })
          }
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clientdetaildata : state.home.clientdetaildata,
  userUID : state.home.userUID,
});

export default connect(
mapStateToProps, {getPupDetailData,signup}
)(Detail);
