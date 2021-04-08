const presence = new Presence({
  clientId: "814887834737049600"
}), strings = presence.getStrings({
  searching: "general.searchFor"
}), browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "twttrpfp"
  },
   showButtons: boolean = await presence.getSetting("buttons");
  presenceData.startTimestamp = browsingStamp;

  // GAMES
  if (document.location.pathname == "/games/") {
    presenceData.details = "Browsing games";
  } else if (document.location.pathname == "/games/h5game.phtml") {
    presenceData.details = "Playing a game";
    const gameName: string = document.querySelector(".page-title__2020 h1").textContent;
    if(gameName) presenceData.state = gameName;
    presenceData.buttons = [
      {
        label: "Play game",
        url: document.URL
      }
    ];
  } else if (document.location.pathname == "/games/game.phtml") {
    presenceData.details = "Playing a game";
    const gameName: string = document.querySelector("#gr-header div h1").childNodes[1].textContent.split(" - ")[1];
    if(gameName) presenceData.state = gameName;
    presenceData.buttons = [
      {
        label: "Play game",
        url: document.URL
      }
    ];
  } else if (document.location.pathname == "/trudys_surprise.phtml") {
    presenceData.details = "Playing a game";
    presenceData.state = "Trudy's Surprise";
  } else if (document.location.pathname == "/medieval/wiseking.phtml") {
    presenceData.details = "Playing a game";
    presenceData.state = "Wise Old King";
  } else if (document.location.pathname.startsWith("/games/neoquest")) {
    presenceData.details = "Playing a game";
    presenceData.state = "NeoQuest";
  } else if (document.location.pathname.startsWith("/games/nq2")) {
    presenceData.details = "Playing a game";
    presenceData.state = "NeoQuest 2";
  }
  
  // LOCATIONS
  if (document.location.pathname == "/explore.phtml") {
    presenceData.details = "Exploring Neopia";
  } else if (document.location.pathname.startsWith("/altador/")) {
    // ALTADOR
    presenceData.details = "Visiting Altador";
    if (document.location.pathname == "/altador/archives.phtml") {
      presenceData.state = "Altadorian Archives";
    } else if (document.location.pathname == "/altador/hallofheroes.phtml") {
      presenceData.state = "Hall of Heroes";
    }
  } else if (document.location.pathname.startsWith("/medieval")) {
    // MERIDELL/BRIGHTVALE
    presenceData.details = "Visiting Meridell";
    if(document.location.pathname == "/medieval/index_castle.phtml") {
      presenceData.state = "Meridell Castle";
    } else if (document.location.pathname == "/medieval/doubleornothing.phtml") {
      presenceData.details = "Playing a game";
      presenceData.state = "Double or Nothing";
    } else if (document.location.pathname == "/medieval/grumpyking.phtml") {
      presenceData.details = "Playing a game";
      presenceData.state = "Grumpy Old King";
    }

    if(document.location.pathname == "/medieval/index_farm.phtml") {
      presenceData.state = "Meri Acres Farm";
    } else if (document.location.pathname == "/medieval/pickyourown.phtml") {
      presenceData.details = "Playing a game";
      presenceData.state = "Pick Your Own";
    } else if (document.location.pathname == "/medieval/potatocounter.phtml") {
      presenceData.details = "Playing a game";
      presenceData.state = "Potato Counter";
    } else if (document.location.pathname == "/medieval/rubbishdump.phtml") {
      presenceData.state = "Rubbish Dump";
    } else if (document.location.pathname == "/medieval/guessmarrow.phtml") {
      presenceData.details = "Playing a game";
      presenceData.state = "Guess the Weight of the Marrow";
    }

    if(document.location.pathname == "/medieval/brightvale.phtml") {
      presenceData.details = "Visiting Brightvale";
    } else if (document.location.pathname == "/medieval/brightcolouring.phtml") {
      presenceData.details = "Visiting Brightvale";
      presenceData.state = "Brightvale Colouring Pages";
    } else if (document.location.pathname == "/medieval/knowledge.phtml") {
      presenceData.details = "Playing a game";
      presenceData.state = "Wheel of Knowledge";
    }
  }

  // MISC
  if (document.location.pathname == "/objects.phtml") {
    const type: string = new URLSearchParams(new URL(document.URL).search).get("type");
    if (type == "shop") {
      presenceData.details = "Visiting a shop";
      const shopName: string = document.querySelector(".page-title__2020 h1").textContent;
      if(shopName) presenceData.state = shopName;
    } else if (type == null) {
      presenceData.details = "Visiting Neopia Central";
    }
  } else if (document.location.pathname == "/inventory.phtml") {
    presenceData.details = "Viewing inventory";
  } else if (document.location.pathname == "/bank.phtml") {
    presenceData.details = "Visiting the Bank";
  } else if (document.location.pathname == "/index.phtml" || document.location.pathname == "/") {
    presenceData.details = "Visiting the homepage";
  } else if (document.location.pathname == "/haggle.phtml") {
    presenceData.details = "Haggling";
  } else if (document.location.pathname == "/shops/wizard.phtml") {
    presenceData.details = "Visting the Shop Wizard";
    const searchingFor = document.querySelector(".wizard-results-text h3");
    if(searchingFor != null && searchingFor.textContent != "...") presenceData.state = `${(await strings).searching} ${searchingFor.textContent}`;
  } else if (document.location.pathname.startsWith("/neoboards/")) {
    presenceData.details = "Browsing the Neoboards";
    if(document.location.pathname == "/neoboards/topic.phtml") {
      presenceData.state = document.querySelector(".topicTitle h1").textContent.split("Topic: ")[1];
    } else if(document.location.pathname == "/neoboards/preferences.phtml") {
      presenceData.state = "Changing preferences";
    }
  } else if (document.location.pathname == "/donations.phtml") {
    presenceData.details = "Visiting the Money Tree";
  } else if (document.location.pathname == "/userlookup.phtml" && new URLSearchParams(new URL(document.URL).search).get("user")) {
    presenceData.details = "Viewing user";
    presenceData.state = new URLSearchParams(new URL(document.URL).search).get("user");
    presenceData.buttons = [
      {
        label: "View user",
        url: document.URL
      }
    ];
  } else if (document.location.pathname == "/petlookup.phtml" && new URLSearchParams(new URL(document.URL).search).get("pet")) {
    presenceData.details = "Viewing Neopet";
    presenceData.state = new URLSearchParams(new URL(document.URL).search).get("pet");
    presenceData.buttons = [
      {
        label: "View Neopet",
        url: document.URL
      }
    ];
  } else if (document.location.pathname == "/neopedia.phtml") {
    presenceData.details = "Reading the Neopedia";
    if(new URLSearchParams(new URL(document.URL).search).get("neopedia_id")) {
      presenceData.state = document.querySelector(".content > b").textContent;
      presenceData.buttons = [
        {
          label: "View article",
          url: document.URL
        }
      ];
    }
  }

  if (!showButtons) {
    delete presenceData.buttons;
  }

  presence.setActivity(presenceData);
});