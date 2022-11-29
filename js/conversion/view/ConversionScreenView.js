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
import { Node, Text } from '../../../../scenery/js/imports.js';
import Thermometer from '../../scale/model/Thermometer.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import LabSuhuColors from '../../common/LabSuhuColors.js';

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
          tandem: options.tandem.createTandem( thermometerType.name + 'Node' )
        }
      );
      this.thermometersNode[ thermometerType.name ] = thermometerNode;
    }

    let savedBottomThermometerNode;
    
    model.thermometerTypeLeftProperty.link( ( thermometerType, oldThermometerType ) => {
      if ( oldThermometerType && oldThermometerType !== Thermometer.NONE ) {
        thermometerLeftNode.removeChild( this.thermometersNode[ oldThermometerType.name ] );
        this.thermometersNode[ oldThermometerType.name ].visible = false;

        // set visibility of combobox item
        comboBoxThermometerRight.setItemVisible( oldThermometerType, true);
      }
      if ( thermometerType !== Thermometer.NONE ) {
        this.thermometersNode[ thermometerType.name ].visible = true;
        thermometerLeftNode.addChild( this.thermometersNode[ thermometerType.name ] );

        // repositioning
        const centerX = modelViewTransform.modelToViewX( model.thermometerLeftXPosition );
        const centerTop = new Vector2(
          centerX,
          EDGE_INSET
        );

        comboBoxThermometerLeft.setCenterTop( centerTop );

        
        this.thermometersNode[ thermometerType.name ].centerX = centerX;
        if ( !savedBottomThermometerNode ) {
          this.thermometersNode[ thermometerType.name ].top = comboBoxThermometerLeft.bottom + EDGE_INSET;
          savedBottomThermometerNode = this.thermometersNode[ thermometerType.name ].getBottom();
        } else {
          this.thermometersNode[ thermometerType.name ].setBottom( savedBottomThermometerNode );
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
      if ( oldThermometerType && oldThermometerType !== Thermometer.NONE ) {
        thermometerRightNode.removeChild( this.thermometersNode[ oldThermometerType.name ] );
        this.thermometersNode[ oldThermometerType.name ].visible = false;

        // set visibility of combobox item
        comboBoxThermometerLeft.setItemVisible( oldThermometerType, true);
      }
      if ( thermometerType !== Thermometer.NONE ) {
        this.thermometersNode[ thermometerType.name ].visible = true;
        thermometerRightNode.addChild( this.thermometersNode[ thermometerType.name ] );

        // repositioning
        const centerX = modelViewTransform.modelToViewX( model.thermometerRightXPosition );
        const centerTop = new Vector2(
          centerX,
          EDGE_INSET
        );

        comboBoxThermometerRight.setCenterTop( centerTop );

        
        this.thermometersNode[ thermometerType.name ].centerX = centerX;
        if ( !savedBottomThermometerNode ) {
          this.thermometersNode[ thermometerType.name ].top = comboBoxThermometerRight.bottom + EDGE_INSET;
          savedBottomThermometerNode = this.thermometersNode[ thermometerType.name ].getBottom();
        } else {
          this.thermometersNode[ thermometerType.name ].setBottom( savedBottomThermometerNode );
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