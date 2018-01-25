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

			//Histogram
			var chart1 = new google.visualization.ChartWrapper({
   				chartType: 'Histogram',
   				containerId: 'chart1',
   				options: {
   					width: "100%",
   					height: "100%",
   					legend: "none",
   					title: "Social media and Age"
   				},
   				view: {
   					columns: [3,2]
   				}
   			})
   			//END OF Histogram

            //Histogram
            var chart2 = new google.visualization.ChartWrapper({
               chartType: 'ScatterChart',
               containerId: 'chart2',
               options: {
                  width: "100%",
                  height: "100%",
                  legend: "none",
                  title: "Social media and Age"
               },
               view: {
                  columns: [0,2]
               }
            })
            //END OF Histogram

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
            dashboard.bind([ageRangeSlider,genderPicker],[chart1, chart2]);
            dashboard.draw(data);

            google.visualization.events.addListener(ageRangeSlider, 'statechange', function(){
               var range = ageRangeSlider.getState();
               console.log(range);
               var view = new google.visualization.DataView(data);
               view.setRows(data.getFilteredRows([

               {
                  column: 2,
                  minValue: range.lowValue,
                  maxValue: range.highValue

               }

               ]));
               console.log(view)
               var filteredRows = view.ol;
               var newData = [];
               for (var i = 0; i < filteredRows.length; i++) {
                  newData.push(dataJSON[filteredRows[i]]);
               };
               console.log(newData);
               drawpie(newData);
            })

	},//END OF SUCCESS FUNCTION
		error:function(error){
			console.log(error);
		}
	})
} //END OF drawDashboard FUNCTION

  function drawpie(data){

   var datagender = new google.visualization.DataTable();
   datagender.addColumn('string','gender');
   datagender.addColumn('number','count');

   var malenumber = 0;
   var femalenumber = 0;

      for (var i = 0; i < data.length; i++) {

      if (data[i].gender == 'Male'){
         malenumber++;
      }

      if (data[i].gender == 'Female'){
         femalenumber++;
      }

   }
      console.log(malenumber);
      console.log(femalenumber);

      datagender.addRow(['Male', malenumber]);
      datagender.addRow(['Female', femalenumber]);

      var options = {
         title: 'Gender'
      };

      var piechart = new google.visualization.PieChart(document.getElementById('chart3'))
      piechart.draw(datagender,options)

  }

