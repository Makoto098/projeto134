var img = "";
let status = "";
objects = [];

function preload() {
  img = loadImage("dog_cat.jpg");
  alertSound = loadSound("alarm.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();

  alertSound.setVolume(0.5);
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecção de objetos";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}
function draw() {
  image(video, 0, 0, 380, 380);

  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: objeto detectado";
      document.getElementById("numberOfObjects").innerHTML =
        "Bebê encontrado: " + objects.length;
      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }

  // Verifica se algum objeto foi detectado
  if (objects.length > 0) {
    // Itera sobre os objetos detectados
    for (let i = 0; i < objects.length; i++) {
      let label = objects[i].label;

      // Verifica se o objeto detectado é uma pessoa
      if (label === "person") {
        // Atualiza o elemento HTML com o texto "bebê detectado"
        statusElement.html("Status: bebê detectado");

        // Interrompe a reprodução do alerta
        alertSound.stop();
      } else {
        // Atualiza o elemento HTML com o texto "bebê não detectado"
        statusElement.html("Status: bebê não detectado");

        // Reproduz o alerta
        if (alertSound.isPlaying()) {
          alertSound.play();
        }
      }
    }
  }
}
