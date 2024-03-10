// This is a namespace for the project.json implementation in Scratch.
import { randomUUID } from "crypto"

function shallowCopy<T>(base: T): T{
    return JSON.parse(JSON.stringify(base));
}

namespace scrutch {
    type blox<T> = { [key: string]: T }
    type codeblock_id = string

    // An functional block in Scratch.
    export interface codeblock {
        opcode: string;
        parent: codeblock_id | null;
        next:   codeblock_id | null;
        inputs: blox<any[]>;
        fields: any;
        shadow: boolean;
        topLevel: boolean

        // Extra:
        x?: number;
        y?: number;
    }
    
    // Base class for a sprite or a stage
    interface target {
        isStage: boolean;
        name: string;
        variables: any;
        lists: any;
        broadcasts: any;
        blocks: blox<codeblock>;
        comments: any;
        currentCostume: number;
        costumes: any[];
        sounds: any[];
    }
    
    // Represents a sprite in scratch.
    export interface sprite extends target {
        isStage: false;
        x: number;
        y: number;
    }
    
    // Represents a single scratch stage
    export interface stage extends target {
        isStage: true;
    }
    
    // Represents a primitive scratch object.
    type primitive = target | sprite | stage;

    export interface iproject {
        targets: primitive[];
        monitors: any[];
        extensions: any[];
        meta: any;
    }

    export class project {
         json: iproject;

         constructor(a: iproject){
             this.json = a
         }

         createBlockLink(blocks: codeblock[],parent: codeblock_id | null = null){
             let link: blox<codeblock> = {}
             let lastID: string|null;

             let eachUUID = blocks.map(()=>randomUUID());

             for(let index = 0; index < eachUUID.length; index++){
                 let block = blocks[index];
                 let cb = shallowCopy(block);

                 if(eachUUID[index+1]){
                    cb.next = eachUUID[index+1];
                 } else cb.next = null;

                 cb.parent = parent;

                 link[eachUUID[index]] = cb;
             }

             return link;
         }

         addBlocks(sprite: string, blocks: blox<codeblock>){
            var foundSprite: sprite | null = null;
            for(let primit of this.json.targets){
                if(!primit.isStage && (primit.name == sprite)){
                    foundSprite = primit as sprite
                    break;
                }
            }

            if(foundSprite == null) throw new Error("Cannot find the sprite specified!");

            Object.assign(foundSprite.blocks,blocks);
         }
    }
}

export default scrutch
