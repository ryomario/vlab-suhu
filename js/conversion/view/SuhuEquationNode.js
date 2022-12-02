// Copyright 2022, University of Colorado Boulder

/**
 * Control panel for showing the equation.
 *
 * @author Mario (Software Engineer)
 */

import DerivedProperty from "../../../../axon/js/DerivedProperty.js";
import Property from "../../../../axon/js/Property.js";
import merge from "../../../../phet-core/js/merge.js";
import MathSymbols from "../../../../scenery-phet/js/MathSymbols.js";
import PhetFont from "../../../../scenery-phet/js/PhetFont.js";
import { Line, Node, RichText, Text } from "../../../../scenery/js/imports.js";
import NullableIO from "../../../../tandem/js/types/NullableIO.js";
import NumberIO from "../../../../tandem/js/types/NumberIO.js";
import LabSuhuColors from "../../common/LabSuhuColors.js";
import LabSuhuConstants from "../../common/LabSuhuConstants.js";
import labSuhu from "../../labSuhu.js";
import Thermometer from "../../scale/model/Thermometer.js";

// CONSTANTS
const UNKNOWN_STR = "?";

class SuhuEquationNode extends Node {
    /**
     * 
     * @param {Object} providedOptions 
     */
    constructor( providedOptions ) {
        const options = merge( {

            thermometerInitial: Thermometer.NONE,
            thermometerFinal: Thermometer.NONE,
            fontSize: LabSuhuConstants.EQUATION_FONT_SIZE,
            staticColor: 'black',

        }, providedOptions );

        super();

        // const NUMBER_MAX_WIDTH = 


        this.relationalOperatorXSpacing = 0.35 * options.fontSize;
        this.pickersYSpacing = 0.2 * options.fontSize;


        this.thermometerInitialProperty = new Property( options.thermometerInitial, {
            tandem: options.tandem.createTandem( 'thermometerInitialProperty' )
        } );
        this.thermometerFinalProperty = new Property( options.thermometerFinal, {
            tandem: options.tandem.createTandem( 'thermometerFinalProperty' )
        } );
        this.temperatureInitialProperty = new Property( null, {
            valueType: [ 'number', null ],
            phetioValueType: NullableIO( NumberIO ),
            tandem: options.tandem.createTandem( 'temperatureInitialProperty' )
        } );
        this.temperatureFinalProperty = new Property( null, {
            valueType: [ 'number', null ],
            phetioValueType: NullableIO( NumberIO ),
            tandem: options.tandem.createTandem( 'temperatureFinalProperty' )
        } );

        const interactiveFont = new PhetFont( { size: options.fontSize, weight: LabSuhuConstants.EQUATION_FONT_WEIGHT } );
        const staticFont = new PhetFont( { size: options.fontSize, weight: LabSuhuConstants.EQUATION_FONT_WEIGHT } );
        const staticOptions = { font: staticFont, fill: options.staticColor };
        const fractionLineThickness = 0.06 * options.fontSize;
        const fractionLineOptions = { stroke: options.staticColor, lineWidth: fractionLineThickness };

        // Nodes that could appear is all possible ways to write the equation
        // Suhu akhir =
        const finalSymbolNode = new RichText(
            new DerivedProperty( [ this.thermometerFinalProperty ], thermometerType => thermometerType.symbol || UNKNOWN_STR ),
            {
                font: interactiveFont,
                fill: LabSuhuColors.THERMOMETER_FINAL,
            }
        );
        const equalNode = new Text( MathSymbols.EQUAL_TO, staticOptions );

        // ( perbandingan termometer akhir / awal )
        const skalaFinalNode = new RichText(
            new DerivedProperty( [ this.thermometerFinalProperty ], thermometerType => thermometerType.skala?.toString() || UNKNOWN_STR ),
            {
                font: interactiveFont,
                fill: LabSuhuColors.THERMOMETER_FINAL,
            }
        );

        // fraction line, correct length will be set later
        const interactiveFractionLineNode = new Line( 0, 0, 1, 0, fractionLineOptions );

        const skalaInitialNode = new RichText(
            new DerivedProperty( [ this.thermometerInitialProperty ], thermometerType => thermometerType.skala?.toString() || UNKNOWN_STR ),
            {
                font: interactiveFont,
                fill: LabSuhuColors.THERMOMETER_INITIAL,
            }
        );

        // times
        const timesNode = new Text( MathSymbols.TIMES, staticOptions );

        // suhu awal - lowerPoint termometer awal
        // (
        const bracket1Node = new Text( '(', staticOptions );
        // suhu awal
        const temperatureInitialNode = new RichText(
            new DerivedProperty( [ this.temperatureInitialProperty ], temperature => temperature?.toFixed( 0 ) || UNKNOWN_STR ),
            {
                font: interactiveFont,
                fill: LabSuhuColors.THERMOMETER_INITIAL,
            }
        );
        // minus -
        const minusNode = new Text( MathSymbols.MINUS, staticOptions );
        // lowerPoint termometer awal
        const lowerPointInitialNode = new RichText(
            new DerivedProperty( [ this.thermometerInitialProperty ], thermometerType => thermometerType.lowerPoint?.toString() || UNKNOWN_STR ),
            {
                font: interactiveFont,
                fill: LabSuhuColors.THERMOMETER_INITIAL,
            }
        );
        // )
        const bracket2Node = new Text( ')', staticOptions );

        // + lowerPoint termometer akhir
        // +
        const plusNode = new Text( MathSymbols.PLUS, staticOptions );
        // lowerPoint termometer akhir
        const lowerPointFinalNode = new RichText(
            new DerivedProperty( [ this.thermometerFinalProperty ], thermometerType => thermometerType.lowerPoint?.toString() || UNKNOWN_STR ),
            {
                font: interactiveFont,
                fill: LabSuhuColors.THERMOMETER_FINAL,
            }
        );

        // rendering order
        const parentNode = new Node();
        this.addChild( parentNode );

        // Suhu akhir =
        parentNode.addChild( finalSymbolNode );
        parentNode.addChild( equalNode );
        // ( perbandingan termometer akhir / awal )
        // perbandingan termometer akhir
        parentNode.addChild( skalaFinalNode );
        // fraction line
        parentNode.addChild( interactiveFractionLineNode );
        // perbandingan termometer awal
        parentNode.addChild( skalaInitialNode );
        // x
        parentNode.addChild( timesNode );
        // (
        parentNode.addChild( bracket1Node );
        // suhu awal
        parentNode.addChild( temperatureInitialNode );
        // -
        parentNode.addChild( minusNode );
        // lowerPoint termometer awal
        parentNode.addChild( lowerPointInitialNode );
        // )
        parentNode.addChild( bracket2Node );
        // +
        parentNode.addChild( plusNode );
        // lowerPoint termometer akhir
        parentNode.addChild( lowerPointFinalNode );

        // layout
        // Suhu akhir = 
        finalSymbolNode.x = 0;
        finalSymbolNode.y = 0;
        equalNode.left = finalSymbolNode.right + this.relationalOperatorXSpacing;
        equalNode.centerY = finalSymbolNode.centerY;
        // ( perbandingan termometer akhir / awal )
        // fraction line
        interactiveFractionLineNode.left = equalNode.right + this.relationalOperatorXSpacing;
        interactiveFractionLineNode.centerY = equalNode.centerY;
        // perbandingan termometer akhir
        skalaFinalNode.left = interactiveFractionLineNode.left;
        skalaFinalNode.bottom = interactiveFractionLineNode.top - this.pickersYSpacing;
        // perbandingan termometer awal
        skalaInitialNode.left = skalaFinalNode.left;
        skalaInitialNode.top = interactiveFractionLineNode.bottom + this.pickersYSpacing;
        // fix fraction line length
        const fractionLength = Math.max( skalaFinalNode.width, skalaInitialNode.width );
        interactiveFractionLineNode.setLine( 0, 0, fractionLength, 0 );
        // x
        timesNode.left = interactiveFractionLineNode.right + this.relationalOperatorXSpacing;
        timesNode.centerY = interactiveFractionLineNode.centerY;
        // (
        bracket1Node.left = timesNode.right + this.relationalOperatorXSpacing;
        bracket1Node.centerY = timesNode.centerY;
        // suhu awal
        temperatureInitialNode.left = bracket1Node.right + this.relationalOperatorXSpacing;
        temperatureInitialNode.centerY = bracket1Node.centerY;
        // -
        minusNode.left = ( temperatureInitialNode.right + options.fontSize * 2 ) + this.relationalOperatorXSpacing;
        minusNode.centerY = temperatureInitialNode.centerY;
        // lowerPoint termometer awal
        lowerPointInitialNode.left = minusNode.right + this.relationalOperatorXSpacing;
        lowerPointInitialNode.centerY = minusNode.centerY;
        // )
        bracket2Node.left = ( lowerPointInitialNode.right + options.fontSize * 5 ) + this.relationalOperatorXSpacing;
        bracket2Node.centerY = lowerPointInitialNode.centerY;
        // +
        plusNode.left = bracket2Node.right + this.relationalOperatorXSpacing;
        plusNode.centerY = bracket2Node.centerY;
        // lowerPoint termometer akhir
        lowerPointFinalNode.left = plusNode.right + this.relationalOperatorXSpacing;
        lowerPointFinalNode.centerY = plusNode.centerY;
        // lowerPointFinalNode.width = 
        const lastNode = new Text( '' );
        lastNode.left = lowerPointFinalNode.right + options.fontSize * 5;
        parentNode.addChild( lastNode );


        this.mutate( options );

        const temperatureInitialChangeListener = ( temperature ) => {
            this.temperatureInitialProperty.value = temperature;
        };
        this.temperatureInitialChangeListener = temperatureInitialChangeListener.bind( this );

        const temperatureFinalChangeListener = ( temperature ) => {
            this.temperatureFinalProperty.value = temperature;
        };
        this.temperatureFinalChangeListener = temperatureFinalChangeListener.bind( this );
    }


    // temperatureInitialChangeListener( temperature ) {
    //     this.temperatureInitialProperty.value = temperature;
    // }
    // temperatureFinalChangeListener( temperature ) {
    //     this.temperatureFinalProperty.value = temperature;
    // }
}

labSuhu.register( 'SuhuEquationNode', SuhuEquationNode );
export default SuhuEquationNode;