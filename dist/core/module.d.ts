export declare class ModuleDescriptor {
    module: any;
    name: string;
    methods: Map<string, MethodDescriptor>;
    constructor(module: any);
}
export declare class MethodDescriptor {
    method: Function | any;
    parent: ModuleDescriptor;
    name: string;
    parameters: ParameterDescriptor[];
    constructor(method: Function | any, parent: ModuleDescriptor);
    toString(): string;
}
export declare class ParameterDescriptor {
    name: string;
    type: "any" | "number" | "string" | "date" | "array";
    constructor(name: string, type: "any" | "number" | "string" | "date" | "array");
    toString(): string;
}
export declare class ModuleContainer extends Map<string, ModuleDescriptor> {
    constructor();
    load(moduleClass: any): void;
}
export declare function alias(name: any): (object: any, key: any) => void;
