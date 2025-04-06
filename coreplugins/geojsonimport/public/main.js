import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

import ResizeModes from 'webodm/classes/ResizeModes';

import PlatformSelectButton from "./components/PlatformSelectButton";
import PlatformDialog from "./components/PlatformDialog";
import LibraryDialog from "./components/LibraryDialog";
import ErrorDialog from "./components/ErrorDialog";
import ConfigureNewTaskDialog from "./components/ConfigureNewTaskDialog";

PluginsAPI.Map.willAddControls([], function (args, _) {

    /* setTimeout(function () {
        console.log("Map components loaded. Creating new layer control for utilities");

        // Create a new layer control 
        const layerControl = L.control.layers(null, null, { collapsed: true });
        layerControl.addTo(args.map);

        // Access the container for the control after it has been added to the map
        const controlContainer = layerControl.getContainer();

        if (controlContainer) {
            // Set the three-bar icon as the content of the toggle button
            const toggleButton = controlContainer.querySelector(".leaflet-control-layers-toggle");
            toggleButton.textContent = "☰";  // Unicode character for hamburger icon

            // Remove the default background image
            toggleButton.style.backgroundImage = "none";
            toggleButton.style.backgroundColor = "transparent";  // Set background color to transparent
            toggleButton.style.fontSize = "20px";    // Adjust size
            toggleButton.style.width = "30px";       // Adjust width
            toggleButton.style.height = "30px";      // Adjust height
            toggleButton.style.display = "flex";     // Center icon
            toggleButton.style.alignItems = "center";
            toggleButton.style.justifyContent = "center";
            toggleButton.style.color = "#444";       // Adjust color if needed
        } else {
            console.error("Layer control container not found.");
        }
        

        // Color map for different files
        let getColorByFileName = (fileName) => {
            const colorMap = {
                'gas.geojson': '#FFFF00',    // Yellow for Gas pipelines
                'water.geojson': '#0000FF',  // Blue for Water networks
                'roads.geojson': '#FFFFFF',  // White for Roads
                'electric.geojson': '#FF0000', // Red for Electric networks
                'communication.geojson': '#FFA500', // Orange for Communication
                'reclaimed.geojson': '#800080', // Purple for Reclaimed
                'default': '#FFC0CB'  // Pink (default if no match)
            };

            // Return the color for the specific file, or use default if not found
            return colorMap[fileName] || colorMap['default'];
        };

        // Function to add GeoJSON to the map and update the Layer Control
        let addLayer = (_geojson, fileUrl, displayName) => {
            // Extract the file name from the URL
            const fileName = fileUrl.split('/').pop();  // Get the last part of the URL (e.g., 'gas.geojson')

            console.log("Adding layer to map:", _geojson);

            // Get color based on the file name being imported
            const layerColor = getColorByFileName(fileName);

            // Create the GeoJSON layer but do not add it to the map yet
            let tempLayer = L.geoJson(_geojson, {
                style: function (feature) {
                    return {
                        color: layerColor,
                        fillOpacity: 0.7
                    };
                },
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 6,
                        color: layerColor,
                        opacity: 1,
                        fillOpacity: 0.7
                    });
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties) {
                        layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                            return "<strong>" + k + ":</strong> " + feature.properties[k];
                        }).join("<br />"), { maxHeight: 200 });
                    }
                }
            });

            // Do NOT add the layer to the map initially, just add it to the Layer Control
            tempLayer[Symbol.for("meta")] = {
                name: fileName,  // Use the extracted file name
                group: { id: 'temp-layer', name: 'Temporary Layers' }
            };

            // Add the layer to the Layer Control using the custom display name
            layerControl.addOverlay(tempLayer, displayName);  // Use the custom display name from the geoJsonFiles array
        };

        // Array of GeoJSON file paths and display names
        let geoJsonFiles = [
            { file: 'https://thefieldmappinggroup.com/geodata/gas.geojson', name: 'Gas Pipelines' },
            { file: 'https://thefieldmappinggroup.com/geodata/water.geojson', name: 'Water Networks' },
            { file: 'https://thefieldmappinggroup.com/geodata/roads.geojson', name: 'Roads' },
            { file: 'https://thefieldmappinggroup.com/geodata/electric.geojson', name: 'Electric Networks' },
            { file: 'https://thefieldmappinggroup.com/geodata/communication.geojson', name: 'Communication' },
            { file: 'https://thefieldmappinggroup.com/geodata/reclaimed.geojson', name: 'Reclaimed Areas' }
        ];

        // Fetch and add each GeoJSON file
        geoJsonFiles.forEach(function (geoFile) {
            console.log("Fetching GeoJSON file:", geoFile.file);
            fetch(geoFile.file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("GeoJSON data fetched successfully:", data);
                    addLayer(data, geoFile.file, geoFile.name);  // Pass the custom display name from the array
                })
                .catch(err => {
                    console.error('Error loading GeoJSON file:', err);
                });
        });

    }, 500); // Allow time for the map components to fully load */

    console.log("test");
});
