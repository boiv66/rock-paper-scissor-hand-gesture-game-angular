import { ItemPictureScissorComponent } from "./item-picture-scissor/item-picture-scissor.component";

export function youWin(
  yourChoice: string,
  computerChoice: string
) {
  if (yourChoice === computerChoice) {
    return "tie";
  } else if (yourChoice == "rock") {
    if (computerChoice == "paper") {
      return false;
    }
  } else if (yourChoice == "paper") {
    if (computerChoice == "scissors") {
      return false;
    }
  } else if (yourChoice == "scissors") {
    if (computerChoice == "rock") {
      return false;
    }
  } else {
    return true;
  }
  return "undefined";
}

export function randomizeComputerChoice() {
  const computerChoices: Array<string> = ["rock", "paper", "scissors"];

  return computerChoices[Math.floor(Math.random() *computerChoices.length)];
}

export function ascendingSorted(arr: Array<number>): boolean {
  let second_index;
  let sum = 0;
  for (let first_index = 0; first_index < arr.length - 1; first_index++) {
    second_index = first_index + 1;
    sum += arr[second_index] - arr[first_index];
  }
  if (sum > 100) {
    return true;
  }
  return false;
}

export function descendingSorted(arr: Array<number>): boolean {
  let second_index;
  let sum = 0;
  for (let first_index = 0; first_index < arr.length - 1; first_index++) {
    second_index = first_index + 1;
    sum += arr[second_index] - arr[first_index];
  }
  if (sum < -100) {
    return true;
  }
  return false;
}
