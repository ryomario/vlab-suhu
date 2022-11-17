// Copyright 2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import labSuhu from './labSuhu.js';

type StringsType = {
  'lab-suhu': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'screen': {
    'introName': string;
    'introNameStringProperty': LinkableProperty<string>;
    'scaleName': string;
    'scaleNameStringProperty': LinkableProperty<string>;
    'conversionName': string;
    'conversionNameStringProperty': LinkableProperty<string>;
  };
  'unknownLiquid': string;
  'unknownLiquidStringProperty': LinkableProperty<string>;
  'water': string;
  'waterStringProperty': LinkableProperty<string>;
  'celcius': {
    'letter': string;
    'letterStringProperty': LinkableProperty<string>;
    'name': string;
    'nameStringProperty': LinkableProperty<string>;
  };
  'fahrenheit': {
    'letter': string;
    'letterStringProperty': LinkableProperty<string>;
    'name': string;
    'nameStringProperty': LinkableProperty<string>;
  };
  'reamur': {
    'letter': string;
    'letterStringProperty': LinkableProperty<string>;
    'name': string;
    'nameStringProperty': LinkableProperty<string>;
  };
  'kelvin': {
    'letter': string;
    'letterStringProperty': LinkableProperty<string>;
    'name': string;
    'nameStringProperty': LinkableProperty<string>;
  };
};

const LabSuhuStrings = getStringModule( 'LAB_SUHU' ) as StringsType;

labSuhu.register( 'LabSuhuStrings', LabSuhuStrings );

export default LabSuhuStrings;
