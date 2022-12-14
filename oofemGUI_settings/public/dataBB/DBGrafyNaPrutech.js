
class dataDB{

    constructor(){

        this.dataBB = {
            "grafyKCE":[
                {
                    "data":[
                        {
                            "prut":{
                            "kce":{
                                "Ax":0.0,
                                "Ay":0.0,
                                "Bx":240.0,
                                "By":0.0,
                                "graf":true,
                                "vykreslitPrut":true,
                                "barvaCary":"darkBlue",
                                "tloustkaCary":"3"
                            },
                            "graf":{
                                "delkaKrokuPriblizne":10,
                                "nasobkyMocnin":[
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        0.0,
                                        -7.3499
                                    ]
                                ],
                                "vykreslitGraf":true,
                                "vykreslitSrafu":true,
                                "barvaCarySrafy":"#000000",
                                "tloustkaCarySrafa":"0.5",
                                "barvaCaryGraf":"#000000",
                                "tloustkaCaryGraf":"1"
                            }
                            }
                        },
                        {
                            "prut":{
                            "kce":{
                                "Ax":240.0,
                                "Ay":0.0,
                                "Bx":380.0,
                                "By":0.0,
                                "graf":true,
                                "vykreslitPrut":true,
                                "barvaCary":"darkBlue",
                                "tloustkaCary":"3"
                            },
                            "graf":{
                                "delkaKrokuPriblizne":10,
                                "nasobkyMocnin":[
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        7.3499,
                                        -2.7756e-15
                                    ]
                                ],
                                "vykreslitGraf":true,
                                "vykreslitSrafu":true,
                                "barvaCarySrafy":"#000000",
                                "tloustkaCarySrafa":"0.5",
                                "barvaCaryGraf":"#000000",
                                "tloustkaCaryGraf":"1"
                            }
                            }
                        },
                        {
                            "prut":{
                            "kce":{
                                "Ax":380.0,
                                "Ay":0.0,
                                "Bx":580.0,
                                "By":150.0,
                                "graf":true,
                                "vykreslitPrut":true,
                                "barvaCary":"darkBlue",
                                "tloustkaCary":"3"
                            },
                            "graf":{
                                "delkaKrokuPriblizne":10,
                                "nasobkyMocnin":[
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        -1.0658e-14,
                                        37.5
                                    ]
                                ],
                                "vykreslitGraf":true,
                                "vykreslitSrafu":true,
                                "barvaCarySrafy":"#000000",
                                "tloustkaCarySrafa":"0.5",
                                "barvaCaryGraf":"#000000",
                                "tloustkaCaryGraf":"1"
                            }
                            }
                        },
                        {
                            "prut":{
                            "kce":{
                                "Ax":580.0,
                                "Ay":150.0,
                                "Bx":780.0,
                                "By":300.0,
                                "graf":true,
                                "vykreslitPrut":true,
                                "barvaCary":"darkBlue",
                                "tloustkaCary":"3"
                            },
                            "graf":{
                                "delkaKrokuPriblizne":10,
                                "nasobkyMocnin":[
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        -37.5,
                                        -2.0428e-14
                                    ]
                                ],
                                "vykreslitGraf":true,
                                "vykreslitSrafu":true,
                                "barvaCarySrafy":"#000000",
                                "tloustkaCarySrafa":"0.5",
                                "barvaCaryGraf":"#000000",
                                "tloustkaCaryGraf":"1"
                            }
                            }
                        },
                        {
                            "prut":{
                            "kce":{
                                "Ax":240.0,
                                "Ay":300.0,
                                "Bx":240.0,
                                "By":0.0,
                                "graf":true,
                                "vykreslitPrut":true,
                                "barvaCary":"darkBlue",
                                "tloustkaCary":"3"
                            },
                            "graf":{
                                "delkaKrokuPriblizne":10,
                                "nasobkyMocnin":[
                                    [
                                        0,
                                        1
                                    ],
                                    [
                                        -53.999,
                                        -8.8818e-15
                                    ]
                                ],
                                "vykreslitGraf":true,
                                "vykreslitSrafu":true,
                                "barvaCarySrafy":"#000000",
                                "tloustkaCarySrafa":"0.5",
                                "barvaCaryGraf":"#000000",
                                "tloustkaCaryGraf":"1"
                            }
                            }
                        },
                        {
                            "Ox":50
                        },
                        {
                            "Oy":100
                        },
                        {
                            "meritkoGraf":0.74
                        },
                        {
                            "id":"test"
                        },
                        {
                            "class":""
                        }
                    ]
                }
            ]
        }
    }
}



//v budoucnosti pujdou data z DB, nyni jdou odsud
export const DBGrafyNaPrutech = (() => {

    var dataDBCl = new dataDB();
    var dataZDB = dataDBCl.dataBB;

    return(dataZDB);

});