
class dataDB{

    constructor(){

        this.dataBB = {"podpory": [ 
                            {"data": { 
                            "vodorovnyPrut": [ 
                            ], 
                            "svislyPrut": [ 
                                {"Ax":0.0,"Ay":0.0,"velikost":15,"typ":"kloubPosun","podporaDolu":true,"barvaCary":"darkcyan","tloustkaCary":"2"}, 
                                {"Ax":780.0,"Ay":300.0,"velikost":15,"typ":"kloubPosun","podporaDolu":true,"barvaCary":"darkcyan","tloustkaCary":"2"}, 
                                {"Ax":240.0,"Ay":300.0,"velikost":15,"typ":"vetknuti","podporaDolu":true,"barvaCary":"darkcyan","tloustkaCary":"2"} 
                            ] 
                            }, 
                            "Ox":50, 
                            "Oy":100, 
                            "id":"test", 
                            "class":"XX" 
                        }] 
        };
    }
};




//v budoucnosti pujdou data z DB, nyni jdou odsud
export const DBPodpory = (() => {

    var dataDBCl = new dataDB();
    var dataZDB = dataDBCl.dataBB;

    return(dataZDB);

});
