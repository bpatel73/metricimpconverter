function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const index = input.search(/[a-zA-Z]/);
    const regex = /^\d+(\.\d+)?$|^\d+(\.\d+)?\/\d+(\.\d+)?$/;
    if(index === -1){
      result = input;
    }else{
      result = input.slice(0,index);
    }
    result = result === '' ? '1' : regex.test(result) ? result : null;
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const index = input.search(/[a-zA-Z]/);
    const regex = /gal|km|^l$|mi|kg|lbs/;
    if(index > -1){
      result = input.slice(index).toLowerCase();
    }
    result = regex.test(result) ? result : 'invalid input';
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L'
        break;
      case 'L':
        result = 'gal'
        break;
      case 'mi':
        result = 'km'
        break;
      case 'km':
        result = 'mi'
        break;
      case 'lbs':
        result = 'kg'
        break;
      case 'kg':
        result = 'lbs'
        break;
      default:
        break;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if(unit){
      if(unit === 'L' || unit === 'l'){
        result = 'L';
      }else{
        result = unit.toLowerCase();
      }
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initNum = eval(initNum);

    if(initUnit === 'gal'){
      result = initNum * galToL;
    }else if(initUnit === 'L'){
      result = initNum / galToL;
    }else if(initUnit === 'lbs'){
      result = initNum * lbsToKg;
    }else if(initUnit === 'kg'){
      result = initNum / lbsToKg;
    }else if(initUnit === 'mi'){
      result = initNum * miToKm;
    }else if(initUnit === 'km'){
      result = initNum / miToKm;
    }else{
      result = result;
    }
    result = Math.round(result*100000) / 100000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    result = result.replace(/lbs/, 'pounds');
    result = result.replace(/kg/, 'kilograms');
    result = result.replace(/mi/, 'miles');
    result = result.replace(/km/, 'kilometers');
    result = result.replace(/L/, 'liters');
    result = result.replace(/gal/, 'gallons');
    
    return result;
  };
  
}

module.exports = ConvertHandler;
