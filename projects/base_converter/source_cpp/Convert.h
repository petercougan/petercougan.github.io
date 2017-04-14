/*
* @FILE: Convert.h
* @DESCRIPTION: Definition of class Convert, which converts any base from 2 through 9 to base 10
*              Member functions are defined in Convert.cpp
* @AUTHOR: Peter Cougan
* @DATE: 21 Sept 2016
* @ASSIGNMENT: Homework 1    CIS 554
*/
class Convert
{
private:
	int base; // base to be converted to decimal
	int value; // value in base to convert to decimal
	int convertToBaseTen(); // method to convert value v from base b to corresponding value in base 10
	bool validateInput(int, int); // validates that any digit in value !> (base - 1)

public:
	Convert(); // empty constructor
	void promptUser(); // get input from user and display answer
};

