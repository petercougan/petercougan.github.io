/*
 * Copyright Peter Cougan | 2016
 *
 * Created August 2016
 *
 * Intended to leave answer in mixed number form
 * which is ideal for people working with dimensions
 * in construction
 *
 * example: 
 *    1 & 5/16 + 1/4 + 3/8
 *    = 1 & 15/16
 */

//* html element objects
//      * error messages
var error_message = document.getElementById("error_message");
var error_empty = document.getElementById("empty");
var error_invalid_syntax = document.getElementById("invalid_syntax");
var error_divide_zero = document.getElementById("divide_by_zero");
//      * output
var result = document.getElementById("result");
var fraction_out = document.getElementById("fraction_out");
var decimal_out = document.getElementById("decimal_out");
//      * input
var input = document.getElementById("input");
var you_entered = document.getElementById("you_entered");
var fraction_in = document.getElementById("fraction_in");
var whole_in = document.getElementById("whole_num_in");
var equation = document.getElementById("equation");

// other global variables
var input_index = 0;
var den_length = [];
var fractions = [];
var whole_nums = [];
var numerator = [];
var denominator = [];

// validate the user input is correct
//      * only integers in the whole number cell
//      * only integers and '/' in the fraction cell
function validate()
{
    if(fraction_in.value == "" && whole_in.value == "")
    {
        console.log("empty input");
        error_message.className = "panel panel-danger display";
        error_invalid_syntax.className--;
        error_empty.className += " display";
        error_divide_zero.className--;
    }
    else if(fraction_in.value.includes("/0"))
    {
        console.log("cannot divide by 0");
        error_message.className = "panel panel-danger display";
        error_empty.className--;
        error_invalid_syntax.className--;
        error_divide_zero.className += " display";
    }
    else if(fraction_in.value.match(/[a-z]/i) || (!fraction_in.value.includes("/") && !(fraction_in.value == "0" || fraction_in.value == "")))
    {
        console.log("invalid syntax");
        error_message.className = "panel panel-danger display";
        error_empty.className--;
        error_invalid_syntax.className += " display";
        error_divide_zero.className--;
    }
    else
    {
        console.log("input submitted correctly");
        error_message.className--;
        error_empty.className--;
        error_invalid_syntax.className--;
        error_divide_zero.className--;
        
        include();
    }
} // end validate()

// get input from user
//      * called in html <button name="submit">
function include()
{   
    // add fraction to array
    if(fraction_in.value == "0")
    {
        fractions[input_index] = "0/1";
    }
    else if(fraction_in.value == "")
    {
        fractions[input_index] = "0/1";
    } 
    else
    {
        fractions[input_index] = ""+fraction_in.value; 
    }
    
    // add whole number to array
    if(whole_in.value == "")
    {
        whole_nums[input_index] = "0";
    }
    else
    {
        whole_nums[input_index] = whole_in.value;
    }
    
    console.log("mixed: "+whole_nums[input_index]+" & "+fractions[input_index]);
    
    if(input_index == 0)
    {
        you_entered.innerHTML = whole_nums[input_index]+" & "+fractions[input_index];
    }
    else
    {
        you_entered.innerHTML += " + "+whole_nums[input_index]+" & "+fractions[input_index]+"";
    }
    
    // clear input fields
    whole_in.value = "";
    fraction_in.value = "";
    
    split_fraction(fractions[input_index]);
    
    input_index++;  // needs to be last in function
}

// splits apart the numerator from the denominator
function split_fraction(fraction)
{
    // numerator
    numerator[input_index] = fraction.split("/")[0];
    console.log("numerator: "+numerator[input_index]);
    
    // denominator
    denominator[input_index] = fraction.split("/")[1];
    console.log("denominator: "+denominator[input_index]);
}

// solve and display the result
function solve()
{
    display();
}

function add_fractions()
{
    // local var
    var num_a, num_b, den_a, den_b;
    var num_new=0;
    var den_new=1;
    var whole = 0;
    var num_final, den_final;
    
    // add numerators
    for(var i=0; i<numerator.length; i++)
    {
        num_a = parseInt(numerator[i]);
        den_a = parseInt(denominator[i]);
        num_b = parseInt(numerator[i+1]);
        den_b = parseInt(denominator[i+1]);
        

        num_new *= den_a;
        num_new += den_new*num_a;
        den_new *= den_a;
    }
    
    console.log("unsimplified: "+num_new+"/"+den_new)
    
    // simplify
    var x;
    if(num_new>den_new || num_new==den_new)
    {
        for(var i=den_new; i>0; i--)
        {
            if(num_new%i==0 && den_new%i==0)
            {
                num_final = num_new/i;
                den_final = den_new/i;
                
                break;
            }
        }
        
        // add whole number and split remainder into fration
        whole += parseInt((""+(num_final/den_final)).split(".")[0]);
        num_final -= den_final*whole;
    }
    else if(den_new>num_new)
    {
        for(var i=num_new; i>0; i--)
        {
            if(num_new%i==0 && den_new%i==0)
            {
                num_final = num_new/i;
                den_final = den_new/i;
                
                break;
            }
        }
    }
    
    whole += add_whole_numbers();
    if(num_final == undefined || num_final == 0)
    {
        solution = whole;
    }
    else
    {
        solution = whole+" & "+num_final+"/"+den_final;
    }
    
    console.log(solution);
    return solution;
} // end add_fractions

function add_whole_numbers()
{
    console.log("adding whole numbers");
    
    var sum = 0;
    
    for(var i = 0; i < input_index; i++)
    {
        sum += parseInt(whole_nums[i]);
    }
    
    console.log("whole sum: "+sum)
    return sum;
}

function display()
{
    result.className += " display";
    fraction_out.className += " display";
    //decimal.className += "display";
    fraction_out.innerHTML = add_fractions();
    
}