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


// neural network

// Layer Class
/**
 * Layers is a group of neurons
 * It has 1 input
 * @param {number} size - The number of neurons in the layer.
 * 
 * The layer does not need to know what the weight, incoming,..etc.
 * All these are stored in each single neuron.
 * The layer is more like an interface to a group of neurons.
 * As before, the layer can connect to other layers, but it can also connect to itself.
 */
class Layer {
    constructor(size) {
        this.size = size;
        this.neurons = [];
        this.connectedTo = [];
        for (let i = 0; i < this.size; i++) {
            // To research: What values should it hold? and what are initial weights?
            // Should it be random?
            let neuron = new Neuron(0,0,[])
            this.neurons.push(neuron);
        }
        // what if layer is connected to itself? or several layers?
    }

    /**
     * Connects the layer to another layers.
     * 
     * @param {Layer[]} to The array of layers to connect to.
     */
    add_connections(to){
        for (let i = 0; i < this.neurons.length; i++) {
            for (let j = 0; j < to.length; j++) {
                let neuron = this.to[j].neurons[i];
                this.neurons[i].addOutgoingConnection({neuron:neuron, weight:1});
            }
        }
    }
    // Fires all neurons in the layer
    fire(){
        for (let i = 0; i < this.neurons.length; i++) {
            this.neurons[i].fire();
        }
    }

    activate(){
        for (let i = 0; i < this.neurons.length; i++) {
            this.neurons[i].activate();
        }
    }
}

