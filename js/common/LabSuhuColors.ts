// Copyright 2022, University of Colorado Boulder

/**
 * Defines the colors for this sim.
 *
 * All simulations should have a Colors.js file, see https://github.com/phetsims/scenery-phet/issues/642.
 *
 * For static colors that are used in more than one place, add them here.
 *
 * For dynamic colors that can be controlled via colorProfileProperty.js, add instances of ProfileColorProperty here,
 * each of which is required to have a default color. Note that dynamic colors can be edited by running the sim from
 * phetmarks using the "Color Edit" mode.
 *
 * @author Mario (Software Engineer)
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import labSuhu from '../labSuhu.js';

const BACKGROUND_COLOR = new Color( 144, 176, 224 );

const LabSuhuColors = {

  // Background color for screens in this sim
  BACKGROUND_COLOR: BACKGROUND_COLOR,
  screenBackgroundColorProperty: new ProfileColorProperty( labSuhu, 'background', {
    default: BACKGROUND_COLOR
  } ),
  CLOCK_CONTROL_BACKGROUND_COLOR: new Color( 216, 188, 136 ),
  FLAME_ORANGE: new Color( 'orange' ),
  ICE_BLUE: new Color( '#87CEFA' ),
  CONTROL_PANEL_BACKGROUND_COLOR: new Color( 170, 200, 255 ),
  CONTROL_PANEL_OUTLINE_STROKE: new Color( 120, 120, 120 ),
};

labSuhu.register( 'LabSuhuColors', LabSuhuColors );
export default LabSuhuColors;