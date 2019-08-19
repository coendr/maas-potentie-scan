<template>
  <div class="modalsplit">
    <div class="row">
      <div
        class="bg-white col-md-12 col-xl-3 col-lg-4 col-xxl-3 sidebar"
        id="control"
      >
        <div align="center">
          <h1 class="cyan--text super-title">Effecten MaaS</h1>
          <h3 class="pink--text sub-title">Noord-Brabant</h3>
          <h3 class="pink--text sub-title text-center">Modal Split</h3>
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

          <h4 v-if="scenario !== null" class="pink--text sub-title">
            <span v-if="scenario === 0">Basisscenario MaaS gebruikers</span>
            <span v-if="scenario === 1"
              >Bedrijven / werkgevers stimuleren MaaS</span
            >
            <span v-if="scenario === 2"
              >Attracties en winkels stimuleren MaaS</span
            >
            <span v-if="scenario === 3"
              >Overheden stimuleren MaaS op basis van de mobiliteit in de
              binnensteden</span
            >
            <span v-if="scenario === 4"
              >Overheden stimuleren MaaS op basis van de mobiliteit in de
              buitengebieden</span
            >
          </h4>
          <p v-if="scenario === null">
            Mobility as a Service heeft als sterk punt dat er zonder veel
            drempels een ketenvervoer aan te bieden. In abonnementen zijn er
            verschillende modaliteiten opgenomen waarmee gereisd kan worden. De
            implementatie van MaaS kan ervoor zorgen dat er personen ritten
            inruilen voor een ander vervoersmiddel als die ze nu gebruiken. Om
            de veranderingen op het gebied van modal shift te zien is er eerst
            een weergegeven van 2015. Deze modal split komt het best overeen met
            de werkelijkheid. Door te vergelijken met de ritten van nu kan een
            effect beter worden weergegeven als MaaS wordt geïmplementeerd.
          </p>
          <p v-if="scenario === 0">
            Bij scenario 0+ is de basis van het MaaS gebruik weergegeven.
            Scenario 0+ is gebaseerd op cijfers uit literatuur uit onder andere
            Australië en Groot-Brittannië. De MaaS gebruikers zullen bestaan uit
            groepen zoals innovators en early adaptors. Deze personen zijn
            vooral nieuwsgierig naar nieuwe innovaties zoals MaaS.
          </p>
          <p v-if="scenario === 1">
            Bij scenario 1 is MaaS extra gestimuleerd vanuit bedrijven of andere
            werkgevers. Bedrijven of werkgevers zullen in dit scenario
            leaseauto’s, OV-abonnementen of kilometervergoeding vervangen door
            een MaaS abonnement. Zo kunnen de werknemers van een bepaald bedrag
            mobiliteit gebruiken. Dit kan woon-werk en zakelijk verkeer gaan
            beïnvloeden en ook een deel privéritten zullen door MaaS worden
            beïnvloed.
          </p>
          <p v-if="scenario === 2">
            Bij scenario 2 is MaaS extra gestimuleerd door attracties of
            winkels. In plaats van een apart arrangement van één attractie met
            vervoer zijn services, producten en toegangskaartjes gecombineerd
            meer MaaS. Het gebruik van MaaS zal het verkeer naar winkels en
            verschillende soorten recreatie kunnen beïnvloeden.
          </p>
          <p v-if="scenario === 3">
            Bij scenario 3 is MaaS extra gestimuleerd door overheden. De focus
            is bij dit scenario gericht op beleid om bewoners van binnensteden
            een andere keuze te geven om te reizen. Overheden kunnen
            bijvoorbeeld een parkeervergunning vervangen door een MaaS
            abonnement, maar ook door in andere uitdagingen MaaS te
            implementeren in het verkeerssysteem kan de bereikbaarheid en
            leefbaarheid beïnvloedt worden in binnensteden.
          </p>
          <p v-if="scenario === 4">
            Bij scenario 4 is MaaS extra gestimuleerd door overheden. De focus
            is bij dit scenario gericht op beleid om bewoners van buitengebieden
            een andere keuze te geven om te reizen. Overheden kunnen
            bijvoorbeeld MaaS aanbieden aan bewoners die flexibeler willen
            reizen door een deel-auto te nemen in plaats van openbaar vervoer,
            maar ook door in andere uitdagingen MaaS te implementeren in het
            verkeerssysteem kan de bereikbaarheid en leefbaarheid beïnvloedt
            worden in de buitengebieden.
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
        <!-- Buttons for Effect -->
        <div align="center">
          <v-btn v-on:click="scenario = 0;" color="pink" class="top-cut">
            Basis Scenario
          </v-btn>
          <v-btn v-on:click="scenario = 1;" color="pink">
            Bedrijven & Werkgevers Stimuleren
          </v-btn>
          <v-btn v-on:click="scenario = 2;" color="pink">
            Winkels & Attracties Stimuleren
          </v-btn>
          <v-btn v-on:click="scenario = 3;" color="pink">
            Binnenstad Stimuleren (OV)
          </v-btn>
          <v-btn v-on:click="scenario = 4;" color="pink" class="bottom-cut">
            Buitengebied Stimuleren (Deel-auto)
          </v-btn>
        </div>
      </div>
      <!-- Map side of the webtool -->
      <div id="content" class="bg-white col-lg-8 col-md-12  col-xxl-9 col-xl-9">
        <!-- modal splits -->
        <div class="col-md-8 offset-md-2">
          <div class="chart">
            <GChart
              class="pieChart"
              type="PieChart"
              :data="defaultdata"
              :options="defaultOptions"
              :resizeDebounce="500"
            />
          </div>
        </div>

        <hr v-if="scenario !== null" noshade="black" />

        <div class="row">
          <div class="col-md-6">
            <div class="chart" v-if="scenario === 0">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S0OVData"
                :options="S0OVOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 1">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S1OVData"
                :options="S1OVOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 2">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S2OVData"
                :options="S2OVOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 3">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S3OVData"
                :options="S3OVOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 4">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S4OVData"
                :options="S4OVOptions"
                :resizeDebounce="500"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="chart" v-if="scenario === 0">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S0OVMaaSData"
                :options="S0OVMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 1">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S1OVMaaSData"
                :options="S1OVMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 2">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S2OVMaaSData"
                :options="S2OVMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 3">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S3OVMaaSData"
                :options="S3OVMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 4">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S4OVMaaSData"
                :options="S4OVMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
          </div>
        </div>

        <hr v-if="scenario !== null" noshade="black" />

        <div class="row">
          <div class="col-md-6">
            <div class="chart" v-if="scenario === 0">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S0AutoData"
                :options="S0AutoOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 1">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S1AutoData"
                :options="S1AutoOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 2">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S2AutoData"
                :options="S2AutoOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 3">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S3AutoData"
                :options="S3AutoOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 4">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S4AutoData"
                :options="S4AutoOptions"
                :resizeDebounce="500"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="chart" v-if="scenario === 0">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S0AutoMaaSData"
                :options="S0AutoMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 1">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S1AutoMaaSData"
                :options="S1AutoMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 2">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S2AutoMaaSData"
                :options="S2AutoMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 3">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S3AutoMaaSData"
                :options="S3AutoMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
            <div class="chart" v-else-if="scenario === 4">
              <GChart
                class="pieChart"
                type="PieChart"
                :data="S4AutoMaaSData"
                :options="S4AutoMaaSOptions"
                :resizeDebounce="500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import About from "../components/About";

// @ is an alias to /src
export default {
  components: {
    About
  },
  data: function() {
    return {
      dialog_about: false,
      scenario: null,
      defaultdata: [
        ["Catergorie", "Aantal"],
        ["Auto", 3367264],
        ["vracht", 173142],
        ["Ov", 270184],
        ["Fiets", 2470437]
      ],
      defaultOptions: {
        title: "Modal Split - 2015",
        pieSliceText: "none",
        tooltipText: "percentage"
      },
      S0OVData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3224216],
        ["Vracht", 173142],
        ["Ov", 257060],
        ["Fiets", 2348125],
        ["MaaS", 278484]
      ],
      S0OVOptions: {
        title: "OV-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S0OVMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 25315],
        ["Taxi", 27089],
        ["OV", 76603],
        ["Deelfiets", 115407],
        ["Overige", 34067]
      ],
      S0OVMaaSOptions: {
        title: "OV-Hoog MaaS",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S0AutoData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3201181],
        ["Vracht", 173142],
        ["Ov", 255024],
        ["Fiets", 2328106],
        ["MaaS", 323573]
      ],
      S0AutoOptions: {
        title: "Auto-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S0AutoMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 29415],
        ["Taxi", 31450],
        ["OV", 88931],
        ["Deelfiets", 134206],
        ["Overige", 39569]
      ],
      S0AutoMaaSOptions: {
        title: "Auto-Hoog MaaS",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S1OVData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3185780],
        ["Vracht", 173142],
        ["Ov", 253871],
        ["Fiets", 2365552],
        ["MaaS", 302684]
      ],
      S1OVOptions: {
        title: "OV-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S1OVMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 45965],
        ["Taxi", 23789],
        ["OV", 98685],
        ["Deelfiets", 134263],
        ["Overige", 0]
      ],
      S1OVMaaSOptions: {
        title: "OV-Hoog MaaS",
        pieSliceText: "none",
        sliceVisibilityThreshold: 0,
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S1AutoData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3156913],
        ["Vracht", 173142],
        ["Ov", 246513],
        ["Fiets", 2348494],
        ["MaaS", 351123]
      ],
      S1AutoOptions: {
        title: "Auto-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S1AutoMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 53260],
        ["Taxi", 27571],
        ["OV", 114391],
        ["Deelfiets", 155900],
        ["Overige", 0]
      ],
      S1AutoMaaSOptions: {
        title: "Auto-Hoog MaaS",
        pieSliceText: "none",
        sliceVisibilityThreshold: 0,
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S2OVData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3102354],
        ["Vracht", 173142],
        ["Ov", 247697],
        ["Fiets", 2274612],
        ["MaaS", 448150]
      ],
      S2OVOptions: {
        title: "OV-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S2OVMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 86214],
        ["Taxi", 75607],
        ["OV", 121780],
        ["Deelfiets", 138204],
        ["Overige", 26346]
      ],
      S2OVMaaSOptions: {
        title: "OV-Hoog MaaS",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S2AutoData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3058626],
        ["Vracht", 173142],
        ["Ov", 246513],
        ["Fiets", 2280627],
        ["MaaS", 522121]
      ],
      S2AutoOptions: {
        title: "Auto-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S2AutoMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 100437],
        ["Taxi", 88062],
        ["OV", 141831],
        ["Deelfiets", 161086],
        ["Overige", 30704]
      ],
      S2AutoMaaSOptions: {
        title: "Auto-Hoog MaaS",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S3OVData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3116416],
        ["Vracht", 173142],
        ["Ov", 247697],
        ["Fiets", 2274612],
        ["MaaS", 469161]
      ],
      S3OVOptions: {
        title: "OV-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S3OVMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 61439],
        ["Taxi", 52772],
        ["OV", 170356],
        ["Deelfiets", 161600],
        ["Overige", 22994]
      ],
      S3OVMaaSOptions: {
        title: "OV-Hoog MaaS",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S3AutoData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3076535],
        ["Vracht", 173142],
        ["Ov", 244243],
        ["Fiets", 2242917],
        ["MaaS", 544192]
      ],
      S3AutoOptions: {
        title: "Auto-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S3AutoMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 71251],
        ["Taxi", 61172],
        ["OV", 197486],
        ["Deelfiets", 187605],
        ["Overige", 26678]
      ],
      S3AutoMaaSOptions: {
        title: "Auto-Hoog MaaS",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S4OVData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3083770],
        ["Vracht", 173142],
        ["Ov", 246060],
        ["Fiets", 2249616],
        ["MaaS", 528442]
      ],

      S4OVOptions: {
        title: "OV-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S4OVMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 110746],
        ["Taxi", 83798],
        ["OV", 116360],
        ["Deelfiets", 217538],
        ["Overige", 0]
      ],
      S4OVMaaSOptions: {
        title: "OV-Hoog MaaS",
        pieSliceText: "none",
        sliceVisibilityThreshold: 0,
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      },
      S4AutoData: [
        ["Catergorie", "Aantal"],
        ["Auto", 3038224],
        ["Vracht", 173142],
        ["Ov", 242321],
        ["Fiets", 2213580],
        ["MaaS", 613762]
      ],
      S4AutoOptions: {
        title: "Auto-Hoog",
        pieSliceText: "none",
        tooltipText: "percentage",
        slices: {
          4: { offset: 0.2 }
        }
      },
      S4AutoMaaSData: [
        ["Catergorie", "Aantal"],
        ["Deelauto", 128590],
        ["Taxi", 97264],
        ["OV", 135069],
        ["Deelfiets", 252839],
        ["Overige", 0]
      ],
      S4AutoMaaSOptions: {
        title: "Auto-Hoog MaaS",
        pieSliceText: "none",
        sliceVisibilityThreshold: 0,
        tooltipText: "percentage",
        slices: {
          1: { color: "#0000ff" },
          2: { color: "#FF9900" },
          3: { color: "#109618" },
          4: { color: "#d0d0d0" }
        }
      }
    };
  },
  mounted() {
    NProgress.done();
  }
};
</script>
