// Copyright 2022, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Mario (Software Engineer)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import LabSuhuColors from '../common/LabSuhuColors.js';
import labSuhu from '../labSuhu.js';
import ScaleModel from './model/ScaleModel.js';
import ScaleScreenView from './view/ScaleScreenView.js';
import LabSuhuStrings from '../LabSuhuStrings.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import icon from '../../images/carbon_temperature-max_png.js';

type SelfOptions = {
  //TODO add options that are specific to ScaleScreen here
};

type ScaleScreenOptions = SelfOptions & ScreenOptions;

class ScaleScreen extends Screen<ScaleModel, ScaleScreenView> {

  public constructor( providedOptions: ScaleScreenOptions ) {

    const options = optionize<ScaleScreenOptions, SelfOptions, ScreenOptions>()( {
      name: LabSuhuStrings.screen.scaleNameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: LabSuhuColors.screenBackgroundColorProperty,
      homeScreenIcon: new ScreenIcon( new Image( icon ), {
        fill: LabSuhuColors.screenBackgroundColorProperty,
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } )
    }, providedOptions );

    super(
      () => new ScaleModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ScaleScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

labSuhu.register( 'ScaleScreen', ScaleScreen );
export default ScaleScreen;