require("dotenv").config();

const homepage = async (req, res) => {
  console.log(req.body);
  const { trackingNumber } = req.body;
  if (!trackingNumber) {
    return res.status(400).json({ message: "Tracking number is required" });
  }

  /*ship24 api documentation
authorization and content tupe is important here and in the bodu tracking number is important
*/

  const url = "https://api.ship24.com/public/v1/trackers/track";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API}`,
      Accept: "application/json",
    },
    body: JSON.stringify({ trackingNumber: trackingNumber }), // this needs to be in a string
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!data) {
      console.log("error while getting data from aftership");
    }
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { homepage };

// 9405511206210614641491
// 9400111105501389502698
// 9300120111411862916987
// ND036703227BR
// 9405511206210619073204
// 420100199261299991659100862297
// 420125459261299991659100861986
// 420262019261299991659100862471
// 420812119400109105459081205553
// 420778459261299991659100862433
// 420194019261299991659100863003
// 9400111206210617544673
// 92612902103258000131050125
// 92612902103258000131058879
