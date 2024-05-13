function isPrime(num) {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
    if (num % i === 0) return false;
  return num > 1;
}

onmessage = function (e) {
  console.log("worker file: ", e);

  const max = parseInt(e.data, 10);
  const updateStep = Math.floor(max / 100);

  const primes = [];

  for (let number = 2; number <= max; number++) {
    if (isPrime(number)) {
      primes.push(number);
    }

    if (number % updateStep === 0) {
      const progress = Math.floor((number / max) * 100);
      postMessage({ type: "progress", data: progress });
    }
  }

  postMessage({ type: "result", data: primes });
  postMessage({ type: "progress", data: 100 });
};
