(async () => {
    const enigma = require("enigma.js");
    const schema = require("enigma.js/schemas/12.612.0");
    const WebSocket = require("ws");
  
    // replace with your information
    const appId = "<app-id>";
    const tenant = "<your-tenant.qlikcloud.com>";
    const apiKey = "<your-api-key>";
  
    const url = `wss://${tenant}/app/${appId}`;
  
    const session = enigma.create({
      schema,
      createSocket: () =>
        new WebSocket(url, {
          headers: { Authorization: `Bearer ${apiKey}` },
        }),
    });
  
    // bind traffic events to log what is sent and received on the socket:
    session.on("traffic:sent", (data) => console.log("sent:", data));
    session.on("traffic:received", (data) => console.log("received:", data));
  
    // open the socket and eventually receive the QIX global API, and then close
    // the session:
    try {
      const global = await session.open();
      console.log("You are connected!");
      await session.close();
      console.log("Session closed!");
    } catch (err) {
      console.log("Something went wrong :(", err);
    }
  })();