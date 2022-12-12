// Copyright 2022, STECHOQ Ineffable Team

/**
 * Dialog for showing info
 * 
 * @author Mario (Software Engineer)
 */

 import PhetFont from "../../../../scenery-phet/js/PhetFont.js";
 import { AlignBox, AlignGroup, HBox, RichText, Text, VBox } from "../../../../scenery/js/imports.js";
 import Dialog from "../../../../sun/js/Dialog.js";
 import labSuhu from "../../labSuhu.js";
 import LabSuhuStrings from "../../LabSuhuStrings.js";
 
 // Constants
 const langkahTitleString = LabSuhuStrings.info.langkahTitle;
 const scaleStringMultiLine = LabSuhuStrings.info.scale;
 
 class ScaleInfoDialog extends Dialog {
     constructor() {
         const numGroup = new AlignGroup();
         const textGroup = new AlignGroup();
 
         const titleFont = new PhetFont( 22 );
         const font = new PhetFont( 16 );
 
         const content = new VBox( {
             spacing: 15,
             children: scaleStringMultiLine.split("\n").map( ( str, idx ) => new HBox( {
                 spacing: 20,
                 align: 'top',
                 children: [
                     new AlignBox( new Text( ( idx + 1 ).toString(), {
                         font: font,
                         fill: 'black',
                         maxWidth: 50
                     } ), {
                         group: numGroup,
                         xAlign: 'left',
                     } ),
                     new AlignBox( new RichText( str, {
                         font: font,
                         // maxWidth: 350,
                         lineWrap: 500
                     } ), {
                         group: textGroup,
                         xAlign: 'left',
                         yAlign: 'top'
                     } )
                 ]
             } ) )
         } );
 
         super( content, {
             ySpacing: 20,
             title: new Text( langkahTitleString, {
                 font: titleFont,
                 fontWeight: 'bold',
                 maxWidth: 700
             } )
         } );
     }
 }
 
 labSuhu.register( 'ScaleInfoDialog', ScaleInfoDialog );
 export default ScaleInfoDialog;