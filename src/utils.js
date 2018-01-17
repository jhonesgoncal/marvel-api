const config = require("./config");
const azure = require('azure-storage');
const guid = require('guid');

module.exports = {
    saveThumbnail: async(entity, thumbnail, extension) => {
        //Cria o Blob Service
        const blob =  azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString();
        let rawdata = thumbnail;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva imagem
        await blob.createBlockBlobFromText(`${entity}-images`, filename, buffer, {
            contentType: type
        }, function (error, result, response){
            if(error){
                filename = `default-${entity}.png`
            }
        });

        return {
            path: `https://marvelapi.blob.core.windows.net/${entity}-images/${filename}`,
            extension: extension
        }
   }
}



