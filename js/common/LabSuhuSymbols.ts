// Copyright 2022, University of Colorado Boulder

/**
 * Strings for mathematical symbols, with markup for RichText.
 *
 * @author Mario (Software Engineer)
 */

import MathSymbolsFont from "../../../scenery-phet/js/MathSymbolFont.js";
import labSuhu from "../labSuhu.js";
import LabSuhuStrings from "../LabSuhuStrings.js";

const LabSuhuSymbols = {
    c: MathSymbolsFont.getRichTextMarkup( LabSuhuStrings.symbol.celcius ),
    f: MathSymbolsFont.getRichTextMarkup( LabSuhuStrings.symbol.fahrenheit ),
    r: MathSymbolsFont.getRichTextMarkup( LabSuhuStrings.symbol.reamur ),
    k: MathSymbolsFont.getRichTextMarkup( LabSuhuStrings.symbol.kelvin ),
};

labSuhu.register( 'LabSuhuSymbols', LabSuhuSymbols );
export default LabSuhuSymbols;