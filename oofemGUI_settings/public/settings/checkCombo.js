
class checkComboData{

    constructor(){

        this.checkComboSize = this.vytvorCheckComboSizeDefault();

    }

    
    getCheckComboSize(){

        return(this.checkComboSize);

    }


    vytvorCheckComboSizeDefault(){

        var checkComboSize = {

            hlPohled_bezDetailu :{
                width:{
                    id:[['header'],['menu', 'scales'], ['menu', 'mainView']],
                    time:[[1], [1, 2], [1, 2]],
                    same:[['scales', 'mainView']]
                },
                height:{
                    id:[['header', 'menu'],['header', 'scales', 'mainView']],
                    time:[[1, 2],[1, 2, 3]],
                    same:[[]]
                }
            },
            hlPohled_detail :{
                width:{
                    id:[['header'],['menu', 'scales'], ['menu', 'mainView'], ['menu', 'detailView']],
                    time:[[1], [1, 2], [1, 2], [1, 2]],
                    same:[['scales', 'mainView', 'detailView']]
                },
                height:{
                    id:[['header', 'menu'],['header', 'scales', 'mainView', 'detailView']],
                    time:[[1, 2],[1, 2, 3, 4]],
                    same:[[]]
                }
            },
            hlPohled_rezy :{
                width:{
                    id:[['header'],['menu', 'scales'], ['menu', 'mainView', 'verticalView'], ['menu', 'horizontalView', 'detailView']],
                    time:[[1], [1, 2], [1, 2, 3], [1, 2, 3]],
                    same:[['mainView', 'horizontalView'], ['verticalView', 'detailView']]
                },
                height:{
                    id:[['header', 'menu'],['header', 'scales', 'mainView', 'detailView']],
                    time:[[1, 2],[1, 2, 3, 4]],
                    same:[['mainView', 'verticalView'], ['horizontalView', 'detailView']]
                }
            }
        }

        return(checkComboSize);
    }

}


//zde zacina modul
export const checkCombo = ((db) => {
   
    var checkComboClass = new checkComboData();
    var checkComboGUI = checkComboClass.getCheckComboSize();

    //console.log(checkComboGUI);
    return(checkComboGUI);
      
});