
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Peeks',
                         active: 'home'});
};
exports.image = function(req, res){
    res.render('image', { title: 'Peeks: Image',
                         active: 'image'});
};
exports.file = function(req, res){
    res.render('file', {title: "Peeks: File",
                        active: 'file'})
}