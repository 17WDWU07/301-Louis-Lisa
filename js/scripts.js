google.charts.load('current', {packages: ['corechart', 'controls']});
google.charts.setOnLoadCallback(drawDashboard);

 function drawDashboard(){
	$.ajax({
		url: 'js/classinfo.json',
		dataType: 'json',
		success:function(dataJSON){
			console.log("success")
			console.log(dataJSON);

			//DATA TABLE SET UP

			var data = new google.visualization.DataTable();
				data.addColumn('string', 'Name');
				data.addColumn('string', 'Gender');
				data.addColumn('number', 'Age');
				data.addColumn('string', 'SocialMedia');

			for (var i = 0; i < dataJSON.length; i++) {
				data.addRow([
				dataJSON[i].name,
				dataJSON[i].gender,
				dataJSON[i].age,
				dataJSON[i].socialmedia]);

			};

			var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));
			//END OF DATA TABLE SET UP

			//SCATTERCHART
			var chart1 = new google.visualization.ChartWrapper({
   				chartType: 'ScatterChart',
   				containerId: 'chart1',
   				options: {
   					width: "100%",
   					height: "100%",
   					legend: "none",
   					title: "age vs income"
   				},
   				view: {
   					columns: [2,0]
   				}
   			})
   			//END OF SCATTERCHART

   			//TABLE
   			var table = new google.visualization.ChartWrapper({
   				chartType: 'Table',
   				containerId: 'table',
   				options: {
   					width: '100%'
   				}
   			})
   			//END OF TABLE

   			//Controls

   			var ageRangeSlider = new google.visualization.ControlWrapper({
   				controlType: 'NumberRangeFilter',
   				containerId: 'control1',
   				options: {
   					filterColumnLabel: 'Age'
   				}
   			})

   			var genderPicker = new google.visualization.ControlWrapper({
   				controlType: 'CategoryFilter',
   				containerId: 'control2',
   				options: {
   					filterColumnLabel: 'Gender',
   					ui: {
   						allowMultiple: false,
   						allowTyping: false,
   						labelStacking: 'vertical'
   					}
   				}
   			})

	},//END OF SUCCESS FUNCTION
		error:function(error){
			console.log(error);
		}
	})
} //END OF drawDashboard FUNCTION