const token = "619561733:AAE1s6_fIhci2EyVaDDCP7R3LgGbTrUp_MM";
const admin = 360806474;
const options  = {
	polling: true,
    request: { proxy: "https://159.65.9.66:3128" }
};
function Rand(max, min)
{
  return Math.floor(Math.random() * (Number(max - min + 1)) + min);
}

module.exports.token = token;
module.exports.options = options;
module.exports.admin = admin;
module.exports.Rand = Rand;