const config = require("./config");
const azure = require('azure-storage');
const guid = require('guid');

module.exports = {
    saveThumbnail: async(entity, thumbnail, extension) => {
        //Cria o Blob Service
        const blobSvc =  azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString();
        let filenameExtension = `${filename}.${extension}`;
        let rawdata = thumbnail;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva imagem
        await blobSvc.createBlockBlobFromText(`${entity}-images`, filenameExtension, buffer, {
            contentType: type
        }, function (error, result, response){
            if(error){
                filename = `default-${entity}`;
                extension = 'png';
            }
        });

        return {
            path: `https://marvelapi.blob.core.windows.net/${entity}-images/${filename}`,
            extension: extension
        }
   }
}



