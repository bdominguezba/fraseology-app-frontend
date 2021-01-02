import { Subject } from "../../subjects/models/subject";

export class Expression {
    id: number;
    name: string;
    notes: string;
    description1: string;
    description2: string;
    description3: string;
    example1: string;
    example2: string;
    example3: string;
    subject: Subject;
}
