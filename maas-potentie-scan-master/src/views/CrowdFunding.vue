<template>
  <div class="crowdfunding">
    <div class="offset-xs-1 col-xs-10 col-md-6">
      <div class="details__wrapper">
        <div class="basic-details">
          <div class="close">
            <router-link to="/"> <v-icon>close</v-icon> </router-link>
          </div>

          <h2 class="basic-details__title">
            Onderzoek: MaaS-potentie in beeld én in uw verkeersmodel
          </h2>
          <span class="basic-details__date text-italic">23 oktober 2018</span>
          <div class="basic-details__body js-basic-detail">
            <div>
              Mobility-as-a-Service (MaaS) wordt gezien als een interessante
              optie om mobiliteit op een slimmere manier te organiseren
              (goedkoper, meer keuze voor de reiziger, minder ruimtebeslag). We
              weten echter op dit moment nog te weinig voor welk type reizigers
              MaaS-concepten inte­ressant zijn en of zij het ook daadwerkelijk
              gaan gebruiken. Daarom is het ook moeilijk in te schatten wat de
              effecten zijn. Wij willen samen met u een onderzoek starten om de
              volgende beleidsvragen te beantwoorden:
            </div>
            <ul>
              <li>Voor welke type reizigers is MaaS interessant?</li>
              <li>
                Waar wonen potentiële MaaS-gebruikers en hoe verplaatsen zij
                zich?
              </li>
              <li>Hoe kan ik met MaaS rekenen in mijn eigen verkeersmodel?</li>
              <li>
                Welke MaaS concepten versterken mijn beleid en welke juist niet?
              </li>
            </ul>
            <div><strong>Hoe pakken we het aan?</strong></div>
            <div>
              In een aantal andere landen zijn grootschalige enquêtes uitgevoerd
              om de potentie van MaaS goed in te schatten voor verschillende
              type reizigers. Voor Nederland ontbreekt dit beeld. Deze lacune
              willen wij opvullen door:
            </div>
            <ul>
              <li>
                Het bundelen van state-of-the art internationale kennis als het
                gaat om MaaS - relevant voor de Nederlandse context
              </li>
              <li>
                Een landelijke enquête uitvoeren om de potentie van MaaS te
                onderzoeken voor verschillende type reizigers (stated preference
                onderzoek).
              </li>
            </ul>
            <p>
              Dit geeft ons voor verschillende motieven en reizigersprofielen
              inzicht in: de bereidheid van mensen om MaaS-abonnementen af te
              nemen. Wat zijn de belangrijkste motivaties en belemmeringen om
              wel of niet van MaaS gebruik te maken? Hoe zit het met de
              veranderbereidheid? Op basis van de data leiden we gedragsmodellen
              af die het mogelijk maken de potentie voor MaaS in uw regio in te
              schatten: de MaaS-potentiescan. Deze scan maakt een inschatting
              wie in uw regio van een bepaalde MaaS concept gebruikt gaat maken
              en waar deze mensen wonen. Deze scan is ook te integreren in
              strategische verkeersmodellen, waardoor het mogelijk wordt
              mobiliteitseffecten van MaaS in te schatten.
            </p>
            <p><strong>Waarom is het interessant om mee te doen?</strong></p>
            <ul>
              <li>
                <span>
                  Beperkte deelnamekosten door gezamenlijk opdrachtgeverschap
                  via ‘crowdfunding’. Indicatie van de kosten is € 10.000,- bij
                  tien partijen die meedoen
                </span>
              </li>
              <li>
                Toepassing van de MaaS-potentiescan in uw eigen strategische
                verkeersmodel. De resultaten van het onderzoek worden daarmee
                direct toegepast in uw eigen regio
              </li>
              <li>
                Unieke mogelijkheid kennis op te bouwen. Kennisuitwisseling- en
                opbouw vormen de basis voor het onderzoek
              </li>
            </ul>
            <div>
              We hebben gemerkt dat er<span>&nbsp;</span
              ><a
                data-udi="umb://document/1c987a8696294ae4ba4904a712e2c9f0"
                href="https://www.goudappel.nl/actueel/veel-belangstelling-voor-the-next-step/"
                title="Veel belangstelling voor 'The Next Step'"
                ><b>veel interesse</b></a
              ><span>&nbsp;</span>is in dit onderzoek.
            </div>
            <div>
              Als u interesse heeft in dit onderzoek zijn wij natuurlijk ook
              bereid een en ander toe te lichten:&nbsp;
            </div>
            <ul>
              <li>Luuk Brederode | lbrederode@dat.nl | +31(0)6 27 36 98 30</li>
              <li>
                Thomas Straatemeier | tstraatemeier@goudappel.nl | +31(0)6 51 31
                58 29
              </li>
              <li>
                Marie-José Olde Kalter | mjoldekalter@goudappel.nl |&nbsp;
                +31(0)6 21 84 91 47
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import NProgress from "nprogress";

NProgress.done();
export default {
  mounted() {
    $(".popover").remove();
  }
};
</script>
