import {Component, Input, OnInit} from '@angular/core';
import {Commentary} from "../shared/interfaces/commentary";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces/user";
import {AuthService} from "../authentification/service/auth.service";
import {COMMENTS} from "../shared/data/comments";
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators/delay';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    isLoading=false;
    comment: Commentary;
    comments:Commentary[]=COMMENTS;
    comments_visible:Commentary[];
    commentForm:FormGroup;
    currentUser: User;

  @Input()
      order_id;

  viewControl = {
    commentInput: false
  };

  commentInputValue = "";

  constructor(protected  AuthService: AuthService) {
      this.currentUser = this.AuthService.getCurrentUser();
  }

  createComment(){
    try{
      if (this.commentForm.valid) {
        let formvalue = this.commentForm.value;

        let needed = ["message"];
        for (let val of needed) {
          if (formvalue[val] == undefined || formvalue[val].length < 4) {
            alert(val + " fehlt");
            return false;
          }
        }
        console.log(this.comment);
        let index = this.comments.indexOf(this.comment);
        this.comment = {
          id: (formvalue.id ? formvalue.id : null),
          author: this.AuthService.getCurrentUser(),
          message: formvalue.message,
          date_create: (formvalue.date_create ? formvalue.date_create : moment()),
          date_update: (formvalue.date_create ? moment() : null),
          type_comment: (formvalue.type_comment ? formvalue.type_comment : "Information"),
          order_id: this.order_id
        };
        // API-Call
          console.log(this.comment.id)
          if(this.comment.id == null){
              //ADD
              console.log("add")
              this.comment.id = (Math.max(...this.comments.map(o => o.id))+1);
              this.comments.push(this.comment);
          }else{
              // UPDATE
              console.log("========");
              console.log("up")
              console.log(index);
              console.log(this.comment)
              this.comments[index] = this.comment
              console.log(this.comments)
              console.log("========");
          }


        this.emptyCommentForm();

      }
    }catch (e){
      alert(e)
    }

  }
  getComment(filter){
    this.isLoading = true;
    return this.readComment(filter)
        .map(res => {
          this.isLoading = false;
          if(res.length>-1){
            return res;
          }else{
            return null;
          }

        })
  }
  readComment(filter?: {key,value} ): Observable<Commentary[]>{
    let filterkeys =  ["order_id"];
    if(typeof filter != 'undefined' && Object.keys(filter).length>0 && filter.hasOwnProperty("key")){
      if(filterkeys.indexOf(filter.key)>-1){
        let orders_filter = this.comments.filter(x => x[filter.key] == filter.value);
        return of(orders_filter).pipe(
            delay(500)
        );
      }else{

      }
    }
    return of(this.comments).pipe(
        delay(1000)
    );
  }


  editComment(aComment){
      this.comment = aComment;
    this.commentForm.patchValue(aComment);
    this.viewControl.commentInput = true;
  }
  deleteComment(aComment){
    let index = this.comments.indexOf(aComment);
    if(index > -1){
        this.comments.splice(index,1);
    }
    /*

     */
/*
    this.comments = this.comments.filter(obj => obj !== aComment);
    this.comments = this.comments.filter(obj => obj !== aComment);
    */
  }
  showEdit(elem){

  }
  emptyCommentForm(){
    this.viewControl.commentInput = false;
    this.commentForm.patchValue({
      "message": ""
    });
  }
  toggleViewControl(property: string){
    if(this.viewControl.hasOwnProperty(property)){
      this.viewControl[property] = !this.viewControl[property]
    }
  }
  ngOnInit() {
    this.commentForm = new FormGroup({
        id: new FormControl(""),
        message: new FormControl("",[
            Validators.required,
            Validators.minLength(4)
        ]),
        type_comment: new FormControl("Information",[Validators.required]),
        send: new FormControl(""),

    });

    this.getComment({key: "order_id", value: this.order_id}).subscribe(
        result => {
          this.comments_visible = result;
        }
    );
  }
}
