/*
* @FILE: Convert.cpp
* @DESCRIPTION: Defines the member methods provided in interface Convert.h
* @AUTHOR: Peter Cougan
* @DATE: 21 Sept 2016
* @ASSIGNMENT: Homework 1    CIS 554
*/
#include <iostream>
#include "Convert.h"
using namespace std;

// * PROPERTIES
int base; // base to be converted to decimal
int value; // value in base to convert to decimal

// * CONSTRUCTOR
Convert::Convert() {}

// * OTHER METHODS
// Convert To Base Ten -- returns converted value from base b to corresponding value in base 10
int Convert::convertToBaseTen()
{
	int remainder = 0; // value % 10, gets the least significant digit from number
	int degree = 0; // used to calculate base^(degree)
	int finalValue = 0; // return value of method, answer in base 10
	int n = 0; // number of digits
	int v = value; // used in number of digits calculation

	// determine number of digits
	while (v > 0)
	{
		n++;
		v /= 10; // remove least significant digit
	}

	// algorithm to convert to base 10
	//    compute while there is at least 1 digit left
	while (n >= 1)
	{
		int x = 1; // used to compute exponent, base^(degree)
		remainder = value % 10; // get the least significant digit
		
		// compute the value of base^(degree)
		for (int d = degree; d > 0; d--)
		{
			x *= base;
		}

		finalValue += remainder * x; // add remainder * base^(degree)

		value /= 10; // remove the least significant digit
		degree++; // move up 1 significant digit
		n--; // least significant digit was removed
	} // end while()
	return finalValue;
} // end convertToBaseTen

// Validate Input -- return true if valid, false if invalid
bool Convert::validateInput(int b, int v)
{
	int valid = true;
	while (v > 0)
	{
		// determine if each digit is valid
		if (v % 10 > (b - 1)) // return false if any digit is greater than (b-1)
		{
			valid = false;
			break;
		}
		else
		{
			v /= 10; // go to next digit
		}
	} // end while(v)

	return valid;
}

// Prompt User -- get input from user and convert to decimal
void Convert::promptUser()
{
	int b, v;

	// get base from user
	cout << "\nEnter a base to be converted to base 10:\n[2, 3, 4, 5, 6, 7, 8, or 9]\n\nBASE: ";
	cin >> b;

	// get value in base b from user
	cout << "\nEnter a value in base " << b << "\nIMPORTANT: any digit must not be greater than " << (b-1) << "\n\nVALUE: ";
	cin >> v;

	// determine if input is valid
	if (validateInput(b, v))	// if valid, convert to base 10 and display answer
	{
		base = b;
		value = v;
		cout << "\nANSWER: " << convertToBaseTen() << "\n";
	}
	else	// if invalid, display error message and prompt user again
	{
		cout << "\nINVALID INPUT\n" << v << " has at least one digit greater than " << (b-1) << "\n";
		cout << "Fix your input so your value has no digits greater than " << (b-1) << "\n";
		promptUser();
	}
}