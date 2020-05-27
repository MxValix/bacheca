let contatore = 0;
$(document).ready(function(){
    $("#plus-circle-btn").click(function(event){
        event.preventDefault();
        contatore++;
        let n = 0;
        let colori = ["#ffffcc","#e3e3e3"];
        if (contatore%2==0) n = 0
        else n=1;
        let aggiungiDiv = 
            `<div class="col-sm-4 id="col-${contatore}" style="background-color:${colori[n]}">
            <textarea class="txtarea mt-3" id="txt-${contatore}" style="background-color:${colori[n]}"></textarea>
            <button type="button" id="salva-${contatore}" class="btn btn-sm bg-success text-white text-uppercase">Salva nota</button>
            </div>`;
        $("#aggiungi-qui").append(aggiungiDiv);      
        let txtArea = "#txt-" + contatore;
        $(txtArea).focus();  
    })

    $()
})