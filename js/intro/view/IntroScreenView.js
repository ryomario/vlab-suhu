// Copyright 2014-2022, University of Colorado Boulder

/**
 * main view for the 'Intro' screen of the Energy Forms and Changes simulation
 *
 * @author John Blanco
 * @author Martin Veillette (Berea College)
 * @author Jesse Greenberg
 * @author Andrew Adare
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * 
 * @editor Mario (Software Engineer)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import LabSuhuConstants from '../../common/LabSuhuConstants.js';
import labSuhu from '../../labSuhu.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Utils from '../../../../dot/js/Utils.js';
import shelf_png from '../../../images/shelf_png.js';
import { Image, Node, Rectangle } from '../../../../scenery/js/imports.js';
import LabSuhuColors from '../../common/LabSuhuColors.js';
import EnergyChunkLayer from '../../../../energy-forms-and-changes/js/common/view/EnergyChunkLayer.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import LabSuhuQueryParameters from '../../common/LabSuhuQueryParameters.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import BurnerStandNode from '../../../../energy-forms-and-changes/js/common/view/BurnerStandNode.js';
import gasPipeIntro_png from '../../../images/gasPipeIntro_png.js';
import HeaterCoolerBack from '../../../../scenery-phet/js/HeaterCoolerBack.js';
import HeaterCoolerFront from '../../../../scenery-phet/js/HeaterCoolerFront.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import thermometerDescImage_png from '../../../images/Bagian Termometer_png.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import AirNode from '../../../../energy-forms-and-changes/js/intro/view/AirNode.js';
import ModelElement from '../../../../energy-forms-and-changes/js/common/model/ModelElement.js';
import efacPositionConstrainer from '../../../../energy-forms-and-changes/js/intro/model/efacPositionConstrainer.js';
import PhetioGroup from '../../../../tandem/js/PhetioGroup.js';
import BlockNode from '../../../../energy-forms-and-changes/js/intro/view/BlockNode.js';
import BeakerType from '../../../../energy-forms-and-changes/js/common/model/BeakerType.js';
import BeakerContainerView from '../../common/view/SuhuBeakerContainerView.js';
import LabSuhuStrings from '../../LabSuhuStrings.js';
import ReferenceIO from '../../../../tandem/js/types/ReferenceIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import EFACTemperatureAndColorSensorNode from '../../../../energy-forms-and-changes/js/common/view/EFACTemperatureAndColorSensorNode.js';
import StickyTemperatureAndColorSensor from '../../../../energy-forms-and-changes/js/intro/model/StickyTemperatureAndColorSensor.js';
import Easing from '../../../../twixt/js/Easing.js';
import Animation from '../../../../twixt/js/Animation.js';
import SkyNode from '../../../../energy-forms-and-changes/js/common/view/SkyNode.js';
import merge from '../../../../phet-core/js/merge.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import IntroInfoDialog from './IntroInfoDialog.js';

// CONSTANTS
const unknownLiquidString = LabSuhuStrings.unknownLiquid;
const waterString = LabSuhuStrings.water;

const EDGE_INSET = 10; // screen edge padding, in screen coordinates
const THERMOMETER_JUMP_ON_EXTRACTION = new Vector2( 5, 5 ); // in screen coordinates
const THERMOMETER_ANIMATION_SPEED = 0.2; // in meters per second
const MAX_THERMOMETER_ANIMATION_TIME = 1; // max time for thermometer return animation to complete, in seconds

// type SelfOptions = {
//  //TODO add options that are specific to IntroScreenView here
// };

// type IntroScreenViewOptions = SelfOptions & ScreenViewOptions;

class IntroScreenView extends ScreenView {
  // burnerBlockingRect: Bounds2;
  // beakerProxyNodeGroup: PhetioGroup<BeakerContainerView, any[]>;
  // model: IntroModel;

  /**
   * @param {EFACIntroModel} model
   * @param {Tandem} tandem
   */
  constructor( model, providedOptions ) {

    const options = merge( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.model = model;
    
    // Create the model-view transform. The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model appears in the
    // view.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2(
        Utils.roundSymmetric( this.layoutBounds.width * 0.5 ),
        Utils.roundSymmetric( this.layoutBounds.height * 0.85 - EDGE_INSET - LabSuhuConstants.SCREEN_VIEW_Y_MARGIN )
      ),
      LabSuhuConstants.INTRO_MVT_SCALE_FACTOR
    );

    // create the lab bench surface image
    const labBenchSurfaceImage = new Image( shelf_png, {
      centerX: modelViewTransform.modelToViewX( 0 ),
      centerY: modelViewTransform.modelToViewY( 0 ) + 10 // slight tweak required due to nature of the image
    } );

    // create a rectangle that will act as the background below the lab bench surface, basically like the side of the
    // bench
    const benchWidth = labBenchSurfaceImage.width * 0.95;
    const benchHeight = 1000; // arbitrary large number, user should never see the bottom of this
    const labBenchSide = new Rectangle(
      labBenchSurfaceImage.centerX - benchWidth / 2,
      labBenchSurfaceImage.centerY,
      benchWidth,
      benchHeight,
      { fill: LabSuhuColors.CLOCK_CONTROL_BACKGROUND_COLOR }
    );

    // create nodes that will act as layers in order to create the needed Z-order behavior
    const backLayer = new Node();
    this.addChild( backLayer );
    const beakerBackLayer = new Node();
    this.addChild( beakerBackLayer );
    const beakerGrabLayer = new Node();
    this.addChild( beakerGrabLayer );
    const blockLayer = new Node();
    this.addChild( blockLayer );
    const airLayer = new Node();
    this.addChild( airLayer );
    const burnerEnergyChunkLayer = new EnergyChunkLayer( model.burner.energyChunkList, modelViewTransform );
    this.addChild( burnerEnergyChunkLayer );
    const heaterCoolerFrontLayer = new Node();
    this.addChild( heaterCoolerFrontLayer );
    const beakerFrontLayer = new Node();
    this.addChild( beakerFrontLayer );

    backLayer.addChild( labBenchSide );
    backLayer.addChild( labBenchSurfaceImage );

    // Determine the vertical center between the lower edge of the top of the bench and the bottom of the canvas, used
    // for layout.
    const centerYBelowSurface = ( this.layoutBounds.height + labBenchSurfaceImage.bottom ) / 2;

    // add the play/pause and step buttons
    const timeControlNode = new TimeControlNode( model.isPlayingProperty, {
      timeSpeedProperty: LabSuhuQueryParameters.showSpeedControls && !LabSuhuQueryParameters.hideSpeedControls ? model.timeSpeedProperty : null,
      timeSpeeds: [ TimeSpeed.FAST, TimeSpeed.NORMAL, TimeSpeed.SLOW ],
      speedRadioButtonGroupOnLeft: true,
      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {
          listener: () => model.manualStep()
        }
      },
      tandem: options.tandem.createTandem( 'timeControlNode' )
    } );

    // center time controls below the lab bench
    timeControlNode.center = new Vector2( this.layoutBounds.centerX, centerYBelowSurface );
    backLayer.addChild( timeControlNode );

    // ==== ADD THE BURNERS ==== // 
    const burnerProjectionAmount = modelViewTransform.modelToViewDeltaX(
      model.burner.getBounds().height * LabSuhuConstants.BURNER_EDGE_TO_HEIGHT_RATIO
    );

    // create burner node
    const burnerStand = new BurnerStandNode(
      modelViewTransform.modelToViewBounds( model.burner.getBounds() ),
      burnerProjectionAmount
    );

    /**
     * Creates a gas pipe image used as part of the HeaterCoolerNodes for this screen and links its NodeIO Properties
     * so the gas pipe follows any changes that occur to the provided Node. It also uses the provided node to correctly
     * position itself.
     *
     * @param {Node} node
     * @returns {Node}
     */
     const createAndLinkPipeImageNode = node => {
      const gasPipeNode = new Image( gasPipeIntro_png, {
        right: node.left + 15,
        bottom: node.bottom - 6,
        scale: 0.4
      } );
      node.opacityProperty.lazyLink( () => {
        gasPipeNode.opacity = node.opacity;
      } );
      node.pickableProperty.lazyLink( () => {
        gasPipeNode.pickable = node.pickable;
      } );
      node.visibleProperty.lazyLink( () => {
        gasPipeNode.visible = node.visible;
      } );

      return gasPipeNode;
    };

    // heater cooler not sticky
    const snapToZero = LabSuhuQueryParameters.stickyBurners;

    // set up left heater-cooler node, front and back are added separately to support layering of energy chunks
    const heaterCoolerBack = new HeaterCoolerBack( model.burner.heatCoolLevelProperty, {
      centerX: modelViewTransform.modelToViewX( model.burner.getBounds().centerX ),
      bottom: modelViewTransform.modelToViewY( model.burner.getBounds().minY ),
      // minWidth: burnerStand.width / 1.5,
      maxWidth: burnerStand.width / 1.5
    } );
    const leftHeaterCoolerFront = new HeaterCoolerFront( model.burner.heatCoolLevelProperty, {
      leftTop: heaterCoolerBack.getHeaterFrontPosition(),
      // minWidth: burnerStand.width / 1.5,
      maxWidth: burnerStand.width / 1.5,
      thumbSize: new Dimension2( 36, 18 ),
      snapToZero: snapToZero,
      heaterCoolerBack: heaterCoolerBack,
      tandem: options.tandem.createTandem( 'leftHeaterCoolerNode' ),
      phetioDocumentation: 'the heater/cooler'
    } );
    const leftGasPipe = createAndLinkPipeImageNode( leftHeaterCoolerFront );

    heaterCoolerFrontLayer.addChild( leftHeaterCoolerFront );
    backLayer.addChild( heaterCoolerBack );
    backLayer.addChild( burnerStand );
    backLayer.addChild( leftGasPipe );

    const thermometerDescImage = new Image( thermometerDescImage_png, {
      visibleProperty: model.descVisibility,
      centerX: modelViewTransform.modelToViewX( model.descBounds.centerX ),
      centerY: modelViewTransform.modelToViewY( 0 ) / 2,
      maxWidth: modelViewTransform.modelToViewDeltaX( Math.abs( model.descBounds.getWidth() ) ), // absolute for get positive value, so the node won't rotate
    } );
    backLayer.addChild( thermometerDescImage );

    // Pre-calculate the space occupied by the burners, since they don't move.  This is used when validating
    // positions of movable model elements.  The space is extended a bit to the left to avoid awkward z-ordering
    // issues when preventing overlap.
    const burnerBounds = model.burner.getBounds();
    const burnerPerspectiveExtension = burnerBounds.height * LabSuhuConstants.BURNER_EDGE_TO_HEIGHT_RATIO *
                                       Math.cos( LabSuhuConstants.BURNER_PERSPECTIVE_ANGLE ) / 2;
    // @private {Bounds2}
    this.burnerBlockingRect = new Bounds2(
      burnerBounds.minX - burnerPerspectiveExtension,
      burnerBounds.minY,
      burnerBounds.maxX,
      burnerBounds.maxY
    );

    // add the air
    airLayer.addChild( new AirNode( model.air, modelViewTransform ) );

    // create a reusable bounds in order to reduce memory allocations
    const reusableConstraintBounds = Bounds2.NOTHING.copy();

    /**
     * limits the model element motion based on both view and model constraints
     * @param {ModelElement} modelElement
     * @param {Vector2} proposedPosition
     * @returns {Vector2}
     */
     const constrainMovableElementMotion = ( modelElement, proposedPosition ) => {

      // constrain the model element to stay within the play area
      const viewConstrainedPosition = constrainToPlayArea(
        modelElement,
        proposedPosition,
        this.layoutBounds,
        modelViewTransform,
        reusableConstraintBounds
      );

      // constrain the model element to move legally within the model, which generally means not moving through things
      const viewAndModelConstrainedPosition = efacPositionConstrainer.constrainPosition(
        modelElement,
        viewConstrainedPosition,
        model.beakerGroup,
        model.blockGroup,
        this.burnerBlockingRect
      );

      // return the position as constrained by both the model and the view
      return viewAndModelConstrainedPosition;
    };

    const blockNodeGroup = new PhetioGroup( ( tandem, block ) => {
      return new BlockNode(
        block,
        modelViewTransform,
        constrainMovableElementMotion,
        model.isPlayingProperty, {
          setApproachingEnergyChunkParentNode: airLayer,
          tandem: tandem,
          phetioDynamicElement: true
        }
      );
    }, () => [ model.blockGroup.archetype ], {
      tandem: options.tandem.createTandem( 'blockNodeGroup' ),
      // phetioInputEnabledPropertyInstrumented: true, // attribute not found
      phetioType: PhetioGroup.PhetioGroupIO( Node.NodeIO ),
      supportsDynamicState: false
    } );

    const blockListener = addedBlock => {
      const blockNode = blockNodeGroup.createCorrespondingGroupElement( addedBlock.tandem.name, addedBlock );

      blockLayer.addChild( blockNode );

      // Add the removal listener for if and when this electric field sensor is removed from the model.
      model.blockGroup.elementDisposedEmitter.addListener( function removalListener( removedBlock ) {
        if ( removedBlock === addedBlock ) {
          // blockNode.dispose();
          model.blockGroup.elementDisposedEmitter.removeListener( removalListener );
        }
      } );
    };

    model.blockGroup.forEach( blockListener );
    model.blockGroup.elementCreatedEmitter.addListener( blockListener );

    // @private {PhetioGroup.<BeakerContainerView>}
    this.beakerProxyNodeGroup = new PhetioGroup( ( tandem, beaker ) => {
      const label = beaker.beakerType === BeakerType.getValue( 'WATER' ) ? waterString : unknownLiquidString;
      return new BeakerContainerView(
        beaker,
        model,
        modelViewTransform,
        constrainMovableElementMotion, {
          label: label,
          showVolumeLabel: false,
          tandem: tandem,
          phetioDynamicElement: true,
          phetioInputEnabledPropertyInstrumented: true
        }
      );
    }, () => [ model.beakerGroup.archetype ], {
      tandem: options.tandem.createTandem( 'beakerProxyNodeGroup' ),
      phetioType: PhetioGroup.PhetioGroupIO( ReferenceIO( IOType.ObjectIO ) ),
      // phetioInputEnabledPropertyInstrumented: true,
      supportsDynamicState: false
    } );

    const beakerListener = addedBeaker => {
      const beakerProxyNode = this.beakerProxyNodeGroup.createCorrespondingGroupElement( addedBeaker.tandem.name, addedBeaker );

      beakerFrontLayer.addChild( beakerProxyNode.frontNode );
      beakerBackLayer.addChild( beakerProxyNode.backNode );
      beakerGrabLayer.addChild( beakerProxyNode.grabNode );

      // Add the removal listener for if and when this electric field sensor is removed from the model.
      model.beakerGroup.elementDisposedEmitter.addListener( function removalListener( removedBeaker ) {
        if ( removedBeaker === addedBeaker ) {
          // beakerNode.dispose();
          model.beakerGroup.elementDisposedEmitter.removeListener( removalListener );
        }
      } );
    };

    model.beakerGroup.forEach( beakerListener );
    model.beakerGroup.elementCreatedEmitter.addListener( beakerListener );


    // the thermometer layer needs to be above the movable objects
    const thermometerLayer = new Node();
    this.addChild( thermometerLayer );

    // create and add the temperature and color thermometer nodes, which look like a thermometer with a triangle on the side
    const thermometerNodes = [];
    const nodeString = 'Node';
    let thermometerNodeWidth = 0;
    let thermometerNodeHeight = 0;
    model.thermometers.forEach( thermometer => {
      const thermometerNode = new EFACTemperatureAndColorSensorNode( thermometer, {
        modelViewTransform: modelViewTransform,
        dragBounds: modelViewTransform.viewToModelBounds( this.layoutBounds ),
        draggable: true,
        tandem: options.tandem.createTandem( thermometer.tandem.name + nodeString )
      } );

      // thermometers need to be behind blocks and beakers while in storage, but in front when them while in use
      thermometer.activeProperty.link( active => {
        if ( active ) {
          if ( backLayer.hasChild( thermometerNode ) ) {
            backLayer.removeChild( thermometerNode );
          }
          thermometerLayer.addChild( thermometerNode );
        }
        else {
          if ( thermometerLayer.hasChild( thermometerNode ) ) {
            thermometerLayer.removeChild( thermometerNode );
          }
          backLayer.addChild( thermometerNode );
        }
      } );

      thermometerNodes.push( thermometerNode );

      // update the variables that will be used to create the storage area
      thermometerNodeHeight = thermometerNodeHeight || thermometerNode.height;
      thermometerNodeWidth = thermometerNodeWidth || thermometerNode.width;
    } );

    // create the storage area for the thermometers
    const thermometerStorageAreaNode = new Rectangle(
      0,
      0,
      thermometerNodeWidth * 2,
      thermometerNodeHeight * 1.15,
      LabSuhuConstants.CONTROL_PANEL_CORNER_RADIUS,
      LabSuhuConstants.CONTROL_PANEL_CORNER_RADIUS, {
        fill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
        stroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
        lineWidth: LabSuhuConstants.CONTROL_PANEL_OUTLINE_LINE_WIDTH,
        left: EDGE_INSET,
        top: EDGE_INSET,
        tandem: options.tandem.createTandem( 'thermometerStorageAreaNode' ),
        phetioDocumentation: 'panel where the thermometers are stored'
      }
    );
    backLayer.addChild( thermometerStorageAreaNode );
    thermometerStorageAreaNode.moveToBack(); // move behind the thermometerNodes when they are being stored

    // set initial position for thermometers in the storage area, hook up listeners to handle interaction with storage area
    const interThermometerSpacing = ( thermometerStorageAreaNode.width - thermometerNodeWidth ) / 2;
    const offsetFromBottomOfStorageArea = 25; // empirically determined
    const thermometerNodePositionX = thermometerStorageAreaNode.left + interThermometerSpacing;
    const thermometerPositionInStorageArea = new Vector2(
      modelViewTransform.viewToModelX( thermometerNodePositionX ),
      modelViewTransform.viewToModelY( thermometerStorageAreaNode.bottom - offsetFromBottomOfStorageArea )
    );

    model.thermometers.forEach( ( thermometer, index ) => {

      // add a listener for when the thermometer is removed from or returned to the storage area
      thermometer.userControlledProperty?.link( userControlled => {
        if ( userControlled ) {

          // the user has picked up this thermometer
          if ( !thermometer.activeProperty.get() ) {

            // The thermometer was inactive, which means that it was in the storage area.  In this case, we make it jump
            // a little to cue the user that this is a movable object.
            thermometer.positionProperty.set(
              thermometer.positionProperty.get().plus( modelViewTransform.viewToModelDelta( THERMOMETER_JUMP_ON_EXTRACTION ) )
            );

            // activate the thermometer
            thermometer.activeProperty.set( true );
          }
        }
        else {

          // the user has released this thermometer - test if it should go back in the storage area
          const thermometerNode = thermometerNodes[ index ];
          const colorIndicatorBounds = thermometerNode.localToParentBounds(
            thermometerNode.temperatureAndColorSensorNode.colorIndicatorBounds
          );
          const thermometerBounds = thermometerNode.localToParentBounds(
            thermometerNode.temperatureAndColorSensorNode.thermometerBounds
          );
          if ( colorIndicatorBounds.intersectsBounds( thermometerStorageAreaNode.bounds ) ||
               thermometerBounds.intersectsBounds( thermometerStorageAreaNode.bounds ) ) {
            returnThermometerToStorageArea( thermometer, true, thermometerNode );
          }
        }
      } );
    } );

    /**
     * return a thermometer to its initial position in the storage area
     * @param {StickyTemperatureAndColorSensor} thermometer
     * @param {Boolean} doAnimation - whether the thermometer animates back to the storage area
     * @param {EFACTemperatureAndColorSensorNode} [thermometerNode]
     */
     const returnThermometerToStorageArea = ( thermometer, doAnimation, thermometerNode ) => {
      const currentPosition = thermometer.positionProperty.get();
      if ( !currentPosition.equals( thermometerPositionInStorageArea ) && doAnimation ) {

        // calculate the time needed to get to the destination
        const animationDuration = Math.min(
          thermometer.positionProperty.get().distance( thermometerPositionInStorageArea ) / THERMOMETER_ANIMATION_SPEED,
          MAX_THERMOMETER_ANIMATION_TIME
        );
        const animationOptions = {
          property: thermometer.positionProperty,
          to: thermometerPositionInStorageArea,
          duration: animationDuration,
          easing: Easing.CUBIC_IN_OUT
        };
        const translateAnimation = new Animation( animationOptions );

        // make the thermometer unpickable while it's animating back to the storage area
        translateAnimation.animatingProperty.link( isAnimating => {
          thermometerNode && ( thermometerNode.pickable = !isAnimating );
        } );
        translateAnimation.start();
      }
      else if ( !currentPosition.equals( thermometerPositionInStorageArea ) && !doAnimation ) {

        // set the initial position for this thermometer
        thermometer.positionProperty.set( thermometerPositionInStorageArea );
      }

      // thermometers are inactive when in the storage area
      thermometer.activeProperty.set( false );
    };

    // returns all thermometers to the storage area
    const returnAllThermometersToStorageArea = () => {
      model.thermometers.forEach( thermometer => {
        return returnThermometerToStorageArea(thermometer, false);
      } );
    };

    // put all of the temperature and color thermometers into the storage area as part of initialization process
    returnAllThermometersToStorageArea();

    // updates the Z-order of the blocks when their position changes
    const blockChangeListener = position => {
      const blocks = [ ...model.blockGroup.getArray() ];

      blocks.sort( ( a, b ) => {
        // a block that's completely to the right of another block should always be in front
        if ( a.bounds.minX >= b.bounds.maxX ) {
          return 1;
        }
        else if ( a.bounds.maxX <= b.bounds.minX ) {
          return -1;
        }

        // a block that's above another should always be in front if they overlap in the x direction
        if ( a.bounds.minY > b.bounds.minY ) {
          return 1;
        }
        else if ( b.bounds.minY > a.bounds.minY ) {
          return -1;
        }
        else {
          return 0;
        }
      } );

      for ( let i = 0; i < blocks.length; i++ ) {
        blocks[ i ].zIndex = i; // mark so the model is aware of its z-index (the sensors need to know this).
        blockNodeGroup.forEach( blockNode => {
          if ( blockNode.block === blocks[ i ] ) {
            // @samreid and @chrisklus looked for any performance bottlenecks caused by re-layering every frame but
            // could not find anything so we suspect Scenery know not to if the order is already correct
            blockNode.moveToFront();
          }
        } );
      }
    };

    // no need to link z-order-changing listener if there is only one block
    if ( model.blockGroup.count > 1 ) {
      model.blockGroup.forEach( block => {
        block.positionProperty.link( blockChangeListener );
      } );
    }

    // no need to link z-order-changing listener if there is only one beaker
    if ( model.beakerGroup.count > 1 ) {

      // this particular listener could be generalized to support more than 2 beakers (see the block listener above),
      // but since other code in this sim limits the number of beakers to 2, i (@chrisklus) think it's better to
      // leave this listener as simple as it is, since a general version could only worsen performance.
      assert && assert( model.beakerGroup.count <= 2, `Only 2 beakers are allowed: ${model.beakerGroup.count}` );

      const beakerOneIndex = 0;
      const beakerTwoIndex = 1;

      // updates the Z-order of the beakers whenever their position changes
      const beakerChangeListener = () => {
        if ( model.beakerGroup.getElement( beakerOneIndex ).getBounds().centerY >
             model.beakerGroup.getElement( beakerTwoIndex ).getBounds().centerY ) {
          this.beakerProxyNodeGroup.getElement( beakerOneIndex ).moveToFront();
        }
        else {
          this.beakerProxyNodeGroup.getElement( beakerTwoIndex ).moveToFront();
        }
      };
      model.beakerGroup.forEach( beaker => {
        beaker.positionProperty.link( beakerChangeListener );
      } );
    }

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        returnAllThermometersToStorageArea();
        this.beakerProxyNodeGroup.forEach( beakerProxyNode => {
          beakerProxyNode.reset();
        } );
      },
      right: this.layoutBounds.maxX - LabSuhuConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - LabSuhuConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // add a floating sky high above the sim
    const skyNode = new SkyNode(
      this.layoutBounds,
      modelViewTransform.modelToViewY( LabSuhuConstants.INTRO_SCREEN_ENERGY_CHUNK_MAX_TRAVEL_HEIGHT ) + LabSuhuConstants.ENERGY_CHUNK_WIDTH
    );
    this.addChild( skyNode );

    // listen to the manualStepEmitter in the model
    model.manualStepEmitter.addListener( dt => {
      this.manualStep( dt );
    } );

    /**
     * constrains the provided model element's position to the play area
     * @param {ModelElement} modelElement
     * @param {Vector2} proposedPosition
     * @param {Bounds2} playAreaBounds
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Bounds2} reusuableBounds
     * @returns {Vector2}
     */
    const constrainToPlayArea = ( modelElement, proposedPosition, playAreaBounds, modelViewTransform, reusuableBounds ) => {
      const viewConstrainedPosition = proposedPosition.copy();

      const elementViewBounds = modelViewTransform.modelToViewBounds(
        // error method getCompositeBoundsForPosition not found
        modelElement.getCompositeBoundsForPosition( proposedPosition, reusuableBounds )
      );

      // constrain the model element to stay within the play area
      let deltaX = 0;
      let deltaY = 0;
      if ( elementViewBounds.maxX >= playAreaBounds.maxX ) {
        deltaX = modelViewTransform.viewToModelDeltaX( playAreaBounds.maxX - elementViewBounds.maxX );
      }
      else if ( elementViewBounds.minX <= playAreaBounds.minX ) {
        deltaX = modelViewTransform.viewToModelDeltaX( playAreaBounds.minX - elementViewBounds.minX );
      }
      if ( elementViewBounds.minY <= playAreaBounds.minY ) {
        deltaY = modelViewTransform.viewToModelDeltaY( playAreaBounds.minY - elementViewBounds.minY );
      }
      else if ( proposedPosition.y < 0 ) {
        deltaY = -proposedPosition.y;
      }
      viewConstrainedPosition.setXY( viewConstrainedPosition.x + deltaX, viewConstrainedPosition.y + deltaY );

      // return the position as constrained by both the model and the view
      return viewConstrainedPosition;
    };


    let energyDialog; // lazily created

    const infoButton = new InfoButton( {
      iconFill: 'rgb( 41, 106, 163 )',
      maxHeight: resetAllButton.height,
      left: EDGE_INSET,
      centerY: resetAllButton.centerY,
      listener: () => {
        // Lazy creation.
        if ( !energyDialog ) {
          energyDialog = new IntroInfoDialog();
        }
        energyDialog.show();
      },
      touchAreaXDilation: 10,
      touchAreaYDilation: 5
    } );

    this.addChild( infoButton );
  }

  /**
   * step this view element, called by the framework
   * @param dt - time step, in seconds
   * @public
   */
   step( dt ) {
    if ( this.model.isPlayingProperty.get() ) {
      this.stepView( dt );
    }
  }

  /**
   * step forward by one fixed nominal frame time
   * @param dt - time step, in seconds
   * @public
   */
  manualStep( dt ) {
    this.stepView( dt );
  }

  /**
   * update the state of the non-model associated view elements for a given time amount
   * @param dt - time step, in seconds
   * @public
   */
  stepView( dt ) {
    this.beakerProxyNodeGroup.forEach( beakerProxyNode => {
      beakerProxyNode.step( dt );
    } );
  }

  /**
   * Custom layout function for this view so that it floats to the bottom of the window.
   *
   * @param {Bounds2} viewBounds
   * @override
   * @public
   */
  layout( viewBounds ) {
    this.resetTransform();

    const scale = this.getLayoutScale( viewBounds );
    const width = viewBounds.width;
    const height = viewBounds.height;
    this.setScaleMagnitude( scale );

    let dx = 0;
    let offsetY = 0;

    // Move to bottom vertically (custom for this sim)
    if ( scale === width / this.layoutBounds.width ) {
      offsetY = ( height / scale - this.layoutBounds.height );
    }

    // center horizontally (default behavior for ScreenView)
    else if ( scale === height / this.layoutBounds.height ) {
      dx = ( width - this.layoutBounds.width * scale ) / 2 / scale;
    }
    this.translate( dx + viewBounds.left / scale, offsetY + viewBounds.top / scale );

    // update the visible bounds of the screen view
    this.visibleBoundsProperty.set( new Bounds2( -dx, -offsetY, width / scale - dx, height / scale - offsetY ) );
  }
}

labSuhu.register( 'IntroScreenView', IntroScreenView );
export default IntroScreenView;