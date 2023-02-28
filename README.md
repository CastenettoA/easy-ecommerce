# Easy Commerce
Un ecommerce di prodotti creato in Angular che utilizza le Shopify Rest API.

Link al sito pubblico: http://easy-c.netlify.com/

![homepage](https://i.ibb.co/wr2wXr1/Easy-Commerce-hp.png)

### Come installare il progetto in locale
1. **clonare** il repo in locale
2. installare le dipendenze con **npm install**
3. servire il progetto con **ng serve**
4. andare su **http://localhost:4200/**
5. Divertiti 😁⭐✨✨✨


### Caratteristiche tecniche
* SPA in Angular che mostra un elenco di prodotti recuperati tramite le API REST di Shopify. Cliccando sulla categoria si apre la categoria specifica che elenca i prodotti.
* E' possibile ordinare i prodotti **alfabeticamente** e per **data di creazione**. Nella stessa pagina è presente la paginazione e cliccando su un prodotto si visualizza il dettaglio del prodotto. Riaggiornando la pagina i filtri vengono mantenuti. Ciò facilita la navigazione e la condivisione della pagina con amici
* Nel dettaglio del prodotto sono visibili i prodotti correlati della stessa categoria.

### Sulla struttura del progetto Angular
* Per strutturare e organizzare il codice ho diviso il codice in componenti ed ho utilizzato questa struttura per la divisione della logica principale:  /components /interfaces /pipes /services
* E' stato scelto Material come base del progetto ed è stato utilizzato per vari elementi della UI come Icone, Chips, Card, Paginazione e altro ancora.
* Il **servizio** productService si occupa di effettuare le chiamate REST e ricevere i dati di collezioni e prodotti. In questo file è presente anche un collection observable utilizzato per evitare di ripetere chiamate REST non necessarie.
* Dove possibile il codice è stato separato in componenti ed è stato diviso in funzione cercando di evitare grossi blocchi di codice, sforzandomi di seguire quindi la pratica consigliata da angular di una funzione per operazione.
* I test del codice sono stati ommessi per poter consegnare tutto in 1 settimana senza dilungarmi troppo con lo sviluppo.

### Sull'automazione
* Per velocizzare la creazione del progetto e soprattutto per automatizzare task meccaniche è stato scelto di utilizzare **Github Copilot e Chat-GPT**.
* Il progetto github è collegato a **Netlify**. Ciò consente una pubblicazione automatica della SPA ad ogni push a questo link (http://easy-c.netlify.com/) e l'esecuzione automatica del test **LightHouse**
![LightHouse](https://i.ibb.co/hZ70JVz/Deploy-details-easy-c.png)

### Sviluppi futuri
Il progetto è stato sviluppato in 7 giorni. Nel caso riprendessi lo sviluppo della SPA partirei probabilmente da qui:
1. Migliorare l'UI su Mobile
2. Refactoring del codice: diminuire il codice duplicato, dividere maggiormente il codice in funzioni e componenti
3. Utilizzare meno chiamate API e più Obsevables condivisi come stato dell'applicazione
4. Ottimizzazione seo: meta tag description, alt nelle immagini.






# Angular info and how to launch the project locally.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
