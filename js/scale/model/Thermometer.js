// Copyright 2022, University of Colorado Boulder

import LabSuhuConstants from "../../common/LabSuhuConstants.js";
import LabSuhuSymbols from "../../common/LabSuhuSymbols.js";
import labSuhu from "../../labSuhu.js";
import LabSuhuStrings from "../../LabSuhuStrings.js";

/**
 * Thermometer model with units type attribute
 *
 * @author Mario (Software Engineer)
 */

class Thermometer {
    /**
     * Create Thermometer model with some attribute
     * @param {string} units Units type of the thermometer. ex: K, C, R, F 
     * @param {string} title Thermometer name that will be shown
     * @param {string} letter The short name from the thermometer name 
     * @param {number} lowerPoint The lower fixed point of the thermometer
     * @param {number} upperPoint The upper fixed point of the thermometer
     * @param {string} symbol Symbol
     */
    constructor( name, units, title, letter, lowerPoint, upperPoint, symbol, skala ) {
        this.name = name;
        this.units = units;
        this.title = title;
        this.letter = letter;
        this.lowerPoint = lowerPoint;
        this.upperPoint = upperPoint;
        this.symbol = symbol;
        this.skala = skala;
    }

    get middlePoint() {
        return this.lowerPoint + this.halfRange;
    }
    
    get range() {
        return this.upperPoint - this.lowerPoint;
    }
    
    get halfRange() {
        return this.range / 2;
    }

    /**
     * Get function that can convert temperature from given thermometer type to this thermometer type
     * @param {Thermometer} thermometerType ThermometerType
     * @return {( temperature:number ) => number} Function to convertion to other type
     */
    getConverterFrom( thermometerType ) {
        let thermometerConstant;
        switch ( this.name ) {
            case 'celcius':
                thermometerConstant = LabSuhuConstants.CELCIUS;
                break;
            case 'fahrenheit':
                thermometerConstant = LabSuhuConstants.FAHRENHEIT;
                break;
            case 'reamur':
                thermometerConstant = LabSuhuConstants.REAMUR;
                break;
            default: // case 'kelvin'
                thermometerConstant = LabSuhuConstants.KELVIN;
        }

        switch ( thermometerType.name ) {
            case 'celcius':
                return thermometerConstant.convertFromCelcius;
            case 'fahrenheit':
                return thermometerConstant.convertFromFahrenheit;
            case 'reamur':
                return thermometerConstant.convertFromReamur;
            default: // case 'kelvin'
                return thermometerConstant.convertFromKelvin;
        }        
    }
}

labSuhu.register( 'Thermometer', Thermometer );

Thermometer.CELCIUS = new Thermometer( 
    'celcius',
    'C', 
    LabSuhuStrings.celciusName, 
    LabSuhuStrings.celciusLetter, 
    LabSuhuConstants.CELCIUS.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.CELCIUS.WATER_BOILING_POINT_TEMPERATURE,
    LabSuhuSymbols.c,
    5
);
Thermometer.FAHRENHEIT = new Thermometer( 
    'fahrenheit',
    'F', 
    LabSuhuStrings.fahrenheitName, 
    LabSuhuStrings.fahrenheitLetter, 
    LabSuhuConstants.FAHRENHEIT.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.FAHRENHEIT.WATER_BOILING_POINT_TEMPERATURE,
    LabSuhuSymbols.f,
    9
);
Thermometer.REAMUR = new Thermometer( 
    'reamur',
    'R', 
    LabSuhuStrings.reamurName, 
    LabSuhuStrings.reamurLetter, 
    LabSuhuConstants.REAMUR.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.REAMUR.WATER_BOILING_POINT_TEMPERATURE,
    LabSuhuSymbols.r,
    4
);
Thermometer.KELVIN = new Thermometer( 
    'kelvin',
    'K', 
    LabSuhuStrings.kelvinName, 
    LabSuhuStrings.kelvinLetter, 
    LabSuhuConstants.KELVIN.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.KELVIN.WATER_BOILING_POINT_TEMPERATURE,
    LabSuhuSymbols.k,
    5
);
Thermometer.NONE = new Thermometer( 'none' );

Thermometer.TYPES = [
    Thermometer.CELCIUS,
    Thermometer.FAHRENHEIT,
    Thermometer.REAMUR,
    Thermometer.KELVIN
];

// verify that enumeration is immutable, without the runtime penalty in production code
assert && Object.freeze( Thermometer );

export default Thermometer;