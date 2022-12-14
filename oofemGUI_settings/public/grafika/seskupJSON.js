
//seskupi oddelene JSONy, tak aby na router "/dataCanvas"
//byl odeslan pouze jeden JSON a data byla vykreslena najednou
class seskupData{

    constructor(dataKSeskupeni){

        //seskupi data
        this.seskupJSONy(dataKSeskupeni)

        //zapise seskupena data do JSONu
        var seskupenaData = this.seskupenaData;
        this.seskupenaDataJSON = {lines:seskupenaData}

        //console.log(this.seskupenaDataJSON);

    }


    //vrati seskupena data - JSON
    getSeskupenaData(){
        return(this.seskupenaDataJSON);
    }


    seskupJSONy(dataKSeskupeni){

        var hraniceGrafu = dataKSeskupeni.hraniceGrafu;
        var srafyGrafu = dataKSeskupeni.srafyGrafu;

        console.log(hraniceGrafu.length);


        //do seskupenych dat prida "hraniceGrafu"
        this.seskupenaData = this.pridejPoleDoSeskupenychDat(this.seskupenaData, hraniceGrafu);

        //do seskupenych dat prida "srafyGrafu"
        this.seskupenaData = this.pridejPoleDoSeskupenychDat(this.seskupenaData, srafyGrafu);

    }


    pridejPoleDoSeskupenychDat(dataOrig, dataNew){

        var delkaOrig;
        var indexOd;
        var indexDo;

        indexOd = 0;
        indexDo = dataNew.length;

        //jsou-li data prazdna, pak nelze pouzit concat pro 0-ty index
        try{
            delkaOrig = dataOrig.length;
        }
        catch{
            //nastane-li tedy chyba, pak se nastavi 0-ty index natvrdo
            //a for-cyklus zacina cyklem s indexem 1
            dataOrig = dataNew[0];
            indexOd = 1;
        }
        
        for (var i = indexOd; i < indexDo; i++) {
            var dilciData = dataNew[i];
            dataOrig = dataOrig.concat(dilciData)
        }

        return(dataOrig);

    }

}



export const seskupJSON = ((dataKSeskupeni) => {

    var seskupeneJSONy = new seskupData(dataKSeskupeni);
    var seskupenaData = seskupeneJSONy.getSeskupenaData();

    return(seskupenaData);

});