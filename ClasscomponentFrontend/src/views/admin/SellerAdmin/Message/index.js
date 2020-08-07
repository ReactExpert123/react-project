import React, { Component } from 'react';
import './style.css';
import { db } from "../../../config/config";
class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false,
      chatUid : localStorage.getItem("chatUid"),
      new_members : [],
      UID : "",
      username : "",
      hidden : true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        var members = [];
        let new_members = [];
        var members_status = [];
        if(snapshot.val() === null) {
          members_status = []
        } else {
          members = snapshot.val();
          console.log(members);
          Object.keys(members).forEach(function(key){
            members_status.push({key : key ,username : members[key]["username"]});
          });
          console.log(members_status);
          // members_status = Object.keys(snapshot.val());
        }
        for (let i = 0; i < members_status.length; i++) {
          if(members_status[i]["key"].includes(this.state.chatUid)){
            new_members.push({key : members_status[i]["key"] ,username : members_status[i]["username"]})
          }
        }
        this.setState({new_members});
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").child(this.state.UID).push({
        name : "admin",
        content: this.state.content,
        timestamp: Date.now(),
        senderID: this.state.chatUid,
      });
      this.setState({ content: '' });
      // chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  chatView = (UID,username) => {
    this.setState({
      UID : UID,
      username : username,
      hidden : !this.state.hidden
    })
    try {
      db.ref("chats").child(UID).on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats : chats });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  removeData = () => {
    db.ref("chats").child(this.state.UID).remove();
    this.setState({
      username : "",
      hidden : true
    })
  }

  render() {
    if (localStorage.getItem("api_token") === null) {
      window.location.href = "/admin";
    }
    return (
      <div className="animated fadeIn">
        <div className="messages-container margin-top-0">

            <div className="messages-container-inner">
  
            <div className="messages-inbox">
              <div className="messages-headline">
                <div className="input-with-icon">
                    <input id="autocomplete-input" type="text" placeholder="Search " />
                  <i className="search big icon"></i>
                </div>
              </div>

              <ul>
                {this.state.new_members.map((item,i) => {
                  return (
                      <li className = "active" key = {i} onClick = {()=>this.chatView(item.key,item.username)}>
                          <div className="message-by">
                            <div className="message-by-headline">
                              <h5>{item.username}</h5>
                              
                            </div>
                          </div>
                      </li>
                    )
                  })}
              </ul>
            </div>

            <div className="message-content">

              <div className="messages-headline">
                <h4>{this.state.username}</h4>
                <button className="btn btn-danger remove-button" hidden = {this.state.hidden} onClick = {()=>this.removeData()}>Chat End</button>
                {/* <a href="#" className="message-action"><i className="icon-feather-trash-2"></i> Delete Conversation</a> */}
              </div>
                {this.state.chats.map(chat => {
                  return (
                      <div className="message-content-inner" key = {chat.timestamp}>
                          <div  className={ this.state.chatUid === chat.senderID ? "message-bubble me" : "message-bubble"}>
                            <div className="message-bubble-inner">
                              <span className="message-text">{chat.content}</span>
                            </div>
                            {/* <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span> */}
                            <div className="clearfix"></div>
                          </div>
                        </div>
                        )
                })}
              <form onSubmit={this.handleSubmit} >
                <div className="message-reply">
                  <input placeholder="Your Message" onChange = {this.handleChange} value = {this.state.content} data-autoresize required/>
                  <button className="button ripple-effect" type = "submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Message;
