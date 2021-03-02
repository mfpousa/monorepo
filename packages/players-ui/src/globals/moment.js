import moment from "moment";
import "moment-timezone";

// Set momentjs language
import "moment/locale/es.js";
import "moment/locale/en-gb.js";
moment.locale(navigator.language);

export default moment;
