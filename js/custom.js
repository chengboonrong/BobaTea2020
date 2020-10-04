$(document).ready(function () {
	
	"use strict";
	
	// View modal
	$("body").on("click", ".modal-btn", function () {

		var url = $(this).attr("href");

		$.ajax({
			
			url: url,

			success: function (response) {

				$("#modal .modal-content").html(response);

			},
		});

	});

	// Modal submission
	$("body").on("submit", "#modal-form", function (e) {

		e.preventDefault();
		console.log($(this).attr("action"));

		$.ajax({
			url: $(this).attr("action"),
			type: $(this).attr("method"),
			data: new FormData(this),
			cach: false,
			contentType: false,
			processData: false,

			success: function (response) {

				$(".invalid-feedback").fadeIn().html(response);
                
			},

		});

	});

	$(document).on('click', 'a[href^="#"]', function (e) {

		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
	
	});

	var numBoxes = $("select[id^='symptom']").length; //maximum input boxes allowed
	var maxBoxes = 17; //maximum select boxes allowed
	var selectWrapper = $("#symptoms"); //Fields wrapper
	var addButton = $("#add-more"); //Add button ID

	$(addButton).click(function(e){ //on add input button click
		
		e.preventDefault();
		
		if(numBoxes < maxBoxes){ //max input box allowed
			
			numBoxes++; //text box increment

			$(selectWrapper).append('\
				<div class="col-4 input-group mb-3">\
					<select id="symptom' + numBoxes + '" class="custom-select custom-select-lg" name="symptom[]" data-action="find-disease">\
						<option value="">Select Symptom</option>\
					</select>\
					<div class="input-group-append">\
						<button class="remove-symptom btn btn-outline-danger" type="button">Remove</button>\
					</div>\
				</div>');

				var selector = $("#symptom" + numBoxes);

				$.ajax({

				url: "include/backend.inc.php?action=get-symptoms",
				type: "GET",
	
				success: function (response) {
	
					var result = JSON.parse(response);
	
					selector.find('option:not(:first)').remove().end();
	
					for (var i = 0; i < result.length; i++) {
						
						selector.append("<option value='" + result[i]["SYMPTOM_ID"] + "'>" + result[i]["SYMPTOM_NAME"] + "</option>");
	
					}

					disabledSelected();

				},
	
			});

		}
	});
	
	$(selectWrapper).on("click",".remove-symptom", function(e){ //user click on remove text
		e.preventDefault();
		// $("option:selected").prop("selected", false)
		$(this).closest('.input-group').remove();
		numBoxes--;
		disabledSelected();

	})

	function disabledSelected () {

		$("select[id^='symptom'] option[disabled]").prop('disabled', false);

		$("select[id^='symptom']").each(function() {
			$("select[id^='symptom']").not(this).find('option[value="' + this.value + '"]').prop('disabled', true); 
		});
	}

	$(document).on("change", "select[id^='symptom']", function() {

		disabledSelected();

	});
	
	$(document).on("change", "select[id^='symptom']", function () {

		var action = $(this).attr("data-action"),
			id = [],
			// ids = $("select[id^='symptom']").val(),
			selector = $("#disease");
			// all =  $(this).closest('.row').nextAll().find('select');


			$("select[id^='symptom']").each(function() {

				if ($(this).val()) {
					
					selector.prop("disabled", false);

					id.push($(this).val());

				} else {

					selector.find('option:not(:first)').remove().end();
					selector.prop("disabled", true);

				}
				
			});

			if (id.length > 0) {
		
				selector.prop("disabled", false);

				$.ajax({
	
					url: "include/backend.inc.php?action=" + action,
					type: "POST",
					data: {id: id},
	
					success: function (response) {
	
						var result = JSON.parse(response);
	
						selector.find('option:not(:first)').remove().end();
	
						for (var i = 0; i < result.length; i++) {
							
							selector.append("<option value='" + result[i]["DISEASE_ID"] + "'>" + result[i]["DISEASE_NAME"] + "</option>");
	
						}
	
					},
	
				});
	

			} else {
	
				selector.find('option:not(:first)').remove().end();
				selector.prop("disabled", true);
				// all.find('option:not(:first)').remove().end();
				// all.prop('disabled', true);
	
			}

	});

	$(document).on("change", "#disease", function () {

		var url = $("#search").attr("href"),
			id = $(this).val(),
			selector = $("#search");
			console.log(id);

		if (id) {
	
			selector.removeClass("disabled");

			$("#search").attr("href", url += "&id=" + id);

			console.log(url);

		} else {

			selector.addClass("disabled");

		}

	});

});


