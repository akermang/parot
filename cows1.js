

/*** End of parameter converters ***/
function isLineFull(number)
{
    var isHidden = (document.getElementById('line_'+number).style.display=='none');
    if (!isHidden)
    {
        var zihuiVal = document.getElementById('ROSH_BALHAIM_MSP_ZIHUY_'+number).value
        var LeidaVal = document.getElementById('ROSH_BALHAIM_TAR_LEYDA_'+number).value
        var geza = document.getElementById('ROSH_BALHAIM_GEZA_'+number)
        var gezaVal = geza.options[geza.selectedIndex].value;
        var min = document.getElementById('ROSH_BALHAIM_MIN_RB_'+number)
        var minVal = geza.options[min.selectedIndex].value;
        if (zihuiVal.length>0 && LeidaVal.length>0 && gezaVal!=2 && minVal !=2){
            return true;
        }
    }
    return false;
}

function executeMarkBeef() {
    var count=-1;
    for (i=0;i<6;i++)
    {
        if (isLineFull(i))
            count++;
        else
            break;
    }
	//populateField(fieldName, fieldValue);
	if (count>-1)
	{
	    var webService = "MOAG_mark_"+(count+1)+"_cows"
	    callWebServiceWithAllParams(webService, "", responseHandler,responseHandler)
	}
	else
	    showInfoPopup("Warning", "Please enter valid data")
	//var popupMsg = getResponseNodeValueByName('PopupMessages');
}

function responseHandler()
{
  var popupMsg = getResponseNodeValueByName('PopupMessages');
  showInfoPopup("Message", popupMsg)
}
 
function haavarot_Initial_firstCow_onSuccess() {
    var popupMsg = getResponseNodeValueByName('PopupMessages');
    var sessionId = getResponseNodeValueByName('sessionId');

    if (popupMsg.length > 0){
        store("keepAlive", false);
        callWebServiceWithAllParams("haavarot_partial_AddCow", "", "", "", false)
        $('#errorModal').modal('toggle');
        $('.errormsg').text(popupMsg);
    }else{
        store("sessionId", sessionId); 
        setTimeout(AddCows, 10);
    }
}


function AddCows()
{
    
    var cows =[];
    
    $("div[class^='cow_']").each( function( index ) {
		if (index !==0) {
			var zihuy = $('#ROSH_BALHAIM_MSP_ZIHUY_'+ index).val();
			var leda = $('.ROSH_BALHAIM_TAR_LEYDA_'+ index).val();
			var geza = $('.ROSH_BALHAIM_GEZA_'+ index).val();
            var min = $('.ROSH_BALHAIM_MIN_RB_'+ index).val();
            if (zihuy) cows.push({zihuy:zihuy, leda:leda, geza:geza, min:min} );
		}
	});

    for (var i=0; i< cows.length;i++){
		populateField("ROSH_BALHAIM_MSP_ZIHUY_1", cows[i].zihuy);
        populateField("ROSH_BALHAIM_TAR_LEYDA_1", cows[i].leda);
        populateField("ROSH_BALHAIM_GEZA_1", cows[i].geza);
		populateField("ROSH_BALHAIM_MIN_RB_1", cows[i].min);
		callWebServiceWithAllParams("haavarot_partial_AddCow", "", "", "", false)
        //if (cows[i]) serviceFunction(cows[i]);
    }
    setTimeout(saveAndEnd, 10);
    
}

function saveAndEnd() {
    var popupMsg = getResponseNodeValueByName('PopupMessages');
    if (popupMsg.length > 0){
        store("keepAlive", false);
        callWebServiceWithAllParams("haavarot_partial_Save", "", "", "", false)
        $('#errorModal').modal('toggle');
        $('.errormsg').text(popupMsg);
    }else{
        store("keepAlive", false);
        callWebServiceWithAllParams("haavarot_partial_Save", "", onSave,"");
    }
}

function onSave(response) {
    var popupMsg = getResponseNodeValueByName('PopupMessages');
    
    $("div[class^='ROSH_BALHAIM_MSP_ZIHUY_']").each( function(index){
        $('.ROSH_BALHAIM_MSP_ZIHUY_' + index ).val('')
    })
    $("div[class^='datepicker_']").each( function(index){
        $('.datepicker_' + index ).val('')
    })
    $("div[class^='moagselect ROSH_BALHAIM_GEZA_']").each( function(index){
        $('.moagselect ROSH_BALHAIM_GEZA_' + index ).val('')
    })
    $("div[class^='moagselect ROSH_BALHAIM_MIN_RB_']").each( function(index){
        $('.moagselect ROSH_BALHAIM_MIN_RB_' + index ).val('')
    })
    
    $('.successmsg').text(popupMsg);
    $('#successModal').modal('toggle');
}

function submit() {
	store("keepAlive", true);
	var zihuy = $('#ROSH_BALHAIM_MSP_ZIHUY_0').val();
	var leda = $('.ROSH_BALHAIM_TAR_LEYDA_0').val();
	var geza = $('.ROSH_BALHAIM_GEZA_0').val();
	var min = $('.ROSH_BALHAIM_MIN_RB_0').val();
	populateField("ROSH_BALHAIM_MSP_ZIHUY_0", zihuy);
	populateField("ROSH_BALHAIM_TAR_LEYDA_0", leda);
	populateField("ROSH_BALHAIM_GEZA_0", geza);
	populateField("ROSH_BALHAIM_MIN_RB_0", min);
	callWebServiceWithAllParams("haavarot_Initial_firstCow", "", haavarot_Initial_firstCow_onSuccess, function(){alert("Error sending data to server")})

}

function addKeepALive() {
	console.log('keep alive');
	store("keepAlive", true);
}


    