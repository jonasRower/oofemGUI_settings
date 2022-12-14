
class nactiJSONajax{

    constructor(){

        const nJSON = new nactiJSON();
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataNastaveni");
    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 1);
        });
    }

}



class nactiJSON{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){
            let statusyCheckboxu = new zapisStatusyCheckBoxu(this.jsonPole)
        }
        
    }

}



class zapisStatusyCheckBoxu{

    constructor(){

        //statusy pro zobrazeni jednotlivych sloupcu se nastavi primo z "/dataNastaveni"        
        const nJSON = new nactiJSON();
        this.nactiDataUrl(nJSON, "http://localhost:3000/dataNastaveni");

    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
             
                var hodnota;
                var idKey;

                //prepise data do inputboxu
                for(var key in data){
                    hodnota = data[key];
                    idKey = "#" + key;
                    
                    $(idKey).val(hodnota);
                }

                //nastavi checkboxy v GUI 
                var nastavCheckboxy = new nastavChecboxyDleDat(data); 

        });
    }


    prenastavStatusCheckboxu(idCheckBox, statusCheckbox){

        var idTextBox;
        idTextBox = idCheckBox.replace("Check", "");
        idTextBox = "#" + idTextBox;

        $(idTextBox).val(statusCheckbox);

    }
}


class nastavChecboxyDleDat{

    constructor(statusyCheckboxu){
        this.nastavCheckboxy(statusyCheckboxu);
    }


    nastavCheckboxy(statusyCheckboxu){

        var hodnota;
        var statusBool;
        var idKey;

        console.log(statusyCheckboxu);

        //prepise data do inputboxu
        for(var key in statusyCheckboxu){
            hodnota = statusyCheckboxu[key];
            if(hodnota == "false"){
                statusBool = false;
            }
            if(hodnota == "true"){
                statusBool = true;
            }

            idKey = "#" + key + "Check";
            
            //nastavi dany checkbox 
            $(idKey).prop('checked', statusBool);

        }

    }

}


$( 'document' ).ready(function(){

    var statusCheckbox;
    var idCheckBox;
    let statusyCheckboxu = new zapisStatusyCheckBoxu();

    $('#myForm input').on('change', function() {
        alert($('input[name=radioName]:checked', '#myForm').val()); 
    });

    $('.checkbox').click(function(){

        idCheckBox = $(this).attr('id')
        if($(this).is(":checked")){
            statusCheckbox = true;
        }
        else if($(this).is(":not(:checked)")){
            statusCheckbox = false;
        }

        //zapise status checkboxu
        statusyCheckboxu.prenastavStatusCheckboxu(idCheckBox, statusCheckbox)

    });

    //prepina na nastaveni projektu
    $("#buttNastaveniProjektu").click(function() {
        alert("");
        window.location.href="http://localhost:3000/nastaveniProjektu"
    });


});