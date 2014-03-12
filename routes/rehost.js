var request = require('request'),
    fs = require('fs');
exports.getImg = function(req, res) {
    var rqurl = req.url.split("?")[1];
    var test = true;
    //later I will rewrite imgur image page urls to direct images
    rqurl = rqurl.replace(/\s/g,''); // probably unncessary
    if(/((http:\/\/)|^)(www.)?imgur\.com\//.test(rqurl)) {
        var rest = rqurl.replace(/((http:\/\/)|^)(www.)?imgur\.com\//, "");
        if(/gallery/.test(rest)) {
            rest = rest.replace(/gallery/, "");
            rest = rest.replace(/\//, "");
        } else if(/^a\//.test(rest)) {
            test = false;
        }
        rqurl = 'http://i.imgur.com/' + rest + '.jpg';
    } //maybe the same for twimg
    console.log("DEBUG: about to request " + rqurl);
    var rq = request(rqurl, function(e, r, body) {
        var ctype = r.headers['content-type'];
        if(!e && r.statusCode == 200 && ctype.indexOf('image') > -1 && test) {
            var b64 = fs.readFileSync('temp/temp.png').toString('base64');
            res.send(200, "data:" + ctype + ";base64," + b64);
        } else {
            res.send(404, "Could not get image.");
        }
    }).pipe(fs.createWriteStream('temp/temp.png'));
};