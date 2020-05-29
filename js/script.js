let counter = 0;
let n = -1;
let fontSize = 0;
let bgColor = 0;
let modifica = false;
let idMod = 0;
let colori = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#b7ded2", "#f6a6b2", "#f7c297", "#ffecb8", "#90d2d8"];

// prendo l'id dall'elemento su cui chiamo la funzione e restituisco l'id numerico
function splitIdFromThis(splitId){
    let id = $(splitId).attr("id");
    let salvaId = id.split("-");
    id = salvaId[1];
    return id;
}

/*
    prendo l'id numerico dell'elemento txtArea che mi interessa ed effettuo le operazioni di cui ho bisogno, restituisco txtArea alla funzione jQuery chiamante
*/
function setTxtArea(id){
    let txtArea = "#txt-" + id;
    //se modifica è falso, allora significa che la funzione jQuery chiamante è "salva"
    if (modifica==false){
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
    if (fontSize!=0){
        let setSize = 0;
        if (fontSize == "btns") setSize = "10px";
        else if (fontSize == "btnm") setSize = "18px";
        else setSize = "25px";
        $(txtArea).css("font-size", setSize);
        fontSize = 0;
    }
    if(bgColor!=0){
        let colId = "#col-" + id;
        $(colId).css("background-color", bgColor);
        $(txtArea).css("background-color", bgColor);
        bgColor = 0;
    }
    return txtArea;
}


$(document).ready(function () {
    
    $("#plus-circle-btn").click(function (event) {
        $("#fakebtn").trigger("click");
    })

    $("#fakebtn").click(function (event) {
        if (modifica==false){
            contatore = counter;
            counter++;
        }
        else contatore = idMod;
        event.preventDefault();
        if (n == 9) n = 0;
        else n++;
        let aggiungiDiv;
        if (modifica==false){
        
            aggiungiDiv =
            `   
            <div class="col-sm-4" id="col-${contatore}" 
            style="background-color:${colori[n]}; border:3px solid white;   border-collapse: collapse">
            <textarea class="txtarea mt-3" id="txt-${contatore}" 
                style="background-color:${colori[n]}"></textarea>
                    <div class="btn-group d-block pb-2" id="fontdiv-${contatore}">            
                        <button class="fsize" id="btns-${contatore}">
                            <span class="ssize" id="spans-${contatore}" 
                                style="font-size:10px">Abc</span>
                        </button>
                        <button class="fsize" id="btnm-${contatore}">
                            <span class="ssize" id="spanm-${contatore}" 
                                style="font-size:18px">Abc</span>
                        </button>
                        <button class="fsize" id="btnl-${contatore}">
                            <span class="ssize" id="spanl-${contatore}" 
                                style="font-size:25px">Abc</span>
                        </button>
                    </div>
                    <div class="form-group row" id="colordiv-${contatore}">
                        <label for="cambiacolore${contatore}" class="col-4 col-form-label">Sfondo:</label>
                        <input type="color" id="cambiacolore${contatore}" value="#563d7c" class="cambiacolore col-6 offset-1 form-control">
                    </div>
            <button type="button" id="salva-${contatore}" 
                class="btn btn-sm bg-success text-white text-uppercase salva">
                    Salva nota
            </button>
        </div>
            `;
        }
        else {
            modifica = false;

        }
        $("#aggiungi-qui").append(aggiungiDiv);
        let txtArea = "#txt-" + contatore;
        $(txtArea).focus();
    })

    $(document).on("click", ".salva", function () {
        let id = splitIdFromThis(this);        
        console.log(id);
        let txtArea = setTxtArea(id);
        let fontDiv = "#fontdiv-" + id;
        let colorDiv = "#colordiv-" + id;
        $(fontDiv).css("visibility", "hidden");
        $(colorDiv).css("visibility", "hidden");
        $(this).hide();

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
    });

    $(document).on("click", ".elimina", function () {
        $(this).parent().remove();
    });

    $(document).on("click", ".modifica", function () {
        modifica = true;
        let id =  splitIdFromThis(this);
        console.log(id);
        let txtArea = setTxtArea(id);
        let fontDiv = "#fontdiv-" + id;
        let colorDiv = "#colordiv-" + id;
        let modificaBtn = "#modifica-" + id;
        let eliminaBtn = "#elimina-" + id;
        let salvaId = "#salva-" + id;
        $(fontDiv).css("visibility", "visible");
        $(colorDiv).css("visibility", "visible");
        $(modificaBtn).hide();
        $(eliminaBtn).hide();
        $(salvaId).text("Salva modifiche");
        $(salvaId).show();
        idMod = id;
        $("#fakebtn").trigger("click");
    });

    $(document).on("click", ".fsize", function(){
        let id = $(this).attr("id");
        let fsizeId = id.split("-");
        fontSize = fsizeId[0];
    })

    $(document).on("change", ".cambiacolore", function(){
        let value = $(this).val();
        bgColor = value;
    })

    

})
