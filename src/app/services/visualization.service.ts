/*
 Copyright 2023 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


 // [START visualize_render_rgb]
 /**
  * Renders an RGB GeoTiff image into an HTML canvas.
  *
  * The GeoTiff image must include 3 rasters (bands) which
  * correspond to [Red, Green, Blue] in that order.
  *
  * @param  {GeoTiff} rgb   GeoTiff with RGB values of the image.
  * @param  {GeoTiff} mask  Optional mask for transparency, defaults to opaque.
  * @return {HTMLCanvasElement}  Canvas element with the rendered image.
  */

 // [END visualize_render_rgb]
 
 // [START visualize_render_palette]
 /**
  * Renders a single value GeoTiff image into an HTML canvas.
  *
  * The GeoTiff image must include 1 raster (band) which contains
  * the values we want to display.
  *
  * @param  {GeoTiff}  data    GeoTiff with the values of interest.
  * @param  {GeoTiff}  mask    Optional mask for transparency, defaults to opaque.
  * @param  {string[]} colors  Hex color palette, defaults to ['000000', 'ffffff'].
  * @param  {number}   min     Minimum value of the data range, defaults to 0.
  * @param  {number}   max     Maximum value of the data range, defaults to 1.
  * @param  {number}   index   Raster index for the data, defaults to 0.
  * @return {HTMLCanvasElement}  Canvas element with the rendered image.
  */

 
 /**
  * Creates an {r, g, b} color palette from a hex list of colors.
  *
  * Each {r, g, b} value is a number between 0 and 255.
  * The created palette is always of size 256, regardless of the number of
  * hex colors passed in. Inbetween values are interpolated.
  *
  * @param  {string[]} hexColors  List of hex colors for the palette.
  * @return {{r, g, b}[]}         RGB values for the color palette.
  */
 export function createPalette(hexColors: string[]): { r: number; g: number; b: number }[] {
   // Map each hex color into an RGB value.
   const rgb = hexColors.map(colorToRGB);
   // Create a palette with 256 colors derived from our rgb colors.
   const size = 256;
   const step = (rgb.length - 1) / (size - 1);
   return Array(size)
     .fill(0)
     .map((_, i) => {
       // Get the lower and upper indices for each color.
       const index = i * step;
       const lower = Math.floor(index);
       const upper = Math.ceil(index);
       // Interpolate between the colors to get the shades.
       return {
         r: lerp(rgb[lower].r, rgb[upper].r, index - lower),
         g: lerp(rgb[lower].g, rgb[upper].g, index - lower),
         b: lerp(rgb[lower].b, rgb[upper].b, index - lower),
       };
     });
 }
 
 /**
  * Convert a hex color into an {r, g, b} color.
  *
  * @param  {string} color  Hex color like 0099FF or #0099FF.
  * @return {{r, g, b}}     RGB values for that color.
  */
 export function colorToRGB(color: string): { r: number; g: number; b: number } {
   const hex = color.startsWith('#') ? color.slice(1) : color;
   return {
     r: parseInt(hex.substring(0, 2), 16),
     g: parseInt(hex.substring(2, 4), 16),
     b: parseInt(hex.substring(4, 6), 16),
   };
 }
 
 /**
  * Normalizes a number to a given data range.
  *
  * @param  {number} x    Value of interest.
  * @param  {number} max  Maximum value in data range, defaults to 1.
  * @param  {number} min  Minimum value in data range, defaults to 0.
  * @return {number}      Normalized value.
  */
 export function normalize(x: number, max: number = 1, min: number = 0): number {
   const y = (x - min) / (max - min);
   return clamp(y, 0, 1);
 }
 
 /**
  * Calculates the linear interpolation for a value within a range.
  *
  * @param  {number} x  Lower value in the range, when `t` is 0.
  * @param  {number} y  Upper value in the range, when `t` is 1.
  * @param  {number} t  "Time" between 0 and 1.
  * @return {number}    Inbetween value for that "time".
  */
 export function lerp(x: number, y: number, t: number): number {
   return x + t * (y - x);
 }
 
 /**
  * Clamps a value to always be within a range.
  *
  * @param  {number} x    Value to clamp.
  * @param  {number} min  Minimum value in the range.
  * @param  {number} max  Maximum value in the range.
  * @return {number}      Clamped value.
  */
 export function clamp(x: number, min: number, max: number): number {
   return Math.min(Math.max(x, min), max);
 }
 // [END visualize_render_palette]
 
 export function rgbToColor({ r, g, b }: { r: number; g: number; b: number }): string {
   const f = (x: number) => {
     const hex = Math.round(x).toString(16);
     return hex.length == 1 ? `0${hex}` : hex;
   };
   return `#${f(r)}${f(g)}${f(b)}`;
 }