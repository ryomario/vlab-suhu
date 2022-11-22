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
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';
import LabSuhuStrings from '../LabSuhuStrings.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import icon from '../../images/tabler_speakerphone_png.js';

type SelfOptions = {
  //TODO add options that are specific to IntroScreen here
};

type IntroScreenOptions = SelfOptions & ScreenOptions;

class IntroScreen extends Screen<IntroModel, IntroScreenView> {

  public constructor( providedOptions: IntroScreenOptions ) {

    const options = optionize<IntroScreenOptions, SelfOptions, ScreenOptions>()( {
      name: LabSuhuStrings.screenIntroNameStringProperty,

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
      () => new IntroModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new IntroScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

labSuhu.register( 'IntroScreen', IntroScreen );
export default IntroScreen;