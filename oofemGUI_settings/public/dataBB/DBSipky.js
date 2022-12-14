
class dataDB{

    constructor(){

        this.dataBB = {"sipky": [
                            {"data": {
                                "sikmo": [
                                        {"Ax":300,"Ay":100,"Bx":100,"By":50,"text":"F","zarovnaniKonec":"","zarovnaniStred":"vpravo","tloustkaCary":"1","barvaCary":"darkBlue","odsazeniX":5,"odsazeniY":5}
                                    ],
                                "obloukove": [
                                        {"Ax":300,"Ay":100,"polomer":50,"start":0,"end":0.5,"text":"F","natoceniSipky":0.3,"tloustkaCary":"1","barvaCary":"darkCyan","delkaHrotu":10,"rozevreniHrotu":3,"zarovnaniKonec":"vpravo","zarovnaniStred":"vpravo","odsazeniX":15,"odsazenyY":15}
                                    ]
                                },
                                "Ox":50,
                                "Oy":130,
                                "id":"konzolaSilaNaKonci",
                                "class":"konzolaSilaNaKonci"
                            }] 
                        };
        
        /*
        {"sipky": [
            {"data": {
                "vodorovne": [
                    ],
                "svisle": [
                    {"Ax":300,"Ay":0,"delkaSipky":100,"sipkaDolu":true,"text":"F"}
                    ]
                },
                "Ox":50,
                "Oy":130,
                "id":"konzolaSilaNaKonci",
                "class":"konzolaSilaNaKonci"
            }, 
            {"data": {
                "vodorovne": [
                    {"Ax":405,"Ay":0,"delkaSipky":50,"sipkaDoprava":false,"text":"X1=1"}
                    ],
                "svisle": [
                    ]
                },
                "Ox":50,
                "Oy":200,
                "id":"ccc",
                "class":"konzolaSilaNaKonci1"
            }, 
                {"data": {
                "vodorovne": [
                    {"Ax":400,"Ay":0,"delkaSipky":50,"sipkaDoprava":false,"text":"200kN"},
                    {"Ax":0,"Ay":0,"delkaSipky":50,"sipkaDoprava":true,"text":"200kN"}
                    ],
                "svisle": [
                    {"Ax":0,"Ay":15,"delkaSipky":100,"sipkaDolu":false,"text":"A=150kN"},
                    {"Ax":400,"Ay":15,"delkaSipky":100,"sipkaDolu":false,"text":"B=450kN"}
                    ]
                },
                "Ox":100,
                "Oy":200,
                "id":"dddd",
                "class":"konzolaSilaNaKonci1"
            }] 
        };
        */

    }
};



//v budoucnosti pujdou data z DB, nyni jdou odsud
export const DBSipky = (() => {

    var dataDBCl = new dataDB();
    var dataZDB = dataDBCl.dataBB;

    return(dataZDB);

});
