// Copyright 2022, University of Colorado Boulder

/**
 * view for Thermometer that allow to change the value.
 *
 * @author Mario (Software Engineer)
 */

import Dimension2 from "../../../../dot/js/Dimension2.js";
import Utils from "../../../../dot/js/Utils.js";
import Shape from "../../../../kite/js/Shape.js";
import merge from "../../../../phet-core/js/merge.js";
import PhetFont from "../../../../scenery-phet/js/PhetFont.js";
import ThermometerNode from "../../../../scenery-phet/js/ThermometerNode.js";
import { DragListener, Node, Path, Text } from "../../../../scenery/js/imports.js";
import Tandem from "../../../../tandem/js/Tandem.js";
import labSuhu from "../../labSuhu.js";
import Thermometer from "../../scale/model/Thermometer.js";
// import LabSuhuColors from "../LabSuhuColors.js";
import TriangleSliderThumb from "./TriangleSliderThumb.js";


// CONSTANTS


class ThermometerManual extends ThermometerNode {
    /**
     * 
     * @param {NumberProperty} temperatureProperty 
     * @param {Thermometer} thermometerType 
     * @param {Object} providedOptions 
     */
    constructor( temperatureProperty, thermometerType, providedOptions ) {
        const options = merge( {
            minTemperature: thermometerType.lowerPoint,
            maxTemperature: thermometerType.upperPoint,
            bulbDiameter: 35,
            tubeWidth: 20,
            tubeHeight: 400,
            majorTickLength: 10,
            minorTickLength: 5,
            glassThickness: 5,
            lineWidth: 3,
            outlineStroke: 'black',
            tickSpacingTemperature: 5,
            tickLabelFont: new PhetFont( { size: 18 } ),
            tickLabelColor: 'black',
            tickLabelWidth: 100,
            snapInterval: 50,
            zeroLevel: 'bulbTop',
            thumbSize: 25,

            tandem: Tandem.REQUIRED
        }, providedOptions );

        const TICK_MARKS = [
            { text: thermometerType.lowerPoint.toString(), temperature: thermometerType.lowerPoint },
            { text: thermometerType.upperPoint.toString(), temperature: thermometerType.upperPoint }
        ];

        super( temperatureProperty, options.minTemperature, options.maxTemperature, options );

        this.initialTemperature = temperatureProperty.get();

        // labeled tick marks
        const tickContainer = new Node( {
            children: _.range( 0, TICK_MARKS.length ).map( i => this.createLabeledTick( TICK_MARKS[ i ], options ) ),
            tandem: options.tandem.createTandem( 'tickContainer' )
        } );

        const thumbDimension = new Dimension2( options.thumbSize, options.thumbSize );

        // @private thumb node thermometer's slider
        this.triangleNode = new TriangleSliderThumb( {
            size: thumbDimension,
            tandem: options.tandem.createTandem( 'slider' )
        } );
        this.triangleNode.touchArea = this.triangleNode.localBounds.dilatedXY( 10, 10 );

        let clickYOffset;
        this.triangleNode.addInputListener( new DragListener( {
        start: event => {
            clickYOffset = this.triangleNode.globalToParentPoint( event.pointer.point ).y - this.triangleNode.y;
        },
        drag: event => {
            const y = this.triangleNode.globalToParentPoint( event.pointer.point ).y - clickYOffset;

            // Clamp to make sure temperature Property is within graph bounds
            temperatureProperty.value = Utils.clamp(
            Utils.roundToInterval( this.yPosToTemperature( -y ), options.snapInterval ),
            options.minTemperature,
            options.maxTemperature
            );
            this.updateThumb( temperatureProperty, options );
        },
        allowTouchSnag: true,
        tandem: options.tandem.createTandem( 'dragListener' )
        } ) );

        this.triangleNode.rotation = -Math.PI / 2;
        this.triangleNode.left = options.tubeWidth / 2;
        this.triangleNode.centerY = -this.temperatureToYPos( this.initialTemperature );

        this.addChild( tickContainer );
        this.addChild( this.triangleNode );

        // @private position of the center of the thermometer (not the whole node) relative to the right of the node
        this._thermometerCenterXFromRight = -this.triangleNode.width - options.tubeWidth / 2;
    }

    /**
     * Reset Properties associated with this Node
     * @public
     */
    reset() {
        this.triangleNode.centerY = -this.temperatureToYPos( this.initialTemperature );
        this.triangleNode.reset();
    }

    createLabeledTick( tickMark, options ) {
        const text = tickMark.text;
        const temperature = tickMark.temperature;
    
        const objectHeight = -this.temperatureToYPos( temperature );
        const tickMarkLength = options.tubeWidth * 0.5;
    
        const shape = new Shape();
        shape.moveTo( options.tubeWidth / 2, objectHeight ).horizontalLineToRelative( tickMarkLength );
    
        const tickNode = new Path( shape, { stroke: options.outlineStroke, lineWidth: options.lineWidth } );
        const textNode = new Text( text, {
          font: options.tickLabelFont,
          fill: options.tickLabelColor,
          maxWidth: options.tickLabelWidth
        } );
    
        const parentNode = new Node( {
          children: [ tickNode, textNode ]
        } );
    
        tickNode.right = -0.5 * options.tubeWidth;
        tickNode.centerY = objectHeight;
        textNode.centerY = objectHeight;
        textNode.right = tickNode.left - 10;
    
        return parentNode;
    }

    /**
     * Updates the position of the thumb
     * @param {Property.<number>} [temperatureProperty]
     * @param {Object} [options]
     * @public
     */
    updateThumb( temperatureProperty, options ) {
        assert && assert( temperatureProperty.value >= options.minTemperature &&
        temperatureProperty.value <= options.maxTemperature,
        'temperature has exceeded thermometer bounds' );
        this.triangleNode.left = options.tubeWidth / 2;
        this.triangleNode.centerY = -this.temperatureToYPos( temperatureProperty.value );
    }

    /**
     * Get horizontal position of thermometer center relative to centerX of the node
     * @returns {number}
     * @public
     */
    get thermometerCenterXFromRight() { return this._thermometerCenterXFromRight; }
}

labSuhu.register( 'ThermometerManual', ThermometerManual );
export default ThermometerManual;