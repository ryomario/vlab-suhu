// Copyright 2022, University of Colorado Boulder

/**
 * Time counter that show ther time in given formats
 *
 * @author Mario (Software Engineer)
 */

import TProperty from "../../../../axon/js/TProperty.js";
import TReadOnlyProperty from "../../../../axon/js/TReadOnlyProperty.js";
import PhetFont from "../../../../scenery-phet/js/PhetFont.js";
import { Node, NodeOptions, Text, VBox } from "../../../../scenery/js/imports.js";
import Tandem from "../../../../tandem/js/Tandem.js";
import LabSuhuClock from "../model/LabSuhuClock.js";
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import LabSuhuColors from "../LabSuhuColors.js";
import DerivedProperty from "../../../../axon/js/DerivedProperty.js";
import TextPushButton from "../../../../sun/js/buttons/TextPushButton.js";
import LabSuhuStrings from "../../LabSuhuStrings.js";
import merge from "../../../../phet-core/js/merge.js";
import labSuhu from "../../labSuhu.js";

const FONT_SIZE = 20;

class TimeCounter extends Node {
    /**
     * 
     * @param timeFormatter 
     * @param clock 
     * @param tandem 
     * @param providedOptions 
     */
    public constructor( timeFormatter: ( timeProperty: TProperty<number>, tandem: Tandem ) => TReadOnlyProperty<string>, clock: LabSuhuClock, tandem: Tandem, providedOptions?: NodeOptions ) {
        super();

        // time text counter
        const timeText = new Text( timeFormatter( clock.timeProperty, tandem.createTandem( 'formattedTimeProperty' ) ), {
            font: new PhetFont( {
                family: StopwatchNode.NUMBER_FONT_FAMILY,
                size: FONT_SIZE
            } ),
            fill: LabSuhuColors.CLOCK_CONTROL_FOREROUND_COLOR,
            maxWidth: 200
        } );

        const isTimeNonZeroProperty = new DerivedProperty( [ clock.timeProperty ], time => time !== 0 );

        const clearButton = new TextPushButton( LabSuhuStrings.clearStringProperty, {
            font: new PhetFont( FONT_SIZE ),
            listener: () => clock.setSimulationTime( 0 ),
            maxTextWidth: 200,
            tandem: tandem.createTandem( 'clearButton' ),
            enabledProperty: isTimeNonZeroProperty
        } );

        this.addChild( new VBox( {
            align: 'right',
            spacing: 4,
            children: [
                timeText,
                clearButton
            ]
        } ) );

        this.mutate( merge( { tandem: tandem }, providedOptions ) );
    }
}

labSuhu.register( 'TimeCounter', TimeCounter );
export default TimeCounter;