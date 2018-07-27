import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

import * as io from "socket.io-client";

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {
  model: any = {};
  conversation: any = [];
  chatListUsers: any = [];
  msgData: any = {};
  socket = io('http://localhost:3000');

  private selectedRoomId = null;
	private selectedSocketId = null;
	private selectedUserName = null;

  constructor(
    private http: Http,
    private chatService: ChatService,
    private authService: AuthService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    // this.getActiveUser();

    // send request to server (get all connected cllient)
    this.socket.emit('client list', {messages: 'send me list of connected client!'});

    this.socket.on("welcome-admin", (data) => {
      console.log(JSON.stringify(data));
      this.chatListUsers = data.users;
    })

    this.socket.on('new-message', function(data){
      this.conversation.push(data.message);
    }.bind(this));
  }
  
  /* 
	* Example method to select the connected client from database
	*/
  // getActiveUser() {
  //   this.authService.getActiveUsers().then((result)=>{
  //     this.chatListUsers = result;
  //     console.log(JSON.stringify(this.chatListUsers));
  //   })
  // }

  /* 
	* Method to select the user from the Chat list starts
	*/
	selectedUser(user):void{
		this.selectedRoomId = user.roomID;
		this.selectedSocketId = user.socketId;
		this.selectedUserName = user.person;
    /* 
		* set default chat attributes and value
		*/
    this.msgData = {
      roomID: this.selectedRoomId,
      person: JSON.parse(localStorage.getItem('user')).username,
      message: ''
    }
		/* 
		* calling method to get the messages
		*/
		this.chatService.getChatByRoom(this.selectedRoomId).then((res) => {
      this.conversation = res;
      console.log(JSON.stringify(this.conversation));
    }, (err) => {
      console.log(err);
    })
  }
  
  alignMessage(person){
		return person ===  this.msgData.person ? false : true;
  }

  sendMessage(){
    console.log(JSON.stringify(this.msgData));
    if(this.msgData.person && this.msgData.roomID && this.msgData.message) {
      this.chatService.saveChat(this.msgData).then((result) => {
        this.socket.emit('save-message', result);
        this.msgData.message = '';
      }, (err) => {
        console.log(err);
      })
    } else {
      this.toasterService.pop('error', 'Message not send', 'Invalid data');
    }
  }
}
