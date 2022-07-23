//Buttons and Slider
let randomizearray = document.getElementById('randomizearray_button')
// let bubblesort_button = document.getElementById('bubblesort_button')
// let insertionsort_button = document.getElementById('insertionsort_button')
// let shellsort_button = document.getElementById('shellsort_button')
// let selectionsort_button = document.getElementById('selectionsort_button')
// let mergesort_button = document.getElementById('mergesort_button')
let sort_button = document.getElementById('sort_button')

let select_algo = document.getElementById("algo");


//Variables
let bars_container = document.getElementById("bars_container")
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 240;
let numOfBars = slider.value;
let heightFactor = 1.7;
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
    
        
           output.innerHTML = this.value;
     
});

//sleep helper for await inorder to create delay in visualization
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//Algo dropdown
let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});


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
    toastProduce("Sorted")
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
            bars[i].style.backgroundColor = "violet";
            bars[lowest].style.backgroundColor = "white";
            await sleep(30);
        }
        await sleep(30)

    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    toastProduce("Sorted")
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
                        bars[k].style.backgroundColor = "aqua";
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
    toastProduce("Sorted")
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
    toastProduce("Sorted")
    return array;
}

//Merge sort visualizer
async function merge(arr, l, m, r) {
    let bars = document.getElementsByClassName("bar");
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
        bars[i].style.height = arr[i] * heightFactor + "px";
        bars[i].style.backgroundColor = "red";
        await sleep(30);
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "red";
            i++;
        } else {
            arr[k] = R[j];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "red";
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "red";
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "red";
        j++;
        k++;
    }
}
async function mergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    n = arr.length
    var curr_size;
    var left_start;
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            var mid = Math.min(left_start + curr_size - 1, n - 1);
            var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
            await merge(arr, left_start, mid, right_end);
        }
        await sleep(30);
    }
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "#A2F314";
    }
    toastProduce("Sorted")
}

//Listeners for every button
// selectionsort_button.addEventListener("click", function () {
//     let sorted_array = selectionSort(unsorted_array);
//     // console.log(sorted_array)
// })


// bubblesort_button.addEventListener("click", function () {
//     let sorted_array = bubbleSort(unsorted_array);
//     // console.log(sorted_array)
// })

// insertionsort_button.addEventListener("click", function () {
//     let sorted_array = InsertionSort(unsorted_array);
//     // console.log(sorted_array)
// })

// shellsort_button.addEventListener("click", function () {
//     let sorted_array = shellSort(unsorted_array);
//     // console.log(sorted_array)
// })

// mergesort_button.addEventListener("click", function () {
//     let sorted_array = mergeSort(unsorted_array);  
//     // console.log(sorted_array)
// })

sort_button.addEventListener("click", function () {
    switch (algotouse) {
        case "shell":
          shellSort(unsorted_array);
          break;
        case "bubble":
          bubbleSort(unsorted_array);
          break;
        case "insertion":
          InsertionSort(unsorted_array);
          break;
        case "selection":
          selectionSort(unsorted_array);
          break;
        case "merge":
        mergeSort(unsorted_array);
            break;
        default:
          bubbleSort(unsorted_array);
          break;
      }
})

//Toastify for toast messages
function toastProduce(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "rgba(239, 239, 255, 0.19)",
            color: "#fff",

        },
        onClick: function () {}
    }).showToast();


}
