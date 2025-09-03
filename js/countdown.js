(function($) {
	$.fn.countdown = function(options, callback) {

		//custom 'this' selector
		thisEl = $(this);

		//array of custom settings
		var settings = { 
			'date': null, // This option will no longer be used for the 90-day version
			'format': null
		};

		//append the settings array to options
		if(options) {
			$.extend(settings, options);
		}
		
		// Set the end date 90 days from now. 
		// Use localStorage to persist the end date across page loads.
		var endDateKey = 'countdownEndDate-' + thisEl.attr('id');
		var eventDate;

		if (localStorage.getItem(endDateKey)) {
			eventDate = parseInt(localStorage.getItem(endDateKey));
		} else {
			var now = new Date();
			now.setDate(now.getDate() + 90);
			eventDate = now.getTime() / 1000;
			localStorage.setItem(endDateKey, eventDate);
		}

		//main countdown function
		function countdown_proc() {
			
			currentDate = Math.floor($.now() / 1000);
			
			if(eventDate <= currentDate) {
				callback.call(this);
				clearInterval(interval);
				localStorage.removeItem(endDateKey); // Clear the stored date when the countdown ends
			}
			
			seconds = eventDate - currentDate;
			
			days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
			seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed
			
			hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed
			
			minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60; //update the seconds variable with no. of minutes removed
			
			//conditional Ss
			if (days == 1) { thisEl.find(".timeRefDays").text("day"); } else { thisEl.find(".timeRefDays").text("days"); }
			if (hours == 1) { thisEl.find(".timeRefHours").text("hour"); } else { thisEl.find(".timeRefHours").text("hours"); }
			if (minutes == 1) { thisEl.find(".timeRefMinutes").text("minute"); } else { thisEl.find(".timeRefMinutes").text("minutes"); }
			if (seconds == 1) { thisEl.find(".timeRefSeconds").text("second"); } else { thisEl.find(".timeRefSeconds").text("seconds"); }
			
			//logic for the two_digits ON setting
			if(settings['format'] == "on") {
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
			}
			
			//update the countdown's html values.
			if(!isNaN(eventDate)) {
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds);
			} else { 
				alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
				clearInterval(interval); 
			}
		}
		
		//run the function
		countdown_proc();
		
		//loop the function
		interval = setInterval(countdown_proc, 1000);
		
	}
}) (jQuery);


<div id="ninety-day-countdown">
    <span class="days"></span> <span class="timeRefDays"></span>
    <span class="hours"></span> <span class="timeRefHours"></span>
    <span class="minutes"></span> <span class="timeRefMinutes"></span>
    <span class="seconds"></span> <span class="timeRefSeconds"></span>
</div>


$('#ninety-day-countdown').countdown({
    format: 'on'
}, function() {
    // Callback function when countdown is complete
    console.log('90-day countdown is over!');
});

