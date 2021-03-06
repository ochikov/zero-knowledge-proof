declare let require: any;
declare let web3: any;
import { Component } from '@angular/core';
const etherlime = require('etherlime');
const ethers = require('ethers');
// const ToDo = require('../../../build/ToDoManager.json');
const zkSnark = require('snarkjs');
const compiledCircuit = require('../../../circuit/circuit.json');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'MyToDo dApp';

  public successMessage: string;
  public infoMessage: string;
  public errorMessage: string;
  public contractInstance: any;
  public contractAddress = '';
  public toDos = {
    toDo: [],
    inProgress: [],
    done: []
  }
  public inactiveButton;


  public circuit;
  public proovingKey;
  public verificationKey;
  public proof;
  public publicSignals;
  public input;

  constructor() {

  }

  async ngOnInit() {

    // parse circuit
    this.circuit = new zkSnark.Circuit(compiledCircuit);
    const setup = zkSnark.original.setup(this.circuit);

    // Trusted Setup
    this.proovingKey = setup.vk_proof;
    this.verificationKey = setup.vk_verifier;
    setup.toxic = ''; // toxic must be discarded for security issues!


    // try {
    //   const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    //   const signer = await provider.getSigner();
    //   this.contractInstance = await etherlime.ContractAt(ToDo, this.contractAddress, signer, provider);
    //   this.successMessage = 'The contract has been set and is ready to interact with it!';
    //   this.toDos = await this.getToDoStatuses();
    // } catch (e) {
    //   if (e.message.includes('web3 is not defined')) {
    //     this.errorMessage = 'Error. Make sure you are using Metamask'
    //   } else {
    //     this.errorMessage = e.message;
    //   }
    // }
  }


  // Generate Proof
  public generateProof() {

    const witness = this.circuit.calculateWitness(this.input);
    const proofAndSignals = zkSnark.original.genProof(this.proovingKey, witness);
    this.proof = proofAndSignals.proof;
    this.publicSignals = proofAndSignals.publicSignals;
  }

  // Offchain Verify Proof
  public async verify() {
    if (await zkSnark.original.isValid(this.verificationKey, this.proof, this.publicSignals)) {
      console.log("The proof is valid");
    } else {
      console.log("The proof is not valid");
    }
  }

  public inputNumbers(firstNumber, secondNumber) {
    console.log(firstNumber)
    this.input = {
      "a": firstNumber,
      "b": secondNumber
    }
  }

  private async getToDoIndex(_toDo) {
    // const indexCounter = await this.contractInstance.indexCounter();
    // const counter = indexCounter.toNumber();
    // for (let i = 0; i < indexCounter; i++) {
    //   let toDo = await this.contractInstance.getToDoByIndex(i);
    //   if (toDo === _toDo) {
    //     return i
    //   }
    // }
  }

  public async addToDo(todo) {

    // try {
    //   this.inactiveButton = true;
    //   await this.contractInstance.addToDo(todo.value);
    //   this.addInfoMessage('ToDo has been added!');
    //   this.toDos.toDo.push(todo.value);
    //   this.inactiveButton = false;
    // } catch (e) {
    //   this.addInfoMessage(`Transaction failed. Are you sure you hadn't already added this ToDo! ${e.message}`);
    //   this.inactiveButton = false;
    // }
  }

  public async moveToInProgress(todo) {
    // try {
    //   const index = await this.getToDoIndex(todo);
    //   await this.contractInstance.changeToDoStatus(index);
    //   this.toDos.toDo.splice(this.toDos.toDo.indexOf(todo), 1);
    //   this.toDos.inProgress.push(todo);
    //   this.addInfoMessage('Status has been changed!');
    // } catch (e) {
    //   this.addInfoMessage(e.message);
    // }
  }

  public async moveToDone(todo) {
    // try {
    //   const index = await this.getToDoIndex(todo);
    //   await this.contractInstance.changeToDoStatus(index);
    //   this.toDos.inProgress.splice(this.toDos.inProgress.indexOf(todo), 1);
    //   this.toDos.done.push(todo);
    //   this.addInfoMessage('Status has been changed!');
    // } catch (e) {
    //   this.addInfoMessage(e.message);
    // }

  }

  public async removeToDo(todo, destination) {
    // try {
    //   const index = await this.getToDoIndex(todo);
    //   await this.contractInstance.removeToDo(index);
    //   this.cleanCurrentTodo(todo, destination);
    //   this.addInfoMessage("ToDo has been removed!")
    // } catch (e) {
    //   this.addInfoMessage("ToDo not found to be removed. Add it first!")
    // }
  }


  private async getToDoStatuses() {
    // let statuses = {
    //   toDo: [],
    //   inProgress: [],
    //   done: []
    // }

    // try {
    //   let indexCounter = await this.contractInstance.indexCounter();
    //   let index = indexCounter.toNumber();
    //   for (let i = 0; i < index; i++) {
    //     let toDo = await this.contractInstance.getToDoByIndex(i)
    //     let status = await this.contractInstance.getToDoStatus(i);
    //     if (status === 1) {
    //       statuses.toDo.push(toDo);
    //     } else if (status === 2) {
    //       statuses.inProgress.push(toDo);
    //     } else if (status === 3) {
    //       statuses.done.push(toDo);
    //     }
    //   }

    // } catch (e) {
    //   this.addInfoMessage(e.message)
    // }

    // return statuses;
  }

  private addInfoMessage(message: string) {
    // this.infoMessage = message;
    // this.clearInfoMessage();
  }

  private async clearInfoMessage() {
    // setTimeout(() => {
    //   this.infoMessage = '';
    // }, 5000);
  }

  private cleanCurrentTodo(todo, destination) {
    //   if (destination === 'todo') {
    //     this.toDos.toDo.splice(this.toDos.toDo.indexOf(todo), 1);
    //   } else if (destination === 'progress') {
    //     this.toDos.inProgress.splice(this.toDos.inProgress.indexOf(todo), 1);
    //   } else if (destination === 'done') {
    //     this.toDos.done.splice(this.toDos.done.indexOf(todo), 1);
    //   }
  }

}
