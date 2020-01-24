const fs = require('fs');
const request = require('request');

const registry_home = 'http://localhost:8080';
const registry_service_endpoint = 'service?nocount';
const services_filepath = '../views/assets/data/vServices.json';



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
    return data.map((service, i)=> {

        if(service.name==null || service.name=='') service.name = "<service not available>";
        if(service.description==null || service.description=='') service.description = service.name;
        if(service.url==null || service.url=='') service.url = "";
        if(service.organization==null || service.organization=='') service.organization = "";
        if(service.organizationName==null || service.organizationName=='') service.organizationName = "";
        if(service.id==null || service.id=='') service.id = "";
        if(service.spid_level==null || !Array.isArray(service.spid_level)) service.spid_level = [];
        if(service.spid_attributes==null || !Array.isArray(service.spid_attributes)) service.spid_attributes = [];
        if(service.theme==null || service.theme=='') service.theme = "";
        if(service.theme_description==null || service.theme_description=='') service.theme_description = "";
        if(service.subtheme==null || service.subtheme=='') service.subtheme = "";  
        if(service.subtheme_description==null || service.subtheme_description=='') service.subtheme_description = ""; 

        let s = {
            "serviceName": service.name,
            "description": service.description,
            "url": service.url,
            "serviceProviderId": service.organization,
            "name": service.organization_name,
            "federationRegistryId": service.id,
            "entityName": service.organization_name,
            "spidLevel": service.spid_level.join(","),
            "attributes": service.spid_attributes.join(","),
            "themeCode": service.theme,
            "themeDescription": service.theme_description,
            "subThemeCode": service.subtheme,
            "subThemeDescription": service.subtheme_description,
            "id": service.id
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





console.log("SPID Site Service Updater. v1.0.0\n\n");

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