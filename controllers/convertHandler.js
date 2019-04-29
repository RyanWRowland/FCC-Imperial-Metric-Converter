/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    // find index of first letter possibly denoting the unit
    const search = input.search(/[a-zA-Z]/); 
    
    // slice the number portion from the input if a unit portion is present
    const numInput = search !== -1 ? input.slice(0, search) : input;
    
    // no num provided
    if (numInput === '') return 1;
    
    // split fractions if any
    const nums = numInput.split('/');
    if (nums.length > 2) {
      // multiple fraction, bad input
      return null;
    }
    const validNum = /(^\.?[0-9]+$|^[0-9]+\.[0-9]+$)/
    if (nums.length === 1) {
      const num = nums[0];
      // not a fraction, if number is valid, return it as a float, eitherwise its a bad input
      return validNum.test(num) ? parseFloat(num) : null;
    }
    else {
      const num1 = nums[0], num2 = nums[1];
      if (validNum.test(num1) && validNum.test(num2)) {
        return parseFloat(num1) / parseFloat(num2);
      }
      else {
        // a part of the fraction was invalid
        return null;
      }
    }
  };
  
  this.getUnit = function(input) {
    // find index of first letter possibly denoting the unit
    const search = input.search(/[a-zA-Z]/); 
    
    if (search === -1) {
      // no letter characters found, no unit to return
      return null
    }
    
    // slice unit portion and normalize
    const unitInput = input.slice(search).toLowerCase();
    
    const validUnits = /^(gal|l||lbs|kg|mi|km)$/
    if (validUnits.test(unitInput)) {
      return unitInput === 'l' ? 'L' : unitInput;
    }
    else {
      // invalid unit
      return null;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'L': 
        return 'gal';
        break;
      case 'gal':
        return 'L';
        break;
      case 'lbs':
        return 'kg';
        break;
      case 'kg':
        return 'lbs';
        break;
      case 'mi':
        return 'km';
        break;
      case 'km':
        return 'mi';
        break;
      default:
        return null;
        break;
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'L': 
        return 'liters';
        break;
      case 'gal':
        return 'gallons';
        break;
      case 'lbs':
        return 'pounds';
        break;
      case 'kg':
        return 'kilograms';
        break;
      case 'mi':
        return 'miles';
        break;
      case 'km':
        return 'kilometers';
        break;
      default:
        return null;
        break;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'L': 
        return initNum / galToL;
        break;
      case 'gal':
        return initNum * galToL;
        break;
      case 'lbs':
        return initNum * lbsToKg;
        break;
      case 'kg':
        return initNum / lbsToKg;
        break;
      case 'mi':
        return initNum * miToKm;
        break;
      case 'km':
        return initNum / miToKm;
        break;
      default:
        return null;
        break;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let init = initNum.toString() + ' ' + this.spellOutUnit(initUnit);
    let retu = returnNum.toFixed(5) + ' ' + this.spellOutUnit(returnUnit);
    return init + ' converts to ' + retu;
  };
  
}

module.exports = ConvertHandler;
