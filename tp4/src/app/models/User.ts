
export enum UserType {
    Admin = "admin",
    Member = "member",
    Guest = "guest"
}


export class User {
   // private userId: number;
    private firstName: string;
    private lastName: string;
   // private age: number;
   private  userType: UserType;



constructor( firstName: string, lastName: string, userType: UserType){
    //this.userId = userId ;
    this.firstName  = firstName ;
    this.lastName = lastName;
    //this.age = age;
    this.userType = userType;
}


public getfirstName(): string {
    return this.firstName;
}

public getlastName(): string {
    return this.lastName;
}


public getuserType(): UserType {
    return this.userType;
}


public setfirstName(firstName: string): void {
    this.firstName = firstName;
}

public setlastName(lastName: string): void {
    this.lastName = lastName;
}


public setuserType(userType: UserType): void {
    this.userType = userType;
}

public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
}
public greetUser(): void {
    console.log(`Hello ${this.fullName()} ! Welcome  , you are logged in as ${this.userType}.`)
}


}