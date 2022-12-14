//zde se nastavuji data aktualniho projektu, aby mohli byt zapsany do WS
//data obsahuji veskere nastaveni, ktere se bude zobrazovat v menu

class actualDataProject{

    constructor(hodnotyProjektu, layoutSizeData){

        this.hodnotyProjektuActual = this.vyhledejData(hodnotyProjektu, layoutSizeData);

    }

    getHodnotyProjektuActual(){
        return(this.hodnotyProjektuActual);
    }


    vyhledejData(hodnotyProjektu, layoutSizeData){

        var hodnotyProjektuActual;

        // pokud je layoutSizeData = objekt, pak se jedna o nastavena data uzivatelem
        if(typeof layoutSizeData === 'object'){
            var nazevProjektuExp = layoutSizeData.projectSettings.currentProject;

            for (var i = 0; i < hodnotyProjektu.length; i++) {
                var nazevProjektu = hodnotyProjektu[i].nazevProjektu;
                if(nazevProjektu == nazevProjektuExp){
                    hodnotyProjektuActual = hodnotyProjektu[i];
                    break;
                }
            }

        }
        else{   //jedna se o prvni volani a vraci prvni uzel dat
                hodnotyProjektuActual = hodnotyProjektu[0];
        }
        

        return(hodnotyProjektuActual);

    }

}



//zde zacina modul
export const actualProjectData = ((hodnotyProjektu, layoutSizeData) => {
   
    var actualProjectCl = new actualDataProject(hodnotyProjektu, layoutSizeData);
    var hodnotyProjektuActual = actualProjectCl.getHodnotyProjektuActual();

    return(hodnotyProjektuActual);
      
});