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
import ConversionModel from './model/ConversionModel.js';
import ConversionScreenView from './view/ConversionScreenView.js';
import LabSuhuStrings from '../LabSuhuStrings.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';
import icon from '../../images/fontisto_recycle_png.js';

type SelfOptions = {
  //TODO add options that are specific to ConversionScreen here
};

type ConversionScreenOptions = SelfOptions & ScreenOptions;

class ConversionScreen extends Screen<ConversionModel, ConversionScreenView> {

  public constructor( providedOptions: ConversionScreenOptions ) {

    const options = optionize<ConversionScreenOptions, SelfOptions, ScreenOptions>()( {
      name: LabSuhuStrings.screen.conversionNameStringProperty,

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
      () => new ConversionModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ConversionScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

labSuhu.register( 'ConversionScreen', ConversionScreen );
export default ConversionScreen;