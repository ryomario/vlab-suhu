// Copyright 2022, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Mario (Software Engineer)
 */

import labSuhu from '../../labSuhu.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnergyChunkGroup from '../../../../energy-forms-and-changes/js/common/model/EnergyChunkGroup.js';
import EnergyChunkWanderControllerGroup from '../../../../energy-forms-and-changes/js/common/model/EnergyChunkWanderControllerGroup.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import Air from '../../../../energy-forms-and-changes/js/intro/model/Air.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Burner from '../../../../energy-forms-and-changes/js/common/model/Burner.js';
import BeakerContainer from '../../common/model/SuhuBeakerContainer.js';
import BeakerType from '../../../../energy-forms-and-changes/js/common/model/BeakerType.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import PhetioGroup from '../../../../tandem/js/PhetioGroup.js';
import Beaker from '../../../../energy-forms-and-changes/js/common/model/Beaker.js';
import Block from '../../../../energy-forms-and-changes/js/intro/model/Block.js';
import BlockType from '../../../../energy-forms-and-changes/js/intro/model/BlockType.js';
import LabSuhuColors from '../../common/LabSuhuColors.js';
import LabSuhuConstants from '../../common/LabSuhuConstants.js';
import { Color } from '../../../../scenery/js/imports.js';
import RectangularThermalMovableModelElement from '../../../../energy-forms-and-changes/js/common/model/RectangularThermalMovableModelElement.js';
import StickyTemperatureAndColorSensor from '../../../../energy-forms-and-changes/js/intro/model/StickyTemperatureAndColorSensor.js';
import Range from '../../../../dot/js/Range.js';
import EnergyBalanceTracker from '../../../../energy-forms-and-changes/js/intro/model/EnergyBalanceTracker.js';
import EnergyBalanceRecord from '../../../../energy-forms-and-changes/js/intro/model/EnergyBalanceRecord.js';
import Emitter from '../../../../axon/js/Emitter.js';
import ModelElement from '../../../../energy-forms-and-changes/js/common/model/ModelElement.js';
import UserMovableModelElement from '../../../../energy-forms-and-changes/js/common/model/UserMovableModelElement.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import LabSuhuClock from '../../common/model/LabSuhuClock.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

// CONSTANTS
const NUMBER_OF_THERMOMETERS = 2;
const BEAKER_WIDTH = 0.085; // in meters
const BEAKER_HEIGHT = BEAKER_WIDTH * 1.1;
const BEAKER_MAJOR_TICK_MARK_DISTANCE = BEAKER_HEIGHT * 0.95 / 3;
const FAST_FORWARD_MULTIPLIER = 4; // how many times faster the intro screen runs when in fast forward mode

// initial thermometer position, intended to be away from any model objects so that they don't get stuck to anything
const INITIAL_THERMOMETER_POSITION = new Vector2( 100, 100 );

// number of snap-to spots on the ground
const NUMBER_OF_GROUND_SPOTS = 6;
// of the available ground spots, this is the index at which the burner(s) is/are created
const BURNER_GROUND_SPOT_INDEX = 1;
// of the available ground spots, this is the first index at which the description is created
const DESC_GROUND_SPOT_INDEX = 3;

// the sim model x range is laid out in meters with 0 in the middle, so this value is the left edge of the sim, in meters
const LEFT_EDGE = -0.30;
const RIGHT_EDGE = 0.30;

// the desired space between the edges of the sim (left edge or right edge) and the edge of the widest element
// (a beaker) when it's sitting at one of the outer snap-to spots on the ground, in meters
const EDGE_PAD = 0.016;

// type SelfOptions = {
//   //TODO add options that are specific to IntroModel here
// };

// type IntroModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class IntroModel {
  // energyChunksVisibleProperty: BooleanProperty;
  // isPlayingProperty: BooleanProperty;
  // energyChunkGroup: EnergyChunkGroup;
  // energyChunkWanderControllerGroup: EnergyChunkWanderControllerGroup;
  // timeSpeedProperty: EnumerationProperty<TimeSpeed>;
  // air: Air;
  // spaceBetweenGroundSpotCenters: number;
  // groundSpotXPositions: number[];
  // burner: Burner;
  // beaker: BeakerContainer;
  /**
   * Bounds line with width and no height
   */
  // descBounds: Bounds2;
  // beakerGroup: PhetioGroup<BeakerContainer, any[]>;
  // blockGroup: PhetioGroup<Block, any[]>;
  // inThermalContactInfo: any;
  // modelElementList: ModelElement[];
  // thermometers: StickyTemperatureAndColorSensor[];
  // energyBalanceTracker: EnergyBalanceTracker;
  // reusableBalanceArray: EnergyBalanceRecord[];
  // manualStepEmitter: any;

  constructor( providedOptions ) {

    const options = merge( {
        // for default options value
    }, providedOptions );
    const tandem = options.tandem;
    
    // @public {BooleanProperty} - controls whether the energy chunks are visible in the view
    this.energyChunksVisibleProperty = new BooleanProperty( false, {
        tandem: tandem.createTandem( 'energyChunksVisibleProperty' ),
        phetioDocumentation: 'whether the energy chunks are visible'
    } );

    // @public {BooleanProperty} - is the sim running or paused?
    this.isPlayingProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isPlayingProperty' ),
      phetioDocumentation: 'whether the screen is playing or paused'
    } );

    this.steppingProperty = new BooleanProperty( false );

    this.rewindingProperty = new BooleanProperty( false );

    // @private
    this.energyChunkGroup = new EnergyChunkGroup( this.energyChunksVisibleProperty, {
      tandem: tandem.createTandem( 'energyChunkGroup' )
    } );

    // @private
    this.energyChunkWanderControllerGroup = new EnergyChunkWanderControllerGroup( this.energyChunkGroup, {
      tandem: tandem.createTandem( 'energyChunkWanderControllerGroup' )
    } );

    // @public for debugging, controls play speed of the simulation
    this.timeSpeedProperty = new EnumerationProperty( TimeSpeed.NORMAL );

    this.changeRewindValueProperty = new DerivedProperty( [
      this.isPlayingProperty,
      this.steppingProperty,
      this.rewindingProperty
    ], ( playButtonPressed, stepping, rewinding ) =>
      !playButtonPressed && !stepping && !rewinding
    );
  
    this.clock = new LabSuhuClock(
      this.changeRewindValueProperty,
      LabSuhuClock.DEFAULT_DT,
      this.steppingProperty,
      this.timeSpeedProperty,
      tandem,
      tandem.createTandem( 'clock' )
    );

    this.clock.addEventTimer( dt => {
      const elapsedTime = this.stepClock( dt );
      this.clock.setSimulationTime( this.clock.getSimulationTime() + elapsedTime );
    } );

    this.isPlayingProperty.link( isPlaying => {
      this.clock.setRunning( isPlaying );
    } );

    // @public (read-only) {Air} - model of the air that surrounds the other model elements, and can absorb or provide
    // energy
    this.air = new Air( this.energyChunksVisibleProperty, this.energyChunkGroup, this.energyChunkWanderControllerGroup, {
      tandem: tandem.createTandem( 'air' )
    } );

    // @private {number} - calculate space in between the center points of the snap-to spots on the ground
    this.spaceBetweenGroundSpotCenters = ( RIGHT_EDGE - LEFT_EDGE - ( EDGE_PAD * 2 ) - BEAKER_WIDTH ) /
                                         ( NUMBER_OF_GROUND_SPOTS - 1 );

    // @private {number[]} - list of valid x-positions for model elements to rest. this is used for the initial
    // positions of model elements, but also for finding valid spots for the elements to fall to, so it should be
    // modified after creation.
    this.groundSpotXPositions = [];

    // determine the positions of the snap-to spots, and round them to a few decimal places
    const leftEdgeToBeakerCenterPad = LEFT_EDGE + EDGE_PAD + ( BEAKER_WIDTH / 2 );
    for ( let i = 0; i < NUMBER_OF_GROUND_SPOTS; i++ ) {
      this.groundSpotXPositions.push(
        Utils.roundSymmetric( ( this.spaceBetweenGroundSpotCenters * i + leftEdgeToBeakerCenterPad ) * 1000 ) / 1000
      );
    }

    // after creating the burners, the rest of the elements are created starting from this index
    const indexOfFirstElementAfterLastBeaker = BURNER_GROUND_SPOT_INDEX + 1;

    // only used for initial positions of model elements. determine which spots are only for burners, then pull those
    // out of the available indices for movable elements
    const burnerGroundSpotXPositions =
      this.groundSpotXPositions.slice( BURNER_GROUND_SPOT_INDEX, indexOfFirstElementAfterLastBeaker );
    const movableElementGroundSpotXPositions = [
      ...this.groundSpotXPositions.slice( 0, BURNER_GROUND_SPOT_INDEX ),
      ...this.groundSpotXPositions.slice( indexOfFirstElementAfterLastBeaker, DESC_GROUND_SPOT_INDEX )
    ];

    // @public (read-only) {Burner}
    this.burner = new Burner(
        new Vector2( burnerGroundSpotXPositions[ 0 ], 0 ),
        this.energyChunksVisibleProperty,
        this.energyChunkGroup,
        {
            energyChunkWanderControllerGroup: this.energyChunkWanderControllerGroup,
            tandem: tandem.createTandem( 'leftBurner' ),
            phetioDocumentation: 'always appears in the simulation, but may be the only burner'
        }
    );

    // @public (read-only) {Node}
    this.descBounds = new Bounds2(
        this.groundSpotXPositions[ DESC_GROUND_SPOT_INDEX ] - leftEdgeToBeakerCenterPad,
        0,
        this.groundSpotXPositions[ 5 ] + leftEdgeToBeakerCenterPad,
        0
    );
    this.descVisibility = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'descVisibility' ),
      phetioReadOnly: true,
      phetioDocumentation: 'the visiblity of description image'
    } )

    // @public {PhetioGroup.<Block>}
    this.blockGroup = new PhetioGroup(
      ( tandem, blockType, initialXPosition ) => {
        return new Block(
          new Vector2( initialXPosition, 0 ),
          this.energyChunksVisibleProperty,
          blockType,
          this.energyChunkGroup, {
            energyChunkWanderControllerGroup: this.energyChunkWanderControllerGroup,
            tandem: tandem
          } );
      },
      [ BlockType.getValue('IRON'), 0 ],
      {
        tandem: tandem.createTandem( 'blockGroup' ),
        phetioType: PhetioGroup.PhetioGroupIO( Block.BlockIO ),
        supportsDynamicState: false,
        phetioDocumentation: `group that contains iron block`
      }
    );
    // create IRON Block
    // don't create any block
    // this.blockGroup.createNextElement( BlockType.getValue('IRON'), movableElementGroundSpotXPositions[0] );
    
    // @public {PhetioGroup.<BeakerContainer>}
    this.beakerGroup = new PhetioGroup(
      ( tandem, beakerType, initialXPosition ) => {
        return new BeakerContainer(
          new Vector2( initialXPosition, 0 ),
          BEAKER_WIDTH,
          BEAKER_HEIGHT,
          this.blockGroup.getArray(),
          this.energyChunksVisibleProperty,
          this.energyChunkGroup, {
            energyChunkWanderControllerGroup: this.energyChunkWanderControllerGroup,
            beakerType: beakerType,
            majorTickMarkDistance: BEAKER_MAJOR_TICK_MARK_DISTANCE,
            tandem: tandem,
            phetioDynamicElement: true
          }
        );
      },
      [ BeakerType.getValue( 'WATER' ), 0 ],
      {
        tandem: tandem.createTandem( 'beakerGroup' ),
        phetioType: PhetioGroup.PhetioGroupIO( Beaker.BeakerIO ),
        supportsDynamicState: false,
        phetioDocumentation: `group that contains only one beaker`
      }
    );
    // create WATER Beaker
    this.beakerGroup.createNextElement( BeakerType.getValue( 'WATER' ), movableElementGroundSpotXPositions[1] );

    // @private {Object} - an object that is used to track which thermal containers are in contact with one another in
    // each model step.
    this.inThermalContactInfo = {};
    this.thermalContainers.forEach( thermalContainer => {
      this.inThermalContactInfo[ thermalContainer.id ] = [];
    } );

    // @private {ModelElement} - put all of the model elements on a list for easy iteration
    this.modelElementList = [ this.burner, ...this.thermalContainers ];

    // @public (read-only) {StickyTemperatureAndColorSensor[]}
    this.thermometers = [];
    let thermometerIndex = NUMBER_OF_THERMOMETERS + 1;
    _.times( NUMBER_OF_THERMOMETERS, () => {
      const thermometer = new StickyTemperatureAndColorSensor(
        this,
        INITIAL_THERMOMETER_POSITION,
        false, {
          tandem: tandem.createTandem( `thermometer${--thermometerIndex}` ) // 1 indexed
        }
      );
      this.thermometers.push( thermometer );

      // Show / hide descImage by thermometer activation
      thermometer.activeProperty.link( active => {
        // check if other thermometer is active
        // const isOtherActive = this.thermometers.some( thermo => thermo.activeProperty.get() );
        // show descImage if one or more thermometer active
        // hide descImage if no one thermometer activated
        // this.descVisibility.set( active || isOtherActive );
      } );

      // Add handling for a special case where the user drops a block in the beaker behind this thermometer. The
      // action is to automatically move the thermometer to a position where it continues to sense the beaker
      // temperature. Not needed if zero blocks are in use. This was requested after interviews.
      if ( this.blockGroup.count ) {
        thermometer.sensedElementColorProperty.link( ( newColor, oldColor ) => {

          this.beakerGroup.forEach( beaker => {
            const blockWidthIncludingPerspective = this.blockGroup.getElement( 0 ).getProjectedShape().bounds.width;

            const xRange = new Range(
              beaker.getBounds().centerX - blockWidthIncludingPerspective / 2,
              beaker.getBounds().centerX + blockWidthIncludingPerspective / 2
            );

            const checkBlocks = block => {

              // see if one of the blocks is being sensed in the beaker
              return block.color === newColor && block.positionProperty.value.y > beaker.positionProperty.value.y;
            };

            // if the new color matches any of the blocks (which are the only things that can go in a beaker), and the
            // thermometer was previously stuck to the beaker and sensing its fluid, then move it to the side of the beaker
            if ( _.some( this.blockGroup.getArray(), checkBlocks ) &&
                 oldColor === beaker.fluidColor &&
                 !thermometer.userControlledProperty?.get() &&
                 !beaker.userControlledProperty?.get() &&
                 xRange.contains( thermometer.positionProperty.value.x ) ) {

              // fake a movement by the user to a point in the beaker where the thermometer is not over a brick
              thermometer.userControlledProperty?.set( true ); // must toggle userControlled to enable element following
              thermometer.positionProperty.value = new Vector2(
                beaker.getBounds().maxX - 0.01,
                beaker.getBounds().minY + beaker.getBounds().height * 0.33
              );
              thermometer.userControlledProperty?.set( false );
            }
          } );
        } );
      }
    } );

    // @private {EnergyBalanceTracker} - This is used to track energy exchanges between all of the various energy
    // containing elements and using that information to transfer energy chunks commensurately.
    this.energyBalanceTracker = new EnergyBalanceTracker();

    // @private {EnergyBalanceRecord[]} - An array used for getting energy balances from the energy balance tracker,
    // pre-allocated and reused in an effort to reduce memory allocations.
    this.reusableBalanceArray = [];

    // @public - used to notify the view that a manual step was called
    this.manualStepEmitter = new Emitter( { parameters: [ { valueType: 'number' } ] } );
    
  }

  /**
   * @param {number} heatCoolLevel
   * @returns {string}
   * @private
   */
   static mapHeatCoolLevelToColor( heatCoolLevel ) {
    let color;
    if ( heatCoolLevel > 0 ) {
      color = LabSuhuColors.FLAME_ORANGE;
    }
    else if ( heatCoolLevel < 0 ) {
      color = LabSuhuColors.ICE_BLUE;
    }
    else {
      color = LabSuhuColors.BACKGROUND_COLOR;
    }
    return color;
  }

  // @private {RectangularThermalMovableModelElement[]} - put all the thermal containers in a list for easy iteration
  get thermalContainers() {
    return [ ...this.blockGroup.getArray(), ...this.beakerGroup.getArray() ];
  }

  /**
   * determines if the first thermal model element is immersed in the second
   * @param {RectangularThermalMovableModelElement} thermalModelElement1
   * @param {RectangularThermalMovableModelElement} thermalModelElement2
   * @returns {boolean}
   * @private
   */
  isImmersedIn( thermalModelElement1, thermalModelElement2 ) {
    return thermalModelElement1 !== thermalModelElement2 &&
           thermalModelElement1 instanceof Block &&
           thermalModelElement2.thermalContactArea.containsBounds( thermalModelElement1.getBounds() );
  }

  /**
   * restore the initial conditions of the model
   * @public
   */
  reset() {
    this.energyChunksVisibleProperty.reset();
    // this.linkedHeatersProperty.reset();
    this.isPlayingProperty.reset();
    this.timeSpeedProperty.reset();
    this.air.reset();
    this.burner.reset();
    this.descVisibility.reset();
    this.clock.resetSimulationTime();
    // this.burners.forEach( burner => {
    //   burner.reset();
    // } );
    this.blockGroup.forEach( block => {
      block.reset();
    } );
    this.beakerGroup.forEach( beaker => {
      beaker.reset();
    } );
    this.thermometers.forEach( thermometer => {
      thermometer.reset();
    } );
    this.energyBalanceTracker.clearAllBalances();
  }

  /**
   * @private
   * @param {number} dt date time in seconds
   * @returns {number} elapsed time
   */
   stepClock( dt ) {
    // standardized time step - based on the slowest time step for the given orbital mode
    const smallestTimeStep = this.clock.baseDTValue;
    // get the number of times we will need to step the model based on the dt passed in
    let numberOfSteps;
    switch ( this.clock.timeSpeedProperty.value ) {
      case TimeSpeed.SLOW:
        // smallestTimeStep = this.clock.baseDTValue * 0.1;
        numberOfSteps = 1;
        break;
      case TimeSpeed.NORMAL:
        // smallestTimeStep = this.clock.baseDTValue;
        numberOfSteps = 4;
        break;
      default: // TimeSpeed.FAST
        // smallestTimeStep = this.clock.baseDTValue;
        numberOfSteps = 15;
    }

    for ( let i = 0; i < numberOfSteps; i++ ) {
      this.stepModel( smallestTimeStep );
    }

    return smallestTimeStep * numberOfSteps;
  }

  /**
   * step the sim forward by one fixed nominal frame time
   * @public
   */
  manualStep() {
    // this.stepModel( LabSuhuClock.SECONDS_PER_TICK );
    this.clock.stepClockWhilePaused();
    this.manualStepEmitter.emit( LabSuhuClock.SECONDS_PER_TICK ); // notify the view
  }

  /**
   * step function for this model, automatically called by joist
   * @param {number} dt - delta time, in seconds
   * @public
   */
  step( dt ) {

    // only step the model if not paused
    if ( this.isPlayingProperty.get() ) {
      this.clock.step( dt );
      // const multiplier = this.timeSpeedProperty.get() === TimeSpeed.NORMAL ? 1 : FAST_FORWARD_MULTIPLIER;
      // this.stepModel( dt * multiplier );
    }

    // Cause any user-movable model elements that are not supported by a surface to fall or, in some cases, jump up
    // towards the nearest supporting surface.
    this.thermalContainers.forEach( movableModelElement => {
      const userControlled = movableModelElement.userControlledProperty?.value;
      const unsupported = movableModelElement.supportingSurface === null;
      const raised = movableModelElement.positionProperty.value.y !== 0;
      const atXSpot = _.includes( this.groundSpotXPositions, movableModelElement.positionProperty.value.x );
      if ( !userControlled && unsupported && ( raised || !atXSpot ) ) {
        this.fallToSurface( movableModelElement, dt );
      }
    } );

    // step the thermometers regardless of whether the sim is paused, and fast forward makes no difference
    this.thermometers.forEach( thermometer => {
      thermometer.step();

      // if ( 
      //   this.beakerGroup.find( beaker => beaker.tandem.phetioID === thermometer.sensedElementNameProperty.get() ) 
      //   ||
      //   this.burner.tandem.phetioID === thermometer.sensedElementNameProperty.get()
      // ) {
      //   this.descVisibility.set( true );
      // } else {
      //   this.descVisibility.set( false );
      // }
    } );
  }

  /**
   * update the state of the model for a given time amount
   * @param {number} dt - time step, in seconds
   * @private
   */
   stepModel( dt ) {

    // update the fluid level in the beaker, which could be displaced by one or more of the blocks
    // this.beakerGroup.forEach( beaker => {
    //   beaker.updateFluidDisplacement( this.blockGroup.map( block => block.getBounds() ) );
    // } );

    //=====================================================================
    // Energy and Energy Chunk Exchange
    //=====================================================================

    // Note: Ideally, the order in which the exchanges occur shouldn't make any difference, but since we are working
    // with discrete non-infinitesimal time values, it probably does, so any changes to the order in which the energy
    // exchanges occur below should be thoroughly tested.

    // --------- transfer continuous energy (and not energy chunks yet) between elements --------------

    // clear the flags that are used to track whether energy transfers occurred during this step
    // this.energyBalanceTracker.clearRecentlyUpdatedFlags();

    // loop through all the movable thermal energy containers and have them exchange energy with one another
    this.thermalContainers.forEach( ( container1, index ) => {
      this.thermalContainers.slice( index + 1, this.thermalContainers.length ).forEach( container2 => {

        // transfer energy if there is a thermal differential, keeping track of what was exchanged
        const energyTransferredFrom1to2 = container1.exchangeEnergyWith( container2, dt );
        // this.energyBalanceTracker.logEnergyExchange( container1.id, container2.id, energyTransferredFrom1to2 );
      } );
    } );

    // exchange thermal energy between the burners and the other thermal model elements, including air
    // this.burner.forEach( burner => {
    let energyTransferredFromBurner = 0;
    if ( this.burner.areAnyOnTop( this.thermalContainers ) ) {
      this.thermalContainers.forEach( energyContainer => {
        energyTransferredFromBurner = this.burner.addOrRemoveEnergyToFromObject( energyContainer, dt );
        // this.energyBalanceTracker.logEnergyExchange( this.burner.id, energyContainer.id, energyTransferredFromBurner );
      } );
    }
    else {

      // nothing on a burner, so heat/cool the air
      energyTransferredFromBurner = this.burner.addOrRemoveEnergyToFromAir( this.air, dt );
      // this.energyBalanceTracker.logEnergyExchange( this.burner.id, this.air.id, energyTransferredFromBurner );
    }
    // } );

    // clear the "in thermal contact" information
    _.values( this.inThermalContactInfo ).forEach( inContactList => {
      inContactList.length = 0;
    } );

    // exchange energy between the movable thermal energy containers and the air
    this.thermalContainers.forEach( container1 => {

      // detect elements that are immersed in a beaker and don't allow them to exchange energy directly with the air
      let immersedInBeaker = false;
      this.beakerGroup.forEach( beaker => {
        if ( this.isImmersedIn( container1, beaker ) ) {

          // this model element is immersed in the beaker
          immersedInBeaker = true;
        }
      } );

      // exchange energy with the air if not immersed in the beaker
      if ( !immersedInBeaker ) {
        const energyExchangedWithAir = this.air.exchangeEnergyWith( container1, dt );
        // this.energyBalanceTracker.logEnergyExchange( this.air.id, container1.id, energyExchangedWithAir );
      }
    } );

    // --------- transfer energy chunks between elements --------------

    // Get a list of all energy balances between pairs of objects whose magnitude exceeds the amount that corresponds
    // to an energy chunk, and that also were recently updated.  The reason that it is important whether or not the
    // balance was recently updated is that it indicates that the entities are in thermal contact, and thus can
    // exchange energy chunks.
    // this.reusableBalanceArray.length = 0; // clear the list
    // this.energyBalanceTracker.getBalancesOverThreshold(
    //   LabSuhuConstants.ENERGY_PER_CHUNK,
    //   true,
    //   this.reusableBalanceArray
    // );

    // this.reusableBalanceArray.forEach( energyBalanceRecord => {

    //   const fromID = energyBalanceRecord.fromID;
    //   const toID = energyBalanceRecord.toID;

    //   // figure out who will supply the energy chunk and who will consume it
    //   let energyChunkSupplier;
    //   let energyChunkConsumer;
    //   if ( energyBalanceRecord.energyBalance > 0 ) {
    //     energyChunkSupplier = this.getThermalElementByID( fromID );
    //     energyChunkConsumer = this.getThermalElementByID( toID );
    //   }
    //   else {
    //     energyChunkSupplier = this.getThermalElementByID( toID );
    //     energyChunkConsumer = this.getThermalElementByID( fromID );
    //   }

    //   // if the transfer is supposed to go to or from a burner, make sure the burner is in the correct state
    //   if ( energyChunkSupplier.id.indexOf( 'burner' ) >= 0 && energyChunkSupplier.heatCoolLevelProperty.value < 0 ||
    //        energyChunkConsumer.id.indexOf( 'burner' ) >= 0 && energyChunkConsumer.heatCoolLevelProperty.value > 0 ) {

    //     // burner isn't in correct state, bail on this transfer
    //     return;
    //   }

    //   // transfer the energy chunk from the supplier to the consumer
    //   this.transferEnergyChunk( energyChunkSupplier, energyChunkConsumer, energyBalanceRecord );
    // } );

    // // Now that continuous energy has been exchanged and then energy chunks have been exchanged based on the
    // // accumulated energy exchange balances, we now check to see if any thermal energy containers are left with an
    // // imbalance between their energy levels versus the number of energy chunks they contain.  If such an imbalance is
    // // detected, we search for a good candidate with which to make an exchange and, if one is found, transfer an
    // // energy chunk.  If no good candidate is found, no transfer is made.
    // this.thermalContainers.forEach( thermalContainer => {

    //   const energyChunkBalance = thermalContainer.getEnergyChunkBalance();
    //   if ( energyChunkBalance !== 0 ) {

    //     // This thermal energy container has an energy chunk imbalance.  Get a list of all thermal model elements with
    //     // which a recent thermal energy exchange has occurred, because this lets us know who is in thermal contact
    //     // ans could thus potentially supply or consume an energy chunk.
    //     const recentlyUpdatedBalances = this.energyBalanceTracker.getBalancesForID( thermalContainer.id, true );

    //     // set up some variables that will be used in the loops below
    //     let bestExchangeCandidate = null;
    //     let closestMatchExchangeRecord = null;
    //     let currentRecord;
    //     let otherElementInRecord;

    //     // Search for other thermal containers that can consume this container's excess or supply this container's
    //     // needs, as the case may be.
    //     for ( let i = 0; i < recentlyUpdatedBalances.length && bestExchangeCandidate === null; i++ ) {
    //       currentRecord = recentlyUpdatedBalances[ i ];
    //       otherElementInRecord = this.getThermalElementByID( currentRecord.getOtherID( thermalContainer.id ) );
    //       const thisElementTemperature = thermalContainer.getTemperature();
    //       const otherElementTemperature = otherElementInRecord.getTemperature();

    //       // See if there is another thermal container that is in the opposite situation from this one, i.e. one that
    //       // has a deficit of ECs when this one has excess, or vice versa.
    //       if ( this.thermalContainers.indexOf( otherElementInRecord ) >= 0 ) {
    //         const otherECBalance = otherElementInRecord.getEnergyChunkBalance();
    //         if ( energyChunkBalance > 0 && otherECBalance < 0 && thisElementTemperature > otherElementTemperature ||
    //              energyChunkBalance < 0 && otherECBalance > 0 && thisElementTemperature < otherElementTemperature ) {

    //           // this is a great candidate for an exchange
    //           bestExchangeCandidate = otherElementInRecord;
    //           closestMatchExchangeRecord = currentRecord;
    //         }
    //       }
    //     }

    //     if ( !bestExchangeCandidate ) {

    //       // nothing found yet, see if there is a burner that could take or provide and energy chunk
    //       for ( let i = 0; i < recentlyUpdatedBalances.length && bestExchangeCandidate === null; i++ ) {
    //         currentRecord = recentlyUpdatedBalances[ i ];
    //         const otherID = currentRecord.getOtherID( thermalContainer.id );
    //         if ( otherID.indexOf( 'burner' ) >= 0 ) {

    //           // This is a burner, is it in a state where it is able to provide or receive an energy chunk?
    //           const burner = this.getThermalElementByID( otherID );
    //           const heatCoolLevel = burner.heatCoolLevelProperty.get();
    //           if ( energyChunkBalance > 0 && heatCoolLevel < 0 || energyChunkBalance < 0 && heatCoolLevel > 0 ) {
    //             bestExchangeCandidate = burner;
    //             closestMatchExchangeRecord = currentRecord;
    //           }
    //         }
    //       }
    //     }

    //     if ( bestExchangeCandidate ) {

    //       // a good candidate was found, make the transfer
    //       let energyChunkSupplier;
    //       let energyChunkConsumer;
    //       if ( energyChunkBalance > 0 ) {
    //         energyChunkSupplier = thermalContainer;
    //         energyChunkConsumer = bestExchangeCandidate;
    //       }
    //       else {
    //         energyChunkSupplier = bestExchangeCandidate;
    //         energyChunkConsumer = thermalContainer;
    //       }
    //       this.transferEnergyChunk( energyChunkSupplier, energyChunkConsumer, closestMatchExchangeRecord );
    //     }
    //   }
    // } );

    // step model elements to animate energy chunks movement
    this.air.step( dt );
    this.burner.step( dt );
    // this.burners.forEach( burner => {
    //   burner.step( dt );
    // } );

    this.thermalContainers.forEach( thermalContainer => {
      thermalContainer.step( dt );
    } );
  }

  /**
   * exchanges an energy chunk between the provided model elements
   * @param {ModelElement} energyChunkSupplier
   * @param {ModelElement} energyChunkConsumer
   * @param {EnergyBalanceRecord} energyBalanceRecord
   * @private
   */
   transferEnergyChunk( energyChunkSupplier, energyChunkConsumer, energyBalanceRecord ) {

    // attempt to extract an energy chunk from the supplier
    let energyChunk;
    if (
      energyChunkSupplier !== this.air // always true
      // true
    ) {

      if (
        energyChunkConsumer !== this.air // always true
        // true
      ) {
        energyChunk = energyChunkSupplier.extractEnergyChunkClosestToBounds(
          energyChunkConsumer.getBounds()
        );
      }
      else {

        // when giving an energy chunk to the air, pull one from the top of the supplier
        energyChunk = energyChunkSupplier.extractEnergyChunkClosestToPoint(
          energyChunkSupplier.getCenterTopPoint()
        );
      }
    }
    else {

      // when getting an energy chunk from the air, just let is know roughly where it's going
      energyChunk = energyChunkSupplier.requestEnergyChunk( energyChunkConsumer.positionProperty.get() );
    }

    // if we got an energy chunk, pass it to the consumer
    if ( energyChunk ) {

      if (
        energyChunkConsumer === this.air
        // true
      ) {

        // When supplying and energy chunk to the air, constrain the path that the energy chunk will take so that it
        // stays above the container.  The bounds are tweaked a bit to account for the width of the energy chunks in
        // the view.
        const supplierBounds = energyChunkSupplier.getBounds();
        const horizontalWanderConstraint = new Range( supplierBounds.minX + 0.01, supplierBounds.maxX - 0.01 );
        if ( energyChunk.positionProperty.value.x < horizontalWanderConstraint.min ) {
          energyChunk.setPositionXY( horizontalWanderConstraint.min, energyChunk.positionProperty.value.y );
        }
        else if ( energyChunk.positionProperty.value.x > horizontalWanderConstraint.max ) {
          energyChunk.setPositionXY( horizontalWanderConstraint.max, energyChunk.positionProperty.value.y );
        }
        energyChunkConsumer.addEnergyChunk( energyChunk );
      }
      else {
        energyChunkConsumer.addEnergyChunk( energyChunk );
      }

      // adjust the energy balance since a chunk was transferred, but don't cross zero for the energy balance
      let energyExchangeToLog;
      if ( energyBalanceRecord.energyBalance > 0 ) {
        energyExchangeToLog = Math.max( -LabSuhuConstants.ENERGY_PER_CHUNK, -energyBalanceRecord.energyBalance );
      }
      else {
        energyExchangeToLog = Math.min( LabSuhuConstants.ENERGY_PER_CHUNK, energyBalanceRecord.energyBalance );
      }
      this.energyBalanceTracker.logEnergyExchange(
        energyChunkSupplier.id,
        energyChunkConsumer.id,
        energyExchangeToLog
      );
    }
  }

  /**
   * make a user-movable model element fall to the nearest supporting surface
   * @param {UserMovableModelElement} modelElement - the falling object
   * @param {number} dt - time step in seconds
   * @private
   */
  fallToSurface( modelElement, dt ) {
    let minYPos = 0;
    const acceleration = -9.8; // meters/s/s

    // sort list of ground spots in order, with the closest spot to modelElement first
    const groundSpotXPositionsCopy = [ ...this.groundSpotXPositions ];
    groundSpotXPositionsCopy.sort( ( a, b ) => {
      const distanceA = Math.abs( a - modelElement.positionProperty.value.x );
      const distanceB = Math.abs( b - modelElement.positionProperty.value.x );
      return distanceA - distanceB;
    } );
    let destinationXSpot = null;
    let destinationSurface = null;

    // check out each spot
    for ( let i = 0; i < groundSpotXPositionsCopy.length &&
                     destinationXSpot === null &&
                     destinationSurface === null; i++
    ) {
      const modelElementsInSpot = [];

      // get a list of what's currently in the spot being checked
      this.modelElementList.forEach( potentialRestingModelElement => {
        if ( potentialRestingModelElement === modelElement ) {
          return;
        }

        // This if statement is checking each potentialRestingModelElement to see which ones are already in the spot
        // that modelElement is falling to.
        //
        // The following first condition usually just needs to check if potentialRestingModelElement's center x
        // coordinate matches the current ground spot x coordinate, but instead it considers any
        // potentialRestingModelElement's to be in this spot if its center x coordinate is within half a spot's
        // width of the ground spot x coordinate. this handles the multitouch case where modelElement is falling and
        // a user drags a different model element somewhere underneath it (which is likely not located at a ground
        // x coordinate), because instead of not detecting that user-held model element as occupying this spot
        // (and therefore falling through it and overlapping), it does detect it, and then falls to the model
        // elements surface instead of all the way down to the ground spot.
        //
        // The second condition checks that potentialRestingModelElement is below modelElement because, for example, in
        // the case where a beaker with a block inside is being dropped, we don't want the beaker to think that its
        // block is in the spot below it.
        if ( Math.abs( potentialRestingModelElement.positionProperty.value.x - groundSpotXPositionsCopy[ i ] ) <=
             this.spaceBetweenGroundSpotCenters / 2 &&
             potentialRestingModelElement.positionProperty.value.y <= modelElement.positionProperty.value.y ) {
          modelElementsInSpot.push( potentialRestingModelElement );

          // this is an additional search to see if there are any elements stacked on a found element that are
          // *above* the element being dropped, see https://github.com/phetsims/energy-forms-and-changes/issues/221
          let restingModelElement = potentialRestingModelElement;
          while ( restingModelElement.topSurface.elementOnSurfaceProperty.value ) {
            const stackedRestingModelElement = restingModelElement.topSurface.elementOnSurfaceProperty.value;
            if ( stackedRestingModelElement.positionProperty.value.y > modelElement.positionProperty.value.y &&
                 modelElementsInSpot.indexOf( stackedRestingModelElement ) < 0 ) {
              modelElementsInSpot.push( stackedRestingModelElement );
            }
            restingModelElement = stackedRestingModelElement;
          }
        }
      } );

      if ( modelElementsInSpot.length > 0 ) {

        // flag any beakers that are in the spot because beakers aren't allowed to stack on top of one another
        let beakerFoundInSpot = false;
        for ( let j = 0; j < modelElementsInSpot.length && !beakerFoundInSpot; j++ ) {
          beakerFoundInSpot = beakerFoundInSpot || modelElementsInSpot[ j ] instanceof Beaker;
        }
        let currentModelElementInStack = modelElement;
        let beakerFoundInStack = currentModelElementInStack instanceof Beaker;

        // iterate through the stack of model elements being held and flag if any beakers are in it
        while ( currentModelElementInStack.topSurface.elementOnSurfaceProperty.value && !beakerFoundInStack ) {
          beakerFoundInStack = beakerFoundInStack ||
                               currentModelElementInStack.topSurface.elementOnSurfaceProperty.value instanceof Beaker;
          currentModelElementInStack = currentModelElementInStack.topSurface.elementOnSurfaceProperty.value;
        }

        if ( !( beakerFoundInSpot && beakerFoundInStack ) ) {

          // find the highest element in the stack
          let highestElement = modelElementsInSpot[ 0 ];
          for ( let j = 1; j < modelElementsInSpot.length; j++ ) {
            if ( modelElementsInSpot[ j ].topSurface.positionProperty.value.y >
                 highestElement.topSurface.positionProperty.value.y ) {
              highestElement = modelElementsInSpot[ j ];
            }
          }
          destinationSurface = highestElement.topSurface;
        }
      }
      else {
        destinationXSpot = groundSpotXPositionsCopy[ i ];
      }
    }

    if ( destinationSurface !== null ) {

      // center the model element above its new supporting element
      minYPos = destinationSurface.positionProperty.value.y;
      modelElement.positionProperty.set(
        new Vector2( destinationSurface.positionProperty.value.x, modelElement.positionProperty.value.y )
      );
    }
    else {
      modelElement.positionProperty.set( new Vector2( destinationXSpot, modelElement.positionProperty.value.y ) );
    }

    // calculate a proposed Y position based on gravitational falling
    const velocity = modelElement.verticalVelocityProperty.value + acceleration * dt;
    let proposedYPos = modelElement.positionProperty.value.y + velocity * dt;
    if ( proposedYPos < minYPos ) {

      // the element has landed on the ground or some other surface
      proposedYPos = minYPos;
      modelElement.verticalVelocityProperty.set( 0 );
      if ( destinationSurface !== null ) {
        modelElement.setSupportingSurface( destinationSurface );
        destinationSurface.elementOnSurfaceProperty.set( modelElement );
      }
    }
    else {
      modelElement.verticalVelocityProperty.set( velocity );
    }
    modelElement.positionProperty.set( new Vector2( modelElement.positionProperty.value.x, proposedYPos ) );
  }

  /**
   * Updates the temperature and color that would be sensed by a thermometer at the provided position.  This is done
   * as a single operation instead of having separate methods for getting temperature and color because it is more
   * efficient to do it like this.
   * @param {Vector2} position - position to be sensed
   * @param {Property.<number>} sensedTemperatureProperty
   * @param {Property.<Color>} sensedElementColorProperty
   * @param {StringProperty} sensedElementNameProperty
   * @public
   */
  updateTemperatureAndColorAndNameAtPosition(
    position,
    sensedTemperatureProperty,
    sensedElementColorProperty,
    sensedElementNameProperty
  ) {

    let temperatureAndColorAndNameUpdated = false;

    // Test blocks first. Sort them by zIndex so sensors measure the highest one that the sensor is over
    const blocks = _.sortBy( this.blockGroup.getArrayCopy(), block => block.zIndex );

    for ( let i = blocks.length - 1; i >= 0 && !temperatureAndColorAndNameUpdated; i-- ) {
      const block = blocks[ i ];
      if ( block.getProjectedShape().containsPoint( position ) ) {
        sensedTemperatureProperty.set( block.temperature );
        sensedElementColorProperty.set( block.color );
        sensedElementNameProperty.set( block.tandem.phetioID );
        temperatureAndColorAndNameUpdated = true;
      }
    }

    // test if this point is in any beaker's fluid
    for ( let i = 0; i < this.beakerGroup.count && !temperatureAndColorAndNameUpdated; i++ ) {
      const beaker = this.beakerGroup.getElement( i );
      if ( beaker.thermalContactArea.containsPoint( position ) ) {
        sensedTemperatureProperty.set( beaker.temperatureProperty.get() );
        sensedElementColorProperty.set( beaker.fluidColor );
        sensedElementNameProperty.set( beaker.tandem.phetioID );
        temperatureAndColorAndNameUpdated = true;
      }
    }

    // test if this point is in any beaker's steam. this check happens separately after all beakers' fluid have been
    // checked because in the case of a beaker body and another beaker's steam overlapping, the thermometer should
    // detect the beaker body first
    for ( let i = 0; i < this.beakerGroup.count && !temperatureAndColorAndNameUpdated; i++ ) {
      const beaker = this.beakerGroup.getElement( i );
      if ( beaker.getSteamArea().containsPoint( position ) && beaker.steamingProportion > 0 ) {
        sensedTemperatureProperty.set( beaker.getSteamTemperature( position.y - beaker.getSteamArea().minY ) );
        sensedElementColorProperty.set( beaker.steamColor );
        sensedElementNameProperty.set( beaker.tandem.phetioID );
        temperatureAndColorAndNameUpdated = true;
      }
    }

    // set descImage visibility by temperatureAndColorAndNameUpdated on elements above
    this.descVisibility.set( temperatureAndColorAndNameUpdated );

    // test if the point is a burner
    // for ( let i = 0; i < this.burners.length && !temperatureAndColorAndNameUpdated; i++ ) {
    if ( !temperatureAndColorAndNameUpdated ) {
      const burner = this.burner;
      if ( burner.getFlameIceRect().containsPoint( position ) ) {
        sensedTemperatureProperty.set( burner.getTemperature() );
        sensedElementColorProperty.set( IntroModel.mapHeatCoolLevelToColor( burner.heatCoolLevelProperty.get() ) );
        sensedElementNameProperty.set( burner.tandem.phetioID );
        temperatureAndColorAndNameUpdated = true;
      }
    }

    if ( !temperatureAndColorAndNameUpdated ) {

      // the position is in nothing else, so set the air temperature and color
      sensedTemperatureProperty.set( this.air.getTemperature() );
      sensedElementColorProperty.set( LabSuhuColors.BACKGROUND_COLOR );
      sensedElementNameProperty.reset();
    }
  }

  /**
   * get the thermal model element that has the provided ID
   * @param {string} id
   * @returns {Object} - one of the elements in the model that can provide and absorb energy
   * @private
   */
  getThermalElementByID( id ) {
    let element = null;
    if ( id === this.air.id ) {
      element = this.air;
    }
    else if ( id.indexOf( 'burner' ) >= 0 ) {
      element = ( this.burner.id === id ) ? this.burner : undefined;
    }
    else {
      element = _.find( this.thermalContainers, container => container.id === id );
    }
    assert && assert( element, `no element found for id: ${id}` );
    return element;
  }
}

labSuhu.register( 'IntroModel', IntroModel );
export default IntroModel;