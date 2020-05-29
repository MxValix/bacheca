//inizializzo le variabili globali

//il contatore mi serve per tenere traccia dell'id corrente
let counter = 0;
//mi serve per capire quante note sono state create, e come indice del mio array
let n = 0;
/* 
  fontSize mi serve per salvarmi il valore relativa alle dimensioni del font, inizializzato a 0
  se è 0 o null, allora prende il valore di default, altrimenti btns per small, btnm per medium e btnl per large
*/
let fontSize = 0;
/* 
    bgColor viene utilizzato in modo simile a fontSize, inizializzato a 0, 
    se gli viene associato un valore, tramite input color, allora assumere il valore esadecimale corrispondente
*/
let bgColor = 0;

//booleano che in ogni passo del codice mi dice se sto effettuando l'inserimento di una nuova nota o una modifica
let modifica = false;

// prendo l'id dall'elemento su cui chiamo la funzione e restituisco l'id numerico
function splitIdFromThis(splitId) {
    let id = $(splitId).attr("id");
    let salvaId = id.split("-");
    id = salvaId[1];
    return id;
}

/*
    prendo l'id numerico dell'elemento textarea che mi interessa ed effettuo le operazioni 
    di cui ho bisogno, restituisco txtArea alla funzione jQuery chiamante
*/
function setTxtArea(id) {
    let txtArea = "#txt-" + id;
    //se modifica è falso, allora significa che la funzione jQuery chiamante è "salva"
    if (modifica == false) {
        //disabilito la possibilità di poter scrivere nella textarea
        $(txtArea).prop("disabled", true);
        //do una dimensione del 75% di altezza di tutta la note alla textarea
        $(txtArea).css("height", "75%");
    } else {
        //in questo caso significa che la funzione jQuery chiamante è "modifica"
        //riabilito la textArea in modo tale da poter effettuare modifiche alla nota
        $(txtArea).prop("disabled", false);
        /* riduco la dimensione della textarea al 40% sulla dimensione totale per fare spazio
          ai bottoni per la dimensione del font e del colore */
        $(txtArea).css("height", "40%");
    }
    //se fontSize è = 0 allora il valore della dimensione del font non è cambiata, non devo far nulla
    if (fontSize != 0) {
        //se fontSize è diverso da 0, verifico qual è il suo valore
        let setSize = 0;
        if (fontSize == "btns") setSize = "10px";
        else if (fontSize == "btnm") setSize = "18px";
        else setSize = "25px";
        // dopo aver salvato il valore scelto dall'utente in setSize, procedo ad inserirlo nel css della nota corrispondente
        $(txtArea).css("font-size", setSize);
        //re-inizializzo fontSize a 0 per gli inserimenti e le modifiche successive
        fontSize = 0;
    }
    //molto simile a fontSize, se bgColor è zero allora il colore di sfondo della nota resta quello assegnato di default
    if (bgColor != 0) {
        // se bgColor è diverso da 0, allora recupero l'id di col (il div contenitore di tutta la nota)
        let colId = "#col-" + id;
        //assegno lo stesso colore di sfondo sia al div con id col-idcorrente, sia alla sua textarea
        $(colId).css("background-color", bgColor);
        $(txtArea).css("background-color", bgColor);
        //re-inizializzo bgColor a 0 per gli inserimenti e le modifiche successive
        bgColor = 0;
    }
    //come valore di ritorno passo l'id alfanumerico della textarea interessata
    return txtArea;
}
//la funzione showHideSalva, a cui passo l'id, in base al booleano di modifica, mostra e nasconde dei bottoni
function showHideSalva(id) {
    //inizializzo delle variabili contenenti gli id alfanumerici interessati, a partire dall'id numerico
    let salvaId = "#salva-" + id;
    let fontDiv = "#fontdiv-" + id;
    let colorDiv = "#colordiv-" + id;
    //se la modifica è false, allora sto salvando, ed entro nella condizione
    if (modifica == false) {
        //nascondo gli elementi per la modifica della dimensione del font e del colore di background
        $(fontDiv).css("visibility", "hidden");
        $(colorDiv).css("visibility", "hidden");
        //nascondo il bottone "salva"
        $(salvaId).hide();
    }
    //se la modifica è true, allora sto modificando, ed entro in questa condizione
    else {
        //inizializzo localmente queste variabili perché nel caso di "salva" non mi interessano
        let modificaBtn = "#modifica-" + id;
        let eliminaBtn = "#elimina-" + id;
        //rendo visibili gli elementi relativi alle dimensioni del font e la scelta del colore di background
        $(fontDiv).css("visibility", "visible");
        $(colorDiv).css("visibility", "visible");
        //nascondo i bottoni relativi alla modifica e cancellazione della nota
        $(modificaBtn).hide();
        $(eliminaBtn).hide();
        //modifico il testo del bottone salva da "salva nota" a "salva modifiche", poiché in questo caso la nota già esisteva
        $(salvaId).text("Salva modifiche");
        //mostro di nuovo il bottone salva, con il nuovo testo
        $(salvaId).show();
    }
}

/* 
    funzione che scorre l'array di colori, lo assegna ad una variabile, in modo tale da avere sempre colori diversi tra le note
    e ritorna il colore in esadecimale che sarà impostato di default alla nuova nota creata
*/
function randomColor() {
    let colori = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#b7ded2"];
    colore = colori[n];
    return colore;
}

//questa funzione, chiamata da "salva", mi crea una nuova nota, a partire dall'id passato dalla funzione chiamante
function creaDiv(id) {
    //la variabile colore salva il valore esadecimale del colore della nota
    let colore = randomColor();
    /*
        la variabile salva il valore della template string (sequenza di caratteri delimitata da backtick),
        il div "padre" è quello relativo alla nota, al cui interno ha la textarea, il div con gli elementi
        di fontdiv (per la dimensione del font della singola nota), il div di colorDiv con gli elementi di colordiv
        (per il colore di sfondo della singola nota) ed il bottone salva, per salvare la nota con le eventuali preferenze
    */
    aggiungiDiv = `   
        <div class="col-sm-4" id="col-${id}" 
            style="background-color:${colore}; border:3px solid white;border-collapse: collapse">
            <textarea class="txtarea mt-3" id="txt-${id}" 
                style="background-color:${colore}"></textarea>
            <div class="btn-group d-block pb-2" id="fontdiv-${id}">            
                <button class="fsize" id="btns-${id}">
                    <span class="ssize" id="spans-${id}" style="font-size:10px">Abc</span>
                </button>
                <button class="fsize" id="btnm-${id}">
                    <span class="ssize" id="spanm-${id}" style="font-size:18px">Abc</span>
                </button>
                <button class="fsize" id="btnl-${id}">
                    <span class="ssize" id="spanl-${id}" style="font-size:25px">Abc</span>
                </button>
            </div>
            <div class="form-group row" id="colordiv-${id}">
                <label for="cambiacolore${id}" class="col-4 col-form-label">Sfondo:</label>
                <input type="color" id="cambiacolore${id}" value="#563d7c" class="cambiacolore col-6 offset-1 form-control">
            </div>
            <button type="button" id="salva-${id}" class="btn btn-sm bg-success text-white text-uppercase salva">
                Salva nota
            </button>
        </div> `;
    //ritorna la template string alla funzione chiamante
    return aggiungiDiv;
}

//questa funzione, a cui passo l'id corrente e il valore della textArea corrente aggiunge i bottoni modifica ed elimina
function aggiungiModificaElimina(id, txtArea) {
    let aggiungiModificaElimina = ` 
        <button type="button" id="modifica-${id}" 
            class="btn btn-sm bg-success text-white text-uppercase modifica">
            Modifica
        </button>
        <button type="button" id="elimina-${id}" 
            class="btn btn-sm bg-danger text-white text-uppercase elimina">
            Elimina
        </button>`;
    $(aggiungiModificaElimina).insertAfter(txtArea);
}



$(document).ready(function () {

    //bottone definito nel documento HTML che viene premuto dall'utente per creare una nuova nota
    $("#plus-circle-btn").click(function (event) {
        event.preventDefault();
        //salva nella variabile idCorrente il valore della variabile globale counter
        idCorrente = counter;
        //incrementa counter di uno
        counter++;
        //mi creo l'id della textarea corrente
        let txtArea = "#txt-" + idCorrente;
        //chiamo la funzione creaDiv a cui passo l'idCorrente (numerico), che mi ritorna la template string da inserire nel documento HTML
        let aggiungiDiv = creaDiv(idCorrente);
        //metto il contenuto della nuova nota nel mio div con id "#aggiungi-qui", ad ogni nuova nota, si aggiunge un figlio al div
        $("#aggiungi-qui").append(aggiungiDiv);
        //con questo mi garantisco che ogni volta che si crea una nuova nota, la textarea è già pronta a ricevere l'input dell'utente
        $(txtArea).focus();
        /* 
            se la mia variabile globale n è uguale a 5, significa che ho raggiunto il limite di note possibili da aggiungere 
            ed allora nascondo il bottone che mi permette di creare una nuova nota
        */
        if (n == 5) $("#plus-circle-btn").hide();
        //prima di uscire dalla funzione di creazione di una nuova nota, incremento il contatore n di 1
        n++;
    })

    $(document).on("click", ".salva", function () {
        let id = splitIdFromThis(this);
        let txtArea = setTxtArea(id);
        showHideSalva(id);
        aggiungiModificaElimina(id, txtArea);
    });

    $(document).on("click", ".elimina", function () {
        $(this).parent().remove();
        n = n - 1;
        if (n == 5) $("#plus-circle-btn").show();
    });

    $(document).on("click", ".modifica", function () {
        modifica = true;
        let id = splitIdFromThis(this);
        let txtArea = setTxtArea(id);
        showHideSalva(id);
        idCorrente = id;
        $(txtArea).focus();
        modifica = false;
    });

    $(document).on("click", ".fsize", function () {
        let id = $(this).attr("id");
        let fsizeId = id.split("-");
        fontSize = fsizeId[0];
    })

    $(document).on("change", ".cambiacolore", function () {
        let value = $(this).val();
        bgColor = value;
    })

})
