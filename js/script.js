let counter = 0;
let n = -1;
let fontSize = 0;
let bgColor = 0;
let modifica = false;
let idMod = 0;
let colori = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#b7ded2", "#f6a6b2", "#f7c297", "#ffecb8", "#90d2d8"];
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
            $(fontDiv).css("visibility", "visible");
            $(colorDiv).css("visibility", "visible");
            let salvaId = "#salva-" + contatore;
            $(salvaId).show();

        }
        $("#aggiungi-qui").append(aggiungiDiv);
        let txtArea = "#txt-" + contatore;
        $(txtArea).focus();
    })

    $(document).on("click", ".salva", function () {
        let id = $(this).attr("id");
        let salvaId = id.split("-");
        id = salvaId[1];
        let txtArea = "#txt-" + id;
        let fontDiv = "#fontdiv-" + id;
        let colorDiv = "#colordiv-" + id;
        $(txtArea).prop("disabled", true);
        $(fontDiv).css("visibility", "hidden");
        $(colorDiv).css("visibility", "hidden");
        $(this).hide();
        if (fontSize!=0){
            let setSize = 0;
            if (fontSize == "btns") setSize = "10px";
            else if (fontSize == "btnm") setSize = "18px";
            else setSize = "25px";
            $("body").css("font-size", setSize);
        }
        if(bgColor!=0){
            let colId = "#col-" + id;
            $(colId).css("background-color", bgColor);
            $(txtArea).css("background-color", bgColor);
        
        }
        $(txtArea).css("height", "70%");

        
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
        let id = $(this).attr("id");
        let modificaId = id.split("-");
        id = modificaId[1];
        let txtArea = "#txt-" + id;
        $(txtArea).prop("disabled", false);
        modifica = true;
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
