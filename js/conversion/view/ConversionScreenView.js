// Copyright 2022, University of Colorado Boulder

/**
 * The view for Conversion screen.
 *
 * @author Mario (Software Engineer)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import LabSuhuConstants from '../../common/LabSuhuConstants.js';
import labSuhu from '../../labSuhu.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import ConversionModel from '../model/ConversionModel.js';
import SkyNode from '../../../../energy-forms-and-changes/js/common/view/SkyNode.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import ThermometerManual from '../../common/view/ThermometerManual.js';
import { Color, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Thermometer from '../../scale/model/Thermometer.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import LabSuhuColors from '../../common/LabSuhuColors.js';
import EquationPanel from './EquationPanel.js';
import SuhuEquationNode from './SuhuEquationNode.js';
import InfoButton from '../../../../scenery-phet/js/buttons/InfoButton.js';
import ConversionInfoDialog from './ConversionInfoDialog.js';

// CONSTANTS

const EDGE_INSET = 20;

class ConversionScreenView extends ScreenView {
  /**
   * 
   * @param {ConversionModel} model 
   * @param {Object} providedOptions 
   */
  constructor( model, providedOptions ) {

    const options = merge( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );
    
    // Create the model-view transform. The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model appears in the
    // view.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2(
        LabSuhuConstants.SCREEN_VIEW_X_MARGIN,
        LabSuhuConstants.SCREEN_VIEW_Y_MARGIN
      ),
      // new Vector2(
      //   this.layoutBounds.width - LabSuhuConstants.SCREEN_VIEW_X_MARGIN,
      //   this.layoutBounds.height - LabSuhuConstants.SCREEN_VIEW_Y_MARGIN
      // ),
      ( this.layoutBounds.width - 2 * LabSuhuConstants.SCREEN_VIEW_X_MARGIN ) / ConversionModel.SCREEN_WIDTH
    );

    // right box
    const boxWidth = this.layoutBounds.width / 2 - 2 * EDGE_INSET;

    const equationNode = new SuhuEquationNode( { tandem: options.tandem.createTandem( 'equationPanelContentNode' ) } );

    const equationPanel = new EquationPanel( 
      new Text( 'Persamaan', { fontSize: 24, tandem: options.tandem.createTandem( 'equationPanelTitleNode' ) } ),
      equationNode,
      {
        cornerRadius: 10,
        minWidth: boxWidth,
        maxWidth: boxWidth,
        // minHeight: boxWidth,
        maxHeight: this.layoutBounds.height - 2 * EDGE_INSET,
        centerX: modelViewTransform.modelToViewX( model.boxXPosition ),
        centerY: this.layoutBounds.height / 2,

        fill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
        stroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE
      } 
    );

    this.addChild( equationPanel );

    const thermometerLeftNode = new Node( {
      visibleProperty: model.thermometerLeftVisibilityProperty,
      // maxHeight: this.layoutBounds.height,
      // maxWidth: 150,
      tandem: options.tandem.createTandem( 'thermometerLeftNode' )
    } );
    const thermometerRightNode = new Node( {
      visibleProperty: model.thermometerRightVisibilityProperty,
      // maxHeight: this.layoutBounds.height,
      // maxWidth: 150,
      tandem: options.tandem.createTandem( 'thermometerRightNode' )
    } );
    this.addChild( thermometerLeftNode );
    this.addChild( thermometerRightNode );

    // COMBOBOX

    // combobox items
    const thermometerItems = ConversionModel.THERMOMETERS_TYPE.concat( Thermometer.NONE );
    const comboboxLeftItems = thermometerItems.map( thermometerType => {
      return {
        value: thermometerType,
        node: new Text( thermometerType.title || 'Pilih termometer', {
          font: new PhetFont( 20 ),
          maxWidth: 100,
        } )
      };
    } );
    const comboboxRightItems = thermometerItems.map( thermometerType => {
      return {
        value: thermometerType,
        node: new Text( thermometerType.title || 'Pilih termometer', {
          font: new PhetFont( 20 ),
          maxWidth: 100,
        } )
      };
    } );

    const comboBoxThermometerLeft = new ComboBox( model.thermometerTypeLeftProperty, comboboxLeftItems, thermometerLeftNode, {
      // top: 0,
      // centerX: thermometerLeftNode.width / 2,

      cornerRadius: LabSuhuConstants.CONTROL_PANEL_CORNER_RADIUS,
      buttonFill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
      buttonStroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
      listFill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
      listStroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
      highlightFill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR.brighterColor( 0.9 ),
    } );
    
    const comboBoxThermometerRight = new ComboBox( model.thermometerTypeRightProperty, comboboxRightItems, thermometerRightNode, {
      // top: 0,
      // centerX: thermometerRightNode.width / 2,

      cornerRadius: LabSuhuConstants.CONTROL_PANEL_CORNER_RADIUS,
      buttonFill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
      buttonStroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
      listFill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
      listStroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
      highlightFill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR.brighterColor( 0.9 ),
    } );

    this.thermometersNode = {};
    for ( const thermometerType of ConversionModel.THERMOMETERS_TYPE ) {
      const thermometerNode = new ThermometerManual(
        model.thermometersTemperatureProperty[ thermometerType.name ],
        thermometerType,
        {
          minTemperature: Math.round( ( thermometerType.lowerPoint - Math.round( 5 + Math.random() * thermometerType.halfRange ) ) / 5 ) * 5, // multiples of 5, min -5
          maxTemperature: Math.round( ( thermometerType.upperPoint + Math.round( 5 + Math.random() * thermometerType.halfRange ) ) / 5 ) * 5, // multiples of 5, min +5
          showLabelValue: true,
          labelColor: '#038',
          tandem: options.tandem.createTandem( thermometerType.name + 'Node' )
        }
      );
      this.thermometersNode[ thermometerType.name ] = thermometerNode;
    }

    let savedBottomThermometerNode;
    let savedRightThermometerNodeLeft;
    let savedRightThermometerNodeRight;
    
    model.thermometerTypeLeftProperty.link( ( thermometerType, oldThermometerType ) => {

      equationNode.thermometerInitialProperty.value = thermometerType;

      if ( oldThermometerType && oldThermometerType !== Thermometer.NONE ) {
        model.thermometersTemperatureProperty[ oldThermometerType.name ].unlink( equationNode.temperatureInitialChangeListener );
        equationNode.temperatureInitialProperty.value = null;

        thermometerLeftNode.removeChild( this.thermometersNode[ oldThermometerType.name ] );
        this.thermometersNode[ oldThermometerType.name ].visible = false;

        // set visibility of combobox item
        comboBoxThermometerRight.setItemVisible( oldThermometerType, true);
      }
      if ( thermometerType !== Thermometer.NONE ) {
        model.thermometersTemperatureProperty[ thermometerType.name ].link( equationNode.temperatureInitialChangeListener );

        this.thermometersNode[ thermometerType.name ].updateBaseColor( LabSuhuColors.THERMOMETER_INITIAL );
        this.thermometersNode[ thermometerType.name ].visible = true;
        thermometerLeftNode.addChild( this.thermometersNode[ thermometerType.name ] );

        // repositioning
        const centerX = modelViewTransform.modelToViewX( model.thermometerLeftXPosition );
        const centerTop = new Vector2(
          centerX,
          EDGE_INSET
        );

        comboBoxThermometerLeft.setCenterTop( centerTop );

        // y pos
        if ( !savedBottomThermometerNode ) {
          this.thermometersNode[ thermometerType.name ].top = comboBoxThermometerLeft.bottom + 2 * EDGE_INSET;
          savedBottomThermometerNode = this.thermometersNode[ thermometerType.name ].getBottom();
        } else {
          this.thermometersNode[ thermometerType.name ].setBottom( savedBottomThermometerNode );
        }
        // x pos
        if ( !savedRightThermometerNodeLeft ) {
          this.thermometersNode[ thermometerType.name ].centerX = centerX;
          savedRightThermometerNodeLeft = this.thermometersNode[ thermometerType.name ].getRight();
        } else {
          this.thermometersNode[ thermometerType.name ].setRight( savedRightThermometerNodeLeft );
        }

        // set visibility of combobox item
        comboBoxThermometerRight.setItemVisible( thermometerType, false);
      } else {
        // repositioning
        const centerX = modelViewTransform.modelToViewX( model.thermometerSingleXPosition );
        const center = new Vector2(
          centerX,
          this.layoutBounds.height / 2
        );

        comboBoxThermometerLeft.setCenter( center );
      }
    } );
    model.thermometerTypeRightProperty.link( ( thermometerType, oldThermometerType ) => {

      equationNode.thermometerFinalProperty.value = thermometerType;

      if ( oldThermometerType && oldThermometerType !== Thermometer.NONE ) {
        model.thermometersTemperatureProperty[ oldThermometerType.name ].unlink( equationNode.temperatureFinalChangeListener );
        equationNode.temperatureFinalProperty.value = null;

        thermometerRightNode.removeChild( this.thermometersNode[ oldThermometerType.name ] );
        this.thermometersNode[ oldThermometerType.name ].visible = false;

        // set visibility of combobox item
        comboBoxThermometerLeft.setItemVisible( oldThermometerType, true);
      }
      if ( thermometerType !== Thermometer.NONE ) {
        model.thermometersTemperatureProperty[ thermometerType.name ].link( equationNode.temperatureFinalChangeListener );

        this.thermometersNode[ thermometerType.name ].updateBaseColor( LabSuhuColors.THERMOMETER_FINAL );
        this.thermometersNode[ thermometerType.name ].visible = true;
        thermometerRightNode.addChild( this.thermometersNode[ thermometerType.name ] );

        // repositioning
        const centerX = modelViewTransform.modelToViewX( model.thermometerRightXPosition );
        const centerTop = new Vector2(
          centerX,
          EDGE_INSET
        );

        comboBoxThermometerRight.setCenterTop( centerTop );

        // y pos
        if ( !savedBottomThermometerNode ) {
          this.thermometersNode[ thermometerType.name ].top = comboBoxThermometerRight.bottom + 2 * EDGE_INSET;
          savedBottomThermometerNode = this.thermometersNode[ thermometerType.name ].getBottom();
        } else {
          this.thermometersNode[ thermometerType.name ].setBottom( savedBottomThermometerNode );
        }
        // x pos
        if ( !savedRightThermometerNodeRight ) {
          this.thermometersNode[ thermometerType.name ].centerX = centerX;
          savedRightThermometerNodeRight = this.thermometersNode[ thermometerType.name ].getRight();
        } else {
          this.thermometersNode[ thermometerType.name ].setRight( savedRightThermometerNodeRight );
        }

        // set visibility of combobox item
        comboBoxThermometerLeft.setItemVisible( thermometerType, false);
      } else {

        // repositioning
        const centerX = modelViewTransform.modelToViewX( model.thermometerRightXPosition );
        const center = new Vector2(
          centerX,
          this.layoutBounds.height / 2
        );

        comboBoxThermometerRight.setCenter( center );
      }
    } );

    thermometerLeftNode.addChild( comboBoxThermometerLeft );
    thermometerRightNode.addChild( comboBoxThermometerRight );




    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - LabSuhuConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - LabSuhuConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    const skyNode = new SkyNode(
      this.layoutBounds,
      this.layoutBounds.height * -1.5
    );
    this.addChild( skyNode );


    let energyDialog; // lazily created

    const infoButton = new InfoButton( {
      iconFill: 'rgb( 41, 106, 163 )',
      maxHeight: resetAllButton.height,
      left: EDGE_INSET,
      centerY: resetAllButton.centerY,
      listener: () => {
        // Lazy creation.
        if ( !energyDialog ) {
          energyDialog = new ConversionInfoDialog();
        }
        energyDialog.show();
      },
      touchAreaXDilation: 10,
      touchAreaYDilation: 5
    } );

    this.addChild( infoButton );
  }

  /**
   * Resets the view.
   */
  reset() {
    for ( const thermometer of Object.values( this.thermometersNode ) ) {
      thermometer.reset();
    }
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  step( dt ) {
    //TODO
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

labSuhu.register( 'ConversionScreenView', ConversionScreenView );
export default ConversionScreenView;