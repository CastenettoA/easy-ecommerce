# Easy Commerce
Un ecommerce di prodotti creato in Angular che utilizza le Shopify Rest API.

Link al sito pubblico: http://easy-c.netlify.com/

![homepage](https://i.ibb.co/wr2wXr1/Easy-Commerce-hp.png)


### Caratteristiche tecniche
* SPA in Angular che mostra un elenco di prodotti. Cliccando sulla categoria si apre la categoria specifica che elenca i prodotti
* E' possibile ordinare i prodotti **alfabeticamente** e per **data di creazione**. Nella stessa pagina è presente la paginazione e cliccando su un prodotto si visualizza il dettaglio del prodotto
* Nel dettaglio del prodotto sono visibili i prodotti correlati della stessa categoria.

### Sulla struttura del progetto Angular
* Per strutturare e organizzare il codice ho diviso il codice in componenti ed ho utilizzato questa struttura per la divisione della logica principale:  /components /interfaces /pipes /services
* E' stato scelto Material come base del progetto ed è stato utilizzato per vari elementi della UI come Icone, Chips, Card, Paginazione e altro ancora.
* I test sono stati ommessi per poter consegnare tutto in 1 settimana.

### Sull'automazione
* Per velocizzare la creazione del progetto e soprattutto per automatizzare task meccaniche è stato scelto di utilizzare Github Copilot e Chat-GPT quando possibile.
* Il progetto github è collegato a **netlify** ciò permette una pubblicazione automatica dell'applicativo ad ogni push (http://easy-c.netlify.com/) e l'esecuzione di 














. Come ho scelto di strutturare il codice?
. Quanta automazione e buone pratiche ho adottato?





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
