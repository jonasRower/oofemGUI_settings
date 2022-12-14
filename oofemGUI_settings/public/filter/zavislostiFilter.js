//ziska zavislosti na cislech uzlu a elementech,
//aby spravne zobrazoval data v comboboxech v menu

class dataProFilter{

    constructor(dataFilter){

        //ziska pole, kde se da vyhledavat podle cisla prutu
        this.prutyUzly = this.ziskejPolePrutuACislaUzlu(dataFilter);
        this.seznamUzlu = this.vratseznamVsechUzlu(this.prutyUzly);
        this.uzlyPruty = this.ziskejPoleCislaUzluAPrutu(this.seznamUzlu, this.prutyUzly);

        this.zavislostiJson = this.vytvorZavislostiJson(this.prutyUzly, this.uzlyPruty);
    
    }


    getZavislostiJson(){
        return(this.zavislostiJson);
    }


    //ziska data razena podle prutu
    ziskejPolePrutuACislaUzlu(dataFilter){

        var dataPruty = dataFilter.grafyKCE[0].data;
        var dataPrutyJson = [];

        for (var i = 0; i < dataPruty.length; i++) {
            try{
                var prut = dataPruty[i];
                var cisloPrutu = i + 1; //cisla prutu se uvazuji, ze jsou cislovane od 1
                var uzelStart = prut.prut.kce.uzelStart;
                var uzelEnd = prut.prut.kce.uzelEnd;

                var uzelJson = {
                    cisloPrutu: cisloPrutu,
                    uzelStart: uzelStart,
                    uzelEnd: uzelEnd
                }
                dataPrutyJson.push(uzelJson);
            }
            catch{
                break;
            }

            
        }
        
        return(dataPrutyJson);
    }

    //ziska data razena podle cisel uzlu
    ziskejPoleCislaUzluAPrutu(seznamUzlu, prutyUzly){

        var dataUzlyPrutyJson = [];

        for (var i = 0; i < seznamUzlu.length; i++) {
            var cisloUzlu = seznamUzlu[i];
            var nalezenePruty = this.vyhledejCisloPrutuDleCislaUzlu(prutyUzly, cisloUzlu)
           
            var uzelPrut = {
                cisloUzlu: cisloUzlu,
                nalezenePruty: nalezenePruty
            }

            dataUzlyPrutyJson.push(uzelPrut);
        }

        return(dataUzlyPrutyJson);

    }

    //dle cisla uzlu vrati vsechny pruty
    vyhledejCisloPrutuDleCislaUzlu(prutyUzly, cisloUzlu){

        var nalezenePruty = [];

        for (var i = 0; i < prutyUzly.length; i++) {
            var prut = prutyUzly[i];
            var uzelStart = prut.uzelStart;
            var uzelEnd = prut.uzelEnd;

            if(uzelStart == cisloUzlu){
                var nalezenyPrut = prut.cisloPrutu;
                nalezenePruty.push(nalezenyPrut);
            }

            if(uzelEnd == cisloUzlu){
                var nalezenyPrut = prut.cisloPrutu;
                nalezenePruty.push(nalezenyPrut);
            }

        }

        return(nalezenePruty);

    }

    //vrati seznam vsech uzlu (seznam je bez duplicit)
    vratseznamVsechUzlu(prutyUzly){

        var seznamUzlu = [];
        var seznamUzluUnique = [];

        for (var i = 0; i < prutyUzly.length; i++) {
            var prut = prutyUzly[i];
            var uzelStart = prut.uzelStart;
            var uzelEnd = prut.uzelEnd;

            seznamUzlu.push(uzelStart);
            seznamUzlu.push(uzelEnd);
        }

        seznamUzluUnique = seznamUzlu.filter((v, i, a) => a.indexOf(v) === i);

        return(seznamUzluUnique);

    }

    //slozi "this.prutyUzly" a "this.uzlyPruty" dohromady
    vytvorZavislostiJson(prutyUzly, uzlyPruty){

        var zavislostiJson = {
            prutyUzly: prutyUzly,
            uzlyPruty: uzlyPruty,
        }

        return(zavislostiJson)

    }

}



//zde zacina modul
export const vratZavislostiFilter = ((dataFilter) => {

    var dataProFilterCl = new dataProFilter(dataFilter);
    var zavislostiJson = dataProFilterCl.getZavislostiJson();

    return(zavislostiJson);
      
});