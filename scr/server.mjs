import { createServer } from "./app.mjs";

try {
    let hostType = process.argv[2];

    if (hostType == undefined) {
        hostType = 'local'
    }
    if ((hostType != 'local') && (hostType != 'host')){
        throw new Error('Valid arguments: local or host')
    }

    createServer(hostType);
} catch (error) {
    console.log(error);
}