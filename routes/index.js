var express = require('express');
var router = express.Router();
var request =require('request')
var mongo = require('mongoose');
var JefNode = require('json-easy-filter').JefNode;
var winston = require('winston')

winston.add(
  winston.transports.File, {
    filename: 'logs.log',
    level: 'info',
    json: true,
    eol: 'rn', // for Windows, or `eol: ‘n’,` for *NIX OSs
    timestamp: true
  }
)




var Employee = require('../models/employee');



router.get('/', function(req, res, next) {
  res.render('index', { title: 'sudheer solutions' });
});
router.get('/data', function(req, res, next) {

  res.render('data', { title: 'sudheer solutions' });
});

router.post('/hotelsdata', function (req, res) {


  var url = 'https://developer.goibibo.com/api/voyager/get_hotels_by_cityid/?app_id=07bc95a3&app_key=9771b768734c9e0656a00a196b8710bc&city_id=2162254155836171767'
 winston.log('info',"url working properly")
  var totalarray=[]
  console.log(url)
  request(url, function (err, response, body) {
    if (err) {
      console.log("error")

    }



    else {
      winston.log('info',"there no error")


      var hoteldata = JSON.parse(body)
      //  console.log(hoteldata)
      var s = hoteldata.data
      //res.send(s)

      //  var obj=Object.s[key].hotel_geo_node.name
      //console.log(obj)
      Object.keys(s).forEach(function (key) {
        var array =
          {
            names: s[key].hotel_geo_node.name,
            location: s[key].hotel_geo_node.location,

            id: s[key].hotel_geo_node._id,
            type: s[key].hotel_geo_node.type
          }


        totalarray.push(array)
      })

      res.render('list', {hotelsdata: totalarray})


    }

  })

})



module.exports = router;

