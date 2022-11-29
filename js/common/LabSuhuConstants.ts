// Copyright 2022, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Mario (Software Engineer)
 */

import LinearFunction from '../../../dot/js/LinearFunction.js';
import labSuhu from '../labSuhu.js';

// time values for normal and fast-forward motion
const FRAMES_PER_SECOND = 60.0;
const SIM_TIME_PER_TICK_NORMAL = 1 / FRAMES_PER_SECOND;

// physical temperature constants
const ROOM_TEMPERATURE = 296; // in degrees Kelvin
const WATER_FREEZING_POINT_TEMPERATURE = 273.15; // in degrees Kelvin

// constants that define physical parameters of various rectangular objects.
const BRICK_DENSITY = 3300; // in kg/m^3, source = design document plus some tweaking to keep chunk numbers reasonable
const BRICK_SPECIFIC_HEAT = 840; // in J/kg-K, source = design document
const BLOCK_SURFACE_WIDTH = 0.045;

// empirically determined
const NUM_ENERGY_CHUNKS_IN_BRICK_AT_FREEZING = 1.25;
const NUM_ENERGY_CHUNKS_IN_BRICK_AT_ROOM_TEMP = 2.4; // close to rounding to 3 so that little energy needed to transfer first chunk

// brick constants needed for energy chunk mapping
const BRICK_ENERGY_AT_ROOM_TEMPERATURE = Math.pow( BLOCK_SURFACE_WIDTH, 3 ) * BRICK_DENSITY * BRICK_SPECIFIC_HEAT * ROOM_TEMPERATURE; // In joules.
const BRICK_ENERGY_AT_FREEZING_TEMPERATURE = Math.pow( BLOCK_SURFACE_WIDTH, 3 ) * BRICK_DENSITY * BRICK_SPECIFIC_HEAT * WATER_FREEZING_POINT_TEMPERATURE; // In joules.

// constants for temperature-energy mapping functions
const LOW_ENERGY_FOR_MAP_FUNCTION = BRICK_ENERGY_AT_FREEZING_TEMPERATURE;
const HIGH_ENERGY_FOR_MAP_FUNCTION = BRICK_ENERGY_AT_ROOM_TEMPERATURE;

// mapping function that maps the number of chunks of energy to the energy value
const MAP_NUM_CHUNKS_TO_ENERGY = new LinearFunction(
  NUM_ENERGY_CHUNKS_IN_BRICK_AT_FREEZING,
  NUM_ENERGY_CHUNKS_IN_BRICK_AT_ROOM_TEMP,
  LOW_ENERGY_FOR_MAP_FUNCTION,
  HIGH_ENERGY_FOR_MAP_FUNCTION
);

const LabSuhuConstants = {

  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  // model-view transform scale factors for each screen - smaller zooms out, larger zooms in
  INTRO_MVT_SCALE_FACTOR: 1700,
  SCALE_MVT_SCALE_FACTOR: 1700,
  CONVERSION_MVT_SCALE_FACTOR: 1700,

  // themperature
  CELCIUS: {
    WATER_FREEZING_POINT_TEMPERATURE: 0,
    WATER_BOILING_POINT_TEMPERATURE: 100,
    ROOM_TEMPERATURE: 22.85,
    convertFromKelvin: ( temperature: number ): number => {
      return temperature - 273.15;
    },
    convertFromReamur: ( temperature: number ): number => {
      return temperature * 5 / 4;
    },
    convertFromFahrenheit: ( temperature: number ): number => {
      return ( temperature - 32 ) * 5 / 9;
    },
    convertFromCelcius: ( temperature: number ): number => {
      return temperature;
    },
  },
  FAHRENHEIT: {
    WATER_FREEZING_POINT_TEMPERATURE: 32,
    WATER_BOILING_POINT_TEMPERATURE: 212,
    ROOM_TEMPERATURE: 73.13,
    convertFromKelvin: ( temperature: number ): number => {
      return ( temperature - 273.15 ) * 9 / 5 + 32;
    },
    convertFromReamur: ( temperature: number ): number => {
      return ( temperature * 9 / 4 ) + 32;
    },
    convertFromFahrenheit: ( temperature: number ): number => {
      return temperature;
    },
    convertFromCelcius: ( temperature: number ): number => {
      return ( temperature * 9 / 5 ) + 32;
    },
  },
  REAMUR: {
    WATER_FREEZING_POINT_TEMPERATURE: 0,
    WATER_BOILING_POINT_TEMPERATURE: 80,
    ROOM_TEMPERATURE: 18.28,
    convertFromKelvin: ( temperature: number ): number => {
      return ( temperature - 273.15 ) * 4 / 5;
    },
    convertFromReamur: ( temperature: number ): number => {
      return temperature;
    },
    convertFromFahrenheit: ( temperature: number ): number => {
      return ( temperature - 32 ) * 4 / 9;
    },
    convertFromCelcius: ( temperature: number ): number => {
      return temperature * 4 / 5;
    },
  },
  KELVIN: {
    WATER_FREEZING_POINT_TEMPERATURE: 273.15,
    WATER_BOILING_POINT_TEMPERATURE: 373.15,
    ROOM_TEMPERATURE: ROOM_TEMPERATURE,
    convertFromKelvin: ( temperature: number ): number => {
      return temperature;
    },
    convertFromReamur: ( temperature: number ): number => {
      return ( temperature * 5 / 4 ) + 273.15;
    },
    convertFromFahrenheit: ( temperature: number ): number => {
      return ( temperature - 32 ) * 5 / 9 + 273.15;
    },
    convertFromCelcius: ( temperature: number ): number => {
      return temperature + 273.15;
    },
  },

  // constants for the burners.
  INITIAL_FLUID_PROPORTION: 0.5,
  BURNER_EDGE_TO_HEIGHT_RATIO: 0.2, // multiplier empirically determined for best look
  BURNER_PERSPECTIVE_ANGLE: Math.PI / 4, // positive is counterclockwise, a value of 0 produces a non-skewed rectangle

  // constants for the beaker
  Z_TO_Y_OFFSET_MULTIPLIER: -0.25,

  // time values for normal and fast-forward motion
  FRAMES_PER_SECOND: FRAMES_PER_SECOND,
  SIM_TIME_PER_TICK_NORMAL: SIM_TIME_PER_TICK_NORMAL,
  MAX_HEAT_EXCHANGE_TIME_STEP: SIM_TIME_PER_TICK_NORMAL,

  ENERGY_PER_CHUNK: MAP_NUM_CHUNKS_TO_ENERGY.evaluate( 2 ) - MAP_NUM_CHUNKS_TO_ENERGY.evaluate( 1 ),

  // Control panel
  CONTROL_PANEL_CORNER_RADIUS: 10,
  CONTROL_PANEL_OUTLINE_LINE_WIDTH: 1.5,

  // constants for energy chunks
  ENERGY_CHUNK_VELOCITY: 0.04, // in meters/sec
  ENERGY_CHUNK_WIDTH: 19, // in screen coords, which are close to pixels. Empirically determined to look nice.
  
  // max travel height of energy chunks, in meters. the y-center position and zoom factors are different on each
  // screen, so these were empirically determined to visually match on both screens
  INTRO_SCREEN_ENERGY_CHUNK_MAX_TRAVEL_HEIGHT: 0.85,
  SYSTEMS_SCREEN_ENERGY_CHUNK_MAX_TRAVEL_HEIGHT: 0.55,
};

labSuhu.register( 'LabSuhuConstants', LabSuhuConstants );
export default LabSuhuConstants;