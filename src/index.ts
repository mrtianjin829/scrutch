import scrutch from "./pjson"
import { readFileSync } from "fs"

let pjson = JSON.parse( readFileSync(process.argv[2]).toString() ) as scrutch.iproject;

let project = new scrutch.project(pjson);

project.addBlocks("Sprite1",{
    bhan: {"opcode": "event_whenflagclicked",                                                      "next": "*#v3wu^;b]AOWUySe?-H",                                                         "parent": null,                                                                         "inputs": {},                                                                           "fields": {},                                                                           "shadow": false,                                                                        "topLevel": true,                                                                       "x": 150,                                                                               "y": 168}
})

console.log(JSON.stringify(project.json,null,2));

