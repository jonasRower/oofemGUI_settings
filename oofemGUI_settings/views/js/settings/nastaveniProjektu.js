
// NENI AKTUALNI


class nactiJSONajax{

    constructor(){

        const nJSON = new nactiJSON();
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



class nactiJSON{

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
            var comboDomainANazevProjektu = new sestavComboDomainANazevProjektu(this.jsonPole[0]);
        }
        
    }

}

//---------------- provizorni kod ----------------
class data{

    pridejCombo(element, id){
        $( element ).append( '<select class="'+ id +'"><option value="1">Added 1</option><option value="2">Added 2</option></select>' );
    }

}
//---------------- provizorni kod ----------------


//vytvori comboboxy aby se dal vybrat projekt
class sestavComboDomainANazevProjektu{

    constructor(hodnotyProjektu){

        this.skryjElementy();
        this.hlavniMetoda(hodnotyProjektu);

    }


    hlavniMetoda(hodnotyProjektu){

        var noveCombo = new comboboxData();
        let vsechnyDomeny = noveCombo.vratVsechnyDomain(hodnotyProjektu);


        var noveCombo1 = new data();
        var noveCombo = new comboboxData();
        noveCombo.sestavCombobox(vsechnyDomeny, '.append1', 'id1');


        //naslouchac zmene comboboxu 1
        $(document).on('change','.append1 select', function(vsechnyDomeny) {

            var vybranaDomena = $('.append1 :selected').text();
            console.log(vybranaDomena);

            var noveCombo = new comboboxData();
            var nazevProjektuPole = noveCombo.vratVsechnyNazvyProjektuPodleDomeny(hodnotyProjektu, vybranaDomena);
            
            //zobrazi popisek
            $("#selectProject").show();


            //aby nevytvarel vic elementu, nez je treba, nadbytecne elementy promazava
            var n = $( ".id2" ).length;
            if(n > 0){
                $('.append2').empty();
            }

            //prida combo s vyberem projektu
            noveCombo.sestavCombobox(nazevProjektuPole, '.append2', 'id2');

            //zobrazi nastaveni pro vyber GUI
            $(".chooseGUI").show();
            
            var pocetMoznosti;
            pocetMoznosti = $(".id2").find('option').length;
            
            if(pocetMoznosti == 1){
                var vyber = $(".id2_cl").first().text();
            }
            else {

                //naslouchac zmene comboboxu 2
                $(document).on('change','.append2 select', function() {
                
                    var vyber = $('.append2 :selected').text();
                    
                });
            }

            var tabulkaNahled = new sestavTabulkuProNahledProjektu(hodnotyProjektu, vyber)

        });

    }


    //skryje elementy, aby je pak zobrazil pri aktualnim nastaveni
    skryjElementy(){

        //$("#selectProject").hide();
        //$(".chooseGUI").hide();
        
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

        console.log(hodnotyProjektu);
        console.log(domenaExp);

        for (var i = 0; i < hodnotyProjektu.length; i++) {
            domenaPole = hodnotyProjektu[i].hodnotyDomain;

            obsahujeDomenu = domenaPole.includes(domenaExp);
            if(obsahujeDomenu == true){
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




//sestavi tabulku, aby mohl ji pridat pomoci jquery
class sestavTabulkuProNahledProjektu{

    constructor(hodnotyProjektu, nazevProjektu){

        this.vykresliTabulku(hodnotyProjektu, nazevProjektu);
        $(".tabulkaProjektData").hide()

        $("#zobrazTabulku").click(function() {
        
            if(this.zobrazTabulku == undefined){
                this.zobrazTabulku = true;
            }
            else{
                if(this.zobrazTabulku == false){
                    this.zobrazTabulku = true;
                }
                else {
                    this.zobrazTabulku = false;
                }
            }

            if(this.zobrazTabulku == true){
                $(".tabulkaProjektData").show()
            }
            else{
                $(".tabulkaProjektData").hide()
            }
            

        });

    }


    vykresliTabulku(hodnotyProjektu, nazevProjektu){

        var radkyTabulkyHtml = this.vratRadkyTabulkyHtml(hodnotyProjektu, nazevProjektu);
        var appendStr = this.prevedPoleRadkuNaString(radkyTabulkyHtml);
        
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




$( 'document' ).ready(function(){

    //nacte data z webové služby aby zobrazil detaily projektu (v tabulce)
    var nactiMeritkaZWS = new nactiJSONajax();


    

    
    

});
