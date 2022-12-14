
//musi se dodelat uvozovky, jinak to nejde 

class wrapperData{

    constructor(backendData, checkComboSize){

        this.nastaveniZobrazeni = backendData.rozvrzeniAktualni;

        // ziska konkretni data pro zadane nastaveni
        var dataRozvrzeni = this.vyberSpravnyJson(backendData);

        // kontroluje vstupy, pokud nesedi, pak vypisuje hlasku
        var kontrolaStatus = this.kontrola(dataRozvrzeni, this.nastaveniZobrazeni, checkComboSize);
        
        // vrati data pro wrapper
        this.vratWrapperData(kontrolaStatus, dataRozvrzeni);


        //vytvori json wrapper
        this.wrapperJson = {
            maxWidth: backendData.maxWidthSubmit,
            maxHeight: backendData.maxHeightSubmit,
            status: kontrolaStatus,
            nastaveni : this.nastaveniZobrazeni,
            dataWrapper : this.wrapperArr
        }

        console.log(this.wrapperJson);

    }


    //vrati data
    getWrapper(){
        console.log(this.wrapperJson);
        return(this.wrapperJson)
    }


    vratWrapperData(kontrolaStatus, dataRozvrzeni){

        var statusWidth = kontrolaStatus.kontrolaStatus;
        var statusHeight = kontrolaStatus.kontrolaStatus;
        var dopocitavatRozvrzeni = true;

        if(statusWidth === 'object'){
            dopocitavatRozvrzeni = false;
        }

        if(statusHeight === 'object'){
            dopocitavatRozvrzeni = false;
        }

        //pokud je chyba vytvori se defaultni rozvrzeni
        if(dopocitavatRozvrzeni == false){
            this.wrapperArr = this.vratWrapperArrDefault(this.nastaveniZobrazeni);
        }
        else { //pokud chyba neni vytvori se rozvrzeni dle nastaveni
            var generovaneRozvrzeni = new generujRozvrzeni(this.nastaveniZobrazeni, dataRozvrzeni);
          
            //ziska data z tridy
            this.wrapperArr = generovaneRozvrzeni.getPismenaPole();
            //this.wrapperArr = this.vratWrapperArrDefault(this.nastaveniZobrazeni);
        }

    }


    vyberSpravnyJson(backendData){

        var nastaveniZobrazeni = backendData.rozvrzeniAktualni;
        var dataRozvrzeni = backendData[nastaveniZobrazeni];

        return(dataRozvrzeni);

    }


    //provede kontrolu, tim ze secte dana % a musi davat 100%
    //pokud nevychazi, napise se to do GUI
    kontrola(dataRozvrzeni, nastaveniZobrazeni, checkComboSize){

        var kontrolaData = checkComboSize[nastaveniZobrazeni];
        console.log(dataRozvrzeni);
        console.log(checkComboSize);

        var statusWidth = this.kontrolujDataWidth(kontrolaData, 'width', dataRozvrzeni);
        var statusHeight = this.kontrolujDataWidth(kontrolaData, 'height', dataRozvrzeni);
        
        console.log(statusWidth);
        console.log(statusHeight);

        var kontrolaStatus = {
            statusWidth : statusWidth,
            statusHeight : statusHeight
        }

        return(kontrolaStatus);

    }


    kontrolujDataWidth(kontrolaData, widthHeight, dataRozvrzeni){

        var idData = kontrolaData[widthHeight].id;
        var percData = this.vratPercData(idData, dataRozvrzeni, widthHeight);

        var statusPerc = this.proverStatusPercData(percData, idData, widthHeight);  

        return(statusPerc);

    }


    vratPercData(idData, dataRozvrzeni, widthHeight){

        var percData = [];
        
        for (var r = 0; r < idData.length; r++) {
            var pocerS = idData[r].length;
            var percDataRadek = [];
            for (var s = 0; s < pocerS; s++) {
                var element = idData[r][s];
                var perc = dataRozvrzeni[element][widthHeight].perc;
                percDataRadek.push(perc);
            }
            percData.push(percDataRadek);
        }

        return(percData);

    }


    proverStatusPercData(percData, idData, widthHeight){

        var errInfo;

        var errPerc;
        var errId;
        var errInfo;

        for (var r = 0; r < percData.length; r++) {
            var pocetS = percData[r].length;
            var percTotal = 0;
            var status;
            var chyba;

            for (var s = 0; s < pocetS; s++) {
                var percStr = percData[r][s].replace('%', '');
                var percInt = parseInt(percStr);
                percTotal = percTotal + percInt;

                if(pocetS == 1){
                    status = true;
                }
                else {
                    if(percTotal == 100){
                        status = true;
                    }
                    else {
                        status = false;
                    }
                }
            }

            if(status == false){
                errPerc = percData[r];
                errId = idData[r];
                errInfo = 'součet ve směru "' + widthHeight + ':"  nedává 100%';

                console.log(percData[r]);
                console.log(idData[r]);
                break;
            }
        }


        if(status == false){
            chyba = {
                errId: errId, 
                errPerc: errPerc,
                errInfo: errInfo
            }
        }
        else{
            chyba = "OK"; 
        }

        return(chyba);

    }




    vratPercZRozvrzeniJson(dataRozvrzeni, element, widthHeight){

        var perc = dataRozvrzeni[element][widthHeight].perc;
        return(perc);

    }


    vratWrapperArrDefault(nastaveniZobrazeni){

        var wrapperArr = [];

        if(nastaveniZobrazeni == "hlPohled_bezDetailu"){

            wrapperArr.push('                "b b b b b b b b"');
            wrapperArr.push('                "a a c c c c c c"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a d d d d d d";');

        }    

        if(nastaveniZobrazeni == "hlPohled_detail"){

            wrapperArr.push('                "b b b b b b b b"');
            wrapperArr.push('                "a a c c c c c c"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a d d d d d d"');
            wrapperArr.push('                "a a e e e e e e";');
            
        }    

        if(nastaveniZobrazeni == "hlPohled_rezy"){

            wrapperArr.push('                "b b b b b b b b"');
            wrapperArr.push('                "a a c c c c c c"');
            wrapperArr.push('                "a a d d d d d g"');
            wrapperArr.push('                "a a d d d d d g"');
            wrapperArr.push('                "a a f f f f f e";');
            
        }    

        return(wrapperArr);

    }

}



class generujRozvrzeni{

    constructor(nastaveniZobrazeni, dataRozvrzeni){

        var pismenaPole;
        console.log(nastaveniZobrazeni);

        if(nastaveniZobrazeni == "hlPohled_bezDetailu"){
            pismenaPole = this.vratPismenaPoleHlPohledBezDetailu(dataRozvrzeni);
        }

        if(nastaveniZobrazeni == "hlPohled_detail"){
            pismenaPole = this.vratPismenaPoleHlPohledDetail(dataRozvrzeni);
        }

        if(nastaveniZobrazeni == "hlPohled_rezy"){
            pismenaPole = this.vratPismenaPoleHlPohledRezy(dataRozvrzeni);
        }


        //ulozi, aby mohl data vratit
        this.pismenaPole = pismenaPole;
       
    }


    getPismenaPole(){
        return(this.pismenaPole);
    }


    //################ vraci pole pismen pro 3 pripady ##########################

    //vrati rozlozeni pismen pro "hlPohled_bezDetailu"
    vratPismenaPoleHlPohledBezDetailu(dataRozvrzeni){

        //vysky
        var headerHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'header', 'height');
        var menuHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'menu', 'height');
        var scalesHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'scales', 'height');
        var mainViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'mainView', 'height');

        //sirky
        var headerWidth = 10
        var menuWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'menu', 'width');
        var scalesWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'scales', 'width');
        var mainViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'mainView', 'width');


        var pismenaPole = [];

        var radekHeader = this.vratRadekPismena([[headerWidth],['b']]);
        var radekMenuScales = this.vratRadekPismena([[menuWidth, scalesWidth],['a', 'c']]);
        var radekMenuMainViewWidth = this.vratRadekPismena([[menuWidth, mainViewWidth],['a', 'd']]);

        
        //prida radky "header"
        for (var r = 0; r < headerHeight; r++) {
            pismenaPole.push(radekHeader);
        }

        //prida radky "Menu + Scales"
        for (var r = 0; r < scalesHeight; r++) {
            pismenaPole.push(radekMenuScales);
        }

        //prida radky "Menu + Main view"
        for (var r = 0; r < mainViewHeight; r++) {
            pismenaPole.push(radekMenuMainViewWidth);
        }

        //dpoise strednik za posledni radek
        pismenaPole[pismenaPole.length-1] = pismenaPole[pismenaPole.length-1] + ";";
        
        return(pismenaPole);

    }


    //vrati rozlozeni pismen pro "hlPohled_detail"
    vratPismenaPoleHlPohledDetail(dataRozvrzeni){

        //vysky
        var headerHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'header', 'height');
        var menuHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'menu', 'height');
        var scalesHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'scales', 'height');
        var mainViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'mainView', 'height');
        var detailViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'detailView', 'height');

        //sirky
        var headerWidth = 10
        var menuWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'menu', 'width');
        var scalesWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'scales', 'width');
        var mainViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'mainView', 'width');
        var detailViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'detailView', 'width');


        var pismenaPole = [];

        var radekHeader = this.vratRadekPismena([[headerWidth],['b']]);
        var radekMenuScales = this.vratRadekPismena([[menuWidth, scalesWidth],['a', 'c']]);
        var radekMenuMainViewWidth = this.vratRadekPismena([[menuWidth, mainViewWidth],['a', 'd']]);
        var radekMenuDetailViewWidth = this.vratRadekPismena([[menuWidth, detailViewWidth],['a', 'e']]);

        
        //prida radky "header"
        for (var r = 0; r < headerHeight; r++) {
            pismenaPole.push(radekHeader);
        }

        //prida radky "Menu + Scales"
        for (var r = 0; r < scalesHeight; r++) {
            pismenaPole.push(radekMenuScales);
        }

        //prida radky "Menu + Main view"
        for (var r = 0; r < mainViewHeight; r++) {
            pismenaPole.push(radekMenuMainViewWidth);
        }

        //prida radky "Menu + Detail view"
        for (var r = 0; r < detailViewHeight; r++) {
            pismenaPole.push(radekMenuDetailViewWidth);
        }

        //dpoise strednik za posledni radek
        pismenaPole[pismenaPole.length-1] = pismenaPole[pismenaPole.length-1] + ";";

        return(pismenaPole);

    }


    //vrati rozlozeni pismen pro "hlPohled_rezy"
    vratPismenaPoleHlPohledRezy(dataRozvrzeni){

        //vysky
        var headerHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'header', 'height');
        var menuHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'menu', 'height');
        var scalesHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'scales', 'height');
        var mainViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'mainView', 'height');
        var verticalViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'verticalView', 'height');       //stejny jako mainview
        var horizontalViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'horizontalView', 'height');   //stejny jako detail
        var detailViewHeight = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'detailView', 'height');

        //sirky
        var headerWidth = 10
        var menuWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'menu', 'width');
        var scalesWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'scales', 'width');
        var mainViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'mainView', 'width');
        var verticalViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'verticalView', 'width');
        var horizontalViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'horizontalView', 'width');
        var detailViewWidth = this.vratPocetIndexuVyskySirky(dataRozvrzeni, 'detailView', 'width');


        var pismenaPole = [];

        var radekHeader = this.vratRadekPismena([[headerWidth],['b']]);
        var radekMenuScales = this.vratRadekPismena([[menuWidth, scalesWidth],['a', 'c']]);
        var radekMenuMainViewWidth = this.vratRadekPismena([[menuWidth, mainViewWidth, verticalViewWidth],['a', 'd', 'g']]);
        var radekMenuDetailViewWidth = this.vratRadekPismena([[menuWidth, horizontalViewWidth, detailViewWidth],['a', 'f', 'e']]);



        //prida radky "header"
        for (var r = 0; r < headerHeight; r++) {
            pismenaPole.push(radekHeader);
        }

        //prida radky "Menu + Scales"
        for (var r = 0; r < scalesHeight; r++) {
            pismenaPole.push(radekMenuScales);
        }

        //prida radky "Menu + Main view"
        for (var r = 0; r < mainViewHeight; r++) {
            pismenaPole.push(radekMenuMainViewWidth);
        }

        //prida radky "Menu + Detail view"
        for (var r = 0; r < detailViewHeight; r++) {
            pismenaPole.push(radekMenuDetailViewWidth);
        }

        //dpoise strednik za posledni radek
        pismenaPole[pismenaPole.length-1] = pismenaPole[pismenaPole.length-1] + ";";

        return(pismenaPole);

    }
    

    //##################  nize jsou spolecne metody  ###############################


    vratRadekPismena(indexyPismena){
        
        var radekPismena = '               "';

        for (var i = 0; i < indexyPismena[0].length; i++) {
            var pocetIndexu = indexyPismena[0][i];
            var pismeno = indexyPismena[1][i];

            for (var s = 0; s < pocetIndexu; s++) {
                radekPismena = radekPismena + ' ' + pismeno;
            }
            
        }

        radekPismena = radekPismena + '"';

        return(radekPismena);
    
    }


    vratPocetIndexuVyskySirky(dataRozvrzeni, element, widthHeight){

        var rozmerPerc = dataRozvrzeni[element][widthHeight].perc;
        var rozemer = (parseInt(rozmerPerc))/10;

        return(rozemer);

    }


}





//zde zacina modul
export const dataWrapper = ((backendData, checkComboSize) => {

    var wrapperArrData = new wrapperData(backendData, checkComboSize)
    var wrapperArr = wrapperArrData.getWrapper();

    return(wrapperArr)

});