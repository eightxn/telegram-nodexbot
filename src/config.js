const token = "";
const admin = 360806474;											//AdminID
const options  = {													//Options
	polling: true,													//Polling
    request: { proxy: "https://159.65.9.66:3128" }					//Bot proxy
};
function Rand(max, min)
{
  return Math.floor(Math.random() * (Number(max - min + 1)) + min);
}

module.exports.token = token;
module.exports.options = options;
module.exports.admin = admin;
module.exports.Rand = Rand;