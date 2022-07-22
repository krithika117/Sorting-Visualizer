let randomizearray = document.getElementById('randomizearray_button');
let bubblesort_button = document.getElementById('bubblesort_button')
let insertionsort_button = document.getElementById('insertionsort_button')
let bars_container = document.getElementById("bars_container")
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 130;
let numOfBars = slider.value;
let heightFactor = 3;
let unsorted_array = new Array(numOfBars);

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = randomNum(minRange, maxRange);
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array)
})

function renderBars(array) {
    for (var i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + 'px';
        bars_container.appendChild(bar)
    }
}

randomizearray.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = ""
    renderBars(unsorted_array)
})

slider.addEventListener("input", function () {
    numOfBars = slider.value;
    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function shellSort(arr) {
    console.log(arr)
    let bars = document.getElementsByClassName("bar");
    let n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
                bars[j].style.backgroundColor = "red";
                bars[j - gap].style.backgroundColor = "red";
                await sleep(30);
                bars[j].style.height = arr[j] * heightFactor + 'px';
            }
            arr[j] = temp;
            bars[j].style.height = arr[j] * heightFactor + 'px';
            bars[j].style.backgroundColor = "white";
            await sleep(30);
        }
    }
    console.log(arr)
    return arr;
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

async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "yellow";
            //bars[j + 1].innerText = array[j + 1];
            await sleep(30);

            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "white";
                }
            }
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "white";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(30);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "aqua";
    }
    return array;
}

//Listeners


bubblesort_button.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsorted_array);
    console.log(sorted_array)
})

insertionsort_button.addEventListener("click", function () {
    let sorted_array = InsertionSort(unsorted_array);
    console.log(sorted_array)
})

shellsort_button.addEventListener("click", function () {
    let sorted_array = shellSort(unsorted_array);
    console.log(sorted_array)
})