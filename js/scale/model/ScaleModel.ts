// Copyright 2022, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Mario (Software Engineer)
 */

import labSuhu from '../../labSuhu.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  //TODO add options that are specific to ScaleModel here
};

type ScaleModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class ScaleModel {

  public constructor( providedOptions: ScaleModelOptions ) {
    //TODO
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

labSuhu.register( 'ScaleModel', ScaleModel );
export default ScaleModel;