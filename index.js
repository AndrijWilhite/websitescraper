var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrape', function(req, res){

  url = 'http://originbooks.herokuapp.com/';

  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);
          var title, author, price;
          
          var data = [];
          $('.col-xs-12').each(function(i,elem){
              var el = $(this);
              
              title = el.children('.panel-default').children('.panel-heading').text();
              title = title.trim();
              author = el.children('.panel-default').children('.panel-body').children('p').text();
              price = el.children('.panel-default').children('.panel-body').children('.green').text();
              imageURL = el.children('.panel-default').children('.panel-body').children('.img-responsive').attr('src');
              
              data.push({
                  title,
                  author,
                  price,
                  imageURL
              })
          });

          fs.writeFile('output.json', JSON.stringify(data, null, 4), function(err){
            console.log('File done');
          })
          res.send('done');
      }
      
  });

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;