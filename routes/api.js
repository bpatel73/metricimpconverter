'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  const regex = /^\d+(\.\d+)?$|^\d+(\.\d+)?\/\d+(\.\d+)?$/

  app.route('/api/convert').get(function(req, res){
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    console.log(initNum, initUnit);
    if(!regex.test(initNum) && !returnUnit){
      res.send('invalid number and unit');
    }else if(!returnUnit){
      res.send('invalid unit');
    }else if(!regex.test(initNum)){
      res.send('invalid number');
    }else{
      initNum = eval(initNum);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({
        initNum: eval(initNum),
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: resultString
      });
    }
    
  });

};
