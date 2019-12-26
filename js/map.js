function loadBoundaryData(map_selector, geojson_files) {
	//var map = map[selector];
	var use_map_bounds = map[map_selector].options.use_map_bounds;
	var bounds = null;
	if(use_map_bounds) {
		bounds = map[map_selector].getBounds().toBBoxString();
	}
	
	$.each(geojson_files, function(i, v) {
		console.log(v);
		$.getJSON(v.url)
	    .done(function( data ) {		    
		    // Empty any existing feature
			if(typeof geojsonLayer === "object") {
				geojsonLayer.clearLayers();
			}
		    
			geojsonLayer = L.geoJson(data, {
				style: function(feature) {
					return setFeatureStyle(feature);
				},
				onEachFeature: function(feature, layer) {		
					onEachFeature(feature, layer, map_selector);
				}
			});
			geojsonLayer.addTo(map[map_selector]);
			
			if(map[map_selector].options.dont_change_bounds != true) {
				data_bounds = geojsonLayer.getBounds();
				map[map_selector].fitBounds(data_bounds);
			}
	    })
	    .fail(function() {
		    console.log("loadBoundaryData: couldn't load data for method " + method);
		});
	});
}

function onEachFeature(feature, layer, map_selector) {
	var p = feature.properties;
	
	var info = getDetailedRegionInfo(p.region); // returns an object
	
	// Using HTML, create a description that you want to appear when someone clicks on a county
	var description = "<p><b>" + p.region + " region</b><br />" + p.name + " County</p><p>Center: " + info.Center + "</p>";

    layer.bindPopup(description);
}

function getDetailedRegionInfo(region) {
	console.log("getDetailedRegionInfo: region `" + region + "` requested");
	
	info = {
	  CH: {
	    "Region": "CH",
	    "Center": "Chicago AHEC",
	    "Includes": "40 community areas",
	    "Includes2": "North and west Chicago, downtown and portions of the near south side",
	    "Host": "Health & Medicine Policy Research Group",
	    "Contact": "Melissa Martin",
	    "Link": "https://ilahec.uic.edu/regional-centers/ch/",
	    "Color": "#c8202f"
	  },
	  CI: {
	    "Region": "CI",
	    "Center": "Central Illinois AHEC",
	    "Includes": "16 counties",
	    "Includes2": "Christian, Dewitt, Logan, Macon, Macoupin, Marshall, McLean, Menard, Morgan, Moultrie, Montgomery, Peoria, Piatt, Sangamon, Tazewell, Woodford",
	    "Host": "Illinois State University, Normal",
	    "Contact": "Sharon Mills",
	    "Link": "https://ilahec.uic.edu/regional-centers/ci/",
	    "Color": "#6d2780"
	  },
	  CS: {
	    "Region": "CS",
	    "Center": "Chicago South AHEC",
	    "Includes": "37 community areas",
	    "Includes2": "South and southwest Chicago and near south suburbs",
	    "Host": "Project Brotherhood",
	    "Contact": "Marcus Murray",
	    "Link": "https://ilahec.uic.edu/regional-centers/cs/",
	    "Color": "#f78800"
	  },
	  EC: {
	    "Region": "EC",
	    "Center": "East Central AHEC",
	    "Includes": "12 counties",
	    "Includes2": "Champaign, Clark, Coles, Cumberland, Douglas, Edgar, Ford, Iroquois, Kankakee, Livingston, Shelby, Vermillion",
	    "Host": "Gibson Area Health and Hospital Services, Gibson City",
	    "Contact": "Eileen Woolums",
	    "Link": "https://ilahec.uic.edu/regional-centers/ec/",
	    "Color": "#098cd9"
	  },
	  NE: {
	    "Region": "NE",
	    "Center": "Northeast AHEC",
	    "Includes": "8 counties",
	    "Includes2": "DuPage, Grundy, Kane, Kendall, Lake, McHenry, Will, part of Cook",
	    "Host": "TBA",
	    "Contact": "Judith Sayad",
	    "Link": "https://ilahec.uic.edu/regional-centers/ne/",
	    "Color": "#8dc73f"
	  },
	  NW: {
	    "Region": "NW",
	    "Center": "Northwest AHEC",
	    "Includes": "14 counties",
	    "Includes2": "Boone, Bureau, Carroll, DeKalb, Henry, Jo Daviess, LaSalle, Lee, Ogle, Putnam, Stark, Stephenson, Winnebago, Whiteside",
	    "Host": "Katherine Shaw Bethea Hospital, Dixon",
	    "Contact": "Teresa Strum",
	    "Link": "https://ilahec.uic.edu/regional-centers/nw/",
	    "Color": "#224096"
	  },
	  SC: {
	    "Region": "SC",
	    "Center": "South Central AHEC",
	    "Includes": "16 counties",
	    "Includes2": "Bond, Clinton, Effingham, Fayette, Franklin, Jackson, Jefferson, Jersey, Madison, Marion, Monroe, Perry, Randolph, St. Clair, Union, Washington",
	    "Host": "SSM Health System, Mt. Vernon",
	    "Contact": "Kayla Dunahee",
	    "Link": "https://ilahec.uic.edu/regional-centers/sc/",
	    "Color": "#6738"
	  },
	  SE: {
	    "Region": "SE",
	    "Center": "Southeast AHEC",
	    "Includes": "19 counties",
	    "Includes2": "Alexander, Clay, Crawford, Edwards, Gallatin, Hamilton, Hardin, Jasper, Johnson, Lawrence, Massac, Pope, Pulaski, Richland, Saline, Wabash, Wayne, White, Williamson",
	    "Host": "Fairfield Memorial Hospital, Fairfield",
	    "Contact": "Kristi Howell",
	    "Link": "https://ilahec.uic.edu/regional-centers/se/",
	    "Color": "#d0b202"
	  },
	  WC: {
	    "Region": "WC",
	    "Center": "West Central AHEC",
	    "Includes": "17 counties",
	    "Includes2": "Adams, Brown, Calhoun, Cass, Fulton, Greene, Hancock, Henderson, Knox, Mason, McDonough, Mercer, Pike, Rock Island, Schulyer, Scott, Warren",
	    "Host": "Memorial Hospital, Carthage",
	    "Contact": "Mary Jane Clark",
	    "Link": "https://ilahec.uic.edu/regional-centers/wc/",
	    "Color": "#e75480"
	  }
	}
	
	return info[region];
}

/*
color-CH-dark-red-c8202f-(200,32,47).jpg
color-CI-purple-6d2780-(109,39,128).jpg
color-CS-dark-orange-f78800-(247,136,0).png
color-EC-bright-blue-098cd9-(9,140,217).jpg
color-NE-bright-green-8dc73f-(141,199,63).jpg
color-NW-dark-blue-224096-(34,64,150).jpg
color-SC-dark-green-006738-(0,103,56).jpg
color-SE-dark-yellow-d0b202-(208,178,2).jpg
color-WC-dark-pink-e75480-(231,84,128).jpg
*/

function setFeatureStyle(feature) {
	// this needs to return a Leaflet "style" object
	// Create a default "style" object
	var style = {
		weight: 1
	}
	switch(feature.properties.region) {
		case "CH":
			var color = "#c8202f"; // dark red
			break;
		case "CI":
			var color = "#6d2780"; // purple
			break;
		case "CS":
			var color = "#f78800"; // dark orange
			break;
		case "EC":
			var color = "#098cd9"; // bright blue
			break;
		case "NE":
			var color = "#8dc73f"; // bright green
			break;
		case "NW":
			var color = "#224096"; // dark blue
			break;
		case "SC":
			var color = "#006738"; // dark gren
			break;
		case "SE":
			var color = "#d0b202"; // dark yellow
			break;
		case "WC":
			var color = "#e75480"; // dark pink
			break;
	}
	
	// Add the color property to the style object
	style.color = color;

	return style;
}