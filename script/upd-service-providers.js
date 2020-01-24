const fs = require('fs');
const request = require('request');

const registry_home = 'http://localhost:8080';
const registry_service_endpoint = 'service-provider?nocount';
const services_filepath = '../views/assets/data/vServiceProviders.json';



var error = function(errCode, errMsg) {
    console.log(errMsg);
    return errCode;
}

var pad = function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

var downloadData = function(url, func) {
    request(url, { json: true }, (err, res, data) => {
        if(err) error(-1, err);
        else func(data);
    });
}

var mapData = function(data) {

    let count = data.length;
    return data.map((sp, i)=> {

        if(sp.name==null || sp.name=='') sp.name = "<service not available>";
        if(sp.city_code==null || sp.city_code=='') sp.city_code = "";
        if(sp.city_name==null || sp.city_name=='') sp.city_name = "";
        if(sp.region_code==null || sp.region_code=='') sp.region_code = "";
        if(sp.region_name==null || sp.region_name=='') sp.region_name = "";
        if(sp.purpose==null || sp.purpose=='') sp.purpose = "";
        if(sp.purpose_description==null || sp.purpose_description=='') sp.purpose_description = "";
        if(sp.legal_status==null || sp.legal_status=='') sp.legal_status = "";
        if(sp.legal_status_description==null || sp.legal_status_description=='') sp.legal_status_description = "";
        

        let s = {
            "id": sp.id,
            "name": sp.name,
            "logo": "",
            "infoPage": "",
            "spidServicesListPage": "",
            "onlineServicesPortal": "",
            "servicesSupportInfoPage": "",
            "cityCode": sp.city_code,
            "city": sp.city_name,
            "regionCode": sp.region_code,
            "region": sp.region_name,
            "localizationCode": "",
            "localizationDescription": "",
            "operatingInterestTypeCode": sp.purpose,
            "operatingInterestTypeDescription": sp.purpose_description,
            "organizationTypeCode": sp.legal_status,
            "organizationTypeDescription": sp.legal_status_description,
            "latitude": "",
            "longitude": "",
            "address": "",
            "pec": "",
            "totalServices": ""
        }

        let num = parseInt((100*i/count));
        process.stdout.write('\b\b\b\b' + pad(num, 3) + '%');

        return s;
    });
}

var writeData = function(file, data, func) {
    fs.writeFile(file, data, 'utf8', function(err) {
        if (err) error(-1, err);
        else func('OK');
    });
}





console.log("SPID Site Service Provider Updater. v1.0.0\n\n");

process.stdout.write("download data from registry... <<<<");
let data = downloadData(registry_home + '/' + registry_service_endpoint, (data)=> {
    process.stdout.write("\b\b\b\bOK  \n");
    
    process.stdout.write("map data... ---%");
    let mappedData = mapData(data);
    process.stdout.write("\b\b\b\bOK  \n");
    
    process.stdout.write("write local data... ---%");
    let result = writeData(services_filepath, JSON.stringify(mappedData), (result)=> {
        process.stdout.write("\b\b\b\bOK  \n");
    });
});

return;