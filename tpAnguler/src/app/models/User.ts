
enum UserType {
    Admin = "admin",
    Member = "member",
    Guest = "guest"
}


class User {
    private userId: number;
    private firstName: string;
    private lastName: string;
    private age: number;
    private  userType: UserType;



constructor(userId: number, firstName: string, lastName: string, age: number, userType: UserType){
    this.userId = userId ;
    this.firstName  = firstName ;
    this.lastName = lastName;
    this.age = age;
    this.userType = userType;
}

public getUserId(): number {
    return this.userId;
}
public getFirstName(): string {
    return this.firstName;
}

public getLastName(): string {
    return this.lastName;
}

public getAge(): number {
    return this.age;
}

public getUserType(): UserType {
    return this.userType;
}

public setFirstName(firstName: string): void {
    this.firstName = firstName;
}

public setLastName(lastName: string): void {
    this.lastName = lastName;
}

public setAge(age: number): void {
    this.age = age;
}

public setUserType(userType: UserType): void {
    this.userType = userType;
}

public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
}
public greetUser(): void {
    console.log(`Hello ${this.fullName()} ! Welcome  , you are logged in as ${this.userType}.`)
}


}