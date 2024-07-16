const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Whole number input', function(){
        let input = '3L';
        assert.equal(convertHandler.getNum(input), 3);
    });

    test('Decimal number input', function(){
        let input = '5.3kg'
        assert.equal(convertHandler.getNum(input), 5.3);
    });

    test('Read fractional input', function(){
        let input = '3/2mi'
        assert.equal(eval(convertHandler.getNum(input)), 3/2);
    });
    
    test('Read fractional input with decimal', function(){
        let input = '5.3/2gal'
        assert.equal(eval(convertHandler.getNum(input)), 5.3/2);
    });

    test('Return an error on double fraction', function(){
        let input = '3//2L'
        assert.isNull(convertHandler.getNum(input));
    });
    
    test('Default to numerical 1 when no numerical input provided', function(){
        let input = 'kg'
        assert.equal(convertHandler.getNum(input), 1);
    });

    test('Read each valid input', function(){
        let input = '5.4/3lbs'
        assert.equal(convertHandler.getUnit(input), 'lbs');
    });

    test('Return error for invalid input unit', function(){
        let input = '3.5kilos'
        assert.equal(convertHandler.getUnit(input), 'invalid input');
    });

    test('Return correct return unit for valid input unit', function(){
        let input = '1/2km'
        assert.equal(convertHandler.getReturnUnit(
            convertHandler.getUnit(input)
        ), 'mi');
    });

    test('Return correct spelled-out string for valid input unit', function(){
        let input = '4l';
        assert.equal(convertHandler.spellOutUnit(
            convertHandler.getUnit(input)
        ), 'L');
    });
    
    test('Correctly convert gal to L', function(){
        let input = '4gal'
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
        assert.equal(convertHandler.convert(initNum, initUnit), 15.14164);
    });

    test('Correctly convert L to gal', function(){
        let input = '1.5L'
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
        assert.equal(convertHandler.convert(initNum, initUnit), 0.39626);
    });

    test('Correctly convert mi to km', function(){
        let input = '1/2mi'
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
        assert.equal(convertHandler.convert(initNum, initUnit), 0.80467);
    });

    test('Correctly convert km to mi', function(){
        let input = '1/2km'
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
        assert.equal(convertHandler.convert(initNum, initUnit), 0.31069);
    });

    test('Correctly convert lbs to kg', function(){
        let input = '5.4/3lbs'
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
        assert.equal(convertHandler.convert(initNum, initUnit), 0.81647);
    });

    test('Correctly convert kg to lbs', function(){
        let input = 'kg'
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.spellOutUnit(convertHandler.getUnit(input));
        assert.equal(convertHandler.convert(initNum, initUnit), 2.20462);
    });
});