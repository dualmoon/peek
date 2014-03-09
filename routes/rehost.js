var request = require('request'),
    fs = require('fs');

exports.getImg = function(req, res){
    var rqurl = req.url.split("?")[1];
    //later I will rewrite imgur image page urls to direct images
    if(/((http:\/\/)|^)(www.)?imgur\.com\//.test(rqurl)){
        var rest = rqurl.replace(/((http:\/\/)|^)(www.)?imgur\.com\//,"");
        
    }
    //maybe the same for twimg
    var rq = request(rqurl,function(e,r,body){
        if(!e && 
           r.statusCode==200 && 
           r.headers['content-type'].indexOf('image') > -1){
            var b64 = fs.readFileSync('temp/temp.png').toString('base64');
            res.send(200,"data:image/png;base64,"+b64);
        } else {
            res.send(404,"Could not get image.");
        }
    }).pipe(fs.createWriteStream('temp/temp.png'));
};