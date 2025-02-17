import shp from 'shpjs';
import JSZip from 'jszip';
import { DOMParser } from 'xmldom';
import toGeoJSON from '@tmcw/togeojson';
import { _, interpolate } from './gettext';

export function addTempLayer(file, cb) {
  let maxSize = 5242880;

  let getColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
  };

  if (file && file.size > maxSize) {
    let err = { message: interpolate(_("%(file)s is bigger than 5 MB."), { file: file.name }) };
    cb(err);
    return;
  }

  let reader = new FileReader();
  let isZipFile = file.name.endsWith('.zip');
  let isKmzFile = file.name.endsWith('.kmz');
  let isGeoJsonFile = file.name.endsWith('.geojson') || file.name.endsWith('.json');

  if (isZipFile) {
    reader.onload = function () {
      if (reader.readyState !== 2 || reader.error) {
        return;
      }
      shp(reader.result).then(addLayer).catch(err => {
        err.message = interpolate(_("Not a proper zipped shapefile: %(file)s"), { file: file.name });
        cb(err);
      });
    };
    reader.readAsArrayBuffer(file);
  } else if (isKmzFile) {
    reader.onload = async function () {
      try {
        let zip = await JSZip.loadAsync(reader.result);
        let kmlFile = Object.keys(zip.files).find(name => name.endsWith('.kml'));

        if (!kmlFile) {
          throw new Error(_("No KML file found inside KMZ."));
        }

        let kmlContent = await zip.files[kmlFile].async("text");
        let kmlDom = new DOMParser().parseFromString(kmlContent, 'text/xml');
        let geojson = toGeoJSON.kml(kmlDom);

        addLayer(geojson);
      } catch (err) {
        err.message = interpolate(_("Invalid KMZ file: %(file)s"), { file: file.name });
        cb(err);
      }
    };
    reader.readAsArrayBuffer(file);
  } else if (isGeoJsonFile) {
    reader.onload = function () {
      try {
        let geojson = JSON.parse(reader.result);
        addLayer(geojson);
      } catch (err) {
        err.message = interpolate(_("Not a proper JSON file: %(file)s"), { file: file.name });
        cb(err);
      }
    };
    reader.readAsText(file);
  } else {
    cb({ message: _("Unsupported file format.") });
  }

  function addLayer(_geojson) {
    let tempLayer = L.geoJson(_geojson, {
      style: function () {
        return { opacity: 1, fillOpacity: 0.7, color: getColor() };
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: 6, color: getColor(), opacity: 1, fillOpacity: 0.7 });
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          layer.bindPopup(Object.keys(feature.properties)
            .map(k => `<strong>${k}:</strong> ${feature.properties[k]}`)
            .join("<br />"), { maxHeight: 200 });
        }
      }
    });

    tempLayer.options.bounds = tempLayer.getBounds();
    cb(null, tempLayer, file.name);
  }
}
