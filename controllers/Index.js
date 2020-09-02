var fs = require("fs");

exports.avatarGet = function (req, res, next) {
    console.log(req.params.hash);
    try {
        var img = fs.readFileSync(`uploads/profiles/${req.params.hash}/avatar.png`);
        res.writeHead(200, { 'Content-Type': 'image/gif' });
        res.end(img, 'binary');
    }
    catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('image not found', 'text');
    }
};