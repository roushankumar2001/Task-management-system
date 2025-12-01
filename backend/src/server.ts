import app from "./app";
import os from "os";
import dotenv from "dotenv";
dotenv.config();
/* --------------------------------------------------
                server setup
---------------------------------------------------*/
const PORT = process.env.PORT || 4000;

// Function to detect LAN (WiFi) IPv4 address **
function getLocalNetworkIP() {
    const nets = os.networkInterfaces();
    let localIP = "Unknown";

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]!) {

            if (net.family === "IPv4" && !net.internal) {
                localIP = net.address;
            }
        }
    }
    return localIP;
}

app.listen(PORT, () => {
    const lanIP = getLocalNetworkIP();

    console.log("🚀 Backend API Server Started");
    console.log("--------------------------------------------");
    console.log(`📌 Local  : http://localhost:${PORT}`);
    console.log(`📡 Network: http://${lanIP}:${PORT}`);
    console.log("--------------------------------------------");
    console.log("Use the Network URL to test from phone/tablet");
});
