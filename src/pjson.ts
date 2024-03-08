namespace scrutch {
    type codeblock_id = string

    export interface codeblock {
        opcode: string;
        parent: codeblock_id | null;
        next:   codeblock_id | null;
        inputs: any;
        fields: any;
        shadow: boolean;
        topLevel: boolean
    }

    interface target {
        isStage: boolean;
        name: string;
        variables: any;
        lists: any;
        broadcasts: any;
        blocks: { [key: codeblock_id]: codeblock };
        comments: any;
        currentCostume: number;
        costumes: any[];
        sounds: any[];
    }

    export interface sprite extends target {
        isStage: false;
        x: number;
        y: number;
    }

    export interface stage extends target {
        isStage: true;
    }

    export interface project {
        targets: target[];
        monitors: any[];
        extensions: any[];
        meta: any;
    }
}

export default scrutch
