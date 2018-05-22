/*** Parameter converters ***/
function convert_CONTROL2_MESAMEN_ZH_0(value) {
    return value;
}

function convert_CONTROL2_TAR_SIMUN_0(value) {
    return {
        format : "dd/mm/yy",
        dateValue: value !== null ? new Date(value) : null
    };
}
function convert_CONTROL2_SHEM_BAALIM_0(value) {
    return value;
}
function convert_CONTROL2_BAALIM_ZH_0(value) {
    return value;
}
function convert_CONTROL2_SHEM_MEGADEL_0(value) {
    return value;
}
function convert_CONTROL2_MEGADEL_ZH_0(value) {
    return value;
}
function convert_CONTROL2_SHEM_ISHUV_0(value) {
    return value;
}
$(function(){
    $("#CONTROL2_MESAMEN_ZH_0").change(function() {
      callWebServiceWithAllParams("MOAG_loginUser", "",function(data){
          console.log(data);
          let userLocation = data.Response.MOAG_loginUserElements.CONTROL2_SHEM_ISHUV_0;
          $( "#cities" ).val(userLocation);
        }, function(){alert("Please enter a valid user")})
    });


/*** End of parameter converters ***/

    function prepare_CONTROL2_SHEM_ISHUV_0_lov_request() {
        var inputParams = {};

        return inputParams;
    }
    function CONTROL2_SHEM_ISHUV_0_lov_item_presenter(arrayItem, isUseLabelAsKeys) {
        var lovItems = [];
        lovItems.push(arrayItem[isUseLabelAsKeys ? "LOV_ISHUV" : "LOV_ISHUV"]);

        return lovItems.join(",");
    }
    function CONTROL2_SHEM_ISHUV_0_lov_item_handler(arrayItem, isUseLabelAsKeys) {
        populateField(isUseLabelAsKeys ? "LOV_ISHUV" : "LOV_ISHUV", arrayItem[isUseLabelAsKeys ? "LOV_ISHUV" : "LOV_ISHUV"]);
        populateField( "LOV_ISHUV", arrayItem["CONTROL2_SHEM_ISHUV_0"]);
    }
    
 })   