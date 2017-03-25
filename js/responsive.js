/* FILENAME: responsive.js
**
** this file adds the .mobile class to <html> element
**  if the window size <= 950 px
*/

$(window).width(
    function ()
    {
        if($(window).width() <= 950)
        {
            $('html').addClass('mobile');
            $('html').removeClass('desktop');
        }
        else
        {
            $('html').addClass('desktop');
            $('html').removeClass('mobile');
        }
    } // end function
);