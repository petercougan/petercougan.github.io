/*
* script.js :  converts any base 2 through 9 to base 10\
* 
* @author:
*       Peter Cougan
* @date:
*       23 September 2016
*/

// *** HTML ELEMENT OBJECTS
var inputBase = document.getElementById("inputBase");
var inputVal = document.getElementById("inputVal");
var output = document.getElementById("output");
var answer = document.getElementById("answer");
var error = document.getElementById("error");
var maxDigit = document.getElementById("maxDigit");
var outBase = document.getElementById("outBase");
var outValue = document.getElementById("outValue");

// *** GLOBAL VARIABLES
var base, value;

// *** Validate Input
function validateInput()
{
    base = inputBase.value;
    value = inputVal.value;
    var valid = true;
    var v = value;
    
    while (Math.floor(v) > 0)
	{
		// determine if each digit is valid
		if (Math.floor(v % 10) > (base - 1)) // return false if any digit is greater than (b-1)
		{
			valid = false;
            output.className = "panel panel-success";
            console.log("Error: Digit too large");
            maxDigit.innerHTML = base-1;
            error.className += " display";
			break;
		}
		else
		{
			v = Math.floor(v /= 10); // go to next digit
		}
	} // end while(v)
    
    if(base < 2 || base > 9)
    {
        valid = false;
    }
    
    if(valid)
    {
        error.className = "panel panel-danger";
        convertToBaseTen();
        inputBase.value = "";
        inputVal.value = "";
    }
}

// *** Convert To Base Ten 
function convertToBaseTen()
{
    // local var
    var remainder = 0; // inputVal % 10, gets least significant digit
    var degree = 0; // used to calculate base^degree
    var final_val = 0; // return value of method, inputVal in base 10
    var num_digits = 0; // number of digits in inputVal
    var v = value; // used in num_digits calculation
    var outV = value;
    
    // determine number of digits in val
    while(v > 0)
    {
        num_digits++;
        v /= 10; // remove least significant digit
    }
    
    // algorithm to convert to base 10
    //    compute while there is at least 1 digit left
    while(num_digits >= 1)
    {
		remainder = Math.floor(value % 10); // get the least significant digit
		final_val += Math.floor(remainder * Math.pow(base,degree)); // add remainder * base^(degree)
		value = Math.floor(value / 10); // remove the least significant digit
		degree++; // move up 1 significant digit
		num_digits--; // least significant digit was removed
    }
    
    console.log(final_val);
    outBase.innerHTML = base;
    outValue.innerHTML = outV;
    answer.innerHTML = final_val;
    output.className += " display";
} // end convertToBaseTen()