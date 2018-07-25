
export interface Processgroup {
    id: number;
    elements:Array<{process:Process,sort:number}>;
}

export interface Process {
    id: number;
    name: string;
}