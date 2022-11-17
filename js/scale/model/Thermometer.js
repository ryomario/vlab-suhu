// Copyright 2022, University of Colorado Boulder

import LabSuhuConstants from "../../common/LabSuhuConstants.js";
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
     */
    constructor( name, units, title, letter, lowerPoint, upperPoint ) {
        this.name = name;
        this.units = units;
        this.title = title;
        this.letter = letter;
        this.lowerPoint = lowerPoint;
        this.upperPoint = upperPoint;
    }
}

labSuhu.register( 'Thermometer', Thermometer );

Thermometer.CELCIUS = new Thermometer( 
    'celcius',
    'C', 
    LabSuhuStrings.celcius.name, 
    LabSuhuStrings.celcius.letter, 
    LabSuhuConstants.CELCIUS.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.CELCIUS.WATER_BOILING_POINT_TEMPERATURE
);
Thermometer.FAHRENHEIT = new Thermometer( 
    'fahrenheit',
    'F', 
    LabSuhuStrings.fahrenheit.name, 
    LabSuhuStrings.fahrenheit.letter, 
    LabSuhuConstants.FAHRENHEIT.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.FAHRENHEIT.WATER_BOILING_POINT_TEMPERATURE
);
Thermometer.REAMUR = new Thermometer( 
    'reamur',
    'R', 
    LabSuhuStrings.reamur.name, 
    LabSuhuStrings.reamur.letter, 
    LabSuhuConstants.REAMUR.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.REAMUR.WATER_BOILING_POINT_TEMPERATURE
);
Thermometer.KELVIN = new Thermometer( 
    'kelvin',
    'K', 
    LabSuhuStrings.kelvin.name, 
    LabSuhuStrings.kelvin.letter, 
    LabSuhuConstants.KELVIN.WATER_FREEZING_POINT_TEMPERATURE,
    LabSuhuConstants.KELVIN.WATER_BOILING_POINT_TEMPERATURE
);

Thermometer.TYPES = [
    Thermometer.CELCIUS,
    Thermometer.FAHRENHEIT,
    Thermometer.REAMUR,
    Thermometer.KELVIN
];

// verify that enumeration is immutable, without the runtime penalty in production code
assert && Object.freeze( Thermometer );

export default Thermometer;