import type { UserInterface } from "@/interfaces/user.interface";
import { UserType } from "@/interfaces/user.auth.interface";

export class User {
  private id: string;
  private name: string;
  private registration: number;
  private age: number;
  private job: string;
  private type: UserType;

  constructor(
    id: string,
    name: string,
    registration: number,
    age: number,
    job: string,
    type: UserType
  ) {
    this.id = id;
    this.name = name;
    this.registration = registration;
    this.age = age;
    this.job = job;
    this.type = type;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getRegistration(): number {
    return this.registration;
  }

  public setRegistration(registration: number): void {
    this.registration = registration;
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): void {
    this.age = age;
  }

  public getJob(): string {
    return this.job;
  }

  public setJob(job: string): void {
    this.job = job;
  }

  public getType(): number {
    return this.type;
  }

  public setType(type: number): void {
    this.type = type;
  }
}
