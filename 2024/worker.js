
const { parentPort, workerData } = require('worker_threads');
(initialA, instructions) => {
  const registers = {
    A: BigInt(initialA),
    B: 0n,
    C: 0n
  };
  const output = [];
  let ip = 0;
  const getOperandValue = operand => {
    if (operand <= 3) return BigInt(operand);
    if (operand === 4) return registers.A;
    if (operand === 5) return registers.B;
    if (operand === 6) return registers.C;
    return 0n;
  };
  while (ip < instructions.length) {
    const opcode = instructions[ip];
    const operand = instructions[ip + 1];
    if (operand === undefined) break;
    switch (opcode) {
      case 0:
        registers.A = registers.A / 2n ** getOperandValue(operand);
        break;
      case 1:
        registers.B = registers.B ^ BigInt(operand);
        break;
      case 2:
        registers.B = getOperandValue(operand) % 8n;
        break;
      case 3:
        if (registers.A !== 0n) {
          ip = Number(operand);
          continue;
        }
        break;
      case 4:
        registers.B = registers.B ^ registers.C;
        break;
      case 5:
        output.push(Number(getOperandValue(operand) % 8n));
        break;
      case 6:
        registers.B = registers.A / 2n ** getOperandValue(operand);
        break;
      case 7:
        registers.C = registers.A / 2n ** getOperandValue(operand);
        break;
    }
    ip += 2;
  }
  return output;
}

const { startA, endA, instructions } = workerData;
let a = BigInt(startA);
const end = BigInt(endA);

while (a <= end) {
  const output = getOutputFromProgram(a, instructions);
  if (output.length === instructions.length && output.every((v, i) => v === instructions[i])) {
      parentPort.postMessage(a.toString());
      process.exit();
  }
  a += 1000n;  // Step size increased for faster search
}
parentPort.postMessage('-1');
