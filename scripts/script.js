let randomizearray = document.getElementById('randomizearray_button');
let sort_button = document.getElementById('sort_button')
let bars_container = document.getElementById("bars_container")
let heightFactor = 4.5;
let minRange = 1;
let maxRange = 100;
let numOfBars = 100;
let unsorted_array = new Array(numOfBars);

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    for (let i = 0; i < numOfBars; i++) {
        unsorted_array[i] = randomNum(minRange, maxRange);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    createRandomArray();
    renderBars(unsorted_array)
})

function renderBars(array) {
    for (var i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor+ 'px';
        bars_container.appendChild(bar)
    }
}

randomizearray.addEventListener("click", function () {
    createRandomArray();
    bars_container.innerHTML = ""
    renderBars(unsorted_array)
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "aqua";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * heightFactor + 'px';
                bars[j].style.backgroundColor = "white";
                //bars[j].innerText = array[j];
                bars[j + 1].style.height = array[j + 1] * heightFactor + 'px';
                bars[j + 1].style.backgroundColor = "white";
                //bars[j + 1].innerText = array[j + 1];
                await sleep(30);
            }
        }
        await sleep(30);
    }
    return array;
}

sort_button.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsorted_array);
    console.log(sorted_array)
})