let answerPath = [];

function nextQuestion(currentId, nextId) {
  document.getElementById(currentId).classList.remove('active');
  if (!nextId.startsWith("team-")) {
    answerPath.push(currentId);
  }
  if (nextId.startsWith('team-')) {
    showFinalResult(nextId);
  } else {
    const nextElement = document.getElementById(nextId);
    if (nextElement) {
      nextElement.classList.add('active');
    }
  }
}

function goBack() {
  const lastQuestionId = answerPath.pop();
  const currentActive = document.querySelector(".question.active");
  if (currentActive) {
    currentActive.classList.remove("active");
  }
  const previousQuestion = document.getElementById(lastQuestionId);
  if (previousQuestion) {
    previousQuestion.classList.add("active");
  }
}

function showFinalResult(teamId) {
  const teamMappings = {
    "team-diamondbacks": "AZ, which makes your team the Arizona Diamondbacks",
    "team-mariners": "SEA, which makes your team the Seattle Mariners",
    "team-braves": "ATL, which makes your team the Atlanta Braves",
    "team-redsox": "BOS, which makes your team the Boston Red Sox",
    "team-rangers": "TEX, which makes your team the Texas Rangers",
    "team-cubs": "CHC, which makes your team the Chicago Cubs",
    "team-giants": "SF, which makes your team the San Francisco Giants",
    "team-guardians": "CLE, which makes your team the Cleveland Guardians",
    "team-nationals": "WAS, which makes your team the Washington Nationals",
    "team-reds": "CIN, which makes your team the Cincinnati Reds",
    "team-yankees": "NYY, which makes your team the New York Yankees",
    "team-cardinals": "STL, which makes your team the St. Louis Cardinals",
    "team-mets": "NYM, which makes your team the New York Mets",
    "team-tigers": "DET, which makes your team the Detroit Tigers",
    "team-astros": "HOU, which makes your team the Houston Astros",
    "team-angels": "LAA, which makes your team the Los Angeles Angels",
    "team-marlins": "MIA, which makes your team the Miami Marlins",
    "team-padres": "SD, which makes your team the San Diego Padres",
    "team-rays": "TB, which makes your team the Tampa Bay Rays",
    "team-dodgers": "LAD, which makes your team the Los Angeles Dodgers",
    "team-twins": "MIN, which makes your team the Minnesota Twins",
    "team-bluejays": "TOR, which makes your team the Toronto Blue Jays",
    "team-athletics": "OAK, which makes your team the Athletics",
    "team-orioles": "BAL, which makes your team the Baltimore Orioles",
    "team-whitesox": "CWS, which makes your team the Chicago White Sox",
    "team-rockies": "COL, which makes your team the Colorado Rockies",
    "team-phillies": "PHI, which makes your team the Philadelphia Phillies",
    "team-brewers": "MIL, which makes your team the Milwaukee Brewers",
    "team-pirates": "PIT, which makes your team the Pittsburgh Pirates",
    "team-royals": "KC, which makes your team the Kansas City Royals",
  };

  document.getElementById("team-result").innerText = teamMappings[teamId] || "Unknown Team";
  const finalResultElement = document.getElementById("final-result");
  finalResultElement.classList.add("active");
  finalResultElement.style.display = "block";

  answerPath = [];

  // EmailJS integration
  document.getElementById("emailButton").addEventListener("click", function() {
    emailjs.send("service_aw271mi", "template_bl4b8g7", {
      personality_type: teamMappings[teamId].split(",")[0],
      team_result: teamMappings[teamId],
      user_email: document.getElementById("user-email").value
    }).then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("Results emailed successfully!");
    }, function(error) {
      console.log("FAILED...", error);
      alert("Failed to send email. Please try again.");
    });
  });
}

// Initialize EmailJS (make sure you add your actual Public Key)
emailjs.init("vX1KWHa4CDQe_DFEW");