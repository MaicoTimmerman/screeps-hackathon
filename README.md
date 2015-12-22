# Screeps hackathon framework
## Framework forken

* Maak een account aan op GitHub als je dat nog niet hebt.
* Ga naar onze repository: https://github.com/viaict/screeps-hackathon
* Druk op ‘Fork’ rechts bovenin.
* Je hebt nu een kopie van het framework in je eigen repository. Nu moet je het nog lokaal op je PC krijgen.

## Eigen repository clonen
Op de pagina van je eigen repository staat rechts-onderin een tekstvak met ‘HTTPS clone URL’ erboven. Kopieer dit en voer vervolgens dit uit in je terminal:

```sh
git clone <gekopiëerde url>
```

Er is nu een nieuwe map ‘screeps-hackathon’ gemaakt in de map waarin je het commando uitgevoerd hebt. In deze map staat nu alleen het framework. Hierin kun je vervolgens wijzigingen gaan maken.

## Code pushen vanaf local naar eigen screeps account

#### Getting Started
De plugin vereist Grunt `~0.4.5`

Installeer de grunt-screeps plugin in je nieuwe lokale screeps map.

```shell
npm install grunt-screeps
```

##### Gebruik

**Gruntfile.js:**
```js
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'YOUR_EMAIL',
                password: 'YOUR_PASSWORD',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}
```

Nu kun je het volgende commando gebruiken om de code vanaf de `dist` map naar je Screeps account (`default`) te pushen.
```
grunt screeps
```

## Wijzigingen committen
Het is handig om zo af en toe een commit te doen. Je maakt dan als het ware een soort punt in de geschiedenis van je code waar je eventueel naar terug kunt gaan als je iets fout doet. Je kan dit doen door de volgende commando’s uit te voeren:

``` sh
git add <bestanden>
git commit -m <commit bericht>
git push
```

Hierbij is `<bestanden>` een lijst van bestanden (gescheiden door spaties) waarvan je de wijzigingen wil committen. `<commit bericht>` is het bericht wat je aan je commit meegeeft. Het is gebruikelijk om hierin een samenvatting te geven van wat je wijzigingen zijn. Het laatste commando zorgt dat je wijzigingen ook daadwerkelijk op GitHub worden gezet.

## Code doorgeven aan Onderwijscommissie
Het doorgeven van de code aan de onderwijscommissie gaat ook via GitHub. Zorg dat al je wijzigingen die relevant zijn op je repository op GitHub staat volgens bovenstaande beschrijving.

Klik vervolgens rechts op de pagina op ‘Pull requests’, vervolgens op ‘New pull request’ en daarna op ‘compare across forks’. Stel het als volgt in:

* **base fork**: 	viaict/screeps-hackaton
* **base**: 		(voornaam)-(achternaam)
* **head fork**:	je eigen repository
* **compare**:	master

Druk hierna op ‘Create pull request’, zet er nog een nuttig bericht bij en druk er dan weer op.
