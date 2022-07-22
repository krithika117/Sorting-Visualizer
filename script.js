//Buttons and Slider
let randomizearray = document.getElementById('randomizearray_button')
let bubblesort_button = document.getElementById('bubblesort_button')
let insertionsort_button = document.getElementById('insertionsort_button')
let shellsort_button = document.getElementById('shellsort_button')
let selectionsort_button = document.getElementById('selectionsort_button')
let mergesort_button = document.getElementById('mergesort_button')

//Variables
let bars_container = document.getElementById("bars_container")
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 240;
let numOfBars = slider.value;
let heightFactor = 1.5;
let unsorted_array = new Array(numOfBars);

//Helper to generate random no.
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//To create an array of random numbers
function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = randomNum(minRange, maxRange);
    }
    return array;
}

//To create array and render bars upon landing
document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array)
})

//Creation of each bar
function renderBars(array) {
    for (var i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + 'px';
        bars_container.appendChild(bar)
    }
}

///Generating random array inputs
randomizearray.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = ""
    renderBars(unsorted_array)
})

//Input of number of bars
slider.addEventListener("input", function () {
    numOfBars = slider.value;
    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

//sleep helper for await inorder to create delay in visualization
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//Shell sort visualizer
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
                bars[j].style.backgroundColor = "orange";
                bars[j - gap].style.backgroundColor = "white";
                await sleep(30);
                bars[j].style.height = arr[j] * heightFactor + 'px';
            }
            arr[j] = temp;
            bars[j].style.height = arr[j] * heightFactor + 'px';
            bars[j].style.backgroundColor = "orange";
            await sleep(30);
        }

    }
    console.log(arr)
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    return arr;
}

//Selection sort visualizer
async function selectionSort(arr) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < arr.length; i++) {
        bars[i].style.height = arr[i] * heightFactor + 'px';

        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j
                bars[j].style.height = arr[j] * heightFactor + 'px';
            }

        }
        if (lowest !== i) {
            ;
            [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
            bars[i].style.height = arr[i] * heightFactor + 'px';
            bars[i].style.backgroundColor = "pink";
            bars[lowest].style.backgroundColor = "white";
            await sleep(30);
        }
        await sleep(30)

    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    return arr
}

//Bubble sort visualizer
async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "grey";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * heightFactor + 'px';
                bars[j].style.backgroundColor = "white";

                bars[j + 1].style.height = array[j + 1] * heightFactor + 'px';
                bars[j + 1].style.backgroundColor = "white";
                await sleep(30);
            }
        }
        await sleep(30);


    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    return array;
}

//Insertion sort visualizer
async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "white";
            await sleep(30);

            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "yellow";
                }
            }
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "yellow";
        await sleep(30);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    return array;
}

//Merge sort visualizer
async function mergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    let actualHalf = await mergeSort(left);
    await mergeSort(right);

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;

        }

        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "white";
        if (k + arr.length < bars.length) {
            bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
            bars[k + arr.length].style.backgroundColor = "yellow";
        }
        await sleep(30);
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "white";
        await sleep(30);
        i++;
        k++;
    }

    while (j < right.length) {
        arr[k] = right[j];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "white";
        await sleep(30);
        j++;
        k++;
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    return arr;
}

//Listeners for every button
selectionsort_button.addEventListener("click", function () {
    let sorted_array = selectionSort(unsorted_array);
    // console.log(sorted_array)
})


bubblesort_button.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsorted_array);
    // console.log(sorted_array)
})

insertionsort_button.addEventListener("click", function () {
    let sorted_array = InsertionSort(unsorted_array);
    // console.log(sorted_array)
})

shellsort_button.addEventListener("click", function () {
    let sorted_array = shellSort(unsorted_array);
    // console.log(sorted_array)
})

mergesort_button.addEventListener("click", function () {
    let sorted_array = mergeSort(unsorted_array);
    // console.log(sorted_array)
})