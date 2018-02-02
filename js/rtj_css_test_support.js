/**
 * CSS Tester Support Classes
 *
 * Text manipulation classes for inecting css into html files to test CSS features.
 *
 * @filename   rtj_css_test_support.js
 * @date         21 January 2018
 * @category   tbd
 * @package    tbd
 * @author     Rufus T Johnson
 * @copyright  1997-2005 The PHP Group
 * @license    MIT License
 * @version    tbd
 * @link       tbd
 */
 

/**
 * Class to do stylized logging for HTML or Text.
 *
 * Indent control, banners, multiple crlf.
 *
 * @since x.x.x
 */
class rtj_Logger
{

   // ********************************************************************* 
   // Constructor
   // ********************************************************************* 
   constructor() 
   {
      // ********************************************************************* 
      // Text contained in this class
      // ********************************************************************* 
      this.txt = "";
      // ********************************************************************* 
      // Line Termination Character
      // ********************************************************************* 
      this.lineTerm= "\r\n";
      // ********************************************************************* 
      // Space Character
      // ********************************************************************* 
      this.spaceChar= " ";
      // ********************************************************************* 
      // Indent Level
      // ********************************************************************* 
      this.indentLevel = 0;
      // ********************************************************************* 
      // Spaces to indent per Indent Level
      // ********************************************************************* 
      this.indentSpaces = 3;
   }      
      
      
      
   // ********************************************************************* 
   // Set up for HTML display
    // ********************************************************************* 
    html_setup()
    {
      this.lineTerm      = "<br/>";
      this.spaceChar   = "&nbsp;";     
    }

   // ********************************************************************* 
   // Set up to Write to a Text File
    // ********************************************************************* 
    text_setup()
    {    
      this.lineTerm      = "\r\n";
      this.spaceChar   = " ";      
    }

    // ********************************************************************* 
   // Create indent string
    // ********************************************************************* 
    indentString()
    {
      return (this.spaceChar).repeat(this.indentSize());
    }
   
    // ********************************************************************* 
   // Create indent string
    // ********************************************************************* 
    indentSize()
    {
      return(this.indentSpaces*this.indentLevel);
    }
   
    // ********************************************************************* 
   // increase the indent level
    incLevel()
    {
      this.indentLevel++;
    }
   
    // ********************************************************************* 
   // decrease the indent level
    // ********************************************************************* 
    decLevel()
    {
      if (this.indentLevel>0) this.indentLevel--;
    }
   
   // ********************************************************************* 
   // multiple carriage returns
    // ********************************************************************* 
    cr(number_of_cr=1)
    {
      return (this.lineTerm).repeat(number_of_cr);
    }

   
   // ********************************************************************
   // Append
   // ********************************************************************
   append(str)
   {
      this.txt = this.txt.str;  
   }
   
   // ********************************************************************
   // AppendCR
   // ********************************************************************
   appendCR(str="")
   {
      this.txt = this.txt.str.this.lineTerm; 
   }
   
   // ********************************************************************
   // Append Indent
   // ********************************************************************
   appendIndent(str="")
   {
      this.txt =  this.txt.this.indentString().str;  
   }
   
   // ********************************************************************
   // Append Indent CR
   // ********************************************************************
   appendIndentCR(str="",cr_after=1,cr_before=0)
   {
      this.txt +=  this.cr(cr_before)+this.indentString()+str+this.cr(cr_after);
   }   
   
   
   // ********************************************************************
   // Append Indent CR THE CALLING FUNCTION
   // ********************************************************************
   appendIndentCR_THIS_FUNCTION(str="",cr_after=1,cr_before=0)
   {
      //vDebug = debug_backtrace();
      //callingFunction = vDebug[1]['function']."()";
      this.txt +=  this.cr(cr_before)+this.indentString()+"Enter Function:"+callingFunction.str+this.cr(cr_after);
   }   
   

   // ********************************************************************
   // Banner
   // ********************************************************************
   banner(banner_text)
   {
      var banner =  this.lineTerm+"*".repeat(80)+this.lineTerm+"* "+banner_text+this.lineTerm+"*".repeat(80)+this.lineTerm;
      this.txt+=banner;   
   }   

   // ********************************************************************
   // Indented Banner
   // ********************************************************************
   indentedBanner(banner_text)
   {
      iVal    = this.indentSize();
      frame    = "// "+"*".repeat(80-iVal-3);

      this.appendIndentCR(frame );
      this.appendIndentCR("// "+banner_text);
      this.appendIndentCR(frame );
   }   
   
   // ********************************************************************
   // Append all text to file
   // ********************************************************************
   appendToFile(filename)
   {
      //fh = fopen(filename, 'a') or die("can't open file");
      //fwrite(fh, this.txt);
      //fclose(fh);
   }
      
      

   // Getter
   get area() {
      return this.calcArea();
   }
   // Method
   calcArea() {
      return this.height * this.width;
   }
}


// ************************************************************************* 
// CSS Class Generator
// *************************************************************************
class rtj_CSS
{    
   // ********************************************************************* 
   // Constructor
   // ********************************************************************* 
   constructor(selector="") 
   {    
      this.selector          = selector;
      this.declarations    = new Object();
   }
   
   // ********************************************************************* 
   // Add declaration
   // ********************************************************************* 
   addDeclaration(property,value)
   {    
      this.declarations[property] = value;
   }
   
   // ********************************************************************* 
   // Add declarations
   // ********************************************************************* 
   addDeclarations(declarations)
   {    
      Object.entries(declarations).forEach(([property, value]) => {
         this.addDeclaration(property,value);
      });
   }
   
   // ********************************************************************* 
   // Get the text of the CSS Class
   // ********************************************************************* 
   get()
   {
      var rule = this.selector+" {"+"\r\n"   ;
      
      Object.entries(this.declarations).forEach(([property, value]) => {
         rule = rule+"   "+property+": "+value+";\r\n" ;
      });
      
      rule = rule+"}"+"\r\n" ;
      
      return rule;
   }
}    




// ************************************************************************* 
// HTML and CSS Code Edit Support
// *************************************************************************

/* *************************************************************************

LOCATED AT BOTTOM OF HEAD IN HTML FILE
--------------------------------------

<style id="rtj_example_1_style">
#rtj_content_1 .flex-container {
	. . . rules
}
</style>

<style id="rtj_example_2_style">
#rtj_content_2 .flex-container {
	. . . rules
}
</style>

         ●
         ●
         ●

<style id="rtj_example_n_style">
#rtj_content_n .flex-container {
	. . . rules
}
</style>


LOCATED AT TOP BODY IN HTML FILE
--------------------------------

<style id="rtj_example_1_style">#rtj_content_1 .flex-container {
   display: flex;
   background-color: DodgerBlue;
}
</style>
<style id="rtj_example_2_style">#rtj_content_2 .flex-container {
   display: flex;
   background-color: DodgerBlue;
}
</style>
<style id="rtj_example_3_style"></style>
<style id="rtj_example_4_style"></style>
</head>

<body>
<!-- *********************************************************************** -->
<!-- Container where multiple css and html edit areas are stored             -->
<!-- for more than one example                                               -->
<!--                                                                         -->
<!-- For each example an html text area and a css text area will be added    --> 
<!-- from javascript:                                                        -->
<!--                                                                         -->
<!-- <textarea id="rtj_css_edit_1" class="playable-css"></textarea>          -->
<!-- <textarea id="rtj_code_edit_1" class="playable-html"></textarea>        -->
<!--                                                                         -->
<!-- <textarea id="rtj_css_edit_2" class="playable-css"></textarea>          -->
<!-- <textarea id="rtj_code_edit_2" class="playable-html"></textarea>        -->
<!--                               ●                                        -->
<!--                               ●                                        -->
<!--                               ●                                        -->
<!-- <textarea id="rtj_css_edit_n" class="playable-css"></textarea>          -->
<!-- <textarea id="rtj_code_edit_n" class="playable-html"></textarea>        -->
<!-- *********************************************************************** -->
<div id="rtj_multiple_edited_examples">



<!---->
<!--***********************************************************************-->
<!--************************Begin Example 1********************************-->
<!--***********************************************************************-->
<section id="rtj_content_1" class="rtj_content">
<div class="box flex-container">
   <div>One</div>
   <div>Two</div>
   <div>Three</div>
</div>
</section>
<textarea id="rtj_css_edit_1" class="playable-css" style="height: 95px;">
#rtj_content_1 .flex-container {
   display: flex;
   background-color: DodgerBlue;
}
</textarea>
<textarea id="rtj_code_edit_1" class="playable-html" style="height: 95px;">
<div class="box flex-container">
   <div>One</div>
   <div>Two</div>
   <div>Three</div>
</div>
</textarea>
<!--***********************************************************************-->
<!--************************End Example 1**********************************-->
<!--***********************************************************************-->
<!---->
<!---->
<!--***********************************************************************-->
<!--************************Begin Example 2********************************-->
<!--***********************************************************************-->
<section id="rtj_content_2" class="rtj_content">
<div class="box flex-container">
   <div>One</div>
   <div>Two</div>
   <div>Three</div>
</div>
</section>
<textarea id="rtj_css_edit_2" class="playable-css" style="height: 95px;">#rtj_content_2 .flex-container {
   display: flex;
   background-color: DodgerBlue;
}
</textarea>
<textarea id="rtj_code_edit_2" class="playable-html" style="height: 95px;">
<div class="box flex-container">
   <div>One</div>
   <div>Two</div>
   <div>Three</div>
</div>
</textarea>
<!--***********************************************************************-->
<!--************************End Example 2**********************************-->
<!--***********************************************************************-->
<!---->
</div>
<!-- End of rtj_multiple_edited_examples -->


rtj_example_n_style -   id of style tag for example n
rtj_content_n       -   id of displayable example html section 
rtj_description_n   -   id of description of example n 
rtj_content         -   class of displayable example html section
rtj_description     -   id of description section (documentation)
rtj_css_edit_n      -   id of editable css section n gets moved to rtj_example_n_style
rtj_code_edit_N     -   id of editable code section n gets moved to rtj_content_n
rtj_reset_n         -   reset button for example n
  
************************************************************************** */


class rtj_Code_edit
{  
   // ********************************************************************* 
   // Constructor
   // ********************************************************************* 
   constructor() 
   {    
		this.title            =    "";
		this.description      =    "";
      this.example_index    =    rtj_Code_edit.get_example_index();
      
		this.create_container_tags();
      this.reset            =    document.getElementById('rtj_reset_'+this.example_index);
      this.reset.addEventListener('click', function () {
         this.textareaHTML.value   = this.htmlCode;
         this.textareaCSS.value    = this.cssCode;
         this.fillCode();
      }.bind(this));
      
		
		this.textareaHTML.addEventListener('input', (this.fillCode).bind(this));
      this.textareaCSS.addEventListener('input', (this.fillCode).bind(this));
      window.addEventListener('load', (this.fillCode).bind(this));
   }
  
   // ********************************************************************* 
   // Transcribe Edited Code to actual HTML abd CSS
   // ********************************************************************* 
   fillCode() {
      this.style.innerHTML    = this.textareaCSS.value;
      this.HTML.innerHTML     = this.textareaHTML.value;
   }
   
   // ********************************************************************* 
   // Pre Element Bannered Comment
   // ********************************************************************* 
   preElementBanneredComment(element,txt) {
		var comment_begin_space	=	document.createComment("");
		var top_banner				=	document.createComment("***********************************************************************");
		var comment					=	document.createComment(txt);
		var bottom_banner			=	document.createComment("***********************************************************************");
		element.appendChild(comment_begin_space);
		element.appendChild(top_banner);
		element.appendChild(comment);
		element.appendChild(bottom_banner);
   }
	
	
	// ********************************************************************* 
   // Post Element Bannered Comment
   // ********************************************************************* 
   postElementBanneredComment(element,txt) {
		var top_banner				=	document.createComment("***********************************************************************");
		var comment					=	document.createComment(txt);
		var bottom_banner			=	document.createComment("***********************************************************************");
		var comment_end_space	=	document.createComment("");
		element.appendChild(top_banner);
		element.appendChild(comment);
		element.appendChild(bottom_banner);
		element.appendChild(comment_end_space);
   }


   
   // ********************************************************************* 
   // Add Editable Style and HTML textareas to:
   //
   // <div id="rtj_multiple_edited_examples"></div>
   //
   // ********************************************************************* 
   create_editable_textareas() {
      var examples 				= 	document.querySelector('#rtj_multiple_edited_examples');
		var content_id				=	"rtj_content_"+this.example_index;
		var description_id    	=	"rtj_description_"+this.example_index;
		var css_text_area_id		=	"rtj_css_edit_"+this.example_index;
		var code_text_area_id	=	"rtj_code_edit_"+this.example_index;
		var reset_button_id     =	"rtj_reset_"+this.example_index;
		var comment_begin			=	"************************Begin Example "+this.example_index+"********************************";
		var comment_end   		=	"************************End Example "+this.example_index+"**********************************";

		var example_id				=  "rtj_example_"+this.example_index;
		var example_container	=   "<div id=\""+example_id+"\" class=\"rtj_example\"></div>"
		
		
		var content		=	 "<div id=\""+description_id+"\" class=\"rtj_description\"></div>"
								+"<section id=\""+content_id+"\" class=\"rtj_content\">HOLMES</section>"
								+"<textarea id=\""+css_text_area_id+"\" class=\"playable-css\"></textarea>\n"
								+"<textarea id=\""+code_text_area_id+"\" class=\"playable-html\"></textarea>"
								+"<div class=\"playable-buttons\">"
   							+"   <input id=\""+reset_button_id+"\" type=\"button\" value=\"Reset Example "+this.example_index+"\">"
								+"</div>";
		
		//examples.insertAdjacentText('beforeend',"\n...\n");
		
		this.preElementBanneredComment(examples,comment_begin);
		examples.insertAdjacentHTML('beforeend',example_container);
      var example 				= 	document.querySelector('#'+example_id);
		example.insertAdjacentHTML('beforeend',content);
		this.postElementBanneredComment(examples,comment_end);


		
      this.HTML     				=    document.querySelector('#'+content_id);
      this.textareaHTML     	=    document.querySelector('#'+code_text_area_id);
      this.textareaCSS      	=    document.querySelector('#'+css_text_area_id);		
      this.descriptionarea   	=    document.querySelector('#'+description_id);		
		
   }

   // ********************************************************************* 
   // Add Editable Style and HTML textareas to:
   //
   // <style id="rtj_example_n_style"></style>
	//
	// Where n is the index of the example.
   //
   // ********************************************************************* 
   create_example_style_tag() {
      var head		 	= document.querySelector("head");
		var content		=	 "<style id=\"rtj_example_"+this.example_index+"_style\"></style>\n"
		head.insertAdjacentHTML('beforeend',content);
		this.style 		= document.querySelector("#rtj_example_"+this.example_index+"_style");
   }

   // ********************************************************************* 
   // Create Tags for Editing HTML and CSS and displaying the result
   // ********************************************************************* 
   create_container_tags() {
		this.create_editable_textareas();
		this.create_example_style_tag();
   }



   // ********************************************************************* 
   // Add HTML to rtj_code_edit_n
   // ********************************************************************* 
   add_editable_html(content) {
		// this.htmlCode contains the initial html code in this example
		this.htmlCode = content;
      var code_edit_area	= document.querySelector("#rtj_code_edit_"+this.example_index);
		code_edit_area.insertAdjacentHTML('beforeend',content);
		code_edit_area.style.height = 'auto';
      code_edit_area.style.height = code_edit_area.scrollHeight+'px';
		//alert(code_edit_area.scrollHeight);
   }
	
	
	
   // ********************************************************************* 
   // Add HTML to rtj_code_edit_n
   // ********************************************************************* 
   add_editable_css(content) {
		// this.cssCode contains the initial css code in this example
		this.cssCode = content;
      var css_edit_area	= document.querySelector("#rtj_css_edit_"+this.example_index);
		css_edit_area.insertAdjacentHTML('beforeend',content);
		css_edit_area.style.height = 'auto';
      css_edit_area.style.height = css_edit_area.scrollHeight+'px';
		//alert(css_edit_area.scrollHeight);
   }

   // ********************************************************************* 
   // Add Title
   // ********************************************************************* 
	add_title(title)
	{
		this.title            =    title;
	}
	
   // ********************************************************************* 
   // Add Description Paragraph
   // ********************************************************************* 
	add_description_paragraph(description_paragraph)
	{
		this.description      +=    "<p>"+description_paragraph+"</p>";
	}
	
   // ********************************************************************* 
   // Render the Title and the Description
   // ********************************************************************* 
	render_title_description()
	{
		this.descriptionarea.insertAdjacentHTML('beforeend',"<h2>"+this.title+"</h2>");
		this.descriptionarea.insertAdjacentHTML('beforeend',this.description);
	}
	

   // ********************************************************************* 
   // Initialize the Example Index
   // ********************************************************************* 
	static init() {
		
		rtj_Code_edit.ExampleIndex = 0;
	}	
	
	
	// ********************************************************************* 
   // Bump the ExampleIndex and return it
   // ********************************************************************* 
	static get_example_index() {
		return ++rtj_Code_edit.ExampleIndex;
	}	
	
}



