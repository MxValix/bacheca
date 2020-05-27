let contatore = 0;
let n=-1;
let colori = ["#ffb3ba","#ffdfba","#ffffba","#baffc9","#bae1ff","#b7ded2","#f6a6b2","#f7c297","#ffecb8", "#90d2d8"];
$(document).ready(function(){
    $("#plus-circle-btn").click(function(event){
        event.preventDefault();
        contatore++;
        if (n==9) n=0;
        else n++;
        let aggiungiDiv = 
            `   
                <div class="col-sm-4 id="col-${contatore}" 
                    style="background-color:${colori[n]}; border:3px solid white;   border-collapse: collapse">
                    <textarea class="txtarea mt-3" id="txt-${contatore}" 
                        style="background-color:${colori[n]}"></textarea>
                    <button type="button" id="salva-${contatore}" 
                        class="btn btn-sm bg-success text-white text-uppercase">
                            Salva nota
                    </button>
                </div>
            `;
        $("#aggiungi-qui").append(aggiungiDiv);      
        let txtArea = "#txt-" + contatore;
        $(txtArea).focus();  
    })


})
