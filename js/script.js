//inizializzo le variabili globali

//il contatore mi serve per tenere traccia dell'id corrente
let counter = 0;
//mi serve per capire quante note sono state create, e come indice del mio array
let n = 0;
let fontSize = 0;
let bgColor = 0;
let modifica = false;

// prendo l'id dall'elemento su cui chiamo la funzione e restituisco l'id numerico
function splitIdFromThis(splitId) {
    let id = $(splitId).attr("id");
    let salvaId = id.split("-");
    id = salvaId[1];
    return id;
}

/*
    prendo l'id numerico dell'elemento txtArea che mi interessa ed effettuo le operazioni di cui ho bisogno, restituisco txtArea alla funzione jQuery chiamante
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
    if (fontSize != 0) {
        let setSize = 0;
        if (fontSize == "btns") setSize = "10px";
        else if (fontSize == "btnm") setSize = "18px";
        else setSize = "25px";
        $(txtArea).css("font-size", setSize);
        fontSize = 0;
    }
    if (bgColor != 0) {
        let colId = "#col-" + id;
        $(colId).css("background-color", bgColor);
        $(txtArea).css("background-color", bgColor);
        bgColor = 0;
    }
    return txtArea;
}

function showHideSalva(id) {
    let salvaId = "#salva-" + id;
    let fontDiv = "#fontdiv-" + id;
    let colorDiv = "#colordiv-" + id;
    if (modifica == false) {
        $(fontDiv).css("visibility", "hidden");
        $(colorDiv).css("visibility", "hidden");
        $(salvaId).hide();
    }
    else {
        let modificaBtn = "#modifica-" + id;
        let eliminaBtn = "#elimina-" + id;
        $(fontDiv).css("visibility", "visible");
        $(colorDiv).css("visibility", "visible");
        $(modificaBtn).hide();
        $(eliminaBtn).hide();
        $(salvaId).text("Salva modifiche");
        $(salvaId).show();
    }
}

function creaDiv(id) {
    let colore = randomColor();
    aggiungiDiv =
        `   
    <div class="col-sm-4" id="col-${id}" 
    style="background-color:${colore}; border:3px solid white;   border-collapse: collapse">
    <textarea class="txtarea mt-3" id="txt-${id}" 
        style="background-color:${colore}"></textarea>
            <div class="btn-group d-block pb-2" id="fontdiv-${id}">            
                <button class="fsize" id="btns-${id}">
                    <span class="ssize" id="spans-${id}" 
                        style="font-size:10px">Abc</span>
                </button>
                <button class="fsize" id="btnm-${id}">
                    <span class="ssize" id="spanm-${id}" 
                        style="font-size:18px">Abc</span>
                </button>
                <button class="fsize" id="btnl-${id}">
                    <span class="ssize" id="spanl-${id}" 
                        style="font-size:25px">Abc</span>
                </button>
            </div>
            <div class="form-group row" id="colordiv-${id}">
                <label for="cambiacolore${id}" class="col-4 col-form-label">Sfondo:</label>
                <input type="color" id="cambiacolore${id}" value="#563d7c" class="cambiacolore col-6 offset-1 form-control">
            </div>
    <button type="button" id="salva-${id}" 
        class="btn btn-sm bg-success text-white text-uppercase salva">
            Salva nota
    </button>
</div>
    `;
    return aggiungiDiv;
}

function aggiungiModificaElimina(id, txtArea) {
    let aggiungiModificaElimina = ` <button type="button" id="modifica-${id}" 
                                    class="btn btn-sm bg-success text-white text-uppercase modifica">
                                    Modifica
                                </button>
                                <button type="button" id="elimina-${id}" 
                                class="btn btn-sm bg-danger text-white text-uppercase elimina">
                                Elimina
                            </button>
                                 `
    $(aggiungiModificaElimina).insertAfter(txtArea);
}


function randomColor() {
    let colori = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#b7ded2"];
    colore = colori[n];
    return colore;
}

$(document).ready(function () {

    $("#plus-circle-btn").click(function (event) {
        event.preventDefault();
        idCorrente = counter;
        counter++;
        let txtArea = "#txt-" + idCorrente;
        let aggiungiDiv;
        aggiungiDiv = creaDiv(idCorrente);
        $("#aggiungi-qui").append(aggiungiDiv);
        $(txtArea).focus();
        if (n == 5) $("#plus-circle-btn").hide();
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
