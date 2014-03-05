
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Rehoster' });
};
exports.image = function(req, res){
    res.render('image', { title: 'Rehoster: image' });
};