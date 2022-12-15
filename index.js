let featureLayer;
let infoWindow;
let map;

// gdp data by state.
const states = {
    "Banten": 55210,
    "Aceh": 34680,
    "Riau": 129852,
    "Bali": 50381,
    "Papua": 54034,
    "Lampung": 40950,
    "Jambi": 65193,
    "Maluku": 26072,
    "West Java": 45299,
    "East Java": 60043,
    "Central Java": 38669,
    "Special Region of Yogyakarta": 40229,
    "West Sumatra": 45293,
    "North Sumatra": 57569,
    "South Sumatra": 57487,
    "Bengkulu": 39143,
    "Bangka Belitung Islands": 58338,
    "Riau Islands": 130125,
    "West Kalimantan": 42282,
    "Central Kalimantan": 62912,
    "East Kalimantan": 182540,
    "South Kalimantan": 46712,
    "North Kalimantan": 155080,
    "North Sulawesi": 54043,
    "Central Sulawesi": 81733,
    "Gorontalo": 37170,
    "West Sulawesi": 35036,
    "South Sulawesi": 59656,
    "South East Sulawesi": 52293,
    "West Nusa Tenggara": 26002,
    "East Nusa Tenggara": 20581,
    "North Maluku": 40302,
    "West Papua": 73539,
    "Jakarta": 274709,
  };

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -2, lng: 118 },
      zoom: 5.8,
      // In the cloud console, configure this Map ID with a style that enables the
      // "Administrative Area Level 1" feature layer.
      mapId: "7ba16be0c9375fa7",
    });
    //@ts-ignore
    const featureLayer = map.getFeatureLayer(
      google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1
    );
  
    featureLayer.style = (featureStyleFunctionOptions) => {
      const placeFeature = featureStyleFunctionOptions.feature;
      const gdp = states[placeFeature.displayName];
      let fillColor;
      let strokeColor;
  
      // Specify colors using any of the following:
      // * Named ('green')
      // * Hexadecimal ('#FF0000')
      // * RGB ('rgb(0, 0, 255)')
      // * HSL ('hsl(60, 100%, 50%)')
      if (gdp < 40000) {
        fillColor = "red";
        strokeColor = "black";
      } else if (gdp < 60000) {
        fillColor = "yellow";
        strokeColor = "black";
      } else if (gdp < 80000) {
        fillColor = "green";
        strokeColor = "black";
      } else if (gdp < 100000) {
        fillColor = "blue";
        strokeColor = "black";
      } else if (gdp < 300000){
        fillColor = "#ff7f50";
        strokeColor = "black";
      }
      return {
        fillColor,
        strokeColor,
        fillOpacity: 1.0,
        strokeOpacity: 1.0,
        strokeWeight: 2.0,
      };
    };

    // Add the event listener for the feature layer.
    featureLayer.addListener("click", handlePlaceClick);
    infoWindow = new google.maps.InfoWindow({});
    // Apply style on load, to enable clicking.
    // applyStyleToSelected();
    const iconBase = "fa-solid fa-square-full";

    const icons = {
      one: {
        name: "< 40.000",
        icon: iconBase,
        color: 'red',
      },
      two: {
        name: "40.001 - 60.000",
        icon: iconBase,
        color: 'yellow',
      },
      three: {
        name: "60.001 - 80.000",
        icon: iconBase,
        color: 'green',
      },
      four: {
        name: "80.001 - 100.000",
        icon: iconBase,
        color: 'blue',
      },
      five: {
        name: "> 100.000",
        icon: iconBase,
        color: '#ff7f50',
      },
    }

    const legend = document.getElementById("legend");

    for (const key in icons) {
      const type = icons[key];
      const name = type.name;
      const icon = type.icon;
      const color = type.color;
      const div = document.createElement("div");

      div.innerHTML = '<i class="' + icon + '" style= color:' + color + ';"></i> ' + name;
      legend.appendChild(div);
    }

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
  }

  function handlePlaceClick(event) {
    let feature = event.features[0];
  
    console.log(event);
    if (!feature.placeId) return;
  
    // Apply the style to the feature layer.
    // applyStyleToSelected(feature.placeId);
  
    // Add the info window.
    let content =
      '<span style="font-size:medium">Province: ' +
      feature.displayName +
      "<br/> GDP (x 1000 in Ruphias): " +
      states[feature.displayName]
      "</span>";
  
    updateInfoWindow(content, event.latLng);
  }

  function updateInfoWindow(content, center) {
    infoWindow.setContent(content);
    infoWindow.setPosition(center);
    infoWindow.open({
      map,
      shouldFocus: false,
    });
  }
  
  window.initMap = initMap;
  