/**
 * The internal dependencies.
 */
import { registerFieldComponent } from 'lib/registry';
import UrlPicker from 'components/field';

/*

console.log('here');
trap_events(event);

var thisID = 0;//$(this).attr("id");

doingLink = thisID;

if (typeof wpLink !== 'undefined') {
    var current_url = $('#' + doingLink + '-url').val();
    var current_title = $('#' + doingLink + '-title').val();
    var current_target = $('#' + doingLink + '-target').val();

    // save any existing default initialization
    wplink_defaults = wpLink.setDefaultValues;

    // initialize with current URL and title
    wpLink.setDefaultValues = function() {
        // set the current title and URL
        var $text_inputs = $('#wp-link').find('input[type=text]');
        $($text_inputs[1]).val(current_title);
        $($text_inputs[0]).val(current_url);

        // target a blank page?
        var $checkbox_inputs = $('#wp-link').find('input[type=checkbox]');
        $checkbox_inputs.first().prop('checked', (current_target === '_blank'));
    };
    wpLink.open(thisID); // open the link popup
}*/

registerFieldComponent('urlpicker', UrlPicker);