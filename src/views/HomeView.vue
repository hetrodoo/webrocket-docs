<template>
  <div class="home center">
    <img
      alt="WebRocket logo"
      src="../assets/WebRocket.png"
      style="width: 100%; height: 141px; object-fit: contain;"
    >
    <div style="height: 32px"/>

    <h4 style="width: 85vw; text-align: center">
      WebRocket is a framework for WebSockets, its purpose is to create an abstraction on top of
      WebSockets just like http servers are on top of TCP/IP servers.
      <br><br>
      WebRocket simplify WebSockets usage by creating a rest api like interface.
    </h4>
    <div style="height: 32px"/>

    <p class="example">
      yarn add @hetrodo/webrocket
    </p>
    <div style="height: 32px"/>

    <h4>
      Client sample:
    </h4>
    <code-block
      :code="clientExample"
      width="85vw"
    />
    <div style="height: 32px"/>

    <h4>
      Server sample:
    </h4>
    <code-block
      :code="serverExample"
      width="85vw"
    />
    <div style="height: 32px"/>

    <h4 style="width: 85vw; text-align: center">
      Documentation is still to come.
    </h4>
    <div style="height: 32px"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CodeBlock from '@/components/CodeBlock.vue';

@Options({
  components: {
    CodeBlock,
  },
})
export default class HomeView extends Vue {
  readonly setupExample = `
yarn add @hetrodo/webrocket
  `;

  readonly clientExample = `
const WebSocket = require('ws');
const WebRocket = require('webrocket/lib/WebRocket');
const WebRocketMethod = require('webrocket/lib/WebRocketMethod');
const WebSocketAdapter = require('webrocket/lib/WebSocketAdapter');

//First we connect to the WebSocket server
const ws = new WebSocket('ws://127.0.0.1:8080');

//We wait for the connection to open
ws.on('open', () => {
    //With the connection open we instantiate the WebRocket class
    const clientAdapter = new WebSocketAdapter(ws);
    const webRocket = new WebRocket(clientAdapter);

    //Now we can register the client-side endpoints that we want using GET, POST, PUT, DELETE methods.
    webRocket.on(WebRocketMethod.get, 'v1/client-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    webRocket.on(WebRocketMethod.post, 'v1/client-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    webRocket.on(WebRocketMethod.put, 'v1/client-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    webRocket.on(WebRocketMethod.delete, 'v1/client-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    //And using the WebRocket's class instance we can make requests to the server-side defined endpoints
    webRocket.get('v1/server-entity').then(console.log).catch(console.error);
    webRocket.post('v1/server-entity').then(console.log).catch(console.error);
    webRocket.put('v1/server-entity').then(console.log).catch(console.error);
    webRocket.delete('v1/server-entity').then(console.log).catch(console.error);

    //You can use query params too
    webRocket.get('v1/server-entity?key=value').then(console.log).catch(console.error);
});
  `;

  readonly serverExample = `
const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const WebRocket = require('@hetrodo/webrocket');
const WebRocketMethod = require('@hetrodo/webrocket/lib/WebRocketMethod');
const WebSocketAdapter = require('@hetrodo/webrocket/lib/WebSocketAdapter');

//Create your WebSocket server
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function (ws) {
    //When a connection established we can instantiate a new WebRocket.
    const webRocket = new WebRocket(new WebSocketAdapter(ws));

    //Now we can register the server-side endpoints that we want using GET, POST, PUT, DELETE methods.
    webRocket.on(WebRocketMethod.get, 'v1/server-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    webRocket.on(WebRocketMethod.post, 'v1/server-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    webRocket.on(WebRocketMethod.put, 'v1/server-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    webRocket.on(WebRocketMethod.delete, 'v1/server-entity', (request, respond) => {
        respond({
            msg: 'Ok'
        });
    });

    //And using the WebRocket's class instance we can make requests to the client-side defined endpoints
    webRocket.get('v1/client-entity').then(console.log).catch(console.error);
    webRocket.post('v1/client-entity', {}).then(console.log).catch(console.error);
    webRocket.put('v1/client-entity', {}).then(console.log).catch(console.error);
    webRocket.delete('v1/client-entity').then(console.log).catch(console.error);

    //Just like in the client side you can use query params too
    webRocket.get('v1/client-entity?key=value').then(console.log).catch(console.error);
});

server.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});
  `;
}
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.example {
  font-weight: 300;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
}
</style>
