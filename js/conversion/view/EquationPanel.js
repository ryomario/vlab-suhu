// Copyright 2022, University of Colorado Boulder

/**
 * Control panel for showing the equation.
 *
 * @author Mario (Software Engineer)
 */

import merge from "../../../../phet-core/js/merge.js";
import { Node, VBox } from "../../../../scenery/js/imports.js";
import Panel from "../../../../sun/js/Panel.js";
import HSeparatorDeprecated from "../../../../sun/js/HSeparatorDeprecated.js";
import LabSuhuColors from "../../common/LabSuhuColors.js";
import LabSuhuConstants from "../../common/LabSuhuConstants.js";
import labSuhu from "../../labSuhu.js";
import SuhuEquationNode from "./SuhuEquationNode.js";

class EquationPanel extends Panel {
    /**
     * 
     * @param {Node} titleNode
     * @param {SuhuEquationNode} equationNode
     * @param {Object} providedOptions 
     */
    constructor( titleNode, equationNode, providedOptions ) {
        const options = merge( {
            fill: LabSuhuColors.CONTROL_PANEL_BACKGROUND_COLOR,
            stroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
            lineWidth: 1,
            cornerRadius: LabSuhuConstants.CONTROL_PANEL_CORNER_RADIUS,
            maxWidth: 400,
            minWidth: 0,
            xMargin: 10,
            yMargin: 10,
        }, providedOptions );

        const separatorWidth = Math.max( titleNode.width, equationNode.width, options.minWidth );
        const separatorOptions = { stroke: options.stroke };

        const contentNode = new VBox( {
            align: 'origin',
            // justify: 'top',
            // stretch: true,
            spacing: 10,
            children: [
                titleNode,
                new HSeparatorDeprecated( separatorWidth, separatorOptions ),
                equationNode,
            ]
        } );

        super( contentNode, options );
    }
}

labSuhu.register( 'EquationPanel', EquationPanel );
export default EquationPanel;