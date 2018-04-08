// var CryptoJS = require('crypto-js');
// var BlakeHash = require('blake-hash');
// var Base58 = require('bs58');
// var t = BlakeHash('blake256').update('MIIBCgKCAQEAk1N4FQ790kVyzrBZZ/RhH9Zyf7ghA4ThtdHgtB/ZfSD6VcY7j09XqfspBVHb\n3n6tw96vlt4W5oh5vNaPHWL9ukcWSBIqE6FFqexHOTNgf54mKBPd82vf2Q8CXZe3odoTSsAH\ncU5nW11D45CFOLy8hykRWySJ/V/MPXY5Xc/IaFLwtQSuC9V60+hdpdK7iVxKx9mcCNcqLn0s\n6PO03VyKBSna0C7luoTrQwhik4kvmm/w5DDg3Os5fDeOznM7+7486FjiTFCbNT4NGbA9c5iE\nmN/D9Mv0MhIWrWZ9AfAZklsZS0LrpGrcznqUCOpPh7X8gAI5+FBKpzGl0z9bsC5XVQIDAQAB').digest('hex')
// console.log(Base58.encode(t));

//MIIBCgKCAQEAk1N4FQ790kVyzrBZZ/RhH9Zyf7ghA4ThtdHgtB/ZfSD6VcY7j09XqfspBVHb\n3n6tw96vlt4W5oh5vNaPHWL9ukcWSBIqE6FFqexHOTNgf54mKBPd82vf2Q8CXZe3odoTSsAH\ncU5nW11D45CFOLy8hykRWySJ/V/MPXY5Xc/IaFLwtQSuC9V60+hdpdK7iVxKx9mcCNcqLn0s\n6PO03VyKBSna0C7luoTrQwhik4kvmm/w5DDg3Os5fDeOznM7+7486FjiTFCbNT4NGbA9c5iE\nmN/D9Mv0MhIWrWZ9AfAZklsZS0LrpGrcznqUCOpPh7X8gAI5+FBKpzGl0z9bsC5XVQIDAQAB

const express = require('express');

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendfile(__dirname + '/build/index.html');
})

app.listen(8080);