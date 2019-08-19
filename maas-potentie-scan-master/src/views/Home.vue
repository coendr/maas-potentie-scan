<template>
  <!-- eslint-disable -->
  <div class="home">
    <div class="row">
      <div
        class="bg-white col-md-12 col-xl-3 col-lg-3 col-xxl-3 scrollingDiv sidebar"
      >
        <div align="center">
          <h1 class="cyan--text super-title">MaaS</h1>
          <h3 class="pink--text sub-title">Potentie Scan</h3>
        </div>
        <!-- <p> -->
        <!-- <router-link to='/'> -->
        <!-- <button class="btn btn-secondary active">Nederland</button> -->
        <!-- </router-link> -->
        <!-- <router-link to='brabant'> -->
        <!-- <button class="btn btn-secondary">Brabant</button> -->
        <!-- </router-link> -->
        <!-- </p> -->

        <div class="mt-4">
          <!-- MaaS explanation -->
          <MaaS></MaaS>
        </div>
        <div align="center">
          <!-- Dialog screen for more information -->
          <v-dialog v-model="dialog_info">
            <v-btn
              id="button1"
              color="pink"
              slot="activator"
              class="white--text"
              >Meer informatie
            </v-btn>
            <v-card>
              <v-card-actions style="width: 50%;">
                <v-spacer></v-spacer>
                <div class="close">
                  <v-btn flat v-on:click="dialog_info = false;">
                    <v-icon>close</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
              <v-card-title primary-title class="cyan--text">
                <h2>Meer Informatie over de MaaS potentiescan</h2>
              </v-card-title>
              <v-card-text class="text-left"> <Info></Info> </v-card-text>
            </v-card>
          </v-dialog>
          <br />
          <!-- Dialog screen for the research paper -->
          <v-dialog v-model="dialog_research" class="col-md-12">
            <v-btn
              id="button2"
              color="pink"
              slot="activator"
              class=" white--text"
            >
              De research paper
            </v-btn>
            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="close">
                  <v-btn flat v-on:click="dialog_research = false;">
                    <v-icon>close</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
              <v-card-title primary-title class="cyan--text">
                <div class="text-center">
                  <h2>
                    MaaS-potentiescan voor heel Nederland op basis van gsm-data
                  </h2>
                </div>
              </v-card-title>
              <v-card-text class="text-left">
                <Research></Research>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Crowdfunding routing -->
          <router-link
            to="/crowdfunding"
            color="pink"
            class="d-lg-none d-xs-block v-btn theme--light pink white--text crowd-btn"
            >Crowdfunding
          </router-link>
        </div>

        <hr noshade="black" />

        <!-- Calculate window -->
        <div align="center" class="d-none d-lg-block proposition">
          <h1>MaaS abonnement</h1>
          <!-- Switch to bundle MaaS subscription -->
          <v-tooltip top>
            <v-btn
              slot="activator"
              v-bind:class="{ 'btn-primary': !c_payg }"
              class="btn border border-dark keuze1"
              v-on:click="changeParameterPaYG(false);"
              value="false"
              >Bundel
            </v-btn>
            <span
              >De gebruiker betaald een vast bedrag per maand voor een bundel
              met een aantal dagen onbeperkt OV-gebruik en een aantal uren
              deelauto service</span
            >
          </v-tooltip>
          <!-- Switch to pay ss you go MaaS subscription -->
          <v-tooltip top>
            <v-btn
              slot="activator"
              v-bind:class="{ 'btn-primary': c_payg }"
              class="btn border border-dark keuze2"
              v-on:click="changeParameterPaYG(true);"
              value="true"
            >
              Naar Gebruik
            </v-btn>
            <span
              >de gebruiker betaald een vast bedrag per maand voor een bepaald
              (gereduceerd) tarief op OV- en deelauto services</span
            >
          </v-tooltip>

          <div class="border-black p-3">
            <!-- Subscription cost input -->
            <v-tooltip top>
              <div class="row" slot="activator">
                <div class="col-md-4 abbo">
                  <h6><span>Abonnement</span></h6>
                </div>
                <div class="col-md-8" v-bind:class="{ tool: !isPrijs }">
                  <div v-if="!isPrijs">
                    <!-- input field range -->
                    <v-card class="tt">1 t/m 2000 AU$</v-card>
                  </div>
                  <!-- Subscription cost, pay as you go input field -->
                  <span v-if="c_payg == true">
                    <v-text-field
                      v-model.number="payg_cost"
                      @focus="isPrijs = !isPrijs;"
                      @blur="isPrijs = true;"
                      type="number"
                      max="2000"
                      min="1"
                      suffix="AU$ / Maand"
                      solo
                      required=""
                    >
                    </v-text-field>
                  </span>
                  <!-- Subscription cost, bundle input field -->
                  <span v-else>
                    <v-text-field
                      v-model.number="ff_cost"
                      @focus="isPrijs = !isPrijs;"
                      @blur="isPrijs = true;"
                      type="number"
                      max="2000"
                      min="1"
                      suffix="AU$ / Maand"
                      solo
                      required=""
                    >
                    </v-text-field>
                  </span>
                </div>
              </div>
              <span
                >Maandelijkse abonnementsprijs in AU$ (NB: er is bewust geen
                conversie naar Euros toegepast; het achterliggend gedragsmodel
                is Australisch)</span
              >
            </v-tooltip>
            <!-- Public transport input -->
            <div class="row">
              <div class="col-md-4 abbo"><h6>OV</h6></div>

              <div class="col-md-8" v-bind:class="{ tool: !isOV }">
                <div v-if="!isOV">
                  <!-- input field range -->
                  <v-card class="tt">2 t/m 24 dagen</v-card>
                </div>
                <!-- Public transport input, bundle input field -->

                <span v-if="c_payg == false">
                  <v-tooltip top>
                    <span slot="activator">
                      <v-text-field
                        v-model.number="ff_PTbundle"
                        @focus="isOV = !isOV;"
                        @blur="isOV = true;"
                        type="number"
                        min="2"
                        max="24"
                        suffix="Dagen / Maand"
                        solo
                        required=""
                      >
                      </v-text-field>
                    </span>
                    <span>Aantal dagen per maand met onbeperkt OV gebruik</span>
                  </v-tooltip>
                </span>

                <!-- Public transport input, pay as you go input field -->
                <span v-else>
                  <v-tooltip top>
                    <span slot="activator">
                      <v-text-field
                        type="text"
                        value="niet significant"
                        disabled
                        solo
                        required=""
                      >
                      </v-text-field>
                    </span>
                    <span
                      >Het tarief voor OV gebruik bleek in Sydney niet van
                      invloed op het abonnementsbezit (waarschijnlijk omdat daar
                      het wekelijkse bedrag aan OV-kosten (via de Opal card) is
                      gemaximeerd)</span
                    >
                  </v-tooltip>
                </span>
              </div>
            </div>
            <!-- Shared car input -->
            <div class="row">
              <div class="col-md-4 abbo"><h6>Deel auto</h6></div>
              <div class="col-md-8 padding" v-bind:class="{ tool: !isAuto }">
                <!-- Shared car input, bundle input field -->
                <span v-if="c_payg == false">
                  <v-tooltip top>
                    <span slot="activator">
                      <div v-if="!isAuto">
                        <!-- input field range -->
                        <v-card class="tt">10 t/m 32 uur</v-card>
                      </div>
                      <v-text-field
                        v-model.number="ff_sharedCarBundle"
                        @focus="isAuto = !isAuto;"
                        @blur="isAuto = true;"
                        type="number"
                        min="10"
                        max="32"
                        suffix="Uur / Maand"
                        solo
                        required=""
                      >
                      </v-text-field>
                    </span>
                    <span>Aantal uur deelauto service per maand</span>
                  </v-tooltip>
                </span>
                <!-- Shared car input, pay as you go input field -->
                <span v-else>
                  <div v-if="!isAuto">
                    <!-- input field range -->
                    <v-card class="tt">6.00 t/m 8.50 AU$</v-card>
                  </div>
                  <v-tooltip top>
                    <span slot="activator">
                      <v-text-field
                        v-model.number="payg_sharedCarCost"
                        @focus="isAuto = !isAuto;"
                        @blur="isAuto = true;"
                        type="number"
                        max="8.5"
                        min="6"
                        suffix="AU$ / Uur"
                        solo
                        required=""
                      >
                      </v-text-field>
                    </span>
                    <span>Tarief voor deelauto gebruik</span>
                  </v-tooltip>
                </span>
              </div>
            </div>
            <!-- Shared car bundle selection -->
            <div class="row bundle" style="position: relative; height: 80px;">
              <div class="col-md-4"><h6></h6></div>
              <div class="col-md-8 car_share">
                <!-- Switch to "leave car behind" -->
                <v-tooltip top>
                  <button
                    v-bind:class="{ 'btn-primary': !c_onlyRoundTripCarSharing }"
                    class="btn border border-dark keuze3"
                    v-on:click="changeParameterSharingCar(false);"
                    value="false"
                    slot="activator"
                  >
                    Achter laten
                  </button>
                  <span
                    >Deelauto wordt na gebruik achter gelaten op elke gewenste
                    locatie</span
                  >
                </v-tooltip>
                <!-- Switch to "return car" -->
                <v-tooltip top>
                  <button
                    v-bind:class="{ 'btn-primary': c_onlyRoundTripCarSharing }"
                    color="white"
                    class="btn border border-dark keuze4"
                    v-on:click="changeParameterSharingCar(true);"
                    value="true"
                    slot="activator"
                  >
                    Terug brengen
                  </button>
                  <span
                    >Deelauto dient na gebruik te worden terug gebracht naar de
                    locatie van vertrek</span
                  >
                </v-tooltip>
              </div>
            </div>
            <!-- Calculate MaaS probability -->
            <v-btn
              id="button3"
              class="white--text"
              v-on:click="reload();"
              color="pink"
              >Bereken
              <!-- spinner for progress -->
              <div class="spinner" role="spinner">
                <div class="spinner-icon"></div>
              </div>
            </v-btn>
            <!--
              Progress text for calculating and printing MaaS probability on the map
            -->
            <br />
            <div id="progress"></div>
          </div>
        </div>
      </div>
      <!-- Mobile device warning -->
      <div
        class="col-xs-12 col-md-12 col-lg-8 p-5 d-lg-none d-xs-block  text-center"
      >
        <h5>
          De MaaS potentiescan is niet beschikbaar voor mobiele apparaten.
        </h5>
        <span>
          Gebruik een Laptop of Desktop om de scan te kunnen gebruiken.
          <br />(Minimaal een resolutie van 1200x800 pixels)
        </span>
      </div>
      <!-- Map side of the webtool -->
      <div
        id="content"
        class="col-lg-9 col-md-9 col-xxl-9 col-xl-9 no-padding d-none d-lg-block"
      >
        <!-- Map -->
        <div id="map" class="map "></div>
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
        <div id="segment_filter">
          <v-card class="rounded-card">
            <span class="h4">
              <v-icon
                onclick="document.getElementById('filter_dropdown').classList.toggle('hidden');
                                this.classList.toggle('rotate');
                                "
                class="inline-block pointer"
                >keyboard_arrow_right</v-icon
              >
              Filter
            </span>
            <div class="pl-3 hidden" id="filter_dropdown">
              <div>
                <span class="h6">
                  <v-icon
                    onclick="document.getElementById('leeftijd_dropdown').classList.toggle('hidden');
                                this.classList.toggle('rotate');
                                "
                    class="inline-block pointer"
                    >keyboard_arrow_right</v-icon
                  >
                  <v-checkbox
                    label="Leeftijd"
                    @change="checkallfilter('leeftijd');"
                    v-model="leeftijdall"
                    class="inline-block"
                  ></v-checkbox>
                </span>
                <div id="leeftijd_dropdown" class="pl-4 hidden">
                  <v-checkbox
                    label="18-24"
                    v-model="leeftijd[0]"
                    @change="checkfilterall('leeftijd');"
                  ></v-checkbox>
                  <v-checkbox
                    label="25-34 / 45-54"
                    v-model="leeftijd[1]"
                    @change="checkfilterall('leeftijd');"
                  ></v-checkbox>
                  <v-checkbox
                    label="35-44"
                    v-model="leeftijd[2]"
                    @change="checkfilterall('leeftijd');"
                  ></v-checkbox>
                  <v-checkbox
                    label="55+"
                    v-model="leeftijd[3]"
                    @change="checkfilterall('leeftijd');"
                  ></v-checkbox>
                </div>
              </div>
              <div>
                <span class="h6">
                  <v-icon
                    onclick="document.getElementById('kinderen_dropdown').classList.toggle('hidden');
                                this.classList.toggle('rotate');
                                "
                    class="inline-block pointer"
                    >keyboard_arrow_right</v-icon
                  >
                  <v-checkbox
                    label="Kinderen"
                    @change="checkallfilter('kinderen');"
                    v-model="kinderenall"
                    class="inline-block"
                  ></v-checkbox>
                </span>
                <div id="kinderen_dropdown" class="pl-4 hidden">
                  <v-checkbox
                    label="0-1"
                    v-model="kinderen[0]"
                    @change="checkfilterall('kinderen');"
                  ></v-checkbox>
                  <v-checkbox
                    label="2+"
                    v-model="kinderen[1]"
                    @change="checkfilterall('kinderen');"
                  ></v-checkbox>
                </div>
              </div>
              <div>
                <span class="h6 pointer">
                  <v-icon
                    onclick="document.getElementById('autogebruik_dropdown').classList.toggle('hidden');
                                this.classList.toggle('rotate');
                                "
                    class="inline-block pointer"
                    >keyboard_arrow_right</v-icon
                  >
                  <v-checkbox
                    label="Autogebruik"
                    @change="checkallfilter('autogebruik');"
                    v-model="autogebruikall"
                    class="inline-block"
                  ></v-checkbox>
                </span>
                <div id="autogebruik_dropdown" class="pl-4 hidden">
                  <v-checkbox
                    label="0 Dagen"
                    v-model="autogebruik[0]"
                    @change="checkfilterall('autogebruik');"
                  ></v-checkbox>
                  <v-checkbox
                    label="1-2 Dagen"
                    v-model="autogebruik[1]"
                    @change="checkfilterall('autogebruik');"
                  ></v-checkbox>
                  <v-checkbox
                    label="3-4 Dagen"
                    v-model="autogebruik[2]"
                    @change="checkfilterall('autogebruik');"
                  ></v-checkbox>
                  <v-checkbox
                    label="5+ Dagen"
                    v-model="autogebruik[3]"
                    @change="checkfilterall('autogebruik');"
                  ></v-checkbox>
                </div>
              </div>
              <div>
                <span class="h6">
                  <v-icon
                    onclick="document.getElementById('autokosten_dropdown').classList.toggle('hidden');
                                this.classList.toggle('rotate');
                                "
                    class="inline-block pointer"
                    >keyboard_arrow_right</v-icon
                  >
                  <v-checkbox
                    label="Auto Kosten"
                    @change="checkallfilter('autokosten');"
                    v-model="autokostenall"
                    class="inline-block"
                  ></v-checkbox>
                </span>
                <div id="autokosten_dropdown" class="pl-4 hidden">
                  <v-checkbox
                    label="Geen Kosten"
                    v-model="autokosten[0]"
                    @change="checkfilterall('autokosten');"
                  ></v-checkbox>
                  <v-checkbox
                    label="Goedkoop"
                    v-model="autokosten[1]"
                    @change="checkfilterall('autokosten');"
                  ></v-checkbox>
                  <v-checkbox
                    label="Gemiddeld"
                    v-model="autokosten[2]"
                    @change="checkfilterall('autokosten');"
                  ></v-checkbox>
                  <v-checkbox
                    label="Duur"
                    v-model="autokosten[3]"
                    @change="checkfilterall('autokosten');"
                  ></v-checkbox>
                </div>
              </div>
              <!-- v-on:click="filter()" -->
              <v-btn
                v-on:click="reloadFilter();"
                class="white--text btn-filter"
                color="pink"
                >Filter
                <!-- spinner for progress -->
                <div class="spinner" role="spinner">
                  <div class="spinner-icon"></div>
                </div>
              </v-btn>
            </div>
          </v-card>
        </div>
        <!-- Crowdfunding dialog -->
        <div id="crowdfunding" align="center">
          <v-card class="rounded-card" v-if="!dialog_aus">
            <v-card-text>
              <div class="close">
                <v-btn flat v-on:click="dialog_aus = true;">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
              <crowdfunding></crowdfunding>
            </v-card-text>
          </v-card>
        </div>
        <!-- Legend -->
        <div class="left-bottom offset-3">
          <div class="total-potention d-none d-lg-block bg-white ">
            <div class="col-md-12">
              <h5 class="">Totale Potentie:</h5>
              <span v-if="type_filter === true">
                <span class="pink--text">{{ total_aandeel }}</span
                >% abonnement houders
              </span>
              <span v-else>
                <span class="pink--text">{{ total_aantal }}</span> abonnement
                houders
              </span>
            </div>
          </div>
          <div id="legenda">
            <div class="rounded-card">
              <h6 class="text-capitalize">
                <span v-if="type_filter === true"> Aandeel </span>
                <span v-else> Aantal </span> potentiële gebruikers
              </h6>
              <div class="rounded-card">
                <div class="left">
                  <span v-if="type_filter === true"> 0% </span>
                  <span v-else> 0 </span>
                </div>
                <div class="right">
                  <span v-if="type_filter === true"> 100% </span>
                  <span class="pr-1" v-else> 500 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Filter option for relative % and absolute amount of people -->
        <div id="filter">
          <v-card class="rounded-card">
            <div class="col-xxl-6 col-md-5 float-left">
              <!-- Switch to relative -->
              <v-tooltip top>
                <button
                  v-bind:class="{ 'btn-primary': type_filter }"
                  class="btn border border-dark keuze1"
                  v-on:click="changeFilter(true);"
                  slot="activator"
                >
                  Relatief
                </button>
                <span
                  >Laat aandeel potentiele abonnementhouders (in procenten
                  t.o.v. totaal aantal inwoners per CBS buurt) zien</span
                >
              </v-tooltip>
              <!-- Switch to absolute -->
              <v-tooltip top>
                <button
                  v-bind:class="{ 'btn-primary': !type_filter }"
                  class="btn border border-dark keuze2 "
                  v-on:click="changeFilter(false);"
                  slot="activator"
                >
                  Absoluut
                </button>

                <span
                  >Laat aantal potentiele abonnementhouders (absolute aantallen
                  inwoners) zien</span
                >
              </v-tooltip>
            </div>
            <!-- Input for lower limit -->
            <div class="col-md-7 col-xxl-6 float-left">
              <div class="col-md-4 float-left"><label>Ondergrens: </label></div>
              <!-- Input field for relative % -->
              <div
                class="col-md-8 float-left"
                v-if="json.features.length > 0 && type_filter == true"
              >
                <v-tooltip top>
                  <span slot="activator">
                    <v-text-field
                      v-model.number="potention"
                      v-on:change="initMap(json);"
                      type="number"
                      max="100"
                      min="0"
                      suffix="%"
                      solo
                      required=""
                    >
                    </v-text-field>
                  </span>
                  <span
                    >Kleurt zones met een aandeel potentiele abonnementhouders
                    onder de hier ingegeven waarde wit</span
                  >
                </v-tooltip>
              </div>
              <!-- Input field for absolute people -->
              <div
                class="col-md-8 float-left"
                v-else-if="json.features.length > 0 && type_filter == false"
              >
                <v-tooltip top>
                  <span slot="activator">
                    <v-text-field
                      v-model.number="potention"
                      v-on:change="initMap(json);"
                      type="number"
                      max="100"
                      min="0"
                      suffix="Gebruikers"
                      solo
                      required=""
                    >
                    </v-text-field>
                  </span>
                  <span
                    >Kleurt zones met een aantal potentiele abonnementhouders
                    onder de hier ingegeven waarde wit</span
                  >
                </v-tooltip>
              </div>
              <!--
                Disabled input field for absolute people if there is no geojson
              -->
              <div class="col-md-8 float-left" v-else-if="type_filter == false">
                <v-text-field
                  v-model.number="potention"
                  v-on:change="initMap(json);"
                  type="number"
                  max="100"
                  min="0"
                  suffix="Gebruikers"
                  solo
                  disabled=""
                  required=""
                >
                </v-text-field>
              </div>
              <!--
                Disabled input field for relative % if there is no geojson
              -->
              <div class="col-md-7 float-left" v-else>
                <v-text-field
                  v-model.number="potention"
                  type="number"
                  max="100"
                  min="0"
                  suffix="%"
                  solo
                  disabled=""
                >
                </v-text-field>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import dependencies
import $ from "jquery";
import NProgress from "nprogress";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls, ScaleLine } from "ol/control.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Fill, Stroke, Style } from "ol/style.js";
import { transform } from "ol/proj.js";
import Overlay from "ol/Overlay.js";
import Select from "ol/interaction/Select.js";
import Socket from "../Socket";
import Socket2 from "../Socket";
import emitter from "../Socket";
import MaaS from "../components/MaaS";
import Info from "../components/Info";
import Research from "../components/Research";
import Crowdfunding from "../components/Crowdfunding";

function getColor(d, type) {
  var a = 0.6;
  var filters = [];

  if (type == false) {
    filters = [50, 100, 150, 200, 250, 300, 350, 400, 450];
  } else {
    filters = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  }
  //colors for MaaS probability
  return d == "-"
    ? "rgba(" + 255 + ", " + 233 + ", " + 241 + ", " + 0 + ")"
    : d <= filters[0]
    ? "rgba(" + 250 + ", " + 214 + ", " + 228 + ", " + a + ")"
    : d <= filters[1]
    ? "rgba(" + 247 + ", " + 194 + ", " + 214 + ", " + a + ")"
    : d <= filters[2]
    ? "rgba(" + 244 + ", " + 175 + ", " + 201 + ", " + a + ")"
    : d <= filters[3]
    ? "rgba(" + 241 + ", " + 155 + ", " + 187 + ", " + a + ")"
    : d <= filters[4]
    ? "rgba(" + 238 + ", " + 136 + ", " + 174 + ", " + a + ")"
    : d <= filters[5]
    ? "rgba(" + 235 + ", " + 116 + ", " + 160 + ", " + a + ")"
    : d <= filters[6]
    ? "rgba(" + 232 + ", " + 97 + ", " + 147 + ", " + a + ")"
    : d <= filters[7]
    ? "rgba(" + 229 + ", " + 77 + ", " + 133 + ", " + a + ")"
    : d <= filters[8]
    ? "rgba(" + 226 + ", " + 58 + ", " + 120 + ", " + a + ")"
    : "rgba(" + 223 + ", " + 38 + ", " + 106 + ", " + a + ")";
}

// @ is an alias to /src
export default {
  //dialog components
  components: { MaaS, Info, Research, Crowdfunding },
  //data sets
  data: function() {
    return {
      json: { type: "FeatureCollection", features: [] },
      featureLayer: null,
      potention: 0,
      c_payg: false,
      c_onlyRoundTripCarSharing: false,
      ff_PTbundle: 2,
      ff_sharedCarBundle: 32,
      ff_cost: 260,
      payg_cost: 50,
      payg_sharedCarCost: 6,
      segment: 1,
      in_progress: false,
      dialog_aus: false,
      dialog_info: false,
      dialog_research: false,
      type_filter: false,
      isPrijs: true,
      isOV: true,
      isAuto: true,
      leeftijdall: true,
      kinderenall: true,
      autogebruikall: true,
      autokostenall: true,
      leeftijd: [true, true, true, true],
      kinderen: [true, true],
      autogebruik: [true, true, true, true],
      autokosten: [true, true, true, true],
      total_aandeel: 0,
      total_aantal: 0
    };
  },
  mounted() {
    if (
      !/iPhone|iPod|Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(
        navigator.userAgent
      )
    ) {
      var self = this;
      fetch("/maasSubscriptions.geojson")
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          self.json = json;
          self.initMap(self.json);
        });
      //enable inputs/buttons and select after revieving data from the backend
      emitter.$on("message", datasocket => {
        this.initMap(datasocket);
        NProgress.done();
        $(".spinner").css("display", "none");
        $("button").prop("disabled", false);
        $("input").prop("disabled", false);
        $("select").prop("disabled", false);
        this.in_progress = false;
      });
      emitter.$on("report", msg => {
        $("#progress").append("<br>" + msg);
      });

      emitter.$on("error", error => {
        console.log(error);
      });
    }
  },
  //functions
  methods: {
    checkallfilter(type) {
      if (type == "leeftijd") {
        this.leeftijd = [
          this.leeftijdall,
          this.leeftijdall,
          this.leeftijdall,
          this.leeftijdall
        ];
      } else if (type == "kinderen") {
        this.kinderen = [this.kinderenall, this.kinderenall];
      } else if (type == "autogebruik") {
        this.autogebruik = [
          this.autogebruikall,
          this.autogebruikall,
          this.autogebruikall,
          this.autogebruikall
        ];
      } else if (type == "autokosten") {
        this.autokosten = [
          this.autokostenall,
          this.autokostenall,
          this.autokostenall,
          this.autokostenall
        ];
      }
    },
    checkfilterall(type) {
      if (type == "leeftijd") {
        if (
          this.leeftijd[0] &&
          this.leeftijd[1] &&
          this.leeftijd[2] &&
          this.leeftijd[3]
        ) {
          this.leeftijdall = true;
        } else {
          this.leeftijdall = false;
        }
      } else if (type == "kinderen") {
        if (this.kinderen[0] && this.kinderen[1]) {
          this.kinderenall = true;
        } else {
          this.kinderenall = false;
        }
      } else if (type == "autogebruik") {
        if (
          this.autogebruik[0] &&
          this.autogebruik[1] &&
          this.autogebruik[2] &&
          this.autogebruik[3]
        ) {
          this.autogebruikall = true;
        } else {
          this.autogebruikall = false;
        }
      } else if (type == "autokosten") {
        if (
          this.autokosten[0] &&
          this.autokosten[1] &&
          this.autokosten[2] &&
          this.autokosten[3]
        ) {
          this.autokostenall = true;
        } else {
          this.autokostenall = false;
        }
      }
    },
    changeParameterPaYG(value) {
      this.c_payg = value;
    },
    changeParameterSharingCar(value) {
      this.c_onlyRoundTripCarSharing = value;
    },
    changeFilter(value) {
      this.type_filter = value;
      this.potention = 0;
      NProgress.start();
      this.initMap(this.json);
      NProgress.done();
    },
    closePopup() {
      this.popup.setPosition(undefined);
      $("#closer").blur();
      return false;
    },
    //calculate MaaS probability
    reload() {
      //disable buttons/inputs and select
      $("button").prop("disabled", true);
      $("input").prop("disabled", true);
      $("select").prop("disabled", true);

      if (this.in_progress == false) {
        this.in_progress = true;
        NProgress.start();
        $(".spinner").css("display", "block");
        //set vars on 0
        var ff_PTbundle_biweek = 0;
        var ff_cost_biweek = 0;
        var ff_sharedCarBundle_biweek = 0;
        var payg_sharedCarCost_hour = 0;
        var payg_cost_biweek = 0;
        var send_socket = false;
        //check ranges of input fields
        if (
          this.c_payg == false &&
          this.ff_cost > 0 &&
          this.ff_cost <= 2000 &&
          this.ff_PTbundle >= 2 &&
          this.ff_PTbundle <= 24 &&
          this.ff_sharedCarBundle >= 10 &&
          this.ff_sharedCarBundle <= 32
        ) {
          //Devide input fields data by 2 for backend calculations
          ff_cost_biweek = this.ff_cost / 2;
          ff_PTbundle_biweek = this.ff_PTbundle / 2;
          ff_sharedCarBundle_biweek = this.ff_sharedCarBundle / 2;
          payg_sharedCarCost_hour = 6;
          payg_cost_biweek = 25;
          send_socket = true;
        } else if (
          this.c_payg == true &&
          this.payg_cost > 0 &&
          this.payg_cost <= 2000 &&
          this.payg_sharedCarCost >= 6 &&
          this.payg_sharedCarCost <= 8.5
        ) {
          ff_cost_biweek = 130;
          ff_PTbundle_biweek = 1;
          ff_sharedCarBundle_biweek = 5;
          payg_sharedCarCost_hour = this.payg_sharedCarCost;
          payg_cost_biweek = this.payg_cost / 2;
          send_socket = true;
        }
        //Collect socket data
        if (send_socket) {
          var sendMsg = {
            c_payg: this.c_payg,
            c_onlyRoundTripCarSharing: this.c_onlyRoundTripCarSharing,
            ff_cost: ff_cost_biweek,
            ff_PTbundle: ff_PTbundle_biweek,
            ff_sharedCarBundle: ff_sharedCarBundle_biweek,
            payg_cost: payg_cost_biweek,
            payg_sharedCarCost: payg_sharedCarCost_hour,
            text: "hi",
            zip: "yes"
          };
          //Send Socket
          Socket.send(JSON.stringify(sendMsg));
          $("#progress").text("");
          $("#progress").append("Versturen rekenopdracht (+/- 18sec)");
        } else {
          /*eslint-disable no-undef*/
          NProgress.done();
          /*eslint-enable no-undef*/
          $(".spinner").css("display", "none");
          $("button").prop("disabled", false);
          $("input").prop("disabled", false);
          $("select").prop("disabled", false);
          this.in_progress = false;
          //Alert box if ranges are to high or to low in the inout fields
          alert(
            "Parameters niet in range. \nGebruik andere parameter data om nog een keer te kunnen rekenen\n\n" +
              "Bundel Parameter Range: \nAbonnement: 1 - 2000 \nOV Bundel: 2 - 24 \nDeelAuto 10 - 32 \n \nNaar Gebruik Parameter Range: \nAbonnement: 1 - 2000 \nDeelauto: 6 - 8.5"
          );
        }
      }
    },
    reloadFilter() {
      //disable buttons/inputs and select
      $("button").prop("disabled", true);
      $("input").prop("disabled", true);
      $("select").prop("disabled", true);

      if (this.in_progress == false) {
        this.in_progress = true;
        NProgress.start();
        $(".spinner").css("display", "block");

        var leeftijd_array = new Array();
        var kinderen_array = new Array();
        var autogebruik_array = new Array();
        var autokosten_array = new Array();
        var send_socket = true;

        if (this.leeftijd[0] == true) {
          leeftijd_array.push(1);
        } else {
          leeftijd_array.push(0);
        }
        if (this.leeftijd[1] == true) {
          leeftijd_array.push(1);
        } else {
          leeftijd_array.push(0);
        }
        if (this.leeftijd[2] == true) {
          leeftijd_array.push(1);
        } else {
          leeftijd_array.push(0);
        }
        if (this.leeftijd[3] == true) {
          leeftijd_array.push(1);
        } else {
          leeftijd_array.push(0);
        }

        if (this.kinderen[0] == true) {
          kinderen_array.push(1);
        } else {
          kinderen_array.push(0);
        }
        if (this.kinderen[1] == true) {
          kinderen_array.push(1);
        } else {
          kinderen_array.push(0);
        }

        if (this.autogebruik[0] == true) {
          autogebruik_array.push(1);
        } else {
          autogebruik_array.push(0);
        }
        if (this.autogebruik[1] == true) {
          autogebruik_array.push(1);
        } else {
          autogebruik_array.push(0);
        }
        if (this.autogebruik[2] == true) {
          autogebruik_array.push(1);
        } else {
          autogebruik_array.push(0);
        }
        if (this.autogebruik[3] == true) {
          autogebruik_array.push(1);
        } else {
          autogebruik_array.push(0);
        }

        if (this.autokosten[0] == true) {
          autokosten_array.push(1);
        } else {
          autokosten_array.push(0);
        }
        if (this.autokosten[1] == true) {
          autokosten_array.push(1);
        } else {
          autokosten_array.push(0);
        }
        if (this.autokosten[2] == true) {
          autokosten_array.push(1);
        } else {
          autokosten_array.push(0);
        }
        if (this.autokosten[3] == true) {
          autokosten_array.push(1);
        } else {
          autokosten_array.push(0);
        }

        if (send_socket) {
          var sendMsg = {
            leeftijd: leeftijd_array,
            kinderen: kinderen_array,
            autogebruik: autogebruik_array,
            autokosten: autokosten_array
          };
          console.log(sendMsg);
          //Send Socket
          Socket2.sendFilter(JSON.stringify(sendMsg));
          $("#progress")
            .text("")
            .append("Versturen Filteropdracht (+/- 18sec)");
          $("button").prop("disabled", false);
          $("input").prop("disabled", false);
          $("select").prop("disabled", false);
        }
      }
    },
    initMap(json) {
      var i = 0;
      if (this.featureLayer !== null) {
        this.closePopup();
        this.map.removeLayer(this.featureLayer);
        this.map.removeInteraction(this.select);
      }
      console.log("Rekenresultaten op kaart plaatsen " + Date.now());
      var scaleLineControl = new ScaleLine();
      var container = document.getElementById("popup");
      var content = document.getElementById("popup-content");

      var self = this;
      var selectedStyleFunction = function(feature) {
        if (i === 0) {
          console.log(feature);
          i += 1;
        }
        var color = "-";
        if (self.type_filter == true) {
          var potention = self.potention / 100;
          if (feature.values_.aandeel_potentiele_gebruikers >= potention) {
            if (
              self.kinderenall !== true ||
              self.leeftijdall !== true ||
              self.autogebruikall !== true ||
              self.autokostenall !== true
            ) {
              color =
                feature.values_.aandeel_potentiele_gebruikers_in_filter * 100;

              if (isNaN(color)) {
                color = 0;
              }
            } else {
              color = feature.values_.aandeel_potentiele_gebruikers * 100;
            }
          }
        } else {
          if (feature.values_.aantal_potentiele_gebruikers >= self.potention) {
            if (
              self.kinderenall !== true ||
              self.leeftijdall !== true ||
              self.autogebruikall !== true ||
              self.autokostenall !== true
            ) {
              color = feature.values_.aantal_potentiele_gebruikers_in_filter;
              if (color === undefined) {
                color = 0;
              }
            } else {
              color = feature.values_.aantal_potentiele_gebruikers;
            }
          }
        }

        if (feature.values_.statnaam !== " ") {
          return new Style({
            stroke: new Stroke({
              lineDash: [0],
              width: 1,
              color: "black"
            }),
            fill: new Fill({
              color: getColor(color, self.type_filter)
            })
          });
        }
      };

      var styleFunction = function(feature) {
        var color = "-";
        if (self.type_filter == true) {
          var potention = self.potention / 100;
          if (feature.values_.aandeel_potentiele_gebruikers >= potention) {
            if (
              self.kinderenall !== true ||
              self.leeftijdall !== true ||
              self.autogebruikall !== true ||
              self.autokostenall !== true
            ) {
              color =
                feature.values_.aandeel_potentiele_gebruikers_in_filter * 100;
              if (isNaN(color)) {
                color = 0;
              }
            } else {
              color = feature.values_.aandeel_potentiele_gebruikers * 100;
            }
          }
        } else {
          if (feature.values_.aantal_potentiele_gebruikers >= self.potention) {
            if (
              self.kinderenall !== true ||
              self.leeftijdall !== true ||
              self.autogebruikall !== true ||
              self.autokostenall !== true
            ) {
              color = feature.values_.aantal_potentiele_gebruikers_in_filter;
              if (color === undefined) {
                color = 0;
              }
            } else {
              color = feature.values_.aantal_potentiele_gebruikers;
            }
          }
        }
        if (feature.values_.statcode === "BU99999999") {
          var total_aandeel =
            feature.values_.totaal_aandeel_potentiele_Gebruikers;
          var total_aantal =
            feature.values_.totaal_aantal_potentiele_Gebruikers;
          if (total_aandeel !== undefined && total_aantal !== undefined) {
            total_aandeel = total_aandeel * 100;
            self.total_aantal = total_aantal.toFixed(0);
            self.total_aandeel = total_aandeel.toFixed(0);
          }
        }
        if (feature.values_.statnaam !== " ") {
          return new Style({
            stroke: new Stroke({
              lineDash: [0],
              width: 0.3,
              color: "transparent"
            }),
            fill: new Fill({
              color: getColor(color, self.type_filter)
            })
          });
        }
      };

      if (this.featureLayer === null) {
        //Basemap
        var map = new Map({
          layers: [
            new TileLayer({
              preload: Infinity,
              source: new OSM({
                url:
                  "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              })
            })
          ],
          target: "map",
          controls: new defaultControls({
            attributionOptions: {
              collapsible: false
            }
          }).extend([scaleLineControl]),
          //Map zooming/panning
          view: new View({
            center: transform([5.59, 52.23], "EPSG:4326", "EPSG:3857"),
            zoom: 7.5,
            maxZoom: 16,
            minZoom: 7.5
          })
        });
        this.map = map;
      }

      var vectorSource = new VectorSource({
        features: new GeoJSON({
          featureProjection: "EPSG:3857"
        }).readFeatures(json)
      });
      this.featureLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
        visible: false
      });

      var select = new Select({
        style: selectedStyleFunction
      });
      var popup = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

      this.popup = popup;
      this.select = select;

      this.map.addOverlay(popup);
      this.map.addLayer(this.featureLayer);
      this.map.addInteraction(select);
      this.map.on("rendercomplete", function() {
        this.getLayers()
          .item(1)
          .setVisible(true);
      });
      console.log("Rekenresultaten op kaart geplaatst " + Date.now());
      $("#progress").text("");
      self = this;
      this.map.on("singleclick", function(evt) {
        var coordinate = evt.coordinate;

        var feature = self.map.forEachFeatureAtPixel(evt.pixel, function(
          feature
        ) {
          return feature;
        });
        if (feature) {
          var inwoners = 0;
          var aantal = 0;
          var aandeel = 0;
          if (
            self.kinderenall !== true ||
            self.leeftijdall !== true ||
            self.autogebruikall !== true ||
            self.autokostenall !== true
          ) {
            aandeel =
              feature.get("aandeel_potentiele_gebruikers_in_filter") * 100;
            aantal = feature.values_.aantal_potentiele_gebruikers_in_filter;
          } else {
            aandeel = feature.get("aandeel_potentiele_gebruikers") * 100;
            aantal = feature.values_.aantal_potentiele_gebruikers;
          }
          var buurtcode = feature.values_.statcode;

          if (aantal > 0 && aandeel > 0) {
            inwoners = (aantal / aandeel) * 100;

            if (inwoners > 0) {
              inwoners = inwoners.toFixed(0);
            }
          }
          if (aantal > 0) {
            aantal = aantal.toFixed(0);
          } else {
            aantal = 0;
          }
          if (aandeel > 0) {
            aandeel = aandeel.toFixed(2);
          } else {
            aandeel = 0;
          }
          //Content inside a poppup
          content.innerHTML =
            "<div class='row'><div class='col-md-12'>" +
            "<span class='h5 pr-2'>" +
            feature.get("statnaam") +
            "</span>" +
            "<span class='small pr-2 pb-1'>(" +
            buurtcode +
            ")</span></div></div>" +
            "<div class='row'>" +
            "<div class='col-md-12 pb-1'><span class='h6'>Aantal inwoners (> 18 jaar): <span class='value'>" +
            inwoners +
            "</span>,</span><br>" +
            "<span class='h6'>Waarvan <span class='value'>" +
            aantal +
            "</span>" +
            " dit abonnement zouden afnemen </span>" +
            "<span class='h6'>(" +
            aandeel +
            "%) </span> " +
            "</div></div>";
          self.popup.setPosition(coordinate);
        } else {
          self.closePopup();
        }
      });
    }
  }
};
</script>
