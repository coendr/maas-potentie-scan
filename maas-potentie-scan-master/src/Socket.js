import Vue from "vue";
import JSZip from "jszip";
import HTTP from "http";
import URL from "url";

const socket = new WebSocket("wss://maaspotentiescan.nl/maaspotentie");
const socket2 = new WebSocket("wss://maaspotentiescan.nl/segmentfilter");

const emitter = new Vue({
  methods: {
    send(message) {
      if (1 === socket.readyState) socket.send(message);
    },
    sendFilter(message) {
      if (1 === socket2.readyState) socket2.send(message);
    }
  }
});

function getMessage(msg) {
  console.log("Rekenresultaten ontvangen " + Date.now());
  emitter.$emit("report", "Berekening klaar");

  //download file
  var ff = JSON.parse(msg.data);
  console.log(ff.filename);
  var url = "https://maaspotentiescan.nl/geojson/" + ff.filename + ".zip";
  HTTP.get(URL.parse(url), function(res) {
    if (res.statusCode !== 200) {
      console.log(res.statusCode);
      // handle error
      return;
    }
    var data = [],
      // eslint-disable-next-line no-unused-vars
      dataLen = 0;

    res.on("data", function(chunk) {
      if (data.length == 0) {
        console.log("start downloading " + Date.now());
        emitter.$emit("report", "Rekenresultaten downloaden");
      }
      data.push(chunk);
      dataLen += chunk.length;
    });

    res.on("end", function() {
      console.log("downloading ready " + Date.now());
      emitter.$emit("report", "Rekenresultaten naar de kaart");
      var buf = Buffer.concat(data);
      JSZip.loadAsync(buf).then(function(zip) {
        zip.forEach(function(r, f) {
          f.async("text").then(function(text) {
            emitter.$emit("message", text);
          });
        });
      });
    });
  });
}

socket.onopen = function() {
  console.log("Connected met de Calculatie server");
};

socket2.onopen = function() {
  console.log("Connected met de Filter server");
};

socket2.onmessage = function(msg) {
  getMessage(msg);
};

socket.onmessage = function(msg) {
  getMessage(msg);
};
socket.onerror = function(err) {
  emitter.$emit("error", err);
};

socket.ondisconnect = function() {
  console.log("user disconnected");
};

export default emitter;
