// Copyright 2022, University of Colorado Boulder

/**
 * The model class for Conversion screen.
 *
 * @author Mario (Software Engineer)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import EnergyChunkGroup from '../../../../energy-forms-and-changes/js/common/model/EnergyChunkGroup.js';
import EnergyChunkWanderControllerGroup from '../../../../energy-forms-and-changes/js/common/model/EnergyChunkWanderControllerGroup.js';
import merge from '../../../../phet-core/js/merge.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import labSuhu from '../../labSuhu.js';
import Thermometer from '../../scale/model/Thermometer.js';

// CONSTANTS
const SCREEN_WIDTH = 1000;

const GROUNDS_SPOT = 8;
const THERMOMETER_LEFT_INDEX = 1;
const THERMOMETER_RIGHT_INDEX = 3;
const THERMOMETER_SINGLE_INDEX = 2;
const BOX_INDEX = 6;

const THERMOMETERS_TYPE = Thermometer.TYPES;

class ConversionModel {
  /**
   * 
   * @param {Object} providedOptions 
   */
  constructor( providedOptions ) {
    
    const options = merge( {

    }, providedOptions );
    const tandem = options.tandem;

    this.thermometerTypeLeftProperty = new Property( Thermometer.NONE );
    this.thermometerTypeRightProperty = new Property( Thermometer.NONE );

    const groundsXPos = [];
    _.times( GROUNDS_SPOT, idx => {
      groundsXPos.push( SCREEN_WIDTH / GROUNDS_SPOT * idx );
    } );

    this.thermometerLeftXPosition = groundsXPos[ THERMOMETER_LEFT_INDEX ];
    this.thermometerRightXPosition = groundsXPos[ THERMOMETER_RIGHT_INDEX ];
    this.thermometerSingleXPosition = groundsXPos[ THERMOMETER_SINGLE_INDEX ];
    this.boxXPosition = groundsXPos[ BOX_INDEX ];

    // this.thermometerLeftXPositionProperty = new NumberProperty(
    //   this.thermometerSingleXPosition,
    //   {
    //     tandem: tandem.createTandem( 'thermometerLeftPositionProperty' )
    //   }
    // );
    // this.thermometerLeftVisibilityProperty = new BooleanProperty( true, {
    //   tandem: tandem.createTandem( 'thermometerLeftVisibilityProperty' )
    // } );
    this.thermometerRightVisibilityProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'thermometerRightVisibilityProperty' )
    } );

    // Listen the type change for visiblity
    this.thermometerTypeLeftProperty.link( thermometerType => {
      this.thermometerRightVisibilityProperty.set( thermometerType !== Thermometer.NONE );

      // reset right thermometer if left is none
      if ( thermometerType === Thermometer.NONE ) {
        this.thermometerTypeRightProperty.reset();
      }
    } );
    // this.thermometerRightVisibilityProperty.link( visible => {
    //   if ( visible ) {
    //     this.thermometerLeftXPositionProperty.set(
    //       this.thermometerLeftXPosition
    //     );
    //   } else {
    //     this.thermometerLeftXPositionProperty.set(
    //       this.thermometerSingleXPosition
    //     );
    //   }
    // } );

    /**
     * The temperature property of all thermometers
     */
    this.thermometersTemperatureProperty = {};
    for ( const thermometerType of THERMOMETERS_TYPE ) {
      const temperatureProperty = new NumberProperty( thermometerType.middlePoint, {
        tandem: tandem.createTandem( thermometerType.name + 'TemperatureProperty' )
      } );
      // set deferred true to disable the listener ( will be enabled if thermometer visible )
      temperatureProperty.setDeferred( true );

      this.thermometersTemperatureProperty[ thermometerType.name ] = temperatureProperty;
    }

    /**
     * Create the listener for change temperature
     */
    for ( const thermometerType of THERMOMETERS_TYPE ) {
      const temperatureProperty = this.thermometersTemperatureProperty[ thermometerType.name ];
      for ( const otherThermometerType of THERMOMETERS_TYPE ) {
        const otherTemperatureProperty = this.thermometersTemperatureProperty[ otherThermometerType.name ];
        if ( temperatureProperty !== otherTemperatureProperty ) {
          temperatureProperty.link( temperature => {
            otherTemperatureProperty.values = otherThermometerType.getConverterFrom( thermometerType )( temperature );
          } );
        }
      }
    }

    /**
     * Set all thermometer temperature property to deferred
     * @param {Thermometer} thermometerType 
     */
    const setTemperaturePropertyDeferred = () => {
      for ( const temperatureProperty of Object.values( this.thermometersTemperatureProperty ) ) {
        temperatureProperty.setDeferred( true );
      }
    };
    // Listen on thermometer type change then set the temperature property to not deferred so the property can send notif on change
    this.thermometerTypeLeftProperty.link( thermometerType => {
      if ( thermometerType !== Thermometer.NONE ) {
        setTemperaturePropertyDeferred();
        this.thermometersTemperatureProperty[ thermometerType.name ].setDeferred( false );
        this.thermometersTemperatureProperty[ this.thermometerTypeRightProperty.value ]?.setDeferred( false );
      }
    } );
    this.thermometerTypeRightProperty.link( thermometerType => {
      if ( thermometerType !== Thermometer.NONE ) {
        setTemperaturePropertyDeferred();
        this.thermometersTemperatureProperty[ thermometerType.name ].setDeferred( false );
        this.thermometersTemperatureProperty[ this.thermometerTypeLeftProperty.value ]?.setDeferred( false );
      }
    } );

  }

  /**
   * Resets the model.
   */
  reset() {
    this.thermometerTypeLeftProperty.reset();
    this.thermometerTypeRightProperty.reset();
    this.thermometerRightVisibilityProperty.reset();
    for ( const temperatureProperty of Object.values( this.thermometersTemperatureProperty ) ) {
      temperatureProperty.reset();
    }
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  step( dt ) {
    //TODO
  }


  static SCREEN_WIDTH = SCREEN_WIDTH;
  static THERMOMETERS_TYPE = THERMOMETERS_TYPE;
}

labSuhu.register( 'ConversionModel', ConversionModel );
export default ConversionModel;