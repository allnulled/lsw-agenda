const { resolve } = require(__dirname + "/bundler.utils.js");

module.exports = [
  `${__dirname}/lsw-agenda/lsw-agenda`,
  `${__dirname}/components/lsw-agenda-accion-add/lsw-agenda-accion-add`,
  `${__dirname}/components/lsw-agenda-accion-search/lsw-agenda-accion-search`,
  `${__dirname}/components/lsw-agenda-breadcrumb/lsw-agenda-breadcrumb`,
  `${__dirname}/components/lsw-agenda-concepto-add/lsw-agenda-concepto-add`,
  `${__dirname}/components/lsw-agenda-concepto-search/lsw-agenda-concepto-search`,
  `${__dirname}/components/lsw-agenda-evento-search/lsw-agenda-evento-search`,
  `${__dirname}/components/lsw-agenda-form/lsw-agenda-form`,
  `${__dirname}/components/lsw-agenda-impresion-add/lsw-agenda-impresion-add`,
  `${__dirname}/components/lsw-agenda-impresion-search/lsw-agenda-impresion-search`,
  `${__dirname}/components/lsw-agenda-infraccion-search/lsw-agenda-infraccion-search`,
  `${__dirname}/components/lsw-agenda-limitador-add/lsw-agenda-limitador-add`,
  `${__dirname}/components/lsw-agenda-limitador-search/lsw-agenda-limitador-search`,
  `${__dirname}/components/lsw-agenda-limitador-viewer/lsw-agenda-limitador-viewer`,
  `${__dirname}/components/lsw-agenda-postimpresion-search/lsw-agenda-postimpresion-search`,
  `${__dirname}/components/lsw-agenda-propagacion-search/lsw-agenda-propagacion-search`,
  `${__dirname}/components/lsw-agenda-propagador-search/lsw-agenda-propagador-search`,
];