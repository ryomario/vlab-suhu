// Copyright 2022, University of Colorado Boulder

/**
 * model for BeakerContainer with function get volume
 *
 * @author Mario (Software Engineer)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BeakerContainer from '../../../../energy-forms-and-changes/js/intro/model/BeakerContainer.js';
import labSuhu from '../../labSuhu.js';

class SuhuBeakerContainer extends BeakerContainer {

    /**
     * @param {Vector2} initialPosition
     * @param {number} width
     * @param {number} height
     * @param {Array.<Block>} potentiallyContainedElements
     * @param {BooleanProperty} energyChunksVisibleProperty
     * @param {EnergyChunkGroup} energyChunkGroup
     * @param {Object} config
     */
    constructor( initialPosition,
        width,
        height,
        potentiallyContainedElements,
        energyChunksVisibleProperty,
        energyChunkGroup,
        config ) {

        super( initialPosition, width, height, potentiallyContainedElements, energyChunksVisibleProperty, energyChunkGroup, config );

        const fluidVolume = this.getFluidVolume();
        /**
         * The fluid volume in m³
         */
        this.fluidVolume = new NumberProperty( fluidVolume, {
            tandem: config.tandem.createTandem( 'fluidVolumeProperty' ),
            phetioReadOnly: true,
            phetioHighFrequency: true,
            phetioDocumentation: 'the volume of fluid in the beaker'
        } );
        // listen the fluid proportion to change the fluid volume
        this.fluidProportionProperty.link( proportion => {
            this.fluidVolume.set( Math.PI * Math.pow( this.width / 2, 2 ) * this.height * proportion )
        } );
    }

    /**
     * Get the fluid volume
     * @returns {number} The fluid volume in m³
     */
    getFluidVolume() {
        return Math.PI * Math.pow( this.width / 2, 2 ) * this.height * this.fluidProportionProperty.get();
    }
}

labSuhu.register( 'SuhuBeakerContainer', SuhuBeakerContainer );
export default SuhuBeakerContainer;