// Copyright 2022, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Mario (Software Engineer)
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import LabSuhuConstants from '../../common/LabSuhuConstants.js';
import labSuhu from '../../labSuhu.js';
import ConversionModel from '../model/ConversionModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Utils from '../../../../dot/js/Utils.js';
import shelf_png from '../../../images/shelf_png.js';
import { Image, Rectangle } from '../../../../scenery/js/imports.js';
import LabSuhuColors from '../../common/LabSuhuColors.js';

type SelfOptions = {
 //TODO add options that are specific to ConversionScreenView here
};

type ConversionScreenViewOptions = SelfOptions & ScreenViewOptions;

class ConversionScreenView extends ScreenView {

  public constructor( model: ConversionModel, providedOptions: ConversionScreenViewOptions ) {

    const options = optionize<ConversionScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

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
        Utils.roundSymmetric( this.layoutBounds.width * 0.5 ),
        Utils.roundSymmetric( this.layoutBounds.height * 0.85 - 10 - LabSuhuConstants.SCREEN_VIEW_Y_MARGIN )
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
    this.addChild( labBenchSide );
    this.addChild( labBenchSurfaceImage );


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
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO
  }
}

labSuhu.register( 'ConversionScreenView', ConversionScreenView );
export default ConversionScreenView;