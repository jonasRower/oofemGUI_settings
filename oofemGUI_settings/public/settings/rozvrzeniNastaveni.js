
class nastavRozvrzeni{

    constructor(){

        var hlPohledLayout = this.vratPoleIDHlPohled();
        var hlPohledDetailLayout = this.vratPoleIDDetail();
        var hlPohledRezyDetailLayout = this.vratPoleIDRezy();

        this.layoutData = {
            rozvrzeniAktualni: "hlPohled_bezDetailu",
            hlPohled_bezDetailu: hlPohledLayout,
            hlPohled_detail: hlPohledDetailLayout,
            hlPohled_rezy: hlPohledRezyDetailLayout
        }

    }


    //vrati data
    getLayoutData(){
        return(this.layoutData);
    }


    //vrati data, aby zobrazil pouze hlpohled
    vratPoleIDHlPohled(){

        var poleID = [];

        var radekID = [];
        var textId = [];
        textId.push('Header');
        textId.push('header');
        textId.push('colspan="2"');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Menu');
        textId.push('menu');
        textId.push('rowspan="2"');
        radekID.push(textId);

        var textId = [];
        textId.push('Scales');
        textId.push('scales');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Main view');
        textId.push('mainView');
        textId.push('');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('');
        textId.push('');
        textId.push('');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);


        return(poleID);

    }  




    //vrati data, aby zobrazil hlpohled + detail
    vratPoleIDDetail(){

        var poleID = [];

        var radekID = [];
        var textId = [];
        textId.push('Header');
        textId.push('header');
        textId.push('colspan="2"');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Menu');
        textId.push('menu');
        textId.push('rowspan="3"');
        radekID.push(textId);

        var textId = [];
        textId.push('Scales');
        textId.push('scales');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Main view');
        textId.push('mainView');
        textId.push('');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Detail view');
        textId.push('detailView');
        textId.push('');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);


        return(poleID);

    }



    //vrati data, aby zobrazil hlpohled + rezy + detail
    vratPoleIDRezy(){

        var poleID = [];

        var radekID = [];
        var textId = [];
        textId.push('Header');
        textId.push('header');
        textId.push('colspan="3"');
        radekID.push(textId);

        var textId = [];
        textId.push('');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Menu');
        textId.push('menu');
        textId.push('rowspan="3"');
        radekID.push(textId);

        var textId = [];
        textId.push('Scales');
        textId.push('scales');
        textId.push('colspan="2"');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Main view');
        textId.push('mainView');
        textId.push('');
        radekID.push(textId);

        var textId = [];
        textId.push('Vertical view');
        textId.push('verticalView');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);

        //--------------------------------

        var radekID = [];
        var textId = [];
        textId.push('Horizontal view');
        textId.push('horizontalView');
        textId.push('');
        radekID.push(textId);

        var textId = [];
        textId.push('Detail view');
        textId.push('detailView');
        textId.push('');
        radekID.push(textId);
        poleID.push(radekID);


        return(poleID);

    }



}



//zde zacina modul
export const rozvrzeniNastaveni = ((db) => {
   
    var rozvrzeni = new nastavRozvrzeni();
    var layoutData = rozvrzeni.getLayoutData();

    return(layoutData);
      
});