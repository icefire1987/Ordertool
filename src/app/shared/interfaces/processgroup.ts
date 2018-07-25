
export interface Processgroup {
    processgroup_id: number;
    elements: Array<{process: Process, sort: number}>;
}

export interface Process {
    process_id: number;
    name: string;
    type: string;
    department: string;
}