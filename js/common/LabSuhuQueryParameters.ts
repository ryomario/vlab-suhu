// Copyright 2022, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Mario (Software Engineer)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import labSuhu from '../labSuhu.js';

const SCHEMA_MAP = {
  //TODO add schemas for query parameters

  // show the normal/fast forward buttons on the first screen
  // For internal use only, not public facing.
  showSpeedControls: { type: 'flag' } as QueryStringMachineSchema,
  hideSpeedControls: { type: 'flag' } as QueryStringMachineSchema,
  stickyBurners: { type: 'flag' } as QueryStringMachineSchema,
};

const LabSuhuQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
LabSuhuQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

labSuhu.register( 'LabSuhuQueryParameters', LabSuhuQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.labSuhu.LabSuhuQueryParameters' );

export default LabSuhuQueryParameters;