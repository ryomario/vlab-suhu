// Copyright 2018-2022, University of Colorado Boulder

/**
 * Triangular slider thumb that points down on a horizontal slider
 * The horizontal slider is rotated vertically to make this eventually point left when seen
 *
 * @author Arnab Purkayastha
 */

 import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
 import { Shape } from '../../../../kite/js/imports.js';
 import merge from '../../../../phet-core/js/merge.js';
 import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
 import TriangleNode from '../../../../scenery-phet/js/TriangleNode.js';
 import { ButtonListener, Color, Node, Path } from '../../../../scenery/js/imports.js';
 import Tandem from '../../../../tandem/js/Tandem.js';
import labSuhu from '../../labSuhu.js';
import LabSuhuColors from '../LabSuhuColors.js';
 
 class TriangleSliderThumb extends Node {
 
   /**
    * Creates the triangle thumb slider
    * Triangle points down in just logical coordinates because this node eventually gets rotated for actual display
    * @param {Object} [options]
    */
   constructor( options ) {

    const fillColor = new Color( 50, 145, 184 );
 
     options = merge( {
       size: new Dimension2( 30, 15 ),
       stroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
       fill: fillColor,
      //  fillHighlighted: 'rgb( 71, 207, 255 )',
      //  fillHighlighted: fillColor.brighterColor( 0.9 ),
       dashedLineOptions: {
         stroke: LabSuhuColors.CONTROL_PANEL_OUTLINE_STROKE,
         lineDash: [ 3, 3 ]
       },
       cursor: 'pointer',
       tandem: Tandem.REQUIRED
     }, options );
 
     // Draw the thumb shape starting at the bottom corner, moving up to the top left
     // then moving right and connecting back, all relative to a horizontal track
     const triangleHalfWidth = options.size.width / 2;
     const triangleHalfHeight = options.size.height / 2;
     const triangle = new TriangleNode( { triangleWidth: options.size.width, triangleHeight: options.size.height, stroke: options.stroke, fill: options.fill, tandem: options.tandem.createTandem( 'triangle' ) } );
     // @private dashed lines to visibly anchor the triangle slider to the thermometer
     const dashedLinesShape = new Shape()
       .moveTo( triangleHalfHeight, -triangleHalfWidth )
       .lineTo( triangleHalfHeight, -2.5 * triangleHalfWidth );
 
     const dashedLinesPath = new Path( dashedLinesShape, options.dashedLineOptions );
 
     // @private Arrows that will disappear after first click
     const ARROW_OPTIONS = {
       fill: '#64dc64',
       headHeight: 15,
       headWidth: 15,
       tailWidth: 7
     };
     const cueingArrows = new Node( {
       children: [ new ArrowNode( 15, 0, 40, 0, ARROW_OPTIONS ), new ArrowNode( -15, 0, -40, 0, ARROW_OPTIONS ) ],
       tandem: options.tandem.createTandem( 'cueingArrows' )
     } );
 
     super( { children: [ cueingArrows, dashedLinesPath, triangle ] } );
 
     triangle.centerX = this.centerX;
     triangle.top = -triangleHalfWidth;
     this.baseColorProperty = new Property( new Color( options.fill ) );
     const colors = {
      fill: this.baseColorProperty.value,
      fillHighlighted: this.baseColorProperty.value.colorUtilsBrighter( 0.25 ),
     };
     this.baseColorProperty.link( color => {
      colors.fill = color;
      colors.fillHighlighted = color.colorUtilsBrighter( 0.25 );
      triangle.fill = color;
     } );
     dashedLinesPath.centerX = this.centerX;
     // Highlight thumb on pointer over and remove arrows on first click
     this.addInputListener( new ButtonListener( {
       over: () => {
         triangle.fill = colors.fillHighlighted;
       },
       up: () => {
         triangle.fill = colors.fill;
       },
       down: () => {
         cueingArrows.visible = false;
       }
     } ) );
 
     // @private
     this.cueingArrows = cueingArrows;
   }
 
   /**
    * Reset Properties associated with this Node
    * @public
    */
   reset() {
     this.cueingArrows.visible = true;
   }
 
   setBaseColor( color ) {
    this.baseColorProperty.value = color;
   }
 }
 
 labSuhu.register( 'TriangleSliderThumb', TriangleSliderThumb );
 export default TriangleSliderThumb;