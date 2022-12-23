import * as signalR from "@microsoft/signalr"
 let connection = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:44328/ChatRoom",{ skipNegotiation: true,
  transport: signalR.HttpTransportType.WebSockets})
.build();
export const start=async()=>
{
    try {
        await connection.start();
        console.log("SignalR Connected.");
        
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}
// connection.onclose(async () => {
//   await start();
// });
// start();
export default connection;