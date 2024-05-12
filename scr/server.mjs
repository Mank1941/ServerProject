import { createServer } from "./app.mjs";

function isValidIpAddress(ipAddress) {
    // Regular expression to match IP address in the format "xxx.xxx.xxx.xxx"
    var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    // Check if the input matches the IP address format
    return ipRegex.test(ipAddress);
}

try {
    let hostType = process.argv[2];
    let HOST = process.argv[3];

    if (hostType == undefined) {
        hostType = 'local'
    }
    if ((hostType != 'local') && (hostType != 'host')){
        throw new Error('Valid arguments: local or host')
    }
    if (!isValidIpAddress(HOST)) {
        throw new Error(ipAddress + " is a valid IP address.");
    }

    createServer(hostType, HOST);
} catch (error) {
    console.log(error);
}