import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {UserService} from "../services/user.service";
import ToDo from "../models/todo.model";
import User from "../models/user.model";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    // private todoService: TodoService,
    private userService: UserService
  ) { }

  // public newTodo: ToDo = new ToDo()
  //
  // todosList: ToDo[];
  // editTodos: ToDo[] = [];

  public newUser: User = new User()

  usersList: User[];
  editUsers: User[] = [];

  ngOnInit(): void {
    // this.todoService.getToDos()
    //   .subscribe(todos => {
    //     this.todosList = todos
    //     console.log(todos)
    //   })
    this.userService.getUsers()
      .subscribe(users => {
        this.usersList = users
        console.log(users)
      })
  }


  // createTodo() {
  //   this.todoService.createTodo(this.newTodo)
  //     .subscribe((res) => {
  //       this.todosList.push(res.data)
  //       this.newTodo = new ToDo()
  //     })
  // }
  //
  // editTodo(todo: ToDo) {
  //   console.log(todo)
  //   if(this.todosList.includes(todo)){
  //     if(!this.editTodos.includes(todo)){
  //       this.editTodos.push(todo)
  //     }else{
  //       this.editTodos.splice(this.editTodos.indexOf(todo), 1)
  //       this.todoService.editTodo(todo).subscribe(res => {
  //         console.log('Update Succesful')
  //       }, err => {
  //         this.editTodo(todo)
  //         console.error('Update Unsuccesful')
  //       })
  //     }
  //   }
  // }
  //
  // doneTodo(todo:ToDo){
  //   todo.status = 'Done'
  //   this.todoService.editTodo(todo).subscribe(res => {
  //     console.log('Update Succesful')
  //   }, err => {
  //     this.editTodo(todo)
  //     console.error('Update Unsuccesful')
  //   })
  // }
  //
  // submitTodo(event, todo:ToDo){
  //   if(event.keyCode ==13){
  //     this.editTodo(todo)
  //   }
  // }
  //
  // deleteTodo(todo: ToDo) {
  //   this.todoService.deleteTodo(todo._id).subscribe(res => {
  //     this.todosList.splice(this.todosList.indexOf(todo), 1);
  //   })
  // }


  createUser() {
    this.userService.createUser(this.newUser)
      .subscribe((res) => {
        this.usersList.push(res.data)
        this.newUser = new User()
      })
  }

  editUser(user: User) {
    console.log(user)
    if(this.usersList.includes(user)){
      if(!this.editUsers.includes(user)){
        this.editUsers.push(user)
      }else{
        this.editUsers.splice(this.editUsers.indexOf(user), 1)
        this.userService.editUser(user).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editUser(user)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  doneUser(user:User){
    // user.status = 'Done'
    this.userService.editUser(user).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      this.editUser(user)
      console.error('Update Unsuccesful')
    })
  }

  submitUser(event, user:User){
    if(event.keyCode ==13){
      this.editUser(user)
    }
  }

  deleteUser(user: User) {
    console.log("Trying to delete a user");
    this.userService.deleteUser(user._id).subscribe(res => {
      this.usersList.splice(this.usersList.indexOf(user), 1);
    })
  }


  title = 'app';
}
