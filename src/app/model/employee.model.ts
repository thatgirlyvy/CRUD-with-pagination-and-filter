import { Position } from "./position.model";

export class Employee {
    id?: string;
    firstName?: string;
    lastName?: string;
    position?: Position;
    salary?: number;
    startDate?: Date;
    checked: boolean;
  }