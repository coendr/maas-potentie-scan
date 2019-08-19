<template>
  <div class="brabant">
    <div class="row">
      <div
        class="bg-white col-md-12 col-xl-3 col-lg-3 col-xxl-3 scrollingDiv sidebar"
      >
        <div align="center">
          <h1 class="cyan--text super-title">Effecten MaaS</h1>
          <h3 class="pink--text sub-title">Noord-Brabant</h3>
          <h3 class="pink--text sub-title text-center">Intensiteiten</h3>
        </div>
        <div class="mt-3">
          <p>
            Een manier om de drukte op een verkeersnet te kunnen beoordelen is
            door te kijken naar intensiteiten. Intensiteiten geven het aantal
            voertuigen of reizigers op een bepaald tijdstip over een punt
            heenrijden op de weg of over het spoor. De intensiteiten zijn
            bepaald door een toedeling de gemaakt is met een verkeersmodel. De
            intensiteiten zijn per scenario verschillend door de veranderingen
            in de modal split of de potentie van een gebied. De scenario’s laten
            zien of de intensiteiten toenemen (groen) of afnemen (rood). Als de
            intensiteiten bekend zijn kan er ook worden gekeken of wegen en
            sporen nog genoeg capaciteit (het maximum aantal voertuigen wat een
            weg of spoor aankan) heeft in de toekomst als MaaS een populaire
            service wordt.
          </p>
        </div>
        <div align="center">
          <!-- Dialog screen for more information -->
          <v-dialog v-model="dialog_about">
            <v-btn
              id="button4"
              color="pink"
              slot="activator"
              class="white--text"
              >Meer informatie
            </v-btn>
            <v-card>
              <v-card-actions style="width: 50%;">
                <v-spacer></v-spacer>
                <div class="close">
                  <v-btn flat v-on:click="dialog_about = false;">
                    <v-icon>close</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
              <v-card-title primary-title class="cyan--text">
                <h2>
                  Meer Informatie over de effecten van MaaS in Noord-Brabant
                </h2>
              </v-card-title>
              <v-card-text class="text-left"> <About></About> </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <hr noshade="black" />

        <!-- Buttons for Effect maybe? -->
        <div></div>
        <!-- Mobile device warning -->
        <div
          class="col-xs-12 col-md-12 col-lg-8 p-5 d-lg-none d-xs-block text-center"
        >
          <h5>
            De MaaS potentiescan is niet beschikbaar voor mobiele apparaten.
          </h5>
          <span
            >Gebruik een Laptop of Desktop om de scan te kunnen gebruiken.
            <br />(Minimaal een resolutie van 1200x800 pixels)
          </span>
        </div>
      </div>
      <!-- Map side of the webtool -->
      <div
        class="col-lg-9 col-md-9 col-xxl-9 col-xl-9 no-padding d-none d-lg-block"
      >
        <!-- Map -->
        <div id="map" class="map"></div>
        <div style="display: none;">
          <!-- Popup -->
          <div id="popup" class="ol-popup">
            <a
              href="#"
              v-on:click="closePopup"
              id="popup-closer"
              class="ol-popup-closer"
            >
              <i aria-hidden="true" class="v-icon material-icons theme--light"
                >close</i
              >
            </a>
            <div id="popup-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import NProgress from "nprogress";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Stroke, Style } from "ol/style.js";
import { transform } from "ol/proj.js";
import { LineString } from "ol/geom.js";
import About from "../components/About";
// @ is an alias to /src
export default {
  //dialog components
  components: {
    About
  },
  data: function() {
    return {
      json: { type: "FeatureCollection", features: [] },
      layers: null,
      type: null,
      dialog_about: false
    };
  },
  mounted() {
    this.reload();
    NProgress.done();
  },
  methods: {
    closePopup() {
      this.popup.setPosition(undefined);
      $("#closer").blur();
      return false;
    },
    reload() {
      var self = this;
      fetch("/t.geojson")
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          self.initMap(json);
        });
    },
    initMap(json) {
      if (layers == null) {
        var vectorSource = new VectorSource({
          features: new GeoJSON({
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857"
          }).readFeatures(json)
        });
        var icolor = null;

        var styleFunction = function(feature, resolution) {
          if (feature.values_.segment_id % 2 == 0) {
            feature.values_.intensity = (feature.values_.flow / 100) * -1;
          } else {
            feature.values_.intensity = feature.values_.flow / 100;
          }
          if (feature.values_.intensity > 1) {
            if (feature.values_.intensity > 10) {
              feature.values_.intensity = 10;
            }
            icolor = "orangered";
          } else {
            if (feature.values_.intensity < -10) {
              feature.values_.intensity = -10;
            }
            icolor = "limegreen";
          }
          return [
            new Style({
              stroke: new Stroke({
                color: "white",
                width: 1 + Math.abs(feature.values_.intensity),
                zIndex: 1
              })
            }),
            new Style({
              geometry: function(feature) {
                var line = feature.getGeometry();
                var coords = [];
                line.forEachSegment(function(from, to) {
                  // for each segment calculate a parallel segment with a
                  // distance of 4 pixels
                  var angle = Math.atan2(to[1] - from[1], to[0] - from[0]);

                  var dist =
                    (1 + Math.abs(feature.values_.intensity)) * resolution;
                  if (feature.values_.intensity < 0) {
                    dist = 1 * resolution;
                  }
                  var newFrom = [
                    Math.sin(angle) * dist + from[0],
                    -Math.cos(angle) * dist + from[1]
                  ];
                  var newTo = [
                    Math.sin(angle) * dist + to[0],
                    -Math.cos(angle) * dist + to[1]
                  ];
                  coords.push(newFrom);
                  coords.push(newTo);
                });

                return new LineString(coords);
              },
              stroke: new Stroke({
                color: icolor,
                width: Math.abs(feature.values_.intensity),
                zIndex: 2
              })
            })
          ];
        };
        var overview_style = function(feature) {
          if (feature.values_.segment_id % 2 == 0) {
            feature.values_.intensity = (feature.values_.flow / 100) * -1;
          } else {
            feature.values_.intensity = feature.values_.flow / 100;
          }
          if (feature.values_.intensity > 1) {
            if (feature.values_.intensity > 10) {
              feature.values_.intensity = 10;
            }
            icolor = "orangered";
          } else {
            if (feature.values_.intensity < -10) {
              feature.values_.intensity = -10;
            }
            icolor = "limegreen";
          }
          return [
            new Style({
              stroke: new Stroke({
                color: icolor,
                width: 1
              })
            })
          ];
        };

        var layers = new VectorLayer({
          source: vectorSource,
          minResolution: 0,
          maxResolution: 25,
          style: styleFunction
        });

        var overview_layer = new VectorLayer({
          source: vectorSource,
          minResolution: 25,
          maxResolution: 2000,
          style: overview_style,
          visible: false
        });

        var map = new Map({
          layers: [
            new TileLayer({
              preload: Infinity,
              source: new OSM({
                url:
                  "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              })
            })
          ],
          target: "map",
          controls: new defaultControls({
            attributionOptions: {
              collapsible: false
            }
          }),
          view: new View({
            center: transform([5.232169, 51.582654], "EPSG:4326", "EPSG:3857"),
            zoom: 9,
            maxZoom: 30,
            minZoom: 1
          })
        });
        map.addLayer(layers);
        map.addLayer(overview_layer);
        map.on("rendercomplete", function() {
          this.getLayers()
            .item(2)
            .setVisible(true);
        });
      } else {
        layers.getSource().clear();
        layers.getSource().addFeatures(
          new GeoJSON({
            featureProjection: "EPSG:3857"
          }).readFeatures(json)
        );
      }
    }
  }
};
</script>
