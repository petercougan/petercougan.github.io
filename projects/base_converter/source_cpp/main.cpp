// main.cpp : Defines the entry point for the console application.
//
/*
* @FILE: main.cpp
* @DESCRIPTION: Test file for the Convert class
		Class defined in Convert.h
		Member functions defined in Convert.cpp
* @AUTHOR: Peter Cougan
* @DATE: 21 Sept 2016
* @ASSIGNMENT: Homework 1    CIS 554
*/
#include <iostream>
#include "Convert.h" // header for class Convert
using namespace std;

int main()
{
	// display title
	cout << "***Convert From Any Base 2-9 to Base 10*** \n";

	// create an instance of Convert
	Convert num = Convert();

	// prompt user for input
	num.promptUser();

	return 0;
} // end main