let primeWorker;

function startWorker() {
  let maxValue = document.getElementById("maxPrime").value;

  if (window.Worker) {
    primeWorker = new Worker("worker.js");

    primeWorker.postMessage(maxValue);

    primeWorker.onmessage = function (e) {
      if (e.data.type === "progress") {
        document.getElementById("progress").innerHTML =
          "Progress: " + e.data.data + "%";
      } else if (e.data.type === "result") {
        document.getElementById("result").innerHTML = e.data.data.join(", ");
      }
    };

    primeWorker.onerror = function (e) {
      document.getElementById("result").innerHTML = "Eror Message";
    };
  } else {
    document.getElementById("result").innerHTML =
      "Your browser does not support Web Workers.";
  }
}

function stopWorker() {
  if (primeWorker) {
    primeWorker.terminate();
  }
  primeWorker = undefined;
}
