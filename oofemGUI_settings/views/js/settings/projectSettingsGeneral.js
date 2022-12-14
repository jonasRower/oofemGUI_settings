
class nactiJSONajaxGeneral{

    constructor(){

        const nJSON = new nactiJSONGeneral();
        this.nactiDataUrl(nJSON, "http://localhost:3000/hodnotyProjektu");
    }


    nactiDataUrl(nJSON, url){

        var API = url;
        $.getJSON( API, {})
            .done(function( data ) {
                nJSON.setData(data, 1);
        });
    }

}



class nactiJSONGeneral{

    constructor(){
        this.jsonPole = [];
    }


    setData(data, indexExp){

        this.data = data;
        this.jsonPole.push(data);

        //pokud je pole jsonu naplneno pozadovanym poctem indexu, program bezi dal
        if(this.jsonPole.length == indexExp){

            // vytvori data pro vykresleni tabulky
            //var tabulkaNahled = new sestavTabulkuProNahledProjektu(this.jsonPole[0])
        
            // vytvori data pro zobrazeni comboboxu pro vyber projektu

            var CheckBox = new eventCheckBox(this.jsonPole[0])
            var comboDomainANazevProjektu = new sestavComboDomainANazevProjektu(this.jsonPole[0]);
        }
        
    }

}


//sleduje checkbox, pri jeho udalosti znovu vykresluje comboboxy
// - tj. vola tridu "sestavComboDomainANazevProjektu"
class eventCheckBox{

    constructor(hodnotyProjektu){

        //sleduje checkboxy
        this.sledujCheckBoxFilter(hodnotyProjektu);
        this.sledujCheckBoxShowData(hodnotyProjektu);
    }
    
    //na zaklade checkboxu nastavuje vyber bud z comboboxu project, nebo domain
    sledujCheckBoxFilter(hodnotyProjektu){

        $("#filterCheck").change(function() {

            var checkBoxStatus = $('#filterCheck').is(":checked");

            if(checkBoxStatus == true){
                $(".id2").attr("disabled", true);
                $(".id1").attr("disabled", false);
                $(".tabulkaProjektData").hide();
                $("#tableProject").hide();

                //pokud zadisabluje projekt, pak vypne checkbox "Show data project"
                $('#showDataCheck').prop('checked', false);

                // a schova tabulku
                $(".tabulkaProjektData").hide();
                $("#tableProject").hide();

                //a soucasne chckbox zadisabluje take
                $("#showDataCheck").attr("disabled", true);
            }
            else {

                //znovu pregeneruje comboboxy
                var comboDomainANazevProjektu = new sestavComboDomainANazevProjektu(hodnotyProjektu);

                $(".id2").attr("disabled", false);
                $(".id1").attr("disabled", true);

                var vybranyProjekt = $('#tdProject :selected').text();
           
                //prekresli tabulku "data project"
                var tabulkaNahled = new sestavTabulkuProNahledProjektu(hodnotyProjektu, vybranyProjekt)

            }

        });

    }

    
    sledujCheckBoxShowData(hodnotyProjektu){

        $("#showDataCheck").change(function() {

            var checkBoxStatus = $('#showDataCheck').is(":checked");
            if(checkBoxStatus == true){

                var vybranyProjekt = $('#tdProject :selected').text();
           
                //prekresli tabulku "data project"
                var tabulkaNahled = new sestavTabulkuProNahledProjektu(hodnotyProjektu, vybranyProjekt)
        
            }
            else {

                $(".tabulkaProjektData").hide();
                $("#tableProject").hide();

            }

        })

    }


}


//vytvori json a vlozi ho do submit-inputu
class doaminProjectButton{

    constructor(){

        var projectSettingJson = this.projectSettingJson();
        var dataNaBackendStr = JSON.stringify(projectSettingJson)
        
        $("#projectSettings").val(dataNaBackendStr);        

    }


    projectSettingJson(){

        var stavajiciProjekt = $(".id2").find(":selected").text();
        var domainProjectu = $(".id1").find(":selected").text();



        var projectSettingJson = {
            currentProject : stavajiciProjekt,
            domainProjectu : domainProjectu
        }

        console.log(projectSettingJson);

        return(projectSettingJson);

    }

}



//vytvori comboboxy aby se dal vybrat projekt
class sestavComboDomainANazevProjektu{

    constructor(hodnotyProjektu){

        //nejdrive se vybere domain a az pak projekt
        this.vyberProjektBezFiltru(hodnotyProjektu);
        this.vyberProjektuSFiltrem(hodnotyProjektu);

        $("#confirmProjectSettings").click(function() {
            var dataNaBackend = new doaminProjectButton();
        });

    }
    

    vyberProjektBezFiltru(hodnotyProjektu){

        var noveCombo = new comboboxData();

        //vrati vsechny projekty, domena se neuvazuje
        var vsechnyProjekty = noveCombo.vratVsechnyNazvyProjektuPodleDomeny(hodnotyProjektu, "")

        //aby nevytvarel vic elementu, nez je treba, nadbytecne elementy promazava
        var n = $( ".id2" ).length;
        if(n > 0){
            $('#tdProject').empty();
        }

        //prida combo s vyberem projektu
        noveCombo.sestavCombobox(vsechnyProjekty, '#tdProject', 'id2');


    }

////pri startu se disabluje combo
//$(".id2").attr("disabled", true);

    vyberProjektuSFiltrem(hodnotyProjektu){

        var noveCombo = new comboboxData();
        let vsechnyDomeny = noveCombo.vratVsechnyDomain(hodnotyProjektu);


        var n = $(".id2").length;
        if(n > 0){
            $('#tdDomain').empty();
        }

        var noveCombo = new comboboxData();
        noveCombo.sestavCombobox(vsechnyDomeny, '#tdDomain', 'id1');

        //pri startu se disabluje combo
        if($('#filterCheck').prop('checked', false)){
            $(".id1").attr("disabled", true);
        }

        //naslouchac zmene comboboxu domain
        $(document).on('change','#tdDomain select', function() {

            var vybranaDomena = $('#tdDomain :selected').text();

            var noveCombo = new comboboxData();
            var nazevProjektuPole = noveCombo.vratVsechnyNazvyProjektuPodleDomeny(hodnotyProjektu, vybranaDomena);
            

            //aby nevytvarel vic elementu, nez je treba, nadbytecne elementy promazava
            var n = $( ".id2" ).length;
            if(n > 0){
                $('#tdProject').empty();
            }

            //prida combo s vyberem projektu
            noveCombo.sestavCombobox(nazevProjektuPole, '#tdProject', 'id2');

            //prekresli tabulku "data project"
            var vybranyProjekt = $('#tdProject :selected').text();
            var tabulkaNahled = new sestavTabulkuProNahledProjektu(hodnotyProjektu, vybranyProjekt)

            //checkbox "#showDataCheck" oddisabluje
            $("#showDataCheck").attr("disabled", false);

        });


        //naslouchac zmene comboboxu project
        $(document).on('change','#tdProject select', function() {

            var vybranyProjekt = $('#tdProject :selected').text();
           
            //prekresli tabulku "data project"
            var tabulkaNahled = new sestavTabulkuProNahledProjektu(hodnotyProjektu, vybranyProjekt)
      
        });

    }


    //sestavi html pro vykresleni comboboxu
    sestavComboboxDomeny(vsechnyDomeny){

        var comboDomenyPole = [];
        var comboStr = "";

        //sestavi pole pro zobrazeni comboboxu
        comboDomenyPole.push('<select>');
        for (var i = 0; i < vsechnyDomeny.length; i++) {
            comboDomenyPole.push('<option>' + vsechnyDomeny[i] + '</option>');
        }
        comboDomenyPole.push('</select>');

        //prevede pole na string
        for (var i = 0; i < comboDomenyPole.length; i++) {
            comboStr = comboStr + comboDomenyPole[i] + "\n";
        }

        //vytvori combobox v html
        $('.selects').append(comboStr);

    }

}


///sestavi dany combobox-string
class comboboxData{

    sestavCombobox(dataCombo, element, cl){

        var comboDomenyPole = [];
        var comboStr = "";

        //sestavi pole pro zobrazeni comboboxu
        comboDomenyPole.push('<select class="' + cl + '">');
        for (var i = 0; i < dataCombo.length; i++) {
            comboDomenyPole.push('<option class="' + cl + '_cl">' + dataCombo[i] + '</option>');
        }
        comboDomenyPole.push('</select>');

        //prevede pole na string
        for (var i = 0; i < comboDomenyPole.length; i++) {
            comboStr = comboStr + comboDomenyPole[i] + "\n";
        }

        //vytvori combobox v html
        $(element).append(comboStr);

    }


    //vrati vsechny nazvy projektu, dle zadane domeny
    vratVsechnyNazvyProjektuPodleDomeny(hodnotyProjektu, domenaExp){

        var domenaPole;
        var obsahujeDomenu;
        var nazevProjektu;
        var nazevProjektuPole = [];

        for (var i = 0; i < hodnotyProjektu.length; i++) {
            domenaPole = hodnotyProjektu[i].hodnotyDomain;

            if(domenaExp != ""){
                obsahujeDomenu = domenaPole.includes(domenaExp);
                if(obsahujeDomenu == true){
                    nazevProjektu = hodnotyProjektu[i].nazevProjektu;
                    nazevProjektuPole.push(nazevProjektu);
                }
            }
            else{
                nazevProjektu = hodnotyProjektu[i].nazevProjektu;
                nazevProjektuPole.push(nazevProjektu);
            }

        }

        
        return(nazevProjektuPole);

    }


    //vrati vsechny domeny, aby se mohl zvolit nazev projektu
    vratVsechnyDomain(hodnotyProjektu){

        var vsechnyDomeny = [];
        var domenyPole = [];

        for (var i = 0; i < hodnotyProjektu.length; i++) {
            domenyPole = hodnotyProjektu[i].hodnotyDomain;
            vsechnyDomeny = vsechnyDomeny.concat(domenyPole);
        }

        return(vsechnyDomeny);

    }

}


// ##################### Vytvori tabulku "data project" ###############
//                     Tabulka obsahuje data z databáze



//sestavi tabulku, aby mohl ji pridat pomoci jquery
class sestavTabulkuProNahledProjektu{

    constructor(hodnotyProjektu, nazevProjektu){

        var vykresliTabulku = $('#showDataCheck').is(":checked");

        if(vykresliTabulku == true){
            this.vykresliTabulku(hodnotyProjektu, nazevProjektu);
            $(".tabulkaProjektData").show()
        }

    }


    vykresliTabulku(hodnotyProjektu, nazevProjektu){

        var radkyTabulkyHtml = this.vratRadkyTabulkyHtml(hodnotyProjektu, nazevProjektu);
        var appendStr = this.prevedPoleRadkuNaString(radkyTabulkyHtml);

        var nadpis = "Data of project: " + nazevProjektu;

        //napise nadpis tabulky
        $("#tableProject").empty();
        $("#tableProject").append('<h3 class="options">' + nadpis + '</h3>');
        $("#tableProject").show();

        //vykresli tabulku
        $(".tabulkaProjektData").empty();
        $(".tabulkaProjektData").append(appendStr);

    }


    vratRadkyTabulkyHtml(hodnotyProjektu, nazevProjektuExp){

        //ziska data projektu 
        console.log(hodnotyProjektu)
        console.log(nazevProjektuExp)
        var projektdata = this.vratdataJSonuDleNazvuProjektu(hodnotyProjektu, nazevProjektuExp);
        var pocetRadkuTabulky = this.urciPocetRadkuTabulky(projektdata);
        var poleRadkuTabulky = this.ziskejPoleRadkuTabulky(projektdata, pocetRadkuTabulky)
        var radkyTabulkyHtml = this.vytvorPoleRadkuHtml(poleRadkuTabulky);

        
        return(radkyTabulkyHtml);

    }


    //vytvori pole radku krtere vklada do html pomoci jquery
    vytvorPoleRadkuHtml(poleRadkuTabulky){

        var radekTabulky;
        var radekTabulkyHtml = [];
        var radkyTabulkyHtml = [];

        radkyTabulkyHtml.push('<tr class="projekt">');
        radkyTabulkyHtml.push('<th class="projekt">Domain</th>');
        radkyTabulkyHtml.push('<th class="projekt">Type of data</th>');
        radkyTabulkyHtml.push('<th class="projekt">DOF</th>');
        radkyTabulkyHtml.push('<th class="projekt">OFT</th>');
        radkyTabulkyHtml.push('</tr>');


        for (var i = 0; i < poleRadkuTabulky.length; i++) {
            radekTabulky = poleRadkuTabulky[i];
            radekTabulkyHtml = this.sestavRadekHtml(radekTabulky);

            radkyTabulkyHtml = radkyTabulkyHtml.concat(radekTabulkyHtml);
        }

        return(radkyTabulkyHtml);

    }


    sestavRadekHtml(radekTabulky){

        var radekHtmlpole = [];
        radekHtmlpole.push('<tr class="projekt">')

        for (var i = 0; i < radekTabulky.length; i++) {
            var bunka = radekTabulky[i];
            
            if(bunka == undefined){
                bunka = "";
            }

            var radekHtml = '<td class="projekt">' + bunka + '</td>';

            radekHtmlpole.push(radekHtml);
        }

        radekHtmlpole.push('</tr>')

        return(radekHtmlpole);

    }


    //urci pocet radku tabulky z nejdelsiho pole JSONu.
    //tim je mysleno pole hodnot, jelikoz hodnoty jsou ulozeny v poli
    urciPocetRadkuTabulky(projektdata){

        var pocetHodnotMax = 0;

        Object.keys(projektdata).forEach(function(key) {

            var poleHodnot = projektdata[key];
            var pocetHodnot = poleHodnot.length;

            if(pocetHodnot > pocetHodnotMax){
                pocetHodnotMax = pocetHodnot;
            }

        });

        return(pocetHodnotMax);

    }


    ziskejPoleRadkuTabulky(projektdata, pocetRadkuTabulky){

        var dataRadek;
        var dataVsechnyRadky = [];

        for (var i = 0; i < pocetRadkuTabulky; i++) {
            dataRadek = this.ziskejDataProRadekTabulky(projektdata, i);
            dataVsechnyRadky.push(dataRadek);
        }

        return(dataVsechnyRadky);

    }


    ziskejDataProRadekTabulky(projektdata, indexRadku){

        var hodnotaDomain = this.ziskejHodnotuRadkuTabulky(projektdata, indexRadku, "hodnotyDomain");
        var hodnotaTypDat = this.ziskejHodnotuRadkuTabulky(projektdata, indexRadku, "hodnotyTypDat");
        var hodnotaDOF = this.ziskejHodnotuRadkuTabulky(projektdata, indexRadku, "hodnotyDOF");
        var hodnotaOFT = this.ziskejHodnotuRadkuTabulky(projektdata, indexRadku, "hodnotyOFT");

        var radekTabulky = [];

        radekTabulky.push(hodnotaDomain);
        radekTabulky.push(hodnotaTypDat);
        radekTabulky.push(hodnotaDOF);
        radekTabulky.push(hodnotaOFT);


        return(radekTabulky);

    }


    ziskejHodnotuRadkuTabulky(projektdata, indexRadku, klic){

        var hodnotyPole;
        var hodnotaDleIndexu;

        hodnotyPole = projektdata[klic];

        if(indexRadku > hodnotyPole.length){
            hodnotaDleIndexu = "";
        }
        else {
            hodnotaDleIndexu = hodnotyPole[indexRadku];
        }
        

        return(hodnotaDleIndexu);

    }


    vratdataJSonuDleNazvuProjektu(hodnotyProjektuCele, nazevProjektuExp){

        for (var i = 0; i < hodnotyProjektuCele.length; i++) {
            var hodnotyProjektuDici = hodnotyProjektuCele[i];
            var nazevProjektu = hodnotyProjektuDici.nazevProjektu;
            if(nazevProjektu == nazevProjektuExp){
                var projektdata = hodnotyProjektuDici;
                break;
            }

        }

        return(projektdata);

    }



    prevedPoleRadkuNaString(poleRadkuTabulka){

        var appendStr = "";

        for (let i = 0; i < poleRadkuTabulka.length; i++) {
            var radek = poleRadkuTabulka[i];
            appendStr = appendStr + radek + '\n';
        }

        return(appendStr);

    }

}


// ##################### Vytvori tabulku "data project" ###############


$( 'document' ).ready(function(){

    //nacte data z webové služby aby zobrazil detaily projektu (v tabulce)
    var nactiMeritkaZWS = new nactiJSONajaxGeneral();
    
});