// Copyright 2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Mario (Software Engineer)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import IntroScreen from './intro/IntroScreen.js';
import LabSuhuStrings from './LabSuhuStrings.js';
import './common/LabSuhuQueryParameters.js';
import ScaleScreen from './scale/ScaleScreen.js';
import ConversionScreen from './conversion/ConversionScreen.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  const titleStringProperty = LabSuhuStrings[ 'lab-suhu' ].titleStringProperty;

  const tandem = Tandem.ROOT;
  const screens = [
    new IntroScreen( { tandem: tandem.createTandem( 'IntroScreen' ) } ),
    new ScaleScreen( { tandem: tandem.createTandem( 'ScaleScreen' ) } ),
    new ConversionScreen( { tandem: tandem.createTandem( 'ConversionScreen' ) } )
  ];

  const options: SimOptions = {

    //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
    credits: {
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      contributors: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );