const presence = new Presence({
  clientId: "814887834737049600"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "twttrpfp"
  };

  if(document.location.pathname == "/games/") {
    presenceData.details = "Browsing games";
  } else if (document.location.pathname == "/games/h5game.phtml") {
    presenceData.details = "Playing a game";
    const gameName = document.querySelector(".page-title__2020 h1").textContent;
    if(gameName) presenceData.state = gameName;
  } else if (document.location.pathname == "/index.phtml" || document.location.pathname == "/") {
    presenceData.details = "Visiting the homepage";
  } else if (document.location.pathname == "/trudys_surprise.phtml") {
    presenceData.details = "Playing a game";
    presenceData.state = "Trudy's Surprise";
  }

  presence.setActivity(presenceData);
});