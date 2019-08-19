<template>
  <div>
    <h6>Inleiding: wat is MaaS?</h6>
    <p>
      Mobility as a Service (MaaS) is een mobiliteitsconcept waarin reizigers
      hun ritten kunnen plannen, kiezen en betalen via één serviceprovider.
      Omdat MaaS kan bijdragen in de bereikbaarheids- en duurzaamheidsopgave,
      verschijnt dit concept steeds vaker op de agenda van beleidsmakers
      Mobiliteit en de politiek. De MaaS-potentiescan is ontwikkeld door
      DAT.Mobility en Goudappel Coffeng ter ondersteuning van beleidsmakers.
    </p>
    <h6>Werking: wat doet de MaaS potentiescan?</h6>
    <p>
      De MaaS-potentiescan geeft de gebruiker inzicht in de potentie van een
      gegeven MaaS propositie door alle inwoners in Nederland afzonderlijk de
      kans te bepalen dat zij die MaaS propositie als abonnement zullen afnemen.
      Het model gebruikt hiervoor een gedragsmodel beschreven in Ho et al (2017)
      wat de MaaS propositie afweegt tegen het huidig mobiliteitsgedrag voor een
      128tal persoonstypen. Hiertoe wordt de population synthesizer gebruikt uit
      Brederode en Waanders (2013) die op CBS buurt niveau voor geheel Nederland
      de 128 persoonstypen onderscheidt. Deze persoonstypen variëren in
      leeftijd, het aantal kinderen in het huishouden, de frequentie van het
      autogebruik en het type auto, allen variabelen die op basis van stated
      preference onderzoek significant blijken te zijn voor de aanschaf van een
      MaaS-abonnement. Het huidig mobilititeitsgedrag wordt afgeleid van de
      bereikbaarheid uit digitale netwerken en uit GSM-data (Vodafone) afgeleide
      vervoerwijze- en bestemmingskeuzen vertaald naar het niveau van de ca
      13.000 CBS-buurten in Nederland. Na toepassing van het gedragsmodel op de
      MaaS propositie en de GSM data geeft de MaaS potentiescan de kans op de
      aanschaf van een abonnement voor elk van de 128 persoonstypen binnen elk
      van de 13.000 CBS buurten.
    </p>
    <br />
    <img src="../assets/img/werking_maas.png" class="img-fluid werking" />
    <br /><br />
    <h6>Toepassing:</h6>
    <p>
      De gebruiker definieert een te onderzoeken MaaS propositie als een
      combinatie van abonnementsvorm (mobiliteitsbundel of betalen naar
      gebruik), maandelijkse kosten, het aantal dagen openbaar vervoer gebruik
      in bundel, het aantal uren autogebruik in bundel en/of het tarief voor
      deelautogebruik en of het mogelijk is om deelauto’s op de bestemming
      achter te laten. De laatstgenoemde variabele is een proxy voor
      zelfrijdende voertuigen. Nadat op de knop ‘bereken’ is gedrukt en de
      resultaten beschikbaar zijn wordt de door de MaaS potentiescan
      uitgerekende kans op aanschaf van de propositie of het daaruit volgende
      absolute aantal abonnementhouders per CBS-buurt op de interactieve kaart
      zichtbaar gemaakt. Door op een CBS-buurt te clicken wordt de verdeling van
      abonnementhouders over de persoonstypen in die CBS-buurt zichtbaar.
    </p>
    <h6>Aandachtspunten bij interpretatie van de resultaten:</h6>
    <ul>
      <li>
        Houdt er bij het interpreteren van relatieve resultaten rekening mee dat
        de MaaS potentiescan aanneemt dat de MaaS propositie voor alle buurten
        hetzelfde niveau van bereikbaarheid (‘level of service’) levert, terwijl
        in het huidig mobiliteitsgedrag op basis van de GSM data wel ruimtelijke
        diversiteit zit. Daarnaast is het huidig mobiliteitsgedrag gebaseerd op
        GSM data van alleen de in Nederland gemaakte ritten. Hierdoor laten de
        relatief slecht bereikbare buurten (zoals de waddeneilanden) of buurten
        die een relatief sterke relatie met het buitenland hebben (zoals de
        Lutte en Bergen op Zoom) relatief hoge MaaS potentie zien.
      </li>
      <li>
        Houdt er bij het interpreteren van absolute resultaten rekening mee dat
        het aantal inwoners en de grootte van CBS buurten sterk varieren! Een
        buurt met veel potentie kan dus inhouden dat er veel inwoners in de
        buurt wonen (hoge dichtheid en/of grote buurt).
      </li>
    </ul>
    <h6>About</h6>

    <ul>
      <li>
        De back-end achter de MaaS potentiescan is ontwikkeld door DAT.Mobility.
      </li>
      <li>
        De MaaS potentiescan website is ontwikkeld door Coen de Rijter en
        Jeffrey Walst in het kader van de Comakership Smart World.
      </li>
      <li>
        Voor meer informatie of vragen? Mail dan naar
        <a href="mailto:info@maaspotentiescan.nl">info@maaspotentiescan.nl</a>.
      </li>
    </ul>

    <h6>Referenties</h6>
    <ul>
      <li>
        Koopal, R., Brederode, L., Boomsma, R., 2018. MaaS-potentiescan voor
        heel Nederland op basis van gsm-data, in: ResearchGate. Presented at the
        Colloqium voor verkeersplanologisch speurwerk, Amersfoort.
      </li>
      <br />
      <li>
        Brederode, L., Waanders, M., 2013. Vergelijking kwaliteit synthetische
        populatieschatting van LMS/NRM met andere veelgebruikte methoden.
        Presented at the Colloquium Vervoersplanologisch Speurwerk, Rotterdam.
      </li>
      <br />
      <li>
        Ho, C.Q., Hensher, D.A., Mulley, C., Wong, Y.Z., 2017. Prospects for
        switching out of conventional transport services to mobility as a
        service subscription plans–A stated choice study.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Info"
};
</script>
