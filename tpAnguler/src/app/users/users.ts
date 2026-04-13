import { Component } from '@angular/core';
import { FormsModule} from  '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

interface User {
  id: number;
  name: string;
}
export class Users {

  idUser: number =0;
  currentUser: string ="";
  users : Array<string> = new Array<string>;
  nextId: number =1 ;

constructor(){
   this.idUser = 0;
   this.currentUser="";
   this.users = [];
   this.nextId =1;
}

public getIdUser(): number {
  return this.idUser;
}

public getUsers(): Array<string>{
  return this.users;
}
public getCurrentUser(): string {
  return this.currentUser;
}
public setIdUser(id:number): void {
  this.idUser = id;
}

public setCurrentUser(name:string): void {
  this.currentUser = name;
}

  addUserAction(){
    if(this.currentUser.trim()){
      this.users.push({
        id: this.nextId++,
        name: this.currentUser,
      });
      this.currentUser ="";
    }
  }
  deleteUserAction(userId: number){
   this.users =this.users.filter(user => user.id !== userId);
  }
}