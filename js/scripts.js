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
			// var chart1 = new google.visualization.ChartWrapper({
   // 				chartType: 'Histogram',
   // 				containerId: 'chart1',
   // 				options: {
   // 					width: "100%",
   // 					height: "100%",
   // 					legend: "none",
   // 					title: "Social media and Age",
   //                backgroundColor: {fill:"transparent"},
   //                legendTextStyle: { color: '#FFF' },
   //                titleTextStyle: { color: 'Aqua'},
   //                hAxis: {
   //                   color: '#FFF',
   //                   textStyle: {color: '#FFF'}
   //                },
   //                vAxis: {
   //                   color: '#FFF',
   //                   textStyle: {color: '#FFF'}
   //                },
   //                colors: ['#3b5998' , '#55acee','#FF0000','#fffc00']
   // 				},
   // 				view: {
   // 					columns: [3,2]
   // 				},

   // 			})
   			//END OF Histogram

            //Histogram
            var chart2 = new google.visualization.ChartWrapper({
               chartType: 'ScatterChart',
               containerId: 'chart2',
               options: {
                  width: "100%",
                  height: "100%",
                  legend: "none",
                  title: "Name and Age",
                  backgroundColor: {fill:"transparent"},
                  legendTextStyle: { color: '#FFF' },
                  titleTextStyle: { color: 'Aqua'},
                  hAxis: {
                     color: '#FFF',
                     textStyle: {color: '#FFF'}
                  },
                  vAxis: {
                     color: '#FFF',
                     textStyle: {color: '#FFF'}
                  },
                  colors:['aqua']
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
   						allowTyping: false
   					}
   				}
   			})
            dashboard.bind([ageRangeSlider,genderPicker],[chart2]);
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
               drawbar(newData);
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

      datagender.addRow(['Male', malenumber]);
      datagender.addRow(['Female', femalenumber]);

      var options = {
         title: 'Gender',
         backgroundColor: {fill:"transparent"},
         legendTextStyle: { color: '#FFF' },
         titleTextStyle: { color: 'Aqua'},
         hAxis: {
            color: '#FFF',
            textStyle: {color: '#FFF'}
            },
            vAxis: {
            color: '#FFF',
            textStyle: {color: '#FFF'}
            },
            colors:['aqua','black']
      };

      var piechart = new google.visualization.PieChart(document.getElementById('chart3'))
      piechart.draw(datagender,options)

  }

function drawbar(data){

   var datamedia = new google.visualization.DataTable();
   datamedia.addColumn('string','socialmedia');
   datamedia.addColumn('number','count');

   var instagram = 0;
   var facebook = 0;
   var twitter = 0;
   var other = 0;

      for (var i = 0; i < data.length; i++) {

      if (data[i].socialmedia == 'Instagram'){
         instagram++;
      }

      if (data[i].socialmedia == 'Facebook'){
         facebook++;
      }

      if (data[i].socialmedia == 'Twitter'){
         twitter++;
      }

      if (data[i].socialmedia == 'Other'){
         other++;
      }

   }

      datamedia.addRow(['Instagram', instagram]);
      datamedia.addRow(['Facebook', facebook]);
      datamedia.addRow(['Twitter', twitter]);
      datamedia.addRow(['Other', other]);

      var options = {
         title: 'Preffered Social media',
         backgroundColor: {fill:"transparent"},
         legendTextStyle: { color: '#FFF' },
         titleTextStyle: { color: 'Aqua'},
         hAxis: {
            color: '#FFF',
            textStyle: {color: '#FFF'}
            },
            vAxis: {
            color: '#FFF',
            textStyle: {color: '#FFF'}
            },
            colors:['aqua']
      };

      var barchart = new google.visualization.BarChart(document.getElementById('chart1'))
      barchart.draw(datamedia,options)

  }

