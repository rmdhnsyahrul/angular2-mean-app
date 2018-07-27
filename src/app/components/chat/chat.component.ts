import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
// import { ValidateService } from '../../services/validate.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import * as io from "socket.io-client";

// dummy model
// import {Messages} from './chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // chats: Messages[] = [];
  chats: any = [];
  joinned: boolean = false;
  newUser = {person: '', roomID: '', message: ''};
  msgData =  {roomID: '', person: '', message: ''};

  // socket io client's will send token for authorization
  // see example below
  // token = localStorage.getItem('id_token');
  // opts: any = {
  //   query: {token: this.token}
  // };
  // socket = io('http://localhost:3000', this.opts);
  socket = io('http://localhost:3000');
  

  isAdmin: boolean = false;
  
  constructor(
    private chatService:ChatService,
    private toasterService:ToasterService
    // private validateService:ValidateService,
  ) { }

  ngOnInit() {
    // $(document).ready(function(){
    //   $('#show-chat-window').on('click', function(e){
    //     e.preventDefault();
    //     $("a.chat-button-float").hide();
    //     $('#qnimate').addClass('popup-box-on');
    //     $('#btn-input').focus();
    //     $('#nickname').focus();
    //   });
    //   $('#hide-chat-window').on('click', function(e){
    //     e.preventDefault();
    //     $('#qnimate').removeClass('popup-box-on');
    //     $("a.chat-button-float").show();
    //     $('#btn-input').focus();
    //     $('#nickname').focus();
    //   });
    // })
    var user = JSON.parse(localStorage.getItem('activeUser'));
    if(user){
      this.getChatByRoom(user.roomID);
      this.msgData = { roomID: user.roomID, person: user.person, message: ''};
      this.joinned = true;
      $('#onUserJoin').remove();
      $("a.chat-button-float").hide();
      $('#qnimate').addClass('popup-box-on');
      $('#btn-input').focus();
      this.scrollToBottom();
    }
    this.socket.on('send-roomID', function(data){
      localStorage.setItem('roomID', JSON.stringify(data.roomID));
    })
    this.socket.on('new-message', function(data){
      if(data.message.roomID === JSON.parse(localStorage.getItem('activeUser')).roomID){
        this.chats.push(data.message);
        this.scrollToBottom();
      }
    }.bind(this));
    this.socket.on('welcome-user', function(data){
      console.log(JSON.stringify(data));
      // if(data.person.indexOf('admin') !== 0){
      //   if(data.person === JSON.parse(localStorage.getItem('activeUser')).person) $('.popup-messages').append("<div class='onUserJoin'><p>"+data.message+"</p></div>");
      // }
      // if(data.message.roomID === JSON.parse(localStorage.getItem("activeUser")).room){
      //   this.chats.push(data.message);
      //   this.msgData = { room: user.room, nickname:user.nickname, message: ''};
      //   this.scrollToBottom();
      // }
    })
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  } 

  getChatByRoom(room) {
    this.chatService.getChatByRoom(room).then((res) => {
      this.chats = res
    }, (err) => {
      console.log(err);
    })
  }

  joinRoom(){
    const user = {
      person: this.newUser.person,
      roomID: JSON.parse(localStorage.getItem('roomID')),
      message: 'user '+this.newUser.person+' logged in'
    }
    var date = new Date();
    localStorage.setItem('activeUser', JSON.stringify(user));
    // this.getChatByRoom(this.newUser.room);
    // this.msgData = {room: this.newUser.room, nickname: this.newUser.nickname, message: ''};
    
    this.newUser.person = '';
    this.newUser.message = '';

    this.joinned = true; /* show chat container */

    $('#btn-input').focus();
    this.socket.emit('new user', user);
  }

  sendMessage(){
    var data = JSON.parse(localStorage.getItem('activeUser'));
    
    if(data.person && data.roomID && this.msgData.message) {
      var sendData = {
        person: data.person,
        roomID: data.roomID,
        message: this.msgData.message
      }
      this.chatService.saveChat(sendData).then((result) => {
        this.socket.emit('save-message', result);
        $('#btn-input').val('');
      }, (err) => {
        console.log(err);
      })
    } else {
      this.toasterService.pop('error', 'Message not send', 'Invalid data');
    }
    
  }

  logOut(){
    var date = new Date();
    var user = JSON.parse(localStorage.getItem('activeUser'));
    user.message = 'left this room';

    this.socket.emit('user-left', user);
    
    localStorage.removeItem('activeUser');
    this.joinned = false;
    $('#qnimate').removeClass('popup-box-on');
    $("a.chat-button-float").show();
  }

  toogleChatWindow(e){
    if(e.srcElement.className === "fa fa-window-minimize"){
      this.msgData.message = '';
      $('#qnimate').removeClass('popup-box-on');
      $("a.chat-button-float").show();
    } else if (e.srcElement.className === "fa fa-comments fa-3x"){
      $('#nickname').focus();
      $("a.chat-button-float").hide();
      $('#qnimate').addClass('popup-box-on');
    }
  }
}
