// Copyright 2022, University of Colorado Boulder

/**
 * view for BeakerContainer with function to display volume
 *
 * @author Mario (Software Engineer)
 */

import Matrix3 from '../../../../dot/js/Matrix3.js';
import Transform3 from '../../../../dot/js/Transform3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import BeakerContainerView from '../../../../energy-forms-and-changes/js/intro/view/BeakerContainerView.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, Text } from '../../../../scenery/js/imports.js';
import labSuhu from '../../labSuhu.js';
import LabSuhuConstants from '../LabSuhuConstants.js';
import SuhuBeakerContainer from '../model/SuhuBeakerContainer.js';

// Constants
const PERSPECTIVE_PROPORTION = -LabSuhuConstants.Z_TO_Y_OFFSET_MULTIPLIER;
const LABEL_TEXT_FONT = new PhetFont( 26 );
const M_TO_LITER_MULTIPLIER = 1000;
const M_TO_MILILITER_MULTIPLIER = 1000000;

class SuhuBeakerContainerView extends BeakerContainerView {
    /**
     * @param {SuhuBeakerContainer} beaker
     * @param {EFACIntroModel} model
     * @param {ModelViewTransform2} modelViewTransform
     * @param {function} constrainPosition
     * @param {Object} [options]
     */
    constructor( beaker, model, modelViewTransform, constrainPosition, options ) {
        super( beaker, model, modelViewTransform, constrainPosition, options );

        // extract the scale transform from the MVT so that we can separate the shape from the position
        const scaleTransform = new Transform3(
            Matrix3.scaling( modelViewTransform.matrix.m00(), modelViewTransform.matrix.m11() )
        );
        // get a Bounds2 object defining the beaker size and position in the view
        const beakerBounds = scaleTransform.transformShape( beaker.getUntransformedBounds() );

        // meters^3 to mililiters
        const fluidVolumeToText = ( volume ) => {
            const volumeLiter = volume * M_TO_MILILITER_MULTIPLIER;

            return volumeLiter.toFixed( 0 ) + ' ml';
        }

        const labelTextVolume = new Text( fluidVolumeToText( beaker.fluidVolume.get() ), {
            font: new PhetFont( 16 ),
            maxWidth: beakerBounds.width * 0.7, // empirically determined to look nice
            tandem: options.tandem.createTandem( 'labelTextVolume' ),
            phetioVisiblePropertyInstrumented: true
        } );
        const ellipseHeight = beakerBounds.getWidth() * PERSPECTIVE_PROPORTION;

        beaker.fluidVolume.link( volume => {
            labelTextVolume.text = fluidVolumeToText( volume );
        } );
        labelTextVolume.translation = new Vector2(
            beakerBounds.centerX - labelTextVolume.bounds.width / 2,
            beakerBounds.maxY - beakerBounds.height * beaker.fluidProportionProperty.get() + ellipseHeight * 1.1 + new Text( '', { font: LABEL_TEXT_FONT } ).getHeight()
        );
        labelTextVolume.pickable = false;
        this.frontNode.addChild( labelTextVolume );
    }
}
labSuhu.register( 'SuhuBeakerContainerView', SuhuBeakerContainerView );
export default SuhuBeakerContainerView;