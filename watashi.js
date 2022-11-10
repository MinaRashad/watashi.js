/**
 * Written by Mina R. Eskandar (dev.minaeskandar@gmail.com)
 * Date: 2022-11-11
 * 
 * Watashi means "I" in Japanese; It is metaphor to refer to the conscience goal of the project.
 * Unlike other projects, Neurons here are going to be very similar to the ones in the brain.
 * The difference is that the neurons here are going to be more abstract and more general.
 * We can use it to build tranditional neural network but also other types
 * interconnectted networks, neurons that connect to itself, ... etc.
 * 
 */

/**
 * Neuron is the basic unit of the network.
 * It has a value and a list of connections to other neurons.
 * 
 * @param {number} value The value of the neuron.
 * @param {number} bias The bias of the neuron.
 * @param {[{Neuron,number}]} outgoing The outgoing neurons of the neuron.
 */
'use strict';

class Neuron {
    constructor(value, bias, outgoing) {
        this.value = value;
        this.bias = bias;
        this.outgoing = outgoing;

    }

    removeOutgoingConnection(neuron){
        for (let i = 0; i < this.outgoing.length; i++) {
            if(this.outgoing[i].neuron === neuron){
                this.outgoing.splice(i,1);
                return;
            }
        }
    }


    addOutgoingConnection({neuron, weight}) {
        this.outgoing.push({neuron, weight});
    }

    fire(){
        for (let i = 0; i < this.outgoing.length; i++) {
            let link = this.outgoing[i];
            link.neuron.value += this.value * link.weight + this.bias;
        }
    }

    activate(){
        this.value = 1/(1+Math.pow(Math.E,-this.value));
    }

}


