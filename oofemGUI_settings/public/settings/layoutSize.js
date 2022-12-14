
class upravData{

    constructor(layoutSize){

        this.layoutSize = layoutSize;
        console.log(this.layoutSize);
     
        if(typeof this.layoutSize === 'object'){
            this.poleKlicu = this.vratPoleKlicu(this.layoutSize);
            this.layoutSizeNew = this.ziskejLayoutSizeNew(this.poleKlicu, this.layoutSize);
        }
        else {
            this.layoutSizeNew = this.vytvorDefaultniLayoutSize();
        }
        
    }


    getLayoutSizeNew(){
        console.log("--------------------");
        return(this.layoutSizeNew);
    }


    //vytvori defaultni data - pro 1. odeslani na frontend
    vytvorDefaultniLayoutSize(){

        var layoutSize = {

            'rozvrzeniAktualni':'hlPohled_bezDetailu',
            'hlPohled_bezDetailu' :{
                header: { height: { px: -1, perc: '10%' }, width: { px: -1, perc: '90%' } },
                menu: { height: { px: -1, perc: '90%' }, width: { px: -1, perc: '30%' } },
                scales: { height: { px: -1, perc: '20%' }, width: { px: -1, perc: '70%' } },
                mainView: { height: { px: -1, perc: '70%' }, width: { px: -1, perc: '70%' } },
                verticalView: { height: { px: -1, perc: 'neni' }, width: { px: -1, perc: 'neni' } },
                horizontalView: { height: { px: -1, perc: 'neni' }, width: { px: -1, perc: 'neni' } },
                detailView: { height: { px: -1, perc: 'neni' }, width: { px: -1, perc: 'neni' } }
            },
            'hlPohled_detail' :{
                header: { height: { px: -1, perc: '10%' }, width: { px: -1, perc: '90%' } },
                menu: { height: { px: -1, perc: '90%' }, width: { px: -1, perc: '30%' } },
                scales: { height: { px: -1, perc: '20%' }, width: { px: -1, perc: '70%' } },
                mainView: { height: { px: -1, perc: '40%' }, width: { px: -1, perc: '70%' } },
                verticalView: { height: { px: -1, perc: 'neni' }, width: { px: -1, perc: 'neni' } },
                horizontalView: { height: { px: -1, perc: 'neni' }, width: { px: -1, perc: 'neni' } },
                detailView: { height: { px: -1, perc: '30%' }, width: { px: -1, perc: '70%' } }
            },
            'hlPohled_rezy' :{
                header: { height: { px: -1, perc: '10%' }, width: { px: -1, perc: '90%' } },
                menu: { height: { px: -1, perc: '90%' }, width: { px: -1, perc: '30%' } },
                scales: { height: { px: -1, perc: '20%' }, width: { px: -1, perc: '70%' } },
                mainView: { height: { px: -1, perc: '40%' }, width: { px: -1, perc: '40%' } },
                verticalView: { height: { px: -1, perc: '40%' }, width: { px: -1, perc: '30%' } },
                horizontalView: { height: { px: -1, perc: '30%' }, width: { px: -1, perc: '40%' } },
                detailView: { height: { px: -1, perc: '30%' }, width: { px: -1, perc: '30%' } }
            }
        }

        return(layoutSize);

    }


    //vrati pole klicu, jelikoz backend obdrzel i jina data, neobsahujici klic-hodnota
    //vrati jen ty klice, ktere maji klic-hodnotu
    vratPoleKlicu(layoutSize){

        var poleKlicu = [];
        var poleKlicuAll = Object.keys(layoutSize);
        
        for (var i = 0; i < poleKlicuAll.length; i++) {
            var klic = poleKlicuAll[i];
            var jsonStrDilci = layoutSize[klic];
            var jeToJson = jsonStrDilci.indexOf(":");
            if(jeToJson > -1){
                poleKlicu.push(klic);
            }    
        }

        //prida jeste "maxWidthSubmit" a "maxHeightSubmit"
        poleKlicu.push('maxWidthSubmit');
        poleKlicu.push('maxHeightSubmit');

        return(poleKlicu);

    }


    ziskejLayoutSizeNew(poleKlicu, layoutSize){

        var layoutSizeNew = {};
        var rozvrzeniAktualni = layoutSize.radioLayoutSubmit;

        layoutSizeNew['rozvrzeniAktualni'] = rozvrzeniAktualni;

        for (var i = 0; i < poleKlicu.length; i++) {
            var klic = poleKlicu[i];
            var klicNew = klic.replace('-Json', '');
            var layoutStr = layoutSize[klic];
            var layoutJson = JSON.parse(layoutStr);
            layoutSizeNew[klicNew] = layoutJson;
        }

        return(layoutSizeNew);

    }

}


//modul zpracovava data - jednotlive rozmery, ktere dorazily na backend z frondendu
//dorazily JSONy prevedene na string, je treba data upravit a poslat zpet na frontend
export const fromBackendData = ((layoutSize) => {
   
    var dataNew = new upravData(layoutSize);
    var layoutSizeNew = dataNew.getLayoutSizeNew();

    return(layoutSizeNew);
      
});